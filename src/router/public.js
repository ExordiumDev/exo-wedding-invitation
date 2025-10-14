import loginView from '../views/LoginView.vue'
import verifCodeView from '../views/verificationCode.vue'
import PublicLayout from '../layouts/publicLayout.vue'

export default [
    {
        path: '/login',
        name: 'login',
        component: loginView,
        meta: {requiresAuth: false}
    },
    {
        path: '/v',
        name: 'signup.verification',
        component: verifCodeView,
        meta: {requiresAuth: false}
    },

]