<script setup lang="ts">

  import { PhUser } from '@phosphor-icons/vue'
  import LoginSwitcher from '@/components/LoginSwitcher.vue'
</script>
<template>
  <div class="flex h-screen justify-center items-center w-full">
    <div
      class="grid grid-cols-container w-full"
      style="--container-width: 24rem"
    >
      <LoginSwitcher />
      <div class="flex flex-col gap-4 w-full max-w-sm ">
        <form class="x-form flex flex-col gap-6">
          <div
            class="x-control shadow-lg shadow-primary/10 hover:shadow-xl focus-within:shadow-primary/20 transition-all"
          >
            <input
              type="email"
              placeholder=" "
              required
            >
            <label class=" text-dark/35">E-mail</label>
            <PhUser class="size-5 text-primary/60 me-auto" />
          </div>
          <div class="x-control">
            <label>Heslo</label>
            <input
              type="password"
              placeholder=" "
            >
          </div>
        </form>

        <button
          type="submit"
          class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Přihlásit se
        </button>

        <div class="flex justify-between text-sm mt-2">
          <a
            href="#"
            class="text-blue-500 hover:underline"
          >Zapomenuté heslo?</a>
          <a
            href="#"
            class="text-blue-500 hover:underline"
          >Registrace</a>
        </div>
      </div>
    </div>
  </div>
</template>
