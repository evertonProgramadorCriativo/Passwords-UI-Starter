export const ROLES = Object.freeze({
  ADMIN: 'admin',
  VIEWER: 'viewer',
})

export const ROLE_PERMISSIONS = Object.freeze({
  [ROLES.ADMIN]: Object.freeze({
    canView: true,
    canActions: true,
  }),
  [ROLES.VIEWER]: Object.freeze({
    canView: true,
    canActions: false,
  }),
})

export function isValidRole(role) {
  return Object.values(ROLES).includes(role)
}

export function getPermissionsByRole(role) {
  return ROLE_PERMISSIONS[role] ?? {
    canView: false,
    canActions: false,
  }
}
