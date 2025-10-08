import { createRouter, createWebHistory } from 'vue-router';
import store from '../stores'

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
                    requiresAuth: true,
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

router.beforeEach(async(to, from, next) => {
    if ( to.matched.some(record => record.meta.requiresAuth)) {
        try {
            store.commit('SET_PROGRESS_BAR', true)
            await store.dispatch('data/GET_DATA')
            next()
        } catch (error) {
            console.warn('Auth failed', error)
            store.commit('SET_AUTH_DIALOG', true)
            store.commit('SET_PROGRESS_BAR', false)
            return next(false);
            // return next('/')
        }
    } else {
        next()
    }
    const pageTitle = to.meta?.title ? `${appTitle} | ${to.meta.title}` : appTitle
    document.title = pageTitle
});

router.afterEach((to) => {
    const appTitle = import.meta.env.VITE_APP_NAME;
    const pageTitle = to.meta?.title ? `${appTitle} | ${to.meta.title}` : appTitle;
    document.title = pageTitle;
    store.commit('SET_PROGRESS_BAR', false)
});

export default router;
