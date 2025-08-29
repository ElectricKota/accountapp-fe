<template>
  <div class="grid grid-cols-container min-h-screen w-full">
    <!-- Layout pro přihlášenou aplikaci -->
    <main class="border border-b-emerald-300">
      <slot></slot>
    </main>
    <nav class="navbar border border-r-fuchsia-300">
      <!-- Tvoje navigace -->
    </nav>
  </div>
</template>
<script setup lang="ts">
</script>
