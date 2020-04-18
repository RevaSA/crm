import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: { layout: 'main' },
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
    },
    {
        path: '/login',
        name: 'login',
        meta: { layout: 'auth' },
        component: () => import(/* webpackChunkName: "login" */ '@/views/auth/Login.vue'),
    },
    {
        path: '/register',
        name: 'register',
        meta: { layout: 'auth' },
        component: () => import(/* webpackChunkName: "register" */ '@/views/auth/Register.vue'),
    },
    {
        path: '/categories',
        name: 'categories',
        meta: { layout: 'main' },
        component: () => import(/* webpackChunkName: "categories" */ '@/views/Categories.vue'),
    },
    {
        path: '/detail/:id',
        name: 'detail',
        meta: { layout: 'main' },
        component: () => import(/* webpackChunkName: "detail" */ '@/views/Detail.vue'),
    },
    {
        path: '/history',
        name: 'history',
        meta: { layout: 'main' },
        component: () => import(/* webpackChunkName: "history" */ '@/views/History.vue'),
    },
    {
        path: '/planning',
        name: 'planning',
        meta: { layout: 'main' },
        component: () => import(/* webpackChunkName: "planning" */ '@/views/Planning.vue'),
    },
    {
        path: '/profile',
        name: 'profile',
        meta: { layout: 'main' },
        component: () => import(/* webpackChunkName: "profile" */ '@/views/Profile.vue'),
    },
    {
        path: '/record',
        name: 'record',
        meta: { layout: 'main' },
        component: () => import(/* webpackChunkName: "record" */ '@/views/Record.vue'),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
