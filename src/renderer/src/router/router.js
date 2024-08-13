import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: () => import('@renderer/views/FriendsList/index.vue'),
            children: [
                {
                    path:'friend_session',
                    component:()=>import('@renderer/views/FriendSession/index.vue')
                }
            ]
        },
        {
            path: '/sub_options_manage',
            component: () => import('@renderer/views/SubOptionsManage/index.vue'),
        }
    ]
})

export default router
