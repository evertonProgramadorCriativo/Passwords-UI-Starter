<script setup>
import { onMounted } from 'vue'

// Composable responsável pelas senhas
import { usePasswords } from './composables/usePasswords'

// Composable responsável pelos usuários
import { useUsers } from './composables/useUsers'

// Composable de permissões (controle de usuário e role)
import { usePermissions } from './composables/usePermissions'

// Estados e funções relacionados às senhas
const { passwords, loading, error, fetchPasswords } = usePasswords()

// Estados e funções relacionados aos usuários
const { users, fetchUsers } = useUsers()

// Controle de usuário atual e permissões
const { currentUser, currentRole, canActions, setUser } = usePermissions()

// Ao montar o componente, busca dados em paralelo
onMounted(async () => {
  await Promise.all([
    fetchPasswords(), // carrega lista de senhas
    fetchUsers()      // carrega lista de usuários
  ])
})
</script>

<template>
  <main style="padding:20px; font-family:sans-serif">

    <!-- Título da página -->
    <h2>Gerenciamento de Permissões</h2>

    <!-- Bloco com informações do usuário atual -->
    <div style="background:#f4f4f5; padding:14px; border-radius:8px; margin-bottom:20px">

      <!-- Nome do usuário ativo -->
      <p>
        <strong>Usuário ativo:</strong> {{ currentUser.name }}
      </p>

      <!-- Role do usuário -->
      <p>
        <strong>Role:</strong> {{ currentRole }}
      </p>

      <!-- Permissão de ações (admin ou viewer) -->
      <p>
        <strong>canActions:</strong>

        <!-- Cor muda dinamicamente baseado na permissão -->
        <span :style="{ color: canActions ? 'green' : 'red' }">
          {{ canActions ? 'sim (admin)' : 'não (viewer)' }}
        </span>
      </p>
    </div>

    <!-- Lista de botões para trocar o usuário -->
    <div style="display:flex; gap:10px">
      <!-- Percorre todos os usuários -->
      <button v-for="u in users">
        <!-- Nome e role do usuário -->
        {{ u.name }} ({{ u.role }})
      </button>

    </div>



  </main>
</template>