-- Migration: Sistema de pastas para Ativos da Marca
-- Executar no Supabase SQL Editor (Dashboard > SQL Editor > New query)

-- 1. Criar tabela de pastas
CREATE TABLE IF NOT EXISTS asset_folders (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  category    text NOT NULL,
  created_by  uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at  timestamptz DEFAULT now()
);

-- 2. Adicionar coluna folder_id na tabela assets
ALTER TABLE assets
  ADD COLUMN IF NOT EXISTS folder_id uuid REFERENCES asset_folders(id) ON DELETE SET NULL;

-- 3. RLS na tabela asset_folders
ALTER TABLE asset_folders ENABLE ROW LEVEL SECURITY;

-- Usuários autenticados podem ver pastas
CREATE POLICY "Authenticated can view folders"
  ON asset_folders FOR SELECT
  TO authenticated
  USING (true);

-- Apenas admin/staff podem criar, editar e remover pastas
CREATE POLICY "Admin and staff can manage folders"
  ON asset_folders FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'staff')
    )
  );
