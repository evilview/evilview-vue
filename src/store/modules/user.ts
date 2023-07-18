import {defineStore} from 'pinia'

export const userStore = defineStore('userStore',{
    state: () => {
        return {
            user_id: '',
            user_name: ''
        }
    },
    actions: {
        
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'user_id',
                storage: localStorage
            }
        ]
    }
})