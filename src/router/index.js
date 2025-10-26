import { createRouter, createWebHistory } from 'vue-router'
import store from '../stores'

// === Undangan Views ===
import invHome from '../views/WeddingHome.vue'
import invOpen from '../views/WeddingOpen.vue'
import invContent from '../views/WeddingContent.vue'

// === Admin Views ===
import AdminLogin from '../views/admins/LoginAdmin.vue'
import AdminsLayout from '../views/admins/AdminsLayout.vue'
import HeroEditor from '../views/admins/HeroEditor.vue'
import CoupleEditor from '../views/admins/CoupleEditor.vue'
import WishesEditor from '../views/admins/WishesEditor.vue'
import GalleryEditor from '../views/admins/GalleryEditor.vue'
import WeddingGiftEditor from '../views/admins/WeddingGiftEditor.vue'
import ScheduleEditor from '../views/admins/ScheduleEditor.vue'
import MusicEditor from '../views/admins/MusicEditor.vue'

const routes = [
  {
    path: '/',
    redirect: to => ({
      path: `${import.meta.env.VITE_APP_HOST}/home`, query: to.query
    })
  },

  // === UNDANGAN (Dynamic Slug) ===
  {
    path: '/:slug',
    redirect: to => `/${to.params.slug}/open`, 
    children: [
      {
        path: 'home',
        name: 'inv.home',
        component: invHome,
        props: route => ({
          slug: route.params.slug,
          guest: route.query.guest || 'Tamu Undangan'
        }),
        meta: { requiresAuth: false, title: 'Home' }
      },
      {
        path: 'open',
        name: 'inv.open',
        component: invOpen,
        props: route => ({
          slug: route.params.slug,
          guest: route.query.guest || ''
        }),
        meta: { requiresAuth: false, title: 'Ar-Rum' }
      },
      {
        path: 'content',
        name: 'inv.content',
        component: invContent,
        props: route => ({
          slug: route.params.slug,
          guest: route.query.guest || ''
        }),
        meta: { requiresAuth: false, title: 'Content' }
      },
    ]
  },

  // === ADMIN ===
  {
    path: '/admin',
    component: AdminLogin,
    meta: { requiresAuth: false, title: 'Admin Login' }
  },
  {
    path: '/editor',
    component: AdminsLayout,
    meta: { requiresAuth: true },
    children: [
      { path: 'hero', component: HeroEditor, meta: { title: 'Hero Editor' } },
      { path: 'couple', component: CoupleEditor, meta: { title: 'Couple Editor' } },
      { path: 'wishes', component: WishesEditor, meta: { title: 'Wishes Editor' } },
      { path: 'gallery', component: GalleryEditor, meta: { title: 'Gallery Editor' } },
      { path: 'gift', component: WeddingGiftEditor, meta: { title: 'Gift Editor' } },
      { path: 'schedule', component: ScheduleEditor, meta: { title: 'Schedule Editor' } },
      { path: 'music', component: MusicEditor, meta: { title: 'Music Editor' }}
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// === Middleware (Auth Check) ===
router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    return next('/admin')
  }

  if (to.name === 'inv.content') {
    try {
      await Promise.all([
        store.dispatch('data/GET_GALLERY_DATA'),
        store.dispatch('data/GET_WISHES_DATA'),
        store.dispatch('data/GET_COUPLES_DATA'),
        store.dispatch('data/GET_SCHEDULE_DATA'),
        store.dispatch('data/GET_GIFT_DATA'),
      ])
      return next()
    } catch (error) {
      console.error('Error fetching data before entering /content route:', error)
      return next(false)
    }
  }

  next()
})


// === Dynamic Title ===
router.afterEach((to) => {
  const appTitle = import.meta.env.VITE_APP_NAME || 'Wedding Invitation'
  const pageTitle = to.meta?.title ? `${appTitle} | ${to.meta.title}` : appTitle
  document.title = pageTitle
})

export default router
