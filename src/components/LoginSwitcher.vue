<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { ref } from 'vue'

  const { t } = useI18n()
  const emit = defineEmits(['update:active'])
  const buttons = [
    t('login'),
    t('forgottenPassword'),
    t('registration'),
  ]
  const activeIndex = ref(0 as number)
  const next = () => {
    activeIndex.value = (activeIndex.value + 1) % 3
    emit('update:active', activeIndex.value)
  }

</script>

<template>
  <button
    class="x-login-switcher w-full h-32 relative rounded-lg"
    @click="next()"
  >
    <div
      v-for="(button, index) in buttons"
      :key="index"
      :class="[
        'x-heading xl text-center transition-all duration-800 absolute left-1/2 top-1/2 -translate-1/2 uppercase w-full transform-gpu animate-[float-loop_1s_infinite_linear]',
        activeIndex === index ? 'active text-primary z-5 scale-100 font-[750]' : ' absolute  uppercase font-bold z-2 ',
        (activeIndex + 1)%3 === index ? 'second top-26 blur-[3px] opacity-70 scale-85 z-3 font-[650]' : '',
        (activeIndex + 2)%3 === index ? 'third top-32 blur-[4px] opacity-55 scale-75 z-2 font-[400]' : '',
      ]"
    >
      {{ button }}
      <!--      animate-[float-loop_10s_infinite_linear]-->
    </div>
  </button>
</template>
