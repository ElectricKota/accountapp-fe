<script setup lang="ts">

  import { PhCheckCircle, PhCross, PhKey, PhLockKey, PhPassword, PhUser, PhXCircle } from '@phosphor-icons/vue'
  import LoginSwitcher from '@/components/LoginSwitcher.vue'
  import { ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useLoginMutation } from '@/mutations/login.ts'
  import { useAuthStore } from '@/stores/auth.ts'

  const { t } = useI18n()
  const { mutateAsync: authLogin } = useLoginMutation()

  const login = ref({
    email: '' as string,
    password: '' as string,
    keepLogged: true as boolean,
  })

  const password = ref('')
  const passwordCheck = ref('')

  const activeTab = ref(0 as number)
  const matchCheck = ref(false as boolean)
  const charsCheck = ref(false as boolean)
  const lenghtCheck = ref(false as boolean)
  const allValid = ref(false as boolean)

  const handleLogin = async () => {
    try {
      const authStore = useAuthStore()
      // Posíláme body přesně tak, jak to mutation očekává
      const body = {
        username: login.value.email,
        password: login.value.password,
        keepLogged: login.value.keepLogged,
      }

      const response = await authLogin(body) // tady používáme tvou mutation
      console.log(response, 'response')
      if (response && response?.token) {
        authStore.login(response?.token, response?.user)

        // případně redirect nebo jiné akce po přihlášení
      } else {
        console.log('Neplatné přihlašovací údaje.')
      }
    } catch (err: any) {
      console.error(err.message || 'Chyba při přihlášení.')
    }
  }

  watch([password, passwordCheck], ([newPass, newPassCheck]) => {
    // Kontrola shody hesel
    matchCheck.value = newPass === newPassCheck && newPass !== ''

    // Kontrola délky (min 5 znaků)
    lenghtCheck.value = newPass.length >= 5

    // Kontrola číslic a speciálních znaků
    const hasNumber = /\d/.test(newPass)
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(newPass)
    charsCheck.value = hasNumber && hasSpecial
    allValid.value = matchCheck.value && lenghtCheck.value && charsCheck.value
  })
