<script setup lang="ts">

  import { PhUser } from '@phosphor-icons/vue'
  import LoginSwitcher from '@/components/LoginSwitcher.vue'
  import { ref } from 'vue'

  const activeTab = ref(0)
</script>
<template>
  <div class="flex h-screen justify-center items-center w-full">
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
      <div class="flex flex-col gap-4 w-full max-w-sm mt-4">
        <form class="x-form flex flex-col gap-6">
          <div
            class="x-control shadow-lg shadow-primary/10 hover:shadow-xl focus-within:shadow-xl focus-within:shadow-primary/20 transition-all"
          >
            <input
              type="email"
              placeholder=" "
              required
            >
            <label class=" text-dark/35">E-mail</label>
            <PhUser class="size-5 text-primary/60 me-auto" />
          </div>
          <transition>
            <div
              class="x-control shadow-lg shadow-primary/10 hover:shadow-xl focus-within:shadow-xl focus-within:shadow-primary/20 transition-all"
            >
              <input
                type="password"
                placeholder=" "
                required
              >
              <label class=" text-dark/35">Heslo</label>
              <PhUser class="size-5 text-primary/60 me-auto" />
            </div>
          </transition>

          <button
            type="submit"
            class="x-button bordered w-full accent-primary "
          >
            Přihlásit se
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
