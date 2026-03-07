import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    { path: '/', redirect: '/login' },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../pages/LoginPage.vue'),
        meta: { requiresGuest: true }
    },
    {
        path: '/cambiar-contrasena',
        name: 'ChangePassword',
        component: () => import('../pages/ChangePasswordPage.vue'),
        meta: { requiresGuest: true }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../pages/DashboardPage.vue'),
        meta: { requiresGuest: true }
    },
    { path: '/:pathMatch(.*)*', redirect: '/login' }, // Cualquier ruta desconocida -> Login
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// Guard global: Protege rutas privadas y evita que usuarios
// autenticados vuelvan al login
router.beforeEach((to) => {
  const isAuthenticated = !!localStorage.getItem('auth_token')

  if (to.meta.requiresAuth && !isAuthenticated) return ({ name: 'Login' })
  if (to.meta.requiresGuest && isAuthenticated) return ({ name: 'Dashboard' })

})