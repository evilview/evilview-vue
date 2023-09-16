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
            hidden: true
        },
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('@/views/home/index.vue'),
                meta: {
                    layout: true,
                    icon: 'o_perm_media',
                    title: 'Field.Home'
                }
            },
            {
                path: 'search',
                name: 'search',
                component: () => import('@/views/search/index.vue'),
                meta: {
                    layout: true,
                    icon: 'image_search',
                    title: 'Field.Search'
                }
            },
            {
                path: 'favorite',
                name: 'favorite',
                component: () => import('@/views/favorite/index.vue'),
                meta: {
                    layout: true,
                    icon: 'favorite_border',
                    title: 'Field.Favorite'
                }
            },
            {
                path: 'folder',
                name: 'folder',
                component: () => import('@/views/folder/index.vue'),
                meta: {
                    layout: true,
                    icon: 'o_folder',
                    title: 'Field.Folder'
                }
            },
            {
                path: '/settings',
                name: 'settings',
                component: () => import('@/views/settings/index.vue'),
                meta: {
                    hidden: false,
                    icon: 'o_settings',
                    title: 'Field.Setting'
                }
            },
        ]
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