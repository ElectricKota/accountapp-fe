import { createI18n, type I18nOptions } from 'vue-i18n'

export const browserLocale = navigator.language.split('-')[0] || 'cs'

const numberFormatTypes = {
  decimal: {
    style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2,
  },
  withoutFraction: {
    style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0,
  },
  oneFraction: {
    style: 'decimal', minimumFractionDigits: 1, maximumFractionDigits: 1,
  },
  percent: {
    style: 'percent', useGrouping: false,
  },
}

export const numberFormats = {
  cs: {
    ...numberFormatTypes,
    currency: {
      style: 'currency',
      currency: 'CZK',
      notation: 'standard',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
  },
  en: {
    ...numberFormatTypes,
    currency: {
      style: 'currency',
      currency: 'USD',
      notation: 'standard',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },
  },
}

export const i18n = createI18n({
  locale: browserLocale, // výchozí jazyk
  fallbackLocale: 'cs',
  globalInjection: true,
  messages: {}, // začneme bez zpráv, načteme je dynamicky
  numberFormats,
} as I18nOptions)

export async function setLocale(locale: string) {
  const messages = await import(`../locales/${locale}.json`)
  i18n.global.setLocaleMessage(locale, messages.default)
  i18n.global.locale = locale
}
