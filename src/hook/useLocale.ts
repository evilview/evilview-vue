import { computed } from "vue";
import { useI18n } from "vue-i18n";
import {Langs} from '@/types/map'

export default function useLocale() {
  const i18n = useI18n()
  const currentLocale = computed(() => {
    return i18n.locale.value
  })
  const changeLocale = (value: Langs): void => {
    i18n.locale.value = value
  }
  return {
    i18n,
    currentLocale,
    changeLocale
  }
}