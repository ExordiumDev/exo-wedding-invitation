import { createRouter, createWebHistory } from 'vue-router';
import store from '../stores'
import invHome from '../views/WeddingHome.vue'
import invOpen from '../views/WeddingOpen.vue'
import invContent from '../views/WeddingContent.vue'

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
