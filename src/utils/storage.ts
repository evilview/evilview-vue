const LocaleKey = 'locale'

export function getLocale(): string {
    return localStorage.getItem(LocaleKey) || 'en'
}

export function changeLocale(lang: Langs = 'en'): void {
    localStorage.setItem(LocaleKey, lang)
}