import loginView from '../views/LoginView.vue'
import PublicLayout from '../layouts/publicLayout.vue'

export default [
    {
        path: '/login',
        name: 'login',
        component: loginView,
        meta: {requiresAuth: false}
    }
]