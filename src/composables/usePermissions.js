import { computed, readonly, ref } from 'vue'
import {
  getPermissionsByRole,
  isValidRole,
  ROLE_PERMISSIONS,
  ROLES,
} from '../lib/rbac'

const currentRole = ref(ROLES.VIEWER)

export function usePermissions() {
  const permissions = computed(() => getPermissionsByRole(currentRole.value))
  const canView = computed(() => permissions.value.canView)
  const canActions = computed(() => permissions.value.canActions)

  function setRole(role) {
    if (!isValidRole(role)) {
      throw new Error(`Invalid role "${role}". Allowed roles: ${Object.keys(ROLE_PERMISSIONS).join(', ')}`)
    }

    currentRole.value = role
  }

  function hasRole(role) {
    return currentRole.value === role
  }

  return {
    currentRole: readonly(currentRole),
    permissions,
    canView,
    canActions,
    roles: ROLES,
    setRole,
    hasRole,
  }
}
