<template>
    <div>
        {{ t('Hello',['zhudac']) }}
    </div>
</template>

<script lang="ts" setup>
import useLocale from '@/hook/useLocale';

const {i18n:{t}} = useLocale()
</script>