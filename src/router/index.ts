import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { useAuthStore } from "../store/authStore";

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
        meta: { requiresAuth: true }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../pages/DashboardPage.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/dashboard/solicitud',
        name: 'NuevaSolicitud',
        component: () => import('../pages/NuevasolicitudPage.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/dashboard/historial',
        name: 'MiHistorial',
        component: () => import('../pages/MiHistorialPage.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/historial',
        name: 'Historial',
        component: () => import('../pages/Historial.vue'),
        meta: { requiresAuth: true },
    },
    // ─── RUTAS ADMIN ───────────────────────────────────────────────────────
    {
        path: '/admin/usuarios',
        name: 'AdminUsuarios',
        component: () => import('../pages/AdminUsuarios.vue'),
        meta: { requiresAuth: true, requiredRole: 'Administrador' }
    },
    {
        path: '/admin/dashboard',
        name: 'AdminDashboard',
        component: () => import('../pages/AdminDashboardPage.vue'),
        meta: { requiresAuth: true, requiredRole: 'Administrador' }
    },
    { path: '/:pathMatch(.*)*', redirect: '/login' }, // Cualquier ruta desconocida -> Login
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes
});

/**
 * Guard global: Protege rutas privadas, valida roles y evita que usuarios
 * autenticados vuelvan al login
 */
router.beforeEach((to, from) => {
    const authStore = useAuthStore();
    const isAuthenticated = !!authStore.token;
    const userRole = authStore.student?.rol;
    const primerLogin = authStore.student?.requiresPasswordChange;

    // Se requiere que el usuario no esté autenticado (ej: login)
    if (to.meta.requiresGuest && isAuthenticated) {
        return { name: 'Dashboard' };
    }

    // Se requiere autenticación
    if (to.meta.requiresAuth && !isAuthenticated) {
        return { name: 'Login' };
    }

    // Verificar rol requerido
    if (to.meta.requiredRole) {
        if (!isAuthenticated) {
            return { name: 'Login' };
        }

        if (userRole !== to.meta.requiredRole) {
            console.warn(
                `[Router] Usuario con rol '${userRole}' intentó acceder a ruta que requiere '${to.meta.requiredRole}'`
            );
            return { name: 'Dashboard' };
        }
    }
});