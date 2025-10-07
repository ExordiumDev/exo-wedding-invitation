import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/BaseHomeView.vue';
import NewsView from '../views/BaseNewsView.vue';
import BaseIndex from '../views/BaseIndex.vue';

const routes = [
    {
        path: '/',
        redirect: {name: 'Home.view'},
        component: BaseIndex,
        children: [
            {
                path: 'home',
                name: 'Home.view',
                component: HomeView,
                meta: { 
                    title: 'Home',
                    breadcrumb: 'Home'
                },
            },
            {
                path: 'News',
                name: 'News.view',
                title: 'News',
                component: NewsView,
                meta: {
                    title: 'News',
                    breadcrumb: 'News'
                }
            },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const appTitle = import.meta.env.VITE_APP_NAME;
    document.title = `${appTitle} | ${to.meta.title}` || appTitle;
    next()
})

export default router;
