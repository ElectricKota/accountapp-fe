<script setup lang="ts">

  import { ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import Header from '@/components/layout/Header.vue'
  import FooterNavigation from '@/components/layout/FooterNavigation.vue'
  import { NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput, NumberFieldRoot } from 'reka-ui'
  import { ListboxContent, ListboxGroup, ListboxGroupLabel, ListboxItem, ListboxItemIndicator, ListboxRoot } from 'reka-ui'
  import { PhCheck } from '@phosphor-icons/vue'

  const { t, n } = useI18n()

  const password = ref('')
  const passwordCheck = ref('')

  const matchCheck = ref(false as boolean)
  const charsCheck = ref(false as boolean)
  const lengthCheck = ref(false as boolean)
  const allValid = ref(false as boolean)

  const amount = ref(3870)

  watch([password, passwordCheck], ([newPass, newPassCheck]) => {
    // Kontrola shody hesel
    matchCheck.value = newPass === newPassCheck && newPass !== ''

    // Kontrola délky (min 5 znaků)
    lengthCheck.value = newPass.length >= 5

    // Kontrola číslic a speciálních znaků
    const hasNumber = /\d/.test(newPass)
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(newPass)
    charsCheck.value = hasNumber && hasSpecial
    allValid.value = matchCheck.value && lengthCheck.value && charsCheck.value
  })
  const fruits = [
    {
      name: 'Střih pánský',
      value: 350,
    },
    {
      name: 'Střih dámský dlouhý',
      value: 1300,
    },
    {
      name: 'Barva',
      value: 2500,
    },
  ]
  const vegetables = [
    {
      name: 'Nákup materiálu',
      value: 8900,
    },
    {
      name: 'Barvy',
      value: 1100,
    },
  ]
</script>

<template>
  <Header
    :heading="t('currently')"
    user-name="John Doe"
  />
  <div class="flex gap-2 my-6">
    <h2 class="x-heading md">
      Říjen
      <span :class="['font-normal', amount < 0 ? 'text-error' : 'text-success']">
        {{ $n(amount, 'currency') }}
      </span>
    </h2>
  </div>
  <div class="flex gap-2 end-full aspect-video items-center justify-center bg-gray-200 col-[container-full] my-4">
    Tady bude graf
  </div>

  <div class="flex flex-col w-full">
    <form
      class="quick-insert quick"
    >
      <input
        type="text"
        required
        :placeholder="'Název položky'"
      >
      <input
        type="text"
        placeholder="Popisek položky"
      >
      <br>
      <ListboxRoot
        class=" flex flex-col rounded-lg shadow-sm border dark:border-stone-900 overflow-hidden bg-primary/30 text-grass9 mx-auto "
        orientation="horizontal"
      >
        <ListboxContent class="p-[5px] w-48 h-72 overflow-auto">
          <ListboxGroup>
            <ListboxGroupLabel class="px-[25px] text-xs leading-[25px] text-mauve11">
              Náklady
            </ListboxGroupLabel>
            <ListboxItem
              v-for="(item, i) in fruits"
              :key="item"
              :value="item"
              class="w-full flex items-center px-[25px] h-[25px] leading-none text-xs relative text-grass9 select-none outline-none data-[highlighted]:ring-grass9 data-[highlighted]:ring-1 focus:ring-grass9 focus:ring-1  data-[state=checked]:bg-grass9 data-[state=checked]:text-white data-[disabled]:opacity-50 rounded"
            >
              <ListboxItemIndicator
                class="absolute left-0 w-[25px] inline-flex items-center justify-center"
              >
                <PhCheck class="size-5 text-success" />
              </ListboxItemIndicator>
              <span>{{ item.name }} - {{ n(item.value, 'currency') }}</span>
            </ListboxItem>
          </ListboxGroup>

          <ListboxGroup class="mt-2">
            <ListboxGroupLabel class="px-[25px] text-xs leading-[25px] text-mauve11">
              Náklady
            </ListboxGroupLabel>
            <ListboxItem
              v-for="(item, i) in vegetables"
              :key="item"
              :value="item"
              class="w-full flex items-center px-[25px] h-[25px] leading-none text-xs relative text-grass9 select-none outline-none data-[highlighted]:ring-grass9 data-[highlighted]:ring-1 focus:ring-grass9 focus:ring-1  data-[state=checked]:bg-grass9 data-[state=checked]:text-white data-[disabled]:opacity-50 rounded"
            >
              <ListboxItemIndicator
                class="absolute left-0 w-[25px] inline-flex items-center justify-center"
              >
                <PhCheck class="size-5 text-success" />
              </ListboxItemIndicator>
              <span>{{ item.name }} - {{ n(item.value, 'currency') }}</span>
            </ListboxItem>
          </ListboxGroup>
        </ListboxContent>
      </ListboxRoot>
      tady spinner
      <hr>
      <br>
      <NumberFieldRoot
        id="age"
        class="w-full flex gap-2 items-center"
        :step="100"
        locale="cs-CZ"
        :format-options="{

          style: 'currency',
          currency: 'CZK',
          currencyDisplay: 'symbol'
        }"
        :default-value="18"
      >
        <label
          for="age"
          class="text-stone-700 dark:text-white"
        >
          Age
        </label>
        <div class="mt-1 flex items-center border bg-white hover:bg-stone-50 rounded-lg shadow-sm h-9 focus-within:shadow-[0_0_0_2px] focus-within:shadow-stone-800">
          <NumberFieldDecrement class="p-2 disabled:opacity-20">
            -
          </NumberFieldDecrement>
          <NumberFieldInput class="bg-transparent w-20 tabular-nums text-center focus:outline-0 p-1 w-fit" />
          <NumberFieldIncrement class="p-2 disabled:opacity-20">
            +
          </NumberFieldIncrement>
        </div>
      </NumberFieldRoot>
      <br>
      <br>
      tyd input
      <hr>
      <input
        type="submit"
        :value="`Vložit částku`"
      >
    </form>
  </div>

  <FooterNavigation />
</template>
