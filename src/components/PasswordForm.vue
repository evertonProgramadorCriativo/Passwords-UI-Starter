<script setup>
import { ref } from 'vue'

// Recebe dados da credencial (para edição)
const props = defineProps({ entry: Object })

// Eventos emitidos pelo componente
const emit = defineEmits(['submit', 'close'])

// Verifica se está editando ou criando
const isEdit = !!props.entry

// Lista de sites disponíveis
const SITES = ['AWS', 'Azure', 'GCP', 'Jira', 'GitHub', 'GitLab', 'Slack', 'VPN', 'Banco Interno', 'ERP', 'CRM']

// Estado do formulário (preenche se for edição)
const form = ref({
    username: props.entry?.username || '',
    site: props.entry?.site || '',
    password: props.entry?.password || '',
    owner: props.entry?.owner || '',
})

// Estado de erros
const errors = ref({})

// Validação do formulário
function validate() {
    errors.value = {}

    if (!form.value.username.trim()) errors.value.username = 'Obrigatório'
    if (!form.value.site) errors.value.site = 'Obrigatório'
    if (!form.value.password.trim()) errors.value.password = 'Obrigatório'
    if (!form.value.owner.trim()) errors.value.owner = 'Obrigatório'

    return Object.keys(errors.value).length === 0
}

// Envio do formulário
function submit() {
    if (!validate()) return
    emit('submit', { ...form.value })
}
</script>

<template>
    <!-- Overlay -->
    <div style="position:fixed;inset:0;background:rgba(0,6,15,.55);display:flex;align-items:center;justify-content:center;z-index:200"
        @click.self="emit('close')">
        <!-- Modal -->
        <div
            style="background:#FCFCFC;border-radius:14px;padding:28px;width:100%;max-width:420px;box-shadow:0 8px 32px rgba(0,0,0,.25)">

            <!-- Título  -->
            <h3 style="margin-bottom:20px; color:#00060F">
                {{ isEdit ? 'Editar credencial' : 'Nova credencial' }}
            </h3>

            <!-- Formulário -->
            <div style="display:flex; flex-direction:column; gap:14px">

                <!-- Inputs padrão -->
                <div v-for="(label, key) in { username: 'Usuário', owner: 'Owner', password: 'Senha' }" :key="key">

                    <label
                        style="font-size:12px;font-weight:700;display:block;margin-bottom:4px;color:#666;text-transform:uppercase;letter-spacing:.05em">
                        {{ label }}
                    </label>

                    <input v-model="form[key]" :type="key === 'password' ? 'text' : 'text'"
                        style="width:100%;padding:9px 12px;border:1.5px solid #ddd;border-radius:6px;font-size:14px;box-sizing:border-box;outline:none;font-family:inherit"
                        :style="{ borderColor: errors[key] ? 'red' : '#ddd' }" />

                    <!-- Erro -->
                    <span v-if="errors[key]" style="color:red;font-size:12px">
                        {{ errors[key] }}
                    </span>
                </div>

                <!-- Select de site -->
                <div>
                    <label
                        style="font-size:12px;font-weight:700;display:block;margin-bottom:4px;color:#666;text-transform:uppercase;letter-spacing:.05em">
                        Site
                    </label>

                    <select v-model="form.site"
                        style="width:100%;padding:9px 12px;border:1.5px solid #ddd;border-radius:6px;font-size:14px;box-sizing:border-box;background:white;font-family:inherit"
                        :style="{ borderColor: errors.site ? 'red' : '#ddd' }">
                        <option value="" disabled>Selecione...</option>
                        <option v-for="s in SITES" :key="s">{{ s }}</option>
                    </select>

                    <!-- Erro -->
                    <span v-if="errors.site" style="color:red;font-size:12px">
                        {{ errors.site }}
                    </span>
                </div>
            </div>

            <!-- Botões -->
            <div style="display:flex;gap:10px;margin-top:24px;justify-content:flex-end">

                <button @click="emit('close')"
                    style="padding:9px 20px;border:1.5px solid #ddd;border-radius:6px;cursor:pointer;background:white;font-size:14px">
                    Cancelar
                </button>

                <button @click="submit"
                    style="background:#053A9C;color:white;border:none;padding:9px 20px;border-radius:6px;cursor:pointer;font-weight:bold;font-size:14px">
                    {{ isEdit ? 'Salvar' : 'Criar' }}
                </button>

            </div>
        </div>
    </div>
</template>
