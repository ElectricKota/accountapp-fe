<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import DefaultLayout from './layouts/DefaultLayout.vue'
  import EmptyLayout from './layouts/EmptyLayout.vue'

  const route = useRoute()

  const layouts = {
    DefaultLayout,
    EmptyLayout,
  }

  const layoutComponent = computed(() => {
    if (!route || !route.meta) {
      return EmptyLayout
    }

    const layoutName = route.meta.layout || 'EmptyLayout'
    return layouts[layoutName as keyof typeof layouts] || EmptyLayout
  })

</script>

<template>
  <component :is="layoutComponent">
    <RouterView />
  </component>
</template>
