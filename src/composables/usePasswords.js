import { ref } from 'vue'

// Estado global reativo compartilhado entre componentes
const passwords = ref([])
const loading = ref(false)
const error = ref(null)

export function usePasswords() {

 // Função responsável por buscar credenciais do backend/mock
    async function fetchPasswords() {
    loading.value = true
    error.value = null
    try {
        // Requisição HTTP para arquivo local (simulando API)
      const res = await fetch('/data/passwords.json')
       // Validação de erro HTTP (ex: 404, 500)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
         // Atualiza estado com os dados retornados
      passwords.value = await res.json()
    } catch (e) {
        // Tratamento de erro centralizado para UI
      error.value = e.message || 'Erro ao carregar credenciais'
    } finally {
        // Garante que o loading sempre será desligado
      loading.value = false
    }
  }
 // Retorna estado + ações (padrão composable)
 // Um composable é uma função reutilizável no Vue.js que encapsula lógica + estado reativo, usando a Composition API.
  return { passwords, loading, error, fetchPasswords }
}