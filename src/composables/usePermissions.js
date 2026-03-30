import { computed, readonly, ref } from 'vue'
import { getPermissionsByRole, 
  isValidRole,
   ROLE_PERMISSIONS, 
   ROLES } from '../lib/rbac'

// Chave usada para salvar o usuário no localStorage
const STORAGE_KEY = 'vault_active_user'

// Função responsável por carregar o usuário salvo no navegador
function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)

    // Se existir algo salvo, converte de JSON para objeto
    if (raw) return JSON.parse(raw)

  } catch {
    // Se der erro (ex: JSON inválido), ignora
  }

  return null
}

// Tenta recuperar o usuário salvo
const savedUser = loadFromStorage()

// Estado principal da aplicação: usuário atual
// Se não houver nada salvo, usa um usuário padrão
const currentUser = ref(
  savedUser || {
    id: 2,
    name: 'walter',
    email: 'walter@example.com',
    role: ROLES.VIEWER
  }
)

// O role é derivado do usuário atual (não é mais estado principal)
const currentRole = computed(() => {
  return currentUser.value?.role || ROLES.VIEWER
})

export function usePermissions() {

  // Calcula permissões com base no role atual
  const permissions = computed(() => {
    return getPermissionsByRole(currentRole.value)
  })

  // Permissão de visualização
  const canView = computed(() => {
    return permissions.value.canView
  })

  // Permissão de ações (editar, deletar, etc.)
  const canActions = computed(() => {
    return permissions.value.canActions
  })

  // Atualiza o usuário atual
  function setUser(user) {

    // Valida se o role é permitido
    if (!isValidRole(user.role)) {
      throw new Error(`Role inválida: ${user.role}`)
    }

    // Atualiza o estado reativo
    currentUser.value = user

    // Salva no localStorage para persistir após reload
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  }

  // Verifica se o usuário possui um determinado role
  function hasRole(role) {
    return currentRole.value === role
  }

  // Retorna os dados e funções disponíveis para uso nos componentes
  return {
    currentUser: readonly(currentUser), // evita alteração direta fora do hook
    currentRole: readonly(currentRole),
    permissions,
    canView,
    canActions,
    roles: ROLES,
    setUser,
    hasRole,
  }
}