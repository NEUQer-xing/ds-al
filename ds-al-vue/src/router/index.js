import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home.vue')
    },
    // 线性表
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
    // 树    
    {
      path: '/BST',
      name: 'BST', // 二叉搜索树
      component: () => import('../views/tree/BST.vue')
    },
    {
      path: '/avl_tree',
      name: 'avl_tree', // 平衡二叉树
      component: () => import('../views/tree/avl_tree.vue')
    },
    {
      path: '/heap_tree',
      name: 'heap_tree', // 堆
      component: () => import('../views/tree/heap_tree.vue')
    },
    {
      path: '/huo_fu_man_tree',
      name: 'huo_fu_man_tree', // 霍夫曼树
      component:() => import('../views/tree/huo_fu_man_tree.vue')
    },
    {
      path: '/zhuan_huan',
      name: 'zhuan_huan', // 二叉树转换
      component:() => import('../views/tree/zhuan_huan.vue')
    },
    {
      path: '/xian_suo_tree',
      name: 'xian_suo_tree', // 线索二叉树
      component:() => import('../views/tree/xian_suo_tree.vue')
    },
    // 图
    {
      path: '/DFS_traverse',
      name: 'DFS_traverse', // 深度优先遍历
      component:() => import('../views/graph/DFS_traverse.vue')
    },
    {
      path: '/BFS_traverse',
      name: 'BFS_traverse', // 广度优先遍历
      component:() => import('../views/graph/BFS_traverse.vue')
    },
    {
      path: '/Dijkstra',
      name: 'Dijkstra', // Dijkstra算法
      component:() => import('../views/graph/Dijkstra.vue')
    },
    {
      path: '/Floyd',
      name: 'Floyd', // Floyd算法
      component:() => import('../views/graph/Floyd.vue')
    },
    {
      path: '/prim',
      name: 'prim', // prim算法
      component:() => import('../views/graph/prim.vue')
    },
    {
      path: '/kruskal',
      name: 'kruskal', // kruskal算法
      component:() => import('../views/graph/kruskal.vue')
    },
    // 排序
    {
      path: '/compare_sort', 
      name: 'compare_sort', // 比较排序
      component:() => import('../views/sort/compare_sort.vue')
    },
    {
      path: '/heap_sort',
      name: 'heap_sort', // 堆排序
      component:() => import('../views/sort/heap_sort.vue')
    },
    {
      path: '/ji_shu',
      name: 'ji_shu', // 基数排序
      component:() => import('../views/sort/ji_shu.vue')
    },
    //查找
    {
      path: '/search',
      name: 'search', // 查找.
      component:() => import('../views/search/search.vue')
    },
    {
      path: '/string_match',
      name: 'string_match', // 字符串匹配
      component:() => import('../views/search/string_match.vue')
    },
  ]
})

export default router
