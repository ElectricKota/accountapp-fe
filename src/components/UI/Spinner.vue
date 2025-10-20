<script setup lang="ts">
  import { onMounted, ref, watchEffect } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { numberFormats } from '@/utils/localeSetting.ts'
  import { PhCaretDown, PhCaretUp } from '@phosphor-icons/vue'

  const props = withDefaults(defineProps<{
    modelValue: number
    placeholder?: string
    step?: number
    required?: boolean
    integerOnly?: boolean
    readOnly?: boolean
    min?: number
    max?: number
  }>(), {
    placeholder: '',
    required: false,
    readOnly: false,
    step: 1,
    max: 1000000000,
    min: -1000000000,
  })

  const { n } = useI18n()

  const sizeOfStep = ref(1)
  let inputStepSize = 0.001
  let placeholderState = false
  let placeholderValue = ''
  const input = ref<HTMLInputElement | null>(null)
  const isShiftPressed = ref(false)

  onMounted(() => {
    updateState()
    window.addEventListener('keydown', handleKeydown)
    window.addEventListener('keyup', handleKeyup)
  })
  const updateState = () => {
    if (props.integerOnly) inputStepSize = 1
    if (props.step) sizeOfStep.value = props.step
    if (props.placeholder) {
      placeholderValue = props.placeholder
      placeholderState = true
    }
  }

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Shift') {
      isShiftPressed.value = true
      sizeOfStep.value = props.step * 100 // Zvětšení kroků, když je Shift stisknutý
    }
    if (event.key === 'Control') {
      isShiftPressed.value = true
      sizeOfStep.value = props.step * 10 // Zvětšení kroků, když je Shift stisknutý
    }
    if (event.key === 'Alt') {
      isShiftPressed.value = true
      sizeOfStep.value = 1 // Zvětšení kroků, když je Shift stisknutý
    }
  }

  const handleKeyup = (event: KeyboardEvent) => {
    if (event.key === 'Shift' || event.key === 'Control' || event.key === 'Alt') {
      isShiftPressed.value = false
      sizeOfStep.value = props.step // Vrácení kroků na původní hodnotu
    }
  }
  const emits = defineEmits<{
    (e: 'update:modelValue', value: number): void
    (e: 'onchange'): void // emituje jen změnu pro hooknutí na rodiči
  }>()

  const emitChange = (value: number) => {
    emits('update:modelValue', value)
    emits('onchange')
  }

  function compute(add: boolean = true) {
    if (!input.value) return
    let value = Number(input.value.value)
    if (add) {
      value = value + sizeOfStep.value
      if (value > props.max) value = props.max
    } else {
      value -= sizeOfStep.value
      if (value < props.min) value = props.min
    }
    value = parseFloat(value.toFixed(3))// fix pokud by přičítaná hodnota byla plavoucí
    emitChange(value)
  }

  watchEffect(() => { //* Hlídá změny v reactivních datech a aktualizuje vyfiltrovaná data o změny
    updateState()
  })
</script>
<template>
  <div :class="{ ' hover': true, 'spinner--read-only': readOnly }">
    <input
      ref="input"
      type="number"
      :class="{ 'border ': true, 'spinner__input--read-only': readOnly }"
      :value="modelValue"
      :required="required"
      :step="inputStepSize"
      inputmode="numeric"
      placeholder=" "
      :readonly="readOnly"
      :min="min"
      :max="max"
      @input="emitChange($event.target.value)"
    >
    <span class="spinner__valute">{{ n(0,'currency') }}</span>
    <button
      v-if="!readOnly"
      type="button"
      class="spinner__btn spinner__btn--up"
      @click="compute(true)"
    >
      <PhCaretUp class="size-4" />
    </button>
    <button
      v-if="!readOnly"
      type="button"
      class="spinner__btn spinner__btn--down"
      @click="compute(false)"
    >
      <PhCaretDown class="size-4" />
    </button>
    <div
      v-if="placeholderState"
      class="hover__hint"
    >
      {{ placeholderValue }}
    </div>
  </div>
</template>
