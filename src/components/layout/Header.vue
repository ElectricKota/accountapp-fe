<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import safeBack from '../../router/safeBack'
  import { useI18n } from 'vue-i18n'
  import { PhArrowBendUpLeft, PhSkipBack } from '@phosphor-icons/vue'

  const emits = defineEmits<{
    (e: 'new:openModal'): void
  }>()

  export interface Props {
    heading?: string
    actionButton?: string
    customBackLink?: string
    showLogout?: boolean
    userName?: string
  }

  defineProps<Props>()

  const { d, t } = useI18n()

  const route = useRoute()
  const router = useRouter()

  const isHome = computed(() => route.name === 'Home' || route.name === 'Dashboard')

  const goBack = () => {
    if (router) safeBack(router)
    else console.error('Router is not yet ready!')
  }

  const goCustom = () => {
    if (!customBackLink) {
      goBack()
    } else {
      if (router) router.push(customBackLink)
      else console.error('Router is not yet ready!')
    }
  }

  const emitAction = () => {
    emits('new:openModal')
  }

</script>
<template>
  <header class="w-full flex justify-between items-center gap-3  h-fit py-4 col-[container-breakout] ">
    <div class="min-w-24 flex items-center justify-start">
      <a
        v-if="isHome"
        href="#"
        class="x-link sm:md flex gap-1 items-center text-primary"
        @click="goCustom()"
      >
        <PhArrowBendUpLeft class="size-5 " />
        {{ t('back') }}
      </a>
      <span
        v-else
        class="link "
      >{{ customBackLink }}</span>
      <span
        v-if="userName"
        class="x-title text-primary "
      >{{ userName }}</span>
    </div>
    <h1
      v-if="heading"
      class="x-heading md sm:lg text-center"
    >
      {{ heading }}
    </h1>
    <div class="min-w-24 flex items-center justify-end">
      <a
        v-if="actionButton"
        class="x-link link__ico link__ico--plus"
        @click="emitAction()"
      >{{ actionButton }}</a>
      <div
        v-if="!showLogout"
        style="min-width:92px"
      ></div>
      <a
        href="/sign/out"
        class="x-link sm:md flex gap-1 items-center text-primary"
      >{{ t('logout') }}</a>
    </div>
  </header>
</template>
