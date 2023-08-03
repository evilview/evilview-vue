import {createRouter, createWebHashHistory} from "vue-router";
import type {RouteLocationNormalized, RouteLocationNormalizedLoaded} from 'vue-router'
import {localRouters} from "./routers";

const router = createRouter({
    history: createWebHashHistory(),
    routes: localRouters,
})

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: any) => {
    next()
})

export default router