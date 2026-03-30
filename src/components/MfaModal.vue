<script setup>
// Importa o ref para criar estados reativos
import { ref } from 'vue'

// Define as props recebidas pelo componente (dados do usuário)
const props = defineProps({ entry: Object })

// Define os eventos que o componente pode emitir
const emit = defineEmits(['confirm', 'close'])

// Estado para armazenar o código digitado
const code = ref('')

// Estado para armazenar mensagem de erro
const error = ref('')

// Função chamada ao clicar em verificar ou pressionar Enter
function submit() {
    // Validação simples: exige pelo menos 4 dígitos
    if (code.value.length < 4) {
        error.value = 'Digite pelo menos 4 dígitos'
        return
    }

    // Se passar na validação, emite evento de confirmação
    emit('confirm')
}
</script>

<template>
    <!-- Overlay (fundo escuro) -->
    <!-- Fecha ao clicar fora do modal -->
    <div style="position:fixed;inset:0;background:rgba(0,6,15,.55);display:flex;align-items:center;justify-content:center;z-index:200"
        @click.self="emit('close')">
        <!-- Caixa do modal -->
        <div
            style="background:#FCFCFC;border-radius:14px;padding:28px;width:100%;max-width:380px;box-shadow:0 8px 32px rgba(0,0,0,.25)">

            <!-- Título -->
            <h3 style="margin-bottom:8px; color:#00060F">Verificação MFA</h3>

            <!-- Descrição -->
            <p style="color:#888; font-size:13px; margin-bottom:20px">
                Informe o código para ver a senha de <strong>{{ entry?.username }}</strong>
            </p>

            <!-- Campo de input do código -->
            <!-- v-model="code" ->   Ligação reativa com o estado -->
            <!-- inputmode="numeric" -> Sugere teclado numérico no mobile -->
            <!-- maxlength="8" -> Limite máximo de caracteres -->
            <!-- @keyup.enter="submit" -> Envia ao pressionar Enter -->
            <input v-model="code" type="text" inputmode="numeric" maxlength="8" placeholder="0 0 0 0" autofocus
                @keyup.enter="submit"
                style="width:100%; padding:14px; font-size:22px; text-align:center; letter-spacing:.25em; border:2px solid #ddd; border-radius:8px; font-family:monospace; box-sizing:border-box; outline:none" />

            <!-- Mensagem de erro (caso exista) -->
            <p v-if="error" style="color:red; font-size:12px; margin-top:6px">
                {{ error }}
            </p>

            <!-- Texto informativo -->
            <p style="color:#bbb; font-size:12px; margin-top:8px">
                Simulação: qualquer código com 4+ dígitos é aceito
            </p>

            <!-- Botões de ação -->
            <div style="display:flex; gap:10px; margin-top:22px; justify-content:flex-end">

                <!-- Botão cancelar -->
                <button @click="emit('close')"
                    style="padding:9px 20px; border:1.5px solid #ddd; border-radius:6px; cursor:pointer; background:white; font-size:14px">
                    Cancelar
                </button>

                <!-- Botão verificar -->
                <button @click="submit"
                    style="background:#053A9C; color:white; border:none; padding:9px 20px; border-radius:6px; cursor:pointer; font-weight:bold; font-size:14px">
                    Verificar
                </button>
            </div>
        </div>
    </div>
</template>
