import { createRouter, createWebHistory } from 'vue-router';
import store from '../stores'

import publicRoutes from './public'
import privateRoutes from './private'

const routes = [
    ...publicRoutes,
    ...privateRoutes,
    {
        path: '/:catchAll(.*)',
        redirect: '/login'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const isAuth = store.state.auth?.AUTH_USER;
    const needsAuth = to.matched.some(record => record.meta.requiresAuth);
    if (needsAuth && !isAuth) {
        return next('/login');
    }

    if (to.path === '/login' && isAuth) {
        return next('/dashboard');
    }
    next();
});

router.afterEach((to) => {
    const appTitle = import.meta.env.VITE_APP_NAME;
    const pageTitle = to.meta?.title ? `${appTitle} | ${to.meta.title}` : appTitle;
    document.title = pageTitle;
    store.commit('SET_PROGRESS_BAR', false);
});

export default router;
