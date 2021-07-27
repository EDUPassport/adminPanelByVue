import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'Documentation', icon: 'documentation', affix: false }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'Guide', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/config',
    component: Layout,
    redirect: '/config/system/list',
    alwaysShow: true, // will always show the root menu
    name: 'Company assets',
    meta: {
      title: 'Company assets',
      icon: 'list'
    },
    children: [
      {
        path: 'system/list',
        component: () => import('@/views/config/system/list'),
        name: 'MP Image Asset',
        meta: {
          title: 'MP Image Asset'
        }
      }
    ]
  },
  {
    path: '/ads',
    component: Layout,
    redirect: '/ads/list',
    alwaysShow: true, // will always show the root menu
    name: 'Ads',
    meta: {
      title: 'Ads',
      icon: 'list'
    },
    children: [
      {
        path: 'category/list',
        component: () => import('@/views/ads/category/list'),
        name: 'Advertisement Structure',
        meta: {
          title: 'Advertisement Structure'
        }
      },
      {
        path: 'list',
        component: () => import('@/views/ads/list'),
        name: 'listAds',
        meta: {
          title: 'Ads List'
        }
      },
      {
        path: 'purchase/list',
        component: () => import('@/views/ads/purchase/list'),
        name: 'Purchased Ads',
        meta: {
          title: 'Purchased Ads'
        }
      },
      {
        path: 'purchase/review',
        component: () => import('@/views/ads/purchase/review'),
        name: 'Redeemed Ad Review',
        meta: {
          title: 'Redeemed Ad Review'
        }
      },
      {
        path: 'article',
        component: () => import('@/views/ads/article/list'),
        name: 'article',
        hidden: true,
        meta: {
          title: 'Article List'
        }
      },
      {
        path: 'article/add',
        hidden: true,
        component: () => import('@/views/ads/article/add'),
        name: 'add',
        meta: {
          title: 'Add Article'
        }
      }
    ]
  },
  {
    path: '/category',
    component: Layout,
    redirect: '/category/list',
    alwaysShow: true, // will always show the root menu
    name: 'Services',
    meta: {
      title: 'Services',
      icon: 'list'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/category/list'),
        name: 'Multiple Select Fields',
        meta: {
          title: 'Multiple Select Fields'
        }
      }
    ]
  },
  {
    path: '/users',
    component: Layout,
    redirect: '/users/index',
    alwaysShow: true, // will always show the root menu
    name: 'All Users',
    meta: {
      title: 'All Users',
      icon: 'list'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/users/index'),
        name: 'User List',
        meta: {
          title: 'User List'
        }
      }
    ]
  },
  {
    path: '/educator',
    component: Layout,
    redirect: '/educator/list',
    alwaysShow: true, // will always show the root menu
    name: 'Educators',
    meta: {
      title: 'Educators',
      icon: 'list'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/educator/list'),
        name: 'All Educators',
        meta: {
          title: 'All Educators'
        }
      },
      {
        path: 'editEducator',
        component: () => import('@/views/educator/edit'),
        name: 'edit Educator',
        meta: { title: 'Edit Educator', noCache: true, activeMenu: '/educator' },
        hidden: true
      }

    ]
  },
  {
    path: '/business',
    component: Layout,
    redirect: '/business/list',
    alwaysShow: true, // will always show the root menu
    name: 'Businesses',
    meta: {
      title: 'Businesses',
      icon: 'list'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/business/list'),
        name: 'All Businesses',
        meta: {
          title: 'All Businesses'
        }
      },
      {
        path: 'editBusiness',
        component: () => import('@/views/business/edit'),
        name: 'EditBusiness',
        meta: { title: 'Edit Business', noCache: true, activeMenu: '/business/list' },
        hidden: true
      },
      {
        path: 'jobs/service/list',
        component: () => import('@/views/business/jobs/service/list'),
        name: 'Select Fields',
        meta: {
          title: 'Select Fields'
        }
      },
      {
        path: 'jobs/list',
        component: () => import('@/views/business/jobs/list'),
        name: 'Jobs',
        meta: {
          title: 'Jobs'
        }
      },
      {
        path: 'jobs/editJobs',
        component: () => import('@/views/business/jobs/edit'),
        hidden: true,
        name: 'Edit Job',
        meta: {
          title: 'Edit Jobs', noCache: true, activeMenu: '/business/jobs/list'
        }
      },
      {
        path: 'jobs/addJobs',
        component: () => import('@/views/business/jobs/edit'),
        hidden: true,
        name: 'add job',
        meta: {
          title: 'Add Job', noCache: true, activeMenu: '/business/jobs/list'
        }
      },
      {
        path: 'jobs/resume/list',
        component: () => import('@/views/business/jobs/resume/list'),
        hidden: true,
        name: 'Applications',
        meta: {
          title: 'Applications', noCache: true, activeMenu: '/business/jobs/list'
        }
      }

    ]
  },
  {
    path: '/vendor',
    component: Layout,
    redirect: '/vendor/list',
    alwaysShow: true, // will always show the root menu
    name: 'Vendor',
    meta: {
      title: 'Vendor',
      icon: 'list'
    },
    children: [
      {
        path: 'vendor',
        component: () => import('@/views/vendor/list'),
        name: 'All Vendors',
        meta: {
          title: 'All Vendors'
        }
      },
      {
        path: 'editVendor',
        component: () => import('@/views/vendor/edit'),
        name: 'EditVendor',
        meta: { title: 'Edit Vendor', noCache: true, activeMenu: '/vendor/list' },
        hidden: true
      },
      {
        path: 'deals/list',
        component: () => import('@/views/vendor/deals/list'),
        name: 'listDeals',
        meta: {
          title: 'Deals List'
        }
      },
      {
        path: 'deals/editDeals',
        component: () => import('@/views/vendor/deals/add'),
        hidden: true,
        name: 'EditDeals',
        meta: {
          title: 'Edit Deals', noCache: true, activeMenu: '/deals/list'
        }
      },
      {
        path: 'deals/addDeals',
        component: () => import('@/views/vendor/deals/add'),
        hidden: true,
        name: 'AddDeals',
        meta: {
          title: 'Add Deals', noCache: true, activeMenu: '/deals/list'
        }
      },
      {
        path: 'events/list',
        component: () => import('@/views/vendor/events/list'),
        name: 'listEvents',
        meta: {
          title: 'Events List'
        }
      },
      {
        path: 'events/detail',
        component: () => import('@/views/vendor/events/detail'),
        hidden: true,
        name: 'eventDetail',
        meta: {
          title: 'Event Detail', noCache: true, activeMenu: '/events/list'
        }
      },
      {
        path: 'events/editEvents',
        component: () => import('@/views/vendor/events/add'),
        hidden: true,
        name: 'EditEvents',
        meta: {
          title: 'Edit Events', noCache: true, activeMenu: '/events/list'
        }
      },
      {
        path: 'events/addEvents',
        component: () => import('@/views/vendor/events/add'),
        hidden: true,
        name: 'AddEvents',
        meta: {
          title: 'Add Events', noCache: true, activeMenu: '/events/list'
        }
      }

    ]
  }

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    hidden: true,
    alwaysShow: false, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock'
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission'
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/icon',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon', noCache: true }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,

  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    hidden: true,
    meta: {
      title: 'Example',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'Create Article', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'Article List', icon: 'list' }
      }
    ]
  },

  {
    path: '/tab',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'Tab', icon: 'tab' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    hidden: true,
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    meta: {
      roles: ['lei']
    },
    hidden: true,
    children: [
      {
        path: 'log',
        component: () => import('@/views/error-log/index'),
        name: 'ErrorLog',
        meta: { title: 'Error Log', icon: 'bug' }
      }
    ]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    hidden: true,
    meta: {
      title: 'Excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: 'Export Excel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel'),
        name: 'SelectExcel',
        meta: { title: 'Export Selected' }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/merge-header'),
        name: 'MergeHeader',
        meta: { title: 'Merge Header' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel'),
        name: 'UploadExcel',
        meta: { title: 'Upload Excel' }
      }
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    name: 'Zip',
    hidden: true,
    meta: { title: 'Zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index'),
        name: 'ExportZip',
        meta: { title: 'Export Zip' }
      }
    ]
  },

  {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf/index'),
        name: 'PDF',
        meta: { title: 'PDF', icon: 'pdf' }
      }
    ]
  },
  {
    path: '/pdf/download',
    component: () => import('@/views/pdf/download'),
    hidden: true
  },

  {
    path: '/theme',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: 'Theme', icon: 'theme' }
      }
    ]
  },

  {
    path: '/clipboard',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: 'Clipboard', icon: 'clipboard' }
      }
    ]
  },

  {
    path: 'external-link',
    hidden: true,
    component: Layout,
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
