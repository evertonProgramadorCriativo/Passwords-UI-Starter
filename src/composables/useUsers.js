import { ref } from 'vue'

// Lista reativa de usuários
const users = ref([])

export function useUsers() {
  
  async function fetchUsers() {
    
    try {
        // Busca usuários 
      const res = await fetch('/data/users.json')

      // Validação de erro HTTP
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      // Atualiza estado
      users.value = await res.json()
    } catch (e) {
       // Error
      console.error('Erro ao carregar usuários', e)
    }
  }

  return { users, fetchUsers }
}