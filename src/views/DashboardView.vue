<script setup lang="ts">

  import { ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import Header from '@/components/layout/Header.vue'
  import FooterNavigation from '@/components/layout/FooterNavigation.vue'

  const { t, n } = useI18n()

  const password = ref('')
  const passwordCheck = ref('')

  const matchCheck = ref(false as boolean)
  const charsCheck = ref(false as boolean)
  const lengthCheck = ref(false as boolean)
  const allValid = ref(false as boolean)

  const amount = ref(3870)

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
  <div class="flex gap-2 my-6">
    <h2 class="x-heading md">
      Říjen
      <span :class="['font-normal', amount < 0 ? 'text-error' : 'text-success']">
        {{ $n(amount, 'currency') }}
      </span>
    </h2>
  </div>
  <div class="flex gap-2 end-full aspect-square items-center justify-center bg-gray-200 col-[container-full] my-4">
    Tady bude graf
  </div>

  <FooterNavigation />
</template>
