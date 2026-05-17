'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { requireRole } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import type { UserRole } from '@/types/auth'

export async function updateUserRole(userId: string, newRole: UserRole) {
  await requireRole('admin')
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('profiles')
    .update({ role: newRole })
    .eq('id', userId)
  if (error) return { error: error.message }
  revalidatePath('/admin/usuarios')
  return { error: null }
}

export async function removeUser(userId: string) {
  await requireRole('admin')
  const supabase = createAdminClient()
  const { error } = await supabase.auth.admin.deleteUser(userId)
  if (error) return { error: error.message }
  revalidatePath('/admin/usuarios')
  return { error: null }
}

export async function inviteUser(email: string, role: UserRole) {
  await requireRole('admin')
  const supabase = createAdminClient()
  const { error } = await supabase.auth.admin.inviteUserByEmail(email, {
    data: { role },
  })
  if (error) return { error: error.message }
  revalidatePath('/admin/usuarios')
  return { error: null }
}
