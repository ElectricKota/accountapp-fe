<script setup lang="ts">

  import { ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import Header from '@/components/layout/Header.vue'

  const { t } = useI18n()

  const password = ref('')
  const passwordCheck = ref('')

  const matchCheck = ref(false as boolean)
  const charsCheck = ref(false as boolean)
  const lengthCheck = ref(false as boolean)
  const allValid = ref(false as boolean)

  watch([password, passwordCheck], ([newPass, newPassCheck]) => {
    // Kontrola shody hesel
    matchCheck.value = newPass === newPassCheck && newPass !== ''

    // Kontrola délky (min 5 znaků)
    lengthCheck.value = newPass.length >= 5

    // Kontrola číslic a speciálních znaků
    const hasNumber = /\d/.test(newPass)
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(newPass)
    charsCheck.value = hasNumber && hasSpecial
    allValid.value = matchCheck.value && lengthCheck.value && charsCheck.value
  })
</script>
<template>
  <Header
    :heading="t('currently')"
    user-name="John Doe"
  />

  <main class="x-main w-full bg-red-100 p-4">
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </main>

  <footer>Here's some contact info</footer>
</template>
