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


import Inform from "../views/InformationCheck"

import EquipmentTypeList from "../views/EquipmentType.vue"
import EquipmentTypeAdd from "../views/EquipmentTypeAdd.vue"
import EquipmentTypeUpdate from "../views/EquipmentTypeUpdate.vue"
import EquipmentList from "../views/Equipment.vue"
import AlertList from "../views/Alert.vue"
import AlertAdd from "../views/AlertAdd.vue"
import AlertUpdate from "../views/AlertUpdate.vue"
import EventConfList from "../views/EventConfiguration.vue"
import EventConfAdd from "../views/EventConfAdd.vue";
import EventConfUpdate from "../views/EventConfUpdate.vue";
import EventInfo from "../views/EventInfo.vue";
import EventInfoDetail from "../views/EventInfoDetail.vue";
import EventInfoDeviceDetail from "../views/EventInfoDeviceDetail.vue";
import Simulation from "../views/Simulation.vue";
import BigPingF from "../views/BigPingF.vue";

import SupplierList from "../views/Supplier.vue"
import SupplierAdd from "../views/SupplierAdd.vue";
import SupplierUpdate from "../views/SupplierUpdate.vue";
import login from "../views/login";
import Welcome from "../views/Welcome"


  Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '',
        name: 'welcome',
        component: Welcome
      },
      {
        path: 'auditing',
        name: 'Auditing',
        component: Auditing
      },
      {
        path: 'table',
        name: 'Table',
        component: Table
      },
      {
        path: 'form',
        name: 'Form',
        component: Form
      },
      {
        path:'eventlist',
        name: 'EventList',
        component: EventList
      },
      {
        path:'carousel',
        name: 'Carousel',
        component: Carousel
      },
      {
        path:'steps',
        name:'Steps',
        component: Steps
      },
      {
        path:'addfengcai',
        name:'AddFengcai',
        component: AddFengcai
      },
      {
        path:'noticeboard',
        name:'NoticeBoard',
        component: NoticeBoard
      },
      {
        path:'fengcaitable',
        name:'FengcaiTable',
        component: FengcaiTable
      },
      {
        path:'fengcaidetail',
        name:'FengcaiDetail',
        component: FengcaiDetail
      },
      {
        path:'auditingdetail',
        name:'AuditingDetail',
        component: AuditingDetail
      },
      {
        path:'supplierList/inform',
        name:'Inform',
        component: Inform
      },
      {
        path:'supplierList',
        name:'SupplierList',
        component: SupplierList
      },
      {
        path: 'supplierList/supplierAdd',
        name: 'SupplierAdd',
        component: SupplierAdd
      },
      {
        path: 'supplierList/supplierUpdate',
        name: 'SupplierUpdate',
        component: SupplierUpdate
      },
      {
        path:'equipmentTypeList',
        name:'EquipmentTypeList',
        component: EquipmentTypeList
      },
      {
        path:'equipmentTypeList/equipmentTypeAdd',
        name:'EquipmentTypeAdd',
        component: EquipmentTypeAdd
      },
      {
        path:'equipmentTypeList/equipmentTypeUpdate',
        name:'EquipmentTypeUpdate',
        component: EquipmentTypeUpdate
      },
      {
        path:'equipmentList',
        name:'EquipmentList',
        component: EquipmentList
      },
      {
        path:'alertList',
        name:'AlertList',
        component: AlertList
      },
      {
        path:'alertList/alertAdd',
        name:'AlertAdd',
        component: AlertAdd
      },
      {
        path:'alertList/alertUpdate',
        name:'AlertUpdate',
        component: AlertUpdate
      },
      {
        path:'eventConfList',
        name:'EventConfList',
        component: EventConfList
      },
      {
        path:'eventConfList/eventConfAdd',
        name:'EventConfAdd',
        component: EventConfAdd
      },
      {
        path:'eventConfList/eventConfUpdate',
        name:'EventConfUpdate',
        component: EventConfUpdate
      },
      {
        path:'eventInfo',
        name:'EventInfo',
        component: EventInfo
      },
      {
        path:'eventInfo/eventInfoDetail',
        name:'EventInfoDetail',
        component: EventInfoDetail
      },
      {
        path:'eventInfo/eventInfoDetail/eventInfoDeviceDetail',
        name:'EventInfoDeviceDetail',
        component: EventInfoDeviceDetail
      },
      {
        path:'simulation',
        name:'Simulation',
        component: Simulation
      },
      {
        path:'bigPingF',
        name:'BigPingF',
        component: BigPingF
      },

    ]
  },
  {
    path: '/login',
    name:'Login',
    component: login
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next({path:'/login'})
  }
  if (to.path === '/login') {
    next()
  }
  if (to.path.substr(0,5) === '/home' &&sessionStorage.getItem("userAccount")!=null) {
    next()
  }
  if (to.path.substr(0,5) === '/home' &&sessionStorage.getItem("userAccount")==null) {
    next({path:'/login'})
  }
})


export default router
