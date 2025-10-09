import { createI18n, type I18nOptions } from 'vue-i18n'

export const browserLocale = navigator.language.split('-')[0] || 'cs'

export const i18n = createI18n({
  legacy: false, // zapnout Composition API
  locale: browserLocale, // výchozí jazyk
  fallbackLocale: 'cs',
  globalInjection: true,
  messages: {}, // začneme bez zpráv, načteme je dynamicky
} as I18nOptions)

export async function setLocale(locale: string) {
  const messages = await import(`../locales/${locale}.json`)
  i18n.global.setLocaleMessage(locale, messages.default)
  i18n.global.locale.value = locale
}
