import { RouteRecordRaw } from "vue-router";

import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    layout?: boolean
  }
}

export const localRouters: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@/layout/app_layout.vue'),
        redirect: '/home',
        meta: {
            layout: true
        },
        children: [
            {
                path: 'home',
                component: () => import('@/views/Home/index.vue')
            }
        ]
    }
]