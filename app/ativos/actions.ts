'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { requireAuth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import type { AssetCategory, AssetFolder } from '@/types/assets'

// Faz upload de um arquivo para o bucket e salva metadados no DB
export async function uploadAsset(formData: FormData) {
  const user = await requireAuth()

  if (!['admin', 'staff'].includes(user.profile.role)) {
    return { error: 'Sem permissão para upload.' }
  }

  const file = formData.get('file') as File
  const category = formData.get('category') as AssetCategory
  const folderId = (formData.get('folderId') as string) || null

  if (!file || !category) return { error: 'Dados inválidos.' }

  const supabase = createAdminClient()

  const ext = file.name.split('.').pop()
  const uuid = crypto.randomUUID()
  const storagePath = `${category}/${uuid}.${ext}`

  const { error: storageError } = await supabase.storage
    .from('brand-assets')
    .upload(storagePath, file, {
      contentType: file.type,
      upsert: false,
    })

  if (storageError) return { error: storageError.message }

  const { data, error: dbError } = await supabase
    .from('assets')
    .insert({
      name: file.name,
      category,
      mime_type: file.type,
      size: file.size,
      storage_path: storagePath,
      uploaded_by: user.id,
      folder_id: folderId,
    })
    .select('id')
    .single()

  if (dbError) {
    // Rollback: remover o arquivo do storage
    await supabase.storage.from('brand-assets').remove([storagePath])
    return { error: dbError.message }
  }

  revalidatePath(`/ativos/${category}`)
  return { error: null, id: data.id }
}

// Remove um ativo do storage e do DB
export async function deleteAsset(
  assetId: string,
  storagePath: string,
  category: AssetCategory,
) {
  const user = await requireAuth()

  if (!['admin', 'staff'].includes(user.profile.role)) {
    return { error: 'Sem permissão para remover.' }
  }

  const supabase = createAdminClient()

  // 1. Remover do storage
  const { error: storageError } = await supabase.storage
    .from('brand-assets')
    .remove([storagePath])

  if (storageError) return { error: storageError.message }

  // 2. Remover do DB
  const { error: dbError } = await supabase
    .from('assets')
    .delete()
    .eq('id', assetId)

  if (dbError) return { error: dbError.message }

  revalidatePath(`/ativos/${category}`)
  return { error: null }
}

// Gera URL assinada para um arquivo (válida por 1 hora)
export async function getSignedUrl(storagePath: string): Promise<string | null> {
  const supabase = createAdminClient()
  const { data } = await supabase.storage
    .from('brand-assets')
    .createSignedUrl(storagePath, 3600)
  return data?.signedUrl ?? null
}

// Busca todos os assets de uma categoria com URLs assinadas
export async function getAssetsByCategory(category: AssetCategory) {
  await requireAuth()
  const supabase = createAdminClient()

  const { data: assets, error } = await supabase
    .from('assets')
    .select('id, name, category, mime_type, size, storage_path, uploaded_by, created_at, folder_id')
    .eq('category', category)
    .order('created_at', { ascending: false })

  if (error || !assets) return []

  const assetsWithUrls = await Promise.all(
    assets.map(async (asset) => {
      const { data } = await supabase.storage
        .from('brand-assets')
        .createSignedUrl(asset.storage_path, 3600)
      return {
        id: asset.id as string,
        name: asset.name as string,
        category: asset.category as AssetCategory,
        mimeType: asset.mime_type as string,
        size: asset.size as number,
        storagePath: asset.storage_path as string,
        uploadedBy: asset.uploaded_by as string | undefined,
        uploadedAt: asset.created_at as string,
        folderId: (asset.folder_id as string | null) ?? null,
        url: data?.signedUrl ?? '',
      }
    }),
  )

  return assetsWithUrls
}

// Busca pastas de uma categoria com contagem de ativos
export async function getFoldersByCategory(category: AssetCategory): Promise<AssetFolder[]> {
  await requireAuth()
  const supabase = createAdminClient()

  const { data: folders, error } = await supabase
    .from('asset_folders')
    .select('id, name, category, created_at')
    .eq('category', category)
    .order('name', { ascending: true })

  if (error || !folders) return []

  const foldersWithCount = await Promise.all(
    folders.map(async (folder) => {
      const { count } = await supabase
        .from('assets')
        .select('id', { count: 'exact', head: true })
        .eq('folder_id', folder.id)
      return {
        id: folder.id as string,
        name: folder.name as string,
        category: folder.category as AssetCategory,
        createdAt: folder.created_at as string,
        assetCount: count ?? 0,
      }
    }),
  )

  return foldersWithCount
}

export async function createFolder(name: string, category: AssetCategory) {
  const user = await requireAuth()

  if (!['admin', 'staff'].includes(user.profile.role)) {
    return { error: 'Sem permissão.' }
  }

  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('asset_folders')
    .insert({ name: name.trim(), category, created_by: user.id })
    .select('id, name, category, created_at')
    .single()

  if (error) return { error: error.message }

  revalidatePath(`/ativos/${category}`)
  return {
    error: null,
    folder: {
      id: data.id as string,
      name: data.name as string,
      category: data.category as AssetCategory,
      createdAt: data.created_at as string,
      assetCount: 0,
    } as AssetFolder,
  }
}

export async function deleteFolder(folderId: string, category: AssetCategory) {
  const user = await requireAuth()

  if (!['admin', 'staff'].includes(user.profile.role)) {
    return { error: 'Sem permissão.' }
  }

  const supabase = createAdminClient()

  // Move assets para a raiz antes de remover a pasta
  await supabase.from('assets').update({ folder_id: null }).eq('folder_id', folderId)

  const { error } = await supabase.from('asset_folders').delete().eq('id', folderId)

  if (error) return { error: error.message }

  revalidatePath(`/ativos/${category}`)
  return { error: null }
}

export async function moveAssetToFolder(
  assetId: string,
  folderId: string | null,
  category: AssetCategory,
) {
  const user = await requireAuth()

  if (!['admin', 'staff'].includes(user.profile.role)) {
    return { error: 'Sem permissão.' }
  }

  const supabase = createAdminClient()

  const { error } = await supabase
    .from('assets')
    .update({ folder_id: folderId })
    .eq('id', assetId)

  if (error) return { error: error.message }

  revalidatePath(`/ativos/${category}`)
  return { error: null }
}
