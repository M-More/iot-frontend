import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../components/About.vue'
import Table from '../views/Table.vue'
import Form from '../views/Form.vue'
import EventList from '../views/EventList.vue'
import Carousel from '../views/Carousel.vue'
import Steps from '../views/Steps.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/table',
    name: 'Table',
    component: Table
  },
  {
    path: '/form',
    name: 'Form',
    component: Form
  },
  {
    path:'/eventlist',
    name: 'EventList',
    component: EventList
  },
  {
    path:'/carousel',
    name: 'Carousel',
    component: Carousel
  },
  {
    path:'/steps',
    name:'Steps',
    component: Steps
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
