import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: () => import('@renderer/views/FriendsList/index.vue'),
            children: [
                {
                    path: 'friend_session',
                    component: () => import('@renderer/views/FriendSession/index.vue')
                }
            ]
        },
        {
            path: '/sub_options_manage',
            component: () => import('@renderer/views/SubOptionsManage/index.vue'),
        },
        {
            path: '/relationship_manage',
            component: () => import('@renderer/views/RelationshipManage/index.vue')
        }
    ]
})
// export function transRouterToFriendList(router){
//     router.push('/')
// }
// export function transRouterToFriendSession(router,uid){
//     router.push({path:'/friend_session',query:{uid}})
// }
// export function trans
export default router
