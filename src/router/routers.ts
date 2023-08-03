import {RouteRecordRaw} from "vue-router";

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
                component: () => import('@/views/home/index.vue'),
                meta: {
                    layout: true,
                    icon: '',
                    title: ''
                }
            },
            {
                path: 'folder',
                component: () => import('@/views/folder/index.vue'),
                meta: {
                    layout: true,
                    icon: '',
                    title: ''
                }
            },
            {
                path: 'search',
                component: () => import('@/views/search/index.vue'),
                meta: {
                    layout: true,
                    icon: '',
                    title: ''
                }
            }
        ]
    },
    {
        path: '/settings',
        component: () => import('@/views/settings/index.vue'),
        meta: {
            layout: true,
            icon: '',
            title: ''
        }
    },
    {
        path: '/init',
        component: () => import('@/views/init/index.vue'),
    },
]