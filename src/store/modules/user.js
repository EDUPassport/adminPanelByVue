import { login, logout } from '@/api/admin'
import { getToken, setToken, removeToken, setRoles, getRoles, removeRoles } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: 'https://cdn.jsdelivr.net/gh/unilei/images@master/20220321/xxx.6ir2zvqa3l00.webp',
  introduction: '',
  roles: getRoles()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { admin_name, admin_pwd } = userInfo
    return new Promise((resolve, reject) => {
      login({ admin_name: admin_name.trim(), admin_pwd: admin_pwd }).then(response => {
        const data = response.message.data
        const roles = []
        roles.push(data.info.account)
        const name = data.info.account
        const avatar = 'https://cdn.jsdelivr.net/gh/unilei/images@master/20220321/xxx.6ir2zvqa3l00.webp'
        const introduction = data.info.realname

        commit('SET_TOKEN', data.token)
        setToken(data.token)

        setTimeout(function () {
          console.log('token time expired')
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          removeRoles()
          router.push('/login')

          resolve()
        },86400000)

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        setRoles(roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     console.log('get info')
  //   })
  // },
  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        removeRoles()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      removeRoles()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const roles = await getRoles()
    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
