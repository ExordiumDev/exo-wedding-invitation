import NewsView from '../views/BaseNewsView.vue';
import UserSetPass from '../views/BaseUserSetPass.vue';
import PrivateLayout from '../layouts/privateLayout.vue';

export default [
    {
        path: '/dashboard',
        component: PrivateLayout,
        meta: { requiresAuth : true },
        children: [
            {
                path: '',
                name: 'auth.dashboard',
                component: NewsView,
                meta: {
                    title: 'Dashboard'
                }
            },
            {
                path: '/set-pass',
                name: 'user.setpass',
                component: UserSetPass,
                meta: {
                    title: 'Set Password'
                }
            }
        ]
    }
]