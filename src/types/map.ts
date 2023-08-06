import {SettingsInfo} from '@/types/model'

export type Langs = 'zh' | 'en'

export const STORE_KEYS: {[key: string]: keyof SettingsInfo} = {
    WINDOW: 'window',
    PATH: 'path'
}