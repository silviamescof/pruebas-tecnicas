import { createRouter, createWebHistory } from 'vue-router'
import InicioViewVue from '@/views/InicioView.vue'
import ProductosViewVue from '@/views/ProductosView.vue'
import DetallesViewVue from '@/views/DetallesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: InicioViewVue,
      props:true
    },
    {
      path: '/productos',
      name:'productos',
      component: ProductosViewVue,
      props:true
    },
    {
      path: '/detallesDeProducto',
      name:'detalles',
      component: DetallesViewVue,
      props:true
    }
  ]
})

export default router
