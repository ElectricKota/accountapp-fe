<script setup lang="ts">

</script>

<template>
  <main class="grid grid-cols-container min-h-screen w-full">
    <router-view v-slot="{ Component }">
      <transition
        enter-active-class="transition-opacity duration-500 ease-in-out"
        leave-active-class="transition-opacity duration-300 ease-in-out"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </router-view>
    <!-- Slot zůstává funkční -->
  </main>
</template>
