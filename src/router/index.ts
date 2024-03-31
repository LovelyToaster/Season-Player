import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Login from '@/components/Login.vue'
import ChooseView from "@/components/ChooseView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        }, {
            path: '/login',
            name: 'login',
            component: Login
        },{
            path: '/choose',
            name: 'choose',
            component: ChooseView
        }
    ]
})

export default router
