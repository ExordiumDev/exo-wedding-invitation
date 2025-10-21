// import { createRouter, createWebHistory } from 'vue-router';
// import store from '../stores'

// import invHome from '../views/WeddingHome.vue'
// import invOpen from '../views/WeddingOpen.vue'
// import invContent from '../views/WeddingContent.vue'
// import invSchedule from '../views/WeddingSchedule.vue'
// import invRsvp from '../views/WeddingRsvp.vue'
// import invGift from '../views/WeddingGift.vue'
// import invDoa from '../views/WeddingDua.vue'
// import invPreOutro from '../views/WeddingPreOutro.vue'
// import invOutro from '../views/WeddingOutro.vue'


// const routes = [
//     {
//         path: '/',
//         redirect: '/home',
//         children: [
//             {
//                 path: '/home',
//                 name: 'inv.home',
//                 component: invHome,
//                 meta: { 
//                     requiresAuth: false,
//                     title: 'Hi'
//                 }
//             },            
//             {
//                 path: '/open',
//                 name: 'inv.open',
//                 component: invOpen,
//                 meta: { 
//                     requiresAuth: false,
//                     title: 'Ar-rum'
//                 }
//             },    
//             {
//                 path: '/content',
//                 name: 'inv.content',
//                 component: invContent,
//                 meta: { 
//                     requiresAuth: false,
//                     title: 'Content'
//                 }
//             },
//             {
//                 path: '/schedule',
//                 name: 'inv.schedule',
//                 component: invSchedule,
//                 meta: { 
//                     requiresAuth: false,
//                     title: 'Schedule'
//                 }
//             },
//             {
//                 path: '/rsvp',
//                 name: 'inv.rsvp',
//                 component: invRsvp,
//                 meta: { 
//                     requiresAuth: false,
//                     title: 'Reservation'
//                 }
//             },
//             {
//                 path: '/w-gift',
//                 name: 'inv.gift',
//                 component: invGift,
//                 meta: { 
//                     requiresAuth: false,
//                     title: 'Wedding Gift'
//                 }
//             },
//             {
//                 path: '/dua',
//                 name: 'inv.doa',
//                 component: invDoa,
//                 meta: { 
//                     requiresAuth: false,
//                     title: 'Pray'
//                 }
//             },
//             {
//                 path: '/pre-outro',
//                 name: 'inv.preoutro',
//                 component: invPreOutro,
//                 meta: { 
//                     requiresAuth: false,
//                     title: 'Pre outro'
//                 }
//             },
//             {
//                 path: '/outro',
//                 name: 'inv.outro',
//                 component: invOutro,
//                 meta: { 
//                     requiresAuth: false,
//                     title: 'Outro'
//                 }
//             },
//         ]
//     },
// ]

// const router = createRouter({
//     history: createWebHistory(),
//     routes,
// });

// router.afterEach((to) => {
//     const appTitle = import.meta.env.VITE_APP_NAME;
//     const pageTitle = to.meta?.title ? `${appTitle} | ${to.meta.title}` : appTitle;
//     document.title = pageTitle;
// });

// export default router;

import { createRouter, createWebHistory } from 'vue-router'
import store from '../stores'

// === Undangan Views ===
import invHome from '../views/WeddingHome.vue'
import invOpen from '../views/WeddingOpen.vue'
import invContent from '../views/WeddingContent.vue'
import invSchedule from '../views/WeddingSchedule.vue'
import invRsvp from '../views/WeddingRsvp.vue'
import invGift from '../views/WeddingGift.vue'
import invDoa from '../views/WeddingDua.vue'
import invPreOutro from '../views/WeddingPreOutro.vue'
import invOutro from '../views/WeddingOutro.vue'

// === Admin Views ===
import AdminLogin from '../views/admins/LoginAdmin.vue'
import AdminsLayout from '../views/admins/AdminsLayout.vue'
import HeroEditor from '../views/admins/HeroEditor.vue'
import CoupleEditor from '../views/admins/CoupleEditor.vue'
import WishesEditor from '../views/admins/WishesEditor.vue'
import GalleryEditor from '../views/admins/GalleryEditor.vue'
import WeddingGiftEditor from '../views/admins/WeddingGiftEditor.vue'
import ScheduleEditor from '../views/admins/ScheduleEditor.vue'

const routes = [
  {
    path: '/',
    redirect: '/demo/home', // default redirect ke contoh slug
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
          guest: route.query.guest || ''
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
      {
        path: 'schedule',
        name: 'inv.schedule',
        component: invSchedule,
        props: route => ({
          slug: route.params.slug,
          guest: route.query.guest || ''
        }),
        meta: { requiresAuth: false, title: 'Schedule' }
      },
      {
        path: 'rsvp',
        name: 'inv.rsvp',
        component: invRsvp,
        props: route => ({
          slug: route.params.slug,
          guest: route.query.guest || ''
        }),
        meta: { requiresAuth: false, title: 'Reservation' }
      },
      {
        path: 'w-gift',
        name: 'inv.gift',
        component: invGift,
        props: route => ({
          slug: route.params.slug,
          guest: route.query.guest || ''
        }),
        meta: { requiresAuth: false, title: 'Wedding Gift' }
      },
      {
        path: 'dua',
        name: 'inv.doa',
        component: invDoa,
        props: route => ({
          slug: route.params.slug,
          guest: route.query.guest || ''
        }),
        meta: { requiresAuth: false, title: 'Pray' }
      },
      {
        path: 'pre-outro',
        name: 'inv.preoutro',
        component: invPreOutro,
        props: route => ({
          slug: route.params.slug,
          guest: route.query.guest || ''
        }),
        meta: { requiresAuth: false, title: 'Pre Outro' }
      },
      {
        path: 'outro',
        name: 'inv.outro',
        component: invOutro,
        props: route => ({
          slug: route.params.slug,
          guest: route.query.guest || ''
        }),
        meta: { requiresAuth: false, title: 'Outro' }
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
      { path: 'schedule', component: ScheduleEditor, meta: { title: 'Schedule Editor' } }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// === Middleware (Auth Check) ===
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    return next('/admin')
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
