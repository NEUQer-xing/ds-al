import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home.vue')
    },
    {
      path: '/linearList',
      name: 'linearList',
      component: () => import('../views/list/linearList.vue')
    },
    {
      path: '/linkedQueue',
      name: 'linkedQueue',
      component: () => import('../views/list/linkedQueue.vue')
    },
    {
      path: '/queueList',
      name: 'queueList',
      component: () => import('../views/list/queueList.vue')
    },
    {
      path: '/stackList',
      name: 'stackList',
      component: () => import('../views/list/stackList.vue')
    },
    {
      path: '/singleList',
      name: 'singleList',
      component: () => import('../views/list/singleList.vue')
    },
    
    {
      path: '/'
    }
  ]
})

export default router
