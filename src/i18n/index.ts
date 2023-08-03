/**
 * i18n
 */
import { createI18n } from "vue-i18n";
import zh from './langs/zh'
import en from './langs/en'
import { getLocale } from "@/utils/storage";

const i18n = createI18n({
    locale: getLocale(),
    fallbackLocale: 'en',
    allowComposition: true,
    messages: {
        zh: {
            message: {...zh}
        },
        en: {
            message: {...en}
        }
    }
})

export default i18n