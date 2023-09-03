import {RouteRecordRaw} from "vue-router";

import 'vue-router'

declare module 'vue-router' {
    interface RouteMeta {
        layout?: boolean,
        hidden?: boolean,
        icon?: string,
        title?: string, // key of i18n 
    }
}

export const localRouters: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'layout',
        component: () => import('@/layout/app_layout.vue'),
        redirect: '/home',
        meta: {
            layout: true,
            hidden: true
        },
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('@/views/home/index.vue'),
                meta: {
                    icon: 'home',
                    title: 'Field.Home'
                }
            },
            {
                path: 'search',
                name: 'search',
                component: () => import('@/views/search/index.vue'),
                meta: {
                    icon: 'search',
                    title: 'Field.Search'
                }
            },
            {
                path: 'favorite',
                name: 'favorite',
                component: () => import('@/views/favorite/index.vue'),
                meta: {
                    icon: 'favorite',
                    title: 'Field.Favorite'
                }
            },
            {
                path: 'folder',
                name: 'folder',
                component: () => import('@/views/folder/index.vue'),
                meta: {
                    icon: 'folder',
                    title: 'Field.Folder'
                }
            },
        ]
    },
    {
        path: '/settings',
        name: 'settings',
        component: () => import('@/views/settings/index.vue'),
        meta: {
            layout: true,
            icon: 'settings',
            title: 'Field.Setting'
        }
    },
    {
        path: '/init',
        name: 'init',
        component: () => import('@/views/init/index.vue'),
        meta: {
            hidden: true
        }
    },
]