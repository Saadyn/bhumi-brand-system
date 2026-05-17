export type UserRole = 'admin' | 'staff' | 'viewer'

export interface UserProfile {
  id: string
  name: string
  role: UserRole
  created_at: string
  updated_at: string
}

export interface AuthUser {
  id: string
  email: string | undefined
  profile: UserProfile
}
