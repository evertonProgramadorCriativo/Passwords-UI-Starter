<script setup>
import { onMounted } from 'vue'
import { usePasswords } from './composables/usePasswords'
import { useUsers } from './composables/useUsers'

// Uso dos composables separação de responsabilidade
// Um composable é uma função reutilizável no Vue.js
const { passwords, loading, error, fetchPasswords } = usePasswords()
const { users, fetchUsers } = useUsers()

// Executa ao montar o componente 
onMounted(async () => {
  // Executa chamadas em paralelo 
  await Promise.all([fetchPasswords(), fetchUsers()])

  // visualizar dados carregados
  console.log(' Senhas:', passwords.value)
  console.log(' Usuários:', users.value)
})
</script>

<template>
  <main style="padding:20px; font-family:sans-serif">
    <h2>Gerenciador de credenciais-> Teste de carregamento</h2>

    <!-- Estado de carregamento -->
    <p v-if="loading"> Carregando...</p>

    <!-- Estado de erro -->
    <p v-else-if="error" style="color:red">
       Erro: {{ error }}
    </p>

    <!-- Estado de sucesso -->
    <div v-else>
      <!-- Exibe quantidade de credenciais -->
      <p style="color:green">
       Total de credenciais   {{ passwords.length }} carregadas
      </p>

      <!-- Preview dos dados  -->
      <pre
        style="background:#f4f4f5; padding:12px; border-radius:8px; font-size:12px"
      >
{{
  JSON.stringify(passwords.slice(0, 2), null, 2)
}}
      </pre>
    </div>
  </main>
</template>