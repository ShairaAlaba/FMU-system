import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const routes = [
  { path: '/', name: 'Landing', component: () => import('@/views/LandingView.vue') },
  { path: '/login', name: 'Login', component: () => import('@/views/LoginView.vue') },
  { path: '/verify', name: 'Verify', component: () => import('@/views/VerifyView.vue') },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/fmu',
    name: 'FMU',
    component: () => import('@/views/UnitView.vue'),
    props: { unit: 'FMU', title: 'Facility Management Unit' },
    meta: { requiresAuth: true }
  },
  {
    path: '/lu',
    name: 'LU',
    component: () => import('@/views/UnitView.vue'),
    props: { unit: 'LU', title: 'Landscape Unit' },
    meta: { requiresAuth: true }
  },
  {
    path: '/tu',
    name: 'TU',
    component: () => import('@/views/UnitView.vue'),
    props: { unit: 'TU', title: 'Transportation Unit' },
    meta: { requiresAuth: true }
  },
  {
    path: '/:unit/building/:code',
    name: 'BuildingForms',
    component: () => import('@/views/BuildingFormsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:unit/building/:code/form/:formId',
    name: 'FormView',
    component: () => import('@/views/FormView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:unit/history',
    name: 'History',
    component: () => import('@/views/HistoryView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:unit/analysis',
    name: 'Analysis',
    component: () => import('@/views/AnalysisView.vue'),
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() { return { top: 0 } }
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.user) return { name: 'Login' }
})

export default router
