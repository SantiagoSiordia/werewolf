import i18n, { InitOptions } from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import translationsEngUS from './locales/en-US/translations.json';
import translationsSpaMX from './locales/es-MX/translations.json';

export type TranslationKey = keyof typeof translationsSpaMX

export type Localized = {
  i18nKey: TranslationKey;
  i18nNs?: 'translationsSpaMX' | 'translationsEngUS';
  i18nValues?: { [key: string]: string | number };
};

export const resources = {
  'es-MX': {
    translations: translationsSpaMX
  },
  'en-US': {
    translations: translationsEngUS
  }
} as const;

const options: InitOptions = {
  compatibilityJSON: 'v3',
  lng: 'es-MX',
  fallbackLng: 'es-MX',
  supportedLngs: ['es-MX', 'en-US'],
  load: 'all',
  resources,
  ns: ['translationsSpaMX', 'translationsEngUS'],
  defaultNS: 'translationsSpaMX',
  debug: false,
  react: {
    useSuspense: false,
  },
};

i18n
  .use(initReactI18next)
  .init(options)
  .then(() => null)
  .catch(() => null);

export { i18n };

export const useAppTranslation = () => useTranslation('translations');