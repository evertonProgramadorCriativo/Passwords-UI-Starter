import { ref } from 'vue'

// Estado global reativo compartilhado entre componentes
const passwords = ref([])
const loading = ref(false)
const error = ref(null)

export function usePasswords() {

  // Função responsável por buscar credenciais (mock/local JSON)
  async function fetchPasswords() {
    loading.value = true
    error.value = null

    try {
      // Requisição HTTP para arquivo local (simulando API)
      const res = await fetch('/data/passwords.json')

      // Validação de erro HTTP (ex: 404, 500)
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }

      // Atualiza estado com os dados retornados
      passwords.value = await res.json()

    } catch (e) {
      // Tratamento de erro para exibição na interface
      error.value = e.message || 'Erro ao carregar credenciais'

    } finally {
      // Garante que o loading sempre será finalizado
      loading.value = false
    }
  }

  // Duplica uma senha existente com novo ID e datas atualizadas
  function duplicatePassword(id) {
    const original = passwords.value.find(p => p.id === id)

    // Se não encontrar o item, não faz nada
    if (!original) return

    passwords.value.push({
      ...original, // copia todos os dados existentes

      // Gera novo ID único baseado no timestamp
      id: `pwd-dup-${Date.now()}`,

      // Modifica o username para indicar cópia
      username: original.username + '_copy',

      // Atualiza datas
      date_created: new Date().toISOString(),
      last_update: new Date().toISOString(),
    })
  }

  // Remove uma senha pelo ID
  function deletePassword(id) {
    passwords.value = passwords.value.filter(p => p.id !== id)
  }

  // Atualiza parcialmente uma senha existente
  function updatePassword(id, updates) {
    const idx = passwords.value.findIndex(p => p.id === id)

    // Se não encontrar o item, não faz nada
    if (idx === -1) return

    passwords.value[idx] = {
      ...passwords.value[idx], // mantém dados antigos
      ...updates,              // aplica alterações

      // Atualiza data de modificação
      last_update: new Date().toISOString()
    }
  }

  // Adiciona uma nova senha no início da lista
  function addPassword(entry) {
    passwords.value.unshift({
      ...entry,

      // Gera ID único
      id: `pwd-new-${Date.now()}`,

      // Define datas iniciais
      date_created: new Date().toISOString(),
      last_update: new Date().toISOString(),
    })
  }

  // Retorna estado + ações (padrão composable)
  return {
    passwords,
    loading,
    error,
    fetchPasswords,
    duplicatePassword,
    deletePassword,
    updatePassword,
    addPassword
  }
}