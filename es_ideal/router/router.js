import HistoricoVeiculo from '@/pages/HistoricoVeiculo.vue'
import HomePage from '@/pages/HomePage.vue'
import LogIn from '@/pages/LogIn.vue'
import NotFound from '@/components/NotFound.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import ServicosAAdicionar from '@/pages/ServicosAAdicionar.vue'
import ServicosAtribuidos from '@/pages/ServicosAtribuidos.vue'
import ServicosElet from '@/pages/ServicosElet.vue'
import ServicosGasoleo from '@/pages/ServicosGasoleo.vue'
import ServicosGasolina from '@/pages/ServicosGasolina.vue'
import ServicosHib from '@/pages/ServicosHib.vue'
import ServicosPage from '@/pages/ServicosPage.vue'
import ServicosRealizados from '@/pages/ServicosRealizados.vue'
import SuspensaoVeiculo from '@/pages/SuspensaoVeiculo.vue'
import { createRouter, createWebHistory } from 'vue-router'


const routes = [{
        name: 'LogIn',
        path: '/login',
        component: LogIn
    },
    {
        name: 'HomePage',
        path: '/',
        component: HomePage
    },
    {
        path: '/home',
        redirect: '/'
    },
    {
        name: 'ProfilePage',
        path: '/profile/:mecanicoId',
        component: ProfilePage,
        props: true
    },
    {
        name: 'ServicosRealizados',
        path: '/servicos-realizados/:mecanicoId',
        component: ServicosRealizados
    },
    {
        name: 'ServicosGasolina',
        path: '/servicos-gasolina/:mecanicoId/:serviceId/:vehicleId/:clientId',
        component: ServicosGasolina
    },
    {
        name: 'ServicosGasoleo',
        path: '/servicos-gasoleo/:mecanicoId/:serviceId/:vehicleId/:clientId',
        component: ServicosGasoleo
    },
    {
        name: 'ServicosElet',
        path: '/servicos-elet/:mecanicoId/:serviceId/:vehicleId/:clientId',
        component: ServicosElet
    },
    {
        name: 'ServicosHib',
        path: '/servicos-hib/:mecanicoId/:serviceId/:vehicleId/:clientId',
        component: ServicosHib
    },
    {
        name: 'ServicosPage',
        path: '/service/:mecanicoId/:serviceId/:clientId/:vehicleId',
        component: ServicosPage,
        props: true,
    },
    {
        name: 'Suspenso',
        path: '/suspenso/:mecanicoId/:serviceId',
        component: SuspensaoVeiculo,
        props: true,
    },
    {
        name: 'ServicosAtribuidos',
        path: '/servicos-atribuidos/:mecanicoId',
        component: ServicosAtribuidos,
    },
    {
        name: 'HistoricoVeiculo',
        path: '/historico-veiculo/:mecanicoId/:clientId/:vehicleId',
        component: HistoricoVeiculo,
    },
    {
        name: 'ServicosAAdicionar',
        path: '/servico-adicionar/:mecanicoId/:serviceId/:vehicleId/:clientId',
        component: ServicosAAdicionar,
    },
    {
        name: 'NotFound',
        path: '/:catchAll(.*)*',
        component: NotFound
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router