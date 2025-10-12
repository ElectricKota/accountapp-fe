<script setup lang="ts">
  import { computed } from 'vue'
  import Icons from './components/Icons.vue'
  import { useRoute } from 'vue-router'
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
    <template #default>
      <router-view />
    </template>
  </component>
  <Icons />
</template>
