<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { PhAlarm, PhGearSix, PhHouse, PhListMagnifyingGlass } from '@phosphor-icons/vue'
  import { RouterLink } from 'vue-router'

  const { t } = useI18n()

  const buttons = [
    {
      name: t('welcome'),
      icon: PhHouse,
      link: '/',
      current: 'page',
      type: RouterLink,

    }, {
      name: t('repeating'),
      icon: PhAlarm,
      link: '/repeating',
      current: 'none',
      type: RouterLink,

    }, {
      name: t('Overview'),
      icon: PhListMagnifyingGlass,
      link: '/overview',
      current: 'none',
      type: RouterLink,
    },
  ]
</script>
<template>
  <div class="w-full col-[container-breakout] grid grid-cols-4 mt-auto py-4 gap-3">
    <RouterLink
      :is="item.type"
      v-for="item in buttons"
      :key="item.name"
      :to="item.link"
      class="x-title sm flex w-full h-16 aspect-square transition-all duration-300 flex-col items-center justify-center gap-1.5 p-1 rounded-lg bg-gray-100 aria-[current=page]:bg-primary aria-[current=page]:text-light"
      :aria-current="item.current"
    >
      <component
        :is="item.icon"
        class="size-6 shrink-0"
      />
      {{ item.name }}
    </RouterLink>

    <Button
      class="x-title sm flex w-full h-16 aspect-square transition-all duration-300 flex-col items-center justify-center gap-1.5 p-1 rounded-lg bg-gray-100 aria-[current=page]:bg-primary aria-[current=page]:text-light"
    >
      <PhGearSix
        class="size-6 shrink-0"
      />
      {{ t('settings') }}
    </Button>
  </div>
</template>
