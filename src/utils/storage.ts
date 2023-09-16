import { Langs } from "@/types/map"

const LocaleKey = 'locale'

export function getLocale(): string {
    return localStorage.getItem(LocaleKey) || 'zh'
}

export function changeLocale(lang: Langs = 'en'): void {
    localStorage.setItem(LocaleKey, lang)
}