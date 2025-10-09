<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { ref } from 'vue'
  const { messages, locale } = useI18n()
  console.log('Messages for locale', locale.value, messages.value)
  const { t } = useI18n()
  const emit = defineEmits(['update:active'])
  const buttons = [
    t('login'),
    t('registration'),
    t('forgottenPassword'),
  ]
  const activeIndex = ref(0)
  const next = () => {
    activeIndex.value = (activeIndex.value + 1) % 3
    emit('update:active', activeIndex.value)
  }

</script>

<template>
  <button
    class="x-login-switcher w-full h-40 relative"
    @click="next()"
  >
    <div
      v-for="(button, index) in buttons"
      :key="index"
      :class="[
        'x-heading font-black xl transition-all duration-800 absolute left-1/2 top-1/2 -translate-1/2 uppercase w-full transform-gpu animate-[float-loop_1s_infinite_linear]',
        activeIndex === index ? 'active text-primary z-5 scale-100' : ' absolute  uppercase font-bold z-2 ',
        (activeIndex + 1)%3 === index ? 'second top-26 blur-[2px] opacity-90 scale-90 z-3' : '',
        (activeIndex + 2)%3 === index ? 'third top-32 blur-[3px] opacity-75 scale-75 z-2 ' : '',
      ]"
    >
      {{ button }}
      <!--      animate-[float-loop_10s_infinite_linear]-->
    </div>
  </button>
</template>
