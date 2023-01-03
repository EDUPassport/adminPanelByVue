import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
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
      },

      {
        path: 'system/tags',
        component: () => import('@/views/config/system/tags'),
        name: 'Tags',
        meta: {
          title: 'Tags'
        }
      },
      {
        path: 'subcate/list',
        component: () => import('@/views/config/subcate/list'),
        name: 'Profile & Sub Category',
        meta: {
          title: 'Profile & Sub Category'
        }
      },
      {
        path: 'vip/list',
        component: () => import('@/views/config/vip/list'),
        name: 'Membership plans',
        meta: {
          title: 'Membership plans'
        }
      },
      {
        path: 'vip/edit',
        hidden: true,
        component: () => import('@/views/config/vip/edit'),
        name: 'Edit Membership plan',
        meta: {
          title: 'Edit Membership plan'
        }
      },
      {
        path: 'menu/list',
        component: () => import('@/views/config/menu/list'),
        name: 'menuList',
        meta: {
          title: 'Menu List'
        }
      },

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
        hidden: true,
        meta: {
          title: 'Purchased Ads'
        }
      },
      {
        path: 'purchase/review',
        component: () => import('@/views/ads/purchase/review'),
        name: 'Redeemed Ad Review',
        hidden: true,
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
      },
      {
        path: 'subIdentity',
        component: () => import('@/views/category/subIdentity'),
        name: 'User Category',
        meta: {
          title: 'User Category'
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
      },
      {
        path: 'events/list',
        component: () => import('@/views/events/list'),
        name: 'educatorEventsList',
        meta: {
          title: 'Events List'
        }
      },
      {
        path: 'events/detail',
        component: () => import('@/views/events/detail'),
        hidden: true,
        name: 'educatorEventDetail',
        meta: {
          title: 'Event Detail', noCache: true, activeMenu: '/educator/events/list'
        }
      },
      {
        path: 'events/editEvents',
        component: () => import('@/views/events/add'),
        hidden: true,
        name: 'educatorEditEvents',
        meta: {
          title: 'Edit Events', noCache: true, activeMenu: '/educator/events/list'
        }
      },
      {
        path: 'events/addEvents',
        component: () => import('@/views/events/add'),
        hidden: true,
        name: 'educatorAddEvents',
        meta: {
          title: 'Add Events', noCache: true, activeMenu: '/educator/events/list'
        }
      },

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
        hidden: true,
        component: () => import('@/views/business/list'),
        name: 'All Businesses',
        meta: {
          title: 'All Businesses'
        }
      },
      {
        path: 'recruiter',
        component: () => import('@/views/business/recruiter'),
        name: 'recruiterList',
        meta: {
          title: 'All Recruiter'
        }
      },
      {
        path: 'school',
        component: () => import('@/views/business/school'),
        name: 'schoolList',
        meta: {
          title: 'All School'
        }
      },
      {
        path: 'other',
        component: () => import('@/views/business/other'),
        name: 'otherList',
        meta: {
          title: 'All Other'
        }
      },
      {
        path: 'filterJobs',
        component: () => import('@/views/business/filterJobs'),
        name: 'Business Filter Jobs',
        hidden: true,
        meta: {
          title: 'Business Filter Jobs',
          activeMenu: '/business/list'
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
      },
      {
        path: 'events/list',
        component: () => import('@/views/events/list'),
        name: 'businessEventsList',
        meta: {
          title: 'Events List'
        }
      },
      {
        path: 'events/detail',
        component: () => import('@/views/events/detail'),
        hidden: true,
        name: 'businessEventDetail',
        meta: {
          title: 'Event Detail', noCache: true, activeMenu: '/business/events/list'
        }
      },
      {
        path: 'events/editEvents',
        component: () => import('@/views/events/add'),
        hidden: true,
        name: 'businessEditEvents',
        meta: {
          title: 'Edit Events', noCache: true, activeMenu: '/business/events/list'
        }
      },
      {
        path: 'events/addEvents',
        component: () => import('@/views/events/add'),
        hidden: true,
        name: 'businessAddEvents',
        meta: {
          title: 'Add Events', noCache: true, activeMenu: '/business/events/list'
        }
      },

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
          title: 'Edit Deals', noCache: true, activeMenu: '/vendor/deals/list'
        }
      },
      {
        path: 'deals/addDeals',
        component: () => import('@/views/vendor/deals/add'),
        hidden: true,
        name: 'AddDeals',
        meta: {
          title: 'Add Deals', noCache: true, activeMenu: '/vendor/deals/list'
        }
      },
      {
        path: 'events/list',
        component: () => import('@/views/events/list'),
        name: 'vendorEventsList',
        meta: {
          title: 'Events List'
        }
      },
      {
        path: 'events/detail',
        component: () => import('@/views/events/detail'),
        hidden: true,
        name: 'vendorEventDetail',
        meta: {
          title: 'Event Detail', noCache: true, activeMenu: '/vendor/events/list'
        }
      },
      {
        path: 'events/editEvents',
        component: () => import('@/views/events/add'),
        hidden: true,
        name: 'vendorEditEvents',
        meta: {
          title: 'Edit Events', noCache: true, activeMenu: '/vendor/events/list'
        }
      },
      {
        path: 'events/addEvents',
        component: () => import('@/views/events/add'),
        hidden: true,
        name: 'vendorAddEvents',
        meta: {
          title: 'Add Events', noCache: true, activeMenu: '/vendor/events/list'
        }
      },
      {
        path: 'logo',
        component: () => import('@/views/vendor/logo/list'),
        hidden: false,
        name: 'logoList',
        meta: {
          title: "Logo List", noCache: true, activeMenu: '/vendor/logo/list'
        }
      }

    ]
  },
  {
    path: '/admin/user',
    component: Layout,
    redirect: '/admin/user/list',
    alwaysShow: true, // will always show the root menu
    name: 'Admin User',
    meta: {
      title: 'Admin User',
      icon: 'list'
    },
    children: [
      {
        path: 'user/list',
        component: () => import('@/views/admin/user/list'),
        name: 'Admin Users',
        meta: {
          title: 'Admin Users'
        }
      }

    ]
  },
  {
    path: '/lama',
    component: Layout,
    redirect: '/lama/list',
    hidden: true,
    name: 'Lama List',
    meta: {
      title: 'Lama',
      icon: 'list'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/lama/list'),
        name: 'Lama Users',
        meta: {
          title: 'Lama Users'
        }
      }

    ]
  },
  {
    path: '/promo',
    component: Layout,
    redirect: '/promo/code',
    alwaysShow: true, // will always show the root menu
    name: 'PromoCode',
    meta: {
      title: 'Promo Code',
      icon: 'list'
    },
    children: [
      {
        path: 'code',
        component: () => import('@/views/promoCode/code'),
        name: 'promoCode',
        meta: {
          title: 'Promo Code'
        }
      },
      {
        path: 'usedList',
        component: () => import('@/views/promoCode/usedList'),
        name: 'usedList',
        hidden: true,
        meta: {
          title: 'Used List'
        }
      }
    ]
  },
  {
    path: '/subscribe',
    component: Layout,
    redirect: '/subscribe/email',
    alwaysShow: true, // will always show the root menu
    name: 'email',
    meta: {
      title: 'Email List',
      icon: 'list'
    },
    children: [
      {
        path: 'email',
        component: () => import('@/views/subscribe/email/email'),
        name: 'emailList',
        meta: {
          title: 'Email List'
        }
      }
    ]
  },
  {
    path: '/blog',
    component: Layout,
    redirect: '/blog/list',
    alwaysShow: true, // will always show the root menu
    name: 'blog',
    meta: {
      title: 'Blog List',
      icon: 'list'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/blog/list'),
        name: 'blogList',
        meta: {
          title: 'List'
        }
      },
      {
        path: 'form',
        component: () => import('@/views/blog/form'),
        name: 'blogForm',
        hidden:true,
        meta: {
          title: 'Blog Form',noCache: true, activeMenu: '/blog/list'
        }
      },
      {
        path: 'category/list',
        component: () => import('@/views/blog/category/list'),
        name: 'blogCategoryList',
        meta: {
          title: 'Category List'
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
  nestedRouter,
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
