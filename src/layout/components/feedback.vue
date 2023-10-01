<script lang="ts" setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar';
import type { FeedbackForm } from '@/types/model'
import useLocale from '@/hook/useLocale';

const $q = useQuasar()
const { i18n: { t } } = useLocale()

let formData = ref<FeedbackForm>({
    Description: '',
    UserName: '',
    Contact: ''
})
const myForm = ref()

function onSubmit() {
    myForm.value?.validate().then((success: boolean) => {
        if (success) {

        }
    })
}

function onReset() {
    myForm.value.resetValidation()
    formData.value = {
        Description: '',
        UserName: '',
        Contact: ''
    }
}

</script>
<template>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md" ref="myForm">

        <q-input filled type="textarea" v-model="formData.Description" :label="t('Feedback.Description')"
            :hint="t('Feedback.Description.Title')" lazy-rules
            :rules="[val => val && val.length > 0 && val.length <= 200 || t('Form.Please.Input', [t('Feedback.Description')])]" />

        <q-input filled v-model="formData.UserName" :label="t('Feedback.UserName')" lazy-rules
            :rules="[val => val && val.length > 0 || t('Form.Please.Input', [t('Feedback.UserName')])]" />
        <q-input filled v-model="formData.Description" :label="t('Feedback.Contact')" lazy-rules
            :hint="t('Feedback.Contact.Title')"
            :rules="[val => val && val.length > 0 || t('Form.Please.Input', [t('Feedback.Contact')])]" />

        <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
    </q-form>
</template>
<style lang="scss" scoped></style>