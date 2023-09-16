import {defineStore} from 'pinia'

export const menuStore = defineStore('menuStore',{
    state: () => {
        return {
            activeMenu: '',
        }
    },
    actions: {
        setActiveMenu(name: string) {
            this.activeMenu = name
        }
    }
})