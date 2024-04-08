import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Login from '@/views/Login.vue'
import ChooseView from "@/views/ChooseView.vue";
import Spring from "@/components/season/Spring.vue"
import Summer from "@/components/season/Summer.vue"
import Autumn from "@/components/season/Autumn.vue"
import Winter from "@/components/season/Winter.vue"

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
        }, {
            path: '/choose',
            name: 'choose',
            component: ChooseView
        }
        , {
            path: '/spring',
            name: 'spring',
            component: Spring
        }
        , {
            path: '/summer',
            name: 'summer',
            component: Summer
        }
        , {
            path: '/autumn',
            name: 'autumn',
            component: Autumn
        }
        , {
            path: '/winter',
            name: 'winter',
            component: Winter
        }
    ]
})

export default router
