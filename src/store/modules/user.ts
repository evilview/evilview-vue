import {defineStore} from 'pinia'

export const userStore = defineStore('userStore',{
    state: () => {
        return {
            user_id: ''
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