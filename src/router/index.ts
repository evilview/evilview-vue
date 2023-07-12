import { createRouter,createWebHashHistory } from "vue-router";
import type {RouteLocationNormalized,RouteLocationNormalizedLoaded} from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: []
})

router.beforeEach((to: RouteLocationNormalized,from: RouteLocationNormalizedLoaded,next: any) => {
    next()
})

export default router