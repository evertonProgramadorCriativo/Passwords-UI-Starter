<script setup>

// Define as props recebidas do componente pai
defineProps({
    passwords: Array,   // lista de senhas (dados da tabela)
    canActions: Boolean // define se o usuário pode executar ações (admin ou não)
})

// Define os eventos que o componente pode emitir
defineEmits([
    'reveal',    // mostrar senha
    'duplicate', // duplicar registro
    'delete',    // deletar registro
    'edit'       // editar registro
])

// Função para formatar datas no padrão brasileiro
function formatDate(iso) {
    return new Date(iso).toLocaleDateString('pt-BR')
}
</script>

<template>
    <!-- Container com scroll horizontal para telas menores -->
    <div style="overflow-x:auto; background:white; border-radius:10px; border:1px solid #e8e8ea">

        <!-- Tabela principal -->
        <table style="width:100%; border-collapse:collapse; font-size:14px; min-width:700px">

            <!-- Cabeçalho da tabela -->
            <thead>
                <tr style="background:#F4F4F5">

                    <!-- Colunas -->
                    <th
                        style="padding:11px 16px; text-align:left; font-size:11px; color:#888; text-transform:uppercase; letter-spacing:.06em">
                        Usuário</th>
                    <th
                        style="padding:11px 16px; text-align:left; font-size:11px; color:#888; text-transform:uppercase; letter-spacing:.06em">
                        Site</th>
                    <th
                        style="padding:11px 16px; text-align:left; font-size:11px; color:#888; text-transform:uppercase; letter-spacing:.06em">
                        Owner</th>
                    <th
                        style="padding:11px 16px; text-align:left; font-size:11px; color:#888; text-transform:uppercase; letter-spacing:.06em">
                        Criado</th>
                    <th
                        style="padding:11px 16px; text-align:left; font-size:11px; color:#888; text-transform:uppercase; letter-spacing:.06em">
                        Atualizado</th>
                    <th
                        style="padding:11px 16px; text-align:left; font-size:11px; color:#888; text-transform:uppercase; letter-spacing:.06em">
                        Senha</th>
                    <th
                        style="padding:11px 16px; text-align:right; font-size:11px; color:#888; text-transform:uppercase; letter-spacing:.06em">
                        Ações</th>
                </tr>
            </thead>

            <!-- Corpo da tabela -->
            <tbody>

                <!-- Percorre todas as senhas -->
                <!-- :key="entry.id -> chave única para renderização eficiente -->
                <tr v-for="entry in passwords" :key="entry.id" style="border-bottom:1px solid #f0f0f0">

                    <!-- Nome do usuário -->
                    <td style="padding:12px 16px">
                        {{ entry.username }}
                    </td>

                    <!-- Nome do site com destaque visual -->
                    <td style="padding:12px 16px">
                        <span
                            style="background:#e8f0ff; color:#053A9C; padding:3px 10px; border-radius:99px; font-size:12px; font-weight:600">
                            {{ entry.site }}
                        </span>
                    </td>

                    <!-- Dono da senha -->
                    <td style="padding:12px 16px; color:#666; font-size:13px">
                        {{ entry.owner }}
                    </td>

                    <!-- Data de criação formatada -->
                    <td style="padding:12px 16px; color:#888; font-size:13px">
                        {{ formatDate(entry.date_created) }}
                    </td>

                    <!-- Data de última atualização formatada -->
                    <td style="padding:12px 16px; color:#888; font-size:13px">
                        {{ formatDate(entry.last_update) }}
                    </td>

                    <td style="padding:12px 16px">
                        <div style="display:flex; align-items:center; gap:8px">

                            <!-- Exibe senha ou mascarado -->
                            <span style="font-family:monospace; font-size:13px">
                                {{ revealedIds?.has(entry.id) ? entry.password : '••••••••' }}
                            </span>

                            <!-- Botão de ação (mostrar/ocultar) -->
                            <button v-if="canActions" @click="revealedIds?.has(entry.id)
                                ? $emit('hide', entry.id)
                                : $emit('reveal', entry)"
                                style="background:none; border:none; cursor:pointer; font-size:12px; padding:4px; color:#053A9C; text-decoration:underline"
                                :title="revealedIds?.has(entry.id) ? 'Ocultar senha' : 'Ver senha'">
                                <!-- Texto no lugar do ícone -->
                                {{ revealedIds?.has(entry.id) ? 'Ocultar' : 'Ver' }}
                            </button>

                            <!-- Caso não tenha permissão -->
                            <span v-else style="font-size:12px; color:#999" title="Sem permissão">
                                Sem acesso
                            </span>

                        </div>
                    </td>


                    <!-- Coluna de ações -->
                    <td style="padding:12px 16px; text-align:right">

                        <!-- Caso o usuário NÃO tenha permissão -->
                        <span v-if="!canActions"
                            style="color:#aaa; font-size:12px; display:flex; align-items:center; gap:4px; justify-content:flex-end">
                            Restrito
                        </span>

                        <!-- Caso o usuário tenha permissão para ações -->
                        <div v-else style="display:flex; gap:6px; justify-content:flex-end">

                            <!-- Botão de editar -->
                            <!-- envia o objeto completo -->
                            <button @click="$emit('edit', entry)" style="background:none; border:1px solid #ddd; border-radius:6px; padding:5px 8px;
                                cursor:pointer; font-size:14px" title="Editar">
                                Editar
                            </button>

                            <!-- Botão de duplicar -->
                            <!-- envia apenas o ID -->
                            <button @click="$emit('duplicate', entry.id)" style="background:none; border:1px solid #ddd; border-radius:6px; padding:5px 8px;
                                cursor:pointer; font-size:14px" title="Duplicar">
                                Duplicar
                            </button>

                            <!-- Botão de excluir -->
                            <!-- envia apenas o ID -->
                            <button @click="$emit('delete', entry.id)" style="background:none; border:1px solid #fcc; border-radius:6px; padding:5px 8px;
                                cursor:pointer; font-size:14px" title="Excluir">
                                Excluir
                            </button>

                        </div>


                    </td>


                </tr>
            </tbody>
        </table>
    </div>
</template>