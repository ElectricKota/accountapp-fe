<script setup lang="ts">

  import { PhUser } from '@phosphor-icons/vue'
</script>
<template>
  <div class="flex h-screen justify-center items-center w-full">
    <div
      class="grid grid-cols-container w-full"
      style="--container-width: 24rem"
    >
      <div class="flex gap-30 overflow-auto snap-mandatory snap-x max-w-full col-[container-full] px-[calc(((var(--container-breakout-width)-var(--container-width)-3rem)/4))] scroll-pl-[calc(((var(--container-breakout-width)-var(--container-width)-3rem)/4))] ">
        <span class="x-heading lg text-primary/40 uppercase snap-center font-bold mb-10 tracking-[-0,048rem] min-w-[calc(70vw-((var(--container-breakout-width)-var(--container-width)-3rem)/4))]">
          Přihlášení
        </span>
        <span class="x-heading lg text-dark/15 uppercase snap-center font-bold mb-10 tracking-[-0,048rem] min-w-[calc(70vw-((var(--container-breakout-width)-var(--container-width)-3rem)/4))]">

          Registrace
        </span>
        <span class="x-heading lg text-dark/15 uppercase snap-center font-bold mb-10 tracking-[-0,048rem] min-w-[calc(70vw-((var(--container-breakout-width)-var(--container-width)-3rem)/4))]">

          Zapomenuté heslo
        </span>
      </div>
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
