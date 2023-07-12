/**
 * i18n
 */
import { createI18n } from "vue-i18n";
import zh from './langs/zh'
import en from './langs/en'

const i18n = createI18n({
    locale: 'zh',
    
    messages: {
        zh: {...zh},
        en: {...en}
    }
})

export default i18n