import PublicLayout from '../layouts/publicLayout.vue'
import invHome from '../views/WeddingHome.vue'
import invOpen from '../views/WeddingOpen.vue'

export default [
    {
        path: '/',
        component: PublicLayout,
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'inv.home',
                component: invHome,
                meta: { 
                    requiresAuth: false,
                    title: 'Home'
                }
            },            
            {
                path: '/open',
                name: 'inv.open',
                component: invOpen,
                meta: { 
                    requiresAuth: false,
                    title: 'Hello'
                }
            },            
        ]
    },
]