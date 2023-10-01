<script setup lang="ts">
import useLocale from '@/hook/useLocale';
import { computed, ref, onMounted } from 'vue';
const { i18n: { t } } = useLocale()

let darkMode = ref({ value: 'system', label: t('Setting.General.DarkMode.System') })
let currentFont = ref({ value: 'System', label: t('Setting.General.Font.Default') })
let setupAuto = ref<boolean>(false)
let exitMode = ref('tray')
let exitHint = ref<boolean>(false)
let configPath = ref<string>('C:/User/Data')
let dataPath = ref<string>('C:/User/Data/Admin')
let Loading = ref<boolean>(false)
let CacheSize = ref(50)
let openBossKey = ref(false)

let bossKey = ref<string>('Ctrl + Shift + C')
let language = ref<string>('zh')
let version = ref('1.0.0')
let buildNumber = ref('202310012156541145')

const darkModeItem = computed(() => {
    return [
        { value: 'auto', label: t('Setting.General.DarkMode.Auto') },
        { value: 'system', label: t('Setting.General.DarkMode.System') },
        { value: 'dark', label: t('Setting.General.DarkMode.Dark') },
        { value: 'light', label: t('Setting.General.DarkMode.Light') },
    ]
})

const fontItem = computed(() => {
    return [
        { value: 'System', label: t('Setting.General.Font.Default') },
        { value: 'MicrosoftYaHei', label: t('Setting.General.Font.MicrosoftYaHei') },
        { value: 'MicrosoftYaHeiLight', label: t('Setting.General.Font.MicrosoftYaHeiLight') }
    ]
})

const exitOptions = computed(() => {
    return [
        { value: 'tray', label: t('Setting.General.Exit.Tray') },
        { value: 'direct', label: t('Setting.General.Exit.Direct') },
    ]
})

function getCurrentDarkMode() {

}

onMounted(() => {
    getCurrentDarkMode()
})

</script>
<template>
    <div class="settings-main row">
        <div class="col-xl-8 col-lg-10 col-sm-12">
            <div class="settings-main_item">
                <div>
                    <p class="settings_item-title">{{ t('Setting.General') }}</p>
                    <p class="text-grey-7">{{ t('Setting.General.DarkMode.Title') }}</p>
                    <q-select class="mb-3" style="max-width: 220px;" v-model="darkMode" :options="darkModeItem" standout
                        dense options-dense />
                    <p class="text-grey-7">{{ t('Setting.General.Font.Title') }}</p>
                    <q-select class="mb-3" style="max-width: 220px;" v-model="currentFont" :options="fontItem" standout
                        dense options-dense />
                    <p class="text-grey-7 mb-2">{{ t('Setting.General.Setup.Title') }}</p>
                    <q-checkbox class="mb-3" size="xs" v-model="setupAuto" :label="t('Setting.General.Setup')" />
                    <p class="text-grey-7 mb-2">{{ t('Setting.General.Exit.Title') }}</p>
                    <q-option-group class="mb-2" size="xs" :options="exitOptions" type="radio" v-model="exitMode" />
                    <q-checkbox size="xs" v-model="exitHint" :label="t('Setting.General.Exit.Tooltip')" />
                </div>
                <q-separator />
            </div>
            <div class="settings-main_item">
                <div>
                    <p class="settings_item-title">{{ t('Setting.Path') }}</p>
                    <p class="text-grey-7 mb-2">{{ t('Setting.Path.Config') }}</p>
                    <q-input class="mb-3" readonly standout style="max-width: 420px;" v-model="configPath" dense>
                        <template v-slot:append>
                            <q-btn dense flat size="md" :label="t('Setting.Path.Edit')" />
                        </template>
                    </q-input>
                    <q-btn unelevated color="primary" size="md" :loading="Loading" class="mb-3"
                        :label="t('Setting.Path.Config.Clear')" disable>
                        <template v-slot:loading>
                            <q-spinner-facebook />
                        </template>
                    </q-btn>
                    <p class="text-grey-7 mb-2">{{ t('Setting.Path.Data') }}</p>
                    <q-input class="mb-3" readonly standout style="max-width: 420px;" v-model="dataPath" dense>
                        <template v-slot:append>
                            <q-btn dense flat size="md" :label="t('Setting.Path.Edit')" />
                        </template>
                    </q-input>
                    <p class="text-grey-7 mb-2">{{ t('Setting.Path.Size') }}</p>
                    <q-btn-toggle v-model="CacheSize" toggle-color="primary" :options="[
                        { label: '10M', value: 10 },
                        { label: '50M', value: 50 },
                        { label: '100M', value: 100 }
                    ]" />
                </div>
                <q-separator />
            </div>
            <div class="settings-main_item">
                <div>
                    <p class="settings_item-title">{{ t('Setting.ShortcutKey.Title') }}</p>
                    <q-checkbox size="xs" class="ml-lose-1" v-model="openBossKey"
                        :label="t('Setting.ShortcutKey.BossKey')" />
                    <q-input style="max-width: 240px;" v-model="bossKey" dense :disable="!openBossKey" />
                </div>
                <q-separator />
            </div>
            <div class="settings-main_item">
                <div>
                    <p class="settings_item-title">{{ t('Setting.Language.Title') }}</p>
                    <q-radio class="ml-lose-1" v-model="language" val="zh" checked-icon="task_alt"
                        unchecked-icon="panorama_fish_eye" label="中文" />
                    <q-radio v-model="language" val="en" checked-icon="task_alt" unchecked-icon="panorama_fish_eye"
                        label="English" />
                </div>
                <q-separator />
            </div>
            <div class="settings-main_item">
                <div>
                    <p class="settings_item-title">{{ t('Setting.About') }}</p>
                    <div class="q-gutter-sm mb-2">
                        <span class="text-grey-7">{{ t('About.Version', [version]) }}</span> 
                        <!-- <q-separator vertical inset /> -->
                        <span class="text-grey-7">{{ t('About.BuildNumber', [buildNumber]) }}</span>
                    </div>
                    <div class="q-gutter-md">
                        <q-btn color="primary" unelevated>
                            {{ t('CheckForUpdates') }}
                            <!-- <q-badge color="red" rounded floating /> -->
                        </q-btn>
                        <q-btn color="primary" outline>
                            {{ t('Feedback') }}
                        </q-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style src="@/assets/css/settings.scss" lang="scss"></style>