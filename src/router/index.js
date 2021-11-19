import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Auditing from '../views/Auditing.vue'
import Table from '../views/Table.vue'
import Form from '../views/Form.vue'
import EventList from '../views/EventList.vue'
import Carousel from '../views/Carousel.vue'
import Steps from '../views/Steps.vue'
import AddFengcai from '../views/AddFengcai.vue'
import NoticeBoard from '../views/NoticeBoard.vue'
import FengcaiTable from '../views/FengcaiTable.vue'
import FengcaiDetail from '../views/FengcaiDetail.vue'
import AuditingDetail from '../views/AuditingDetail.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/auditing',
    name: 'Auditing',
    component: Auditing
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
  },
  {
    path:'/addfengcai',
    name:'AddFengcai',
    component: AddFengcai
  },
  {
    path:'/noticeboard',
    name:'NoticeBoard',
    component: NoticeBoard
  },
  {
    path:'/fengcaitable',
    name:'FengcaiTable',
    component: FengcaiTable
  },
  {
    path:'/fengcaidetail',
    name:'FengcaiDetail',
    component: FengcaiDetail
  },
  {
    path:'/auditingdetail',
    name:'AuditingDetail',
    component: AuditingDetail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
