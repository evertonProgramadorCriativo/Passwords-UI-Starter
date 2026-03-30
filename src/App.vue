<script setup>

// Hook do Vue executado quando o componente é montado
import { onMounted, ref } from 'vue'

// Composable responsável pelas senhas
import { usePasswords } from './composables/usePasswords'

// Composable responsável pelos usuários
import { useUsers } from './composables/useUsers'

// Composable de permissões (controle de usuário e acesso)
import { usePermissions } from './composables/usePermissions'

// Componente de tabela que exibe as senhas
import PasswordTable from './components/PasswordTable.vue'

import MfaModal from './components/MfaModal.vue'

// Estados , funções de senhas e funções de ação (CRUD)

const {
  passwords,
  loading,
  error,
  fetchPasswords,
  duplicatePassword,
  deletePassword
} = usePasswords()


// Estados e funções de usuários
const { users, fetchUsers } = useUsers()

// Controle de usuário atual e permissões
const { currentUser, canActions, setUser } = usePermissions()

const mfaTarget = ref(null)
const revealedIds = ref(new Set())

// Ao montar o componente, busca dados em paralelo
onMounted(async () => {
  await Promise.all([
    fetchPasswords(), // carrega lista de senhas
    fetchUsers()      // carrega lista de usuários
  ])
})
function handleMfaConfirm() {
  if (mfaTarget.value) {
    revealedIds.value = new Set([...revealedIds.value, mfaTarget.value.id])
  }
  mfaTarget.value = null
}

function handleHide(id) {
  const next = new Set(revealedIds.value)
  next.delete(id)
  revealedIds.value = next
}
</script>

<template>
  <!-- Container principal da aplicação -->
  <main style="padding:24px; font-family:sans-serif; background:#F4F4F5; min-height:100vh">

    <!-- Header com título e seleção de usuário -->
    <div style="display:flex; align-items:center; gap:12px; margin-bottom:20px">

      <!-- Título da aplicação -->
      <h2 style="flex:1; color:#00060F">Gerenciamento</h2>

      <!-- Botões para trocar o usuário ativo -->
      <!-- percorre todos os usuários -->
      <!-- chave única para renderização -->
      <!-- troca o usuário ao clicar -->
      <button v-for="u in users" :key="u.id" @click="setUser(u)" :style="{
        padding: '7px 14px',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',

        // destaca o usuário ativo
        background: u.id === currentUser.id ? '#053A9C' : '#ddd',
        color: u.id === currentUser.id ? 'white' : '#333',

        fontWeight: 'bold',
        fontSize: '13px'
      }">
        {{ u.name }}
      </button>

    </div>

    <!-- Estado de carregamento -->
    <div v-if="loading" style="text-align:center; padding:60px; color:#888">
      Carregando dados...
    </div>

    <!-- Estado de erro -->
    <div v-else-if="error" style="color:red; padding:20px">
      Erro: {{ error }}
    </div>

    <!-- Tabela exibida quando os dados carregam -->
    <!-- lista de senhas -->
    <!-- permissões do usuário -->
    <!-- Evento de edição (ainda mockado) -->
    <!-- Evento de duplicação -->
    <!-- Evento de exclusão -->
    <PasswordTable :passwords="passwords" :can-actions="canActions" :revealed-ids="revealedIds"
      @reveal="(entry) => mfaTarget = entry" @hide="handleHide" @duplicate="duplicatePassword" @delete="deletePassword"
      @edit="(e) => console.log('edit:', e)" />

    <Teleport to="body">
      <MfaModal v-if="mfaTarget" :entry="mfaTarget" @confirm="handleMfaConfirm" @close="mfaTarget = null" />
    </Teleport>

  </main>
</template>