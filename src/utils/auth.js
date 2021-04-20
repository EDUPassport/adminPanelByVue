import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const RolesKey = 'Admin-Roles'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getRoles() {
  const json_str = Cookies.get(RolesKey)
  // console.log(json_str)
  if (json_str !== undefined) {
    return JSON.parse(json_str)
  } else {
    return []
  }
}

export function setRoles(roles) {
  // console.log(JSON.stringify(roles))
  const str = JSON.stringify(roles)
  return Cookies.set(RolesKey, str)
}

export function removeRoles() {
  return Cookies.remove(RolesKey)
}
