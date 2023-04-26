import {useUser} from '../stores/user.js'

const u = useUser()
export default defineNuxtRouteMiddleware((to, from) => {
    // isAuthenticated() is an example method verifying if a user is authenticated
    if (!u.isAuthenticated) {
      return navigateTo('/login')
    }
  })