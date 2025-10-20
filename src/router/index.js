import { createRouter, createWebHistory } from 'vue-router';
import store from '../stores'

import invHome from '../views/WeddingHome.vue'
import invOpen from '../views/WeddingOpen.vue'
import invContent from '../views/WeddingContent.vue'
import invSchedule from '../views/WeddingSchedule.vue'
import invRsvp from '../views/WeddingRsvp.vue'
import invGift from '../views/WeddingGift.vue'
import invDoa from '../views/WeddingDua.vue'

const routes = [
    {
        path: '/',
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
            {
                path: '/content',
                name: 'inv.content',
                component: invContent,
                meta: { 
                    requiresAuth: false,
                    title: 'Content'
                }
            },
            {
                path: '/schedule',
                name: 'inv.schedule',
                component: invSchedule,
                meta: { 
                    requiresAuth: false,
                    title: 'Schedule'
                }
            },
            {
                path: '/rsvp',
                name: 'inv.rsvp',
                component: invRsvp,
                meta: { 
                    requiresAuth: false,
                    title: 'Reservation'
                }
            },
            {
                path: '/w-gift',
                name: 'inv.gift',
                component: invGift,
                meta: { 
                    requiresAuth: false,
                    title: 'Wedding Gift'
                }
            },
            {
                path: '/dua',
                name: 'inv.doa',
                component: invDoa,
                meta: { 
                    requiresAuth: false,
                    title: 'Wedding Doa'
                }
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.afterEach((to) => {
    const appTitle = import.meta.env.VITE_APP_NAME;
    const pageTitle = to.meta?.title ? `${appTitle} | ${to.meta.title}` : appTitle;
    document.title = pageTitle;
});

export default router;