</script>
<template>
  <div class="x-login flex h-screen justify-center items-start w-full pt-[5dvh]">
    <div
      class="grid grid-cols-container w-full"
      style="--container-width: 24rem"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 550.667 550.667"
        preserveAspectRatio="xMidYMid meet"
        class="max-sm:size-28 sm:size-32 md:size-40 pr-2 object-contain opacity-0 animate-[fade-in_900ms_0ms_ease-in_forwards] text-primary mx-auto"
      >
        <use href="#logo-cup-solid" />
      </svg>
      <h1 class="x-heading logo animate-[slide-in_700ms_200ms_forwards] opacity-0 text-center mx-auto mb-10">
        AccountApp
      </h1>
      <LoginSwitcher v-model:active="activeTab" />
      <div class="flex flex-col gap-4 w-full max-w-sm mt-4 relative mb-10">
        <transition
          mode="out-in"
          enter-from-class="translate-x-5 opacity-0 scale-80 blur-sm"
          enter-active-class="transition-all duration-300 ease"
          enter-to-class="translate-x-0 opacity-100 scale-100 blur-0"
          leave-from-class="translate-x-0 opacity-100 blur-0"
          leave-active-class="transition-all duration-500 ease"
          leave-to-class="-translate-x-5 opacity-0 scale-80 blur-sm"
        >
          <form
            v-if="activeTab === 0"
            key="login"
            class="x-form flex flex-col gap-6 absolute inset-0 h-fit pb-8"
          >
            <div
              class="x-control shadow-lg shadow-primary/10 hover:shadow-xl focus-within:shadow-xl focus-within:shadow-primary/20 transition-all "
            >
              <input
                v-model="login.email"

                type="email"
                placeholder=" "
                required
              >
              <label class=" text-dark/35">{{ t('e-mail') }}</label>
              <PhUser class="size-5 text-primary/60 me-auto" />
            </div>

            <div
              class="x-control shadow-lg shadow-primary/10 hover:shadow-xl focus-within:shadow-xl focus-within:shadow-primary/20 transition-all"
            >
              <input
                v-model="login.password"

                type="password"
                placeholder=" "
                required
              >
              <label class=" text-dark/35">{{ t('password') }}</label>
              <PhKey class="size-5 text-primary/60 me-auto" />
            </div>
            <label class="x-check flex items-center">
              <input
                v-model="login.keepLogged"
                type="checkbox"
                class="size-5"
                checked
              >
              {{ t('keepLogged') }}
            </label>

            <button
              type="button"
              class="x-button bordered w-full"
              @click="handleLogin"
            >
              {{ t('logIn') }}
            </button>
          </form>
        </transition>
        <transition
          mode="out-in"
          enter-from-class="translate-x-5 opacity-0 scale-80 blur-sm"
          enter-active-class="transition-all duration-300 ease"
          enter-to-class="translate-x-0 opacity-100 scale-100 blur-0"
          leave-from-class="translate-x-0 opacity-100 blur-0"
          leave-active-class="transition-all duration-500 ease"
          leave-to-class="-translate-x-5 opacity-0 scale-80 blur-sm"
        >
          <form
            v-if="activeTab === 1"
            key="recovery"
            class="x-form flex flex-col gap-6 absolute inset-0 h-fit pb-8"
          >
            <div
              class="x-control shadow-lg shadow-primary/10 hover:shadow-xl focus-within:shadow-xl focus-within:shadow-primary/20 transition-all "
            >
              <input
                type="email"
                placeholder=" "
                required
              >
              <label class=" text-dark/35">{{ t('e-mail') }}</label>
              <PhUser class="size-5 text-primary/60 me-auto" />
            </div>
            <button
              type="button"
              class="x-button bordered w-full"
            >
              {{ t('sendRecoveryMail') }}
            </button>
          </form>
        </transition>

        <transition
          mode="out-in"
          enter-from-class="translate-x-5 opacity-0 scale-80 blur-sm"
          enter-active-class="transition-all duration-300 ease"
          enter-to-class="translate-x-0 opacity-100 scale-100 blur-0"
          leave-from-class="translate-x-0 opacity-100 blur-0"
          leave-active-class="transition-all duration-500 ease"
          leave-to-class="-translate-x-5 opacity-0 scale-80 blur-sm"
        >
          <form
            v-if="activeTab === 2"
            key="recovery"
            class="x-form flex flex-col gap-6 absolute inset-0 h-fit pb-8"
          >
            <div
              class="x-control shadow-lg shadow-primary/10 hover:shadow-xl focus-within:shadow-xl focus-within:shadow-primary/20 transition-all "
            >
              <input
                type="email"
                placeholder=" "
                required
              >
              <label class=" text-dark/35">{{ t('e-mail') }}</label>
              <PhUser class="size-5 text-primary/60 me-auto" />
            </div>

            <div class="p-2 border border-primary/15 rounded-lg flex flex-col gap-4">
              <div
                class="x-control shadow-lg shadow-primary/10 hover:shadow-xl focus-within:shadow-xl focus-within:shadow-primary/20 transition-all "
              >
                <input
                  v-model="password"
                  type="password"
                  placeholder=" "
                  minlength="5"
                  required
                >
                <label class=" text-dark/35">{{ t('password') }}</label>
                <PhLockKey class="size-5 text-primary/60 me-auto" />
              </div>
              <div
                class="x-control shadow-lg shadow-primary/10 hover:shadow-xl focus-within:shadow-xl focus-within:shadow-primary/20 transition-all "
              >
                <input
                  v-model="passwordCheck"
                  type="password"
                  placeholder=" "
                  minlength="5"
                  required
                >
                <label class=" text-dark/35">{{ t('passwordCheck') }}</label>
                <PhLockKey class="size-5 text-primary/60 me-auto" />
              </div>
              <div class=" flex flex-col gap-3 p-2">
                <div class=" flex gap-2 items-center x-title">
                  <transition
                    mode="out-in"
                    enter-from-class="translate-x-2 opacity-0 blur-sm"
                    enter-active-class="transition-all duration-300 ease"
                    enter-to-class="translate-x-0 opacity-100 scale-100 blur-0"
                    leave-from-class="translate-x-0 opacity-100 blur-0"
                    leave-active-class="transition-all duration-300 ease"
                    leave-to-class="-translate-x-2 opacity-0 blur-sm"
                  >
                    <PhCheckCircle
                      v-if="matchCheck"
                      class="size-5 text-success"
                    />
                    <PhXCircle
                      v-else
                      class="size-5 text-error"
                    />
                  </transition>
                  {{ t('passwordsMustMatch') }}
                </div>
                <div class="x-check flex gap-2 items-center x-title">
                  <transition
                    mode="out-in"
                    enter-from-class="translate-x-2 opacity-0 blur-sm"
                    enter-active-class="transition-all duration-300 ease"
                    enter-to-class="translate-x-0 opacity-100 scale-100 blur-0"
                    leave-from-class="translate-x-0 opacity-100 blur-0"
                    leave-active-class="transition-all duration-300 ease"
                    leave-to-class="-translate-x-2 opacity-0 blur-sm"
                  >
                    <PhCheckCircle
                      v-if="lenghtCheck"
                      class="size-5 text-success"
                    />
                    <PhXCircle
                      v-else
                      class="size-5 text-error"
                    />
                  </transition>
                  {{ t('passwordRequiredLength') }}
                </div>
                <div class="x-check flex gap-2 items-center x-title">
                  <transition
                    mode="out-in"
                    enter-from-class="translate-x-2 opacity-0 blur-sm"
                    enter-active-class="transition-all duration-300 ease"
                    enter-to-class="translate-x-0 opacity-100 scale-100 blur-0"
                    leave-from-class="translate-x-0 opacity-100 blur-0"
                    leave-active-class="transition-all duration-300 ease"
                    leave-to-class="-translate-x-2 opacity-0 blur-sm"
                  >
                    <PhCheckCircle
                      v-if="charsCheck"
                      class="size-5 text-success"
                    />
                    <PhXCircle
                      v-else
                      class="size-5 text-error"
                    />
                  </transition>
                  {{ t('passwordRequiresNumberAndSpecialChars') }}
                </div>
              </div>
            </div>

            <button
              type="button"
              class="x-button bordered w-full"
              :disabled="!allValid"
            >
              {{ t('sendRecoveryMail') }}
            </button>
          </form>
        </transition>
      </div>
    </div>
  </div>
</template>
