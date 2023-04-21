import {useUser} from '../stores/user.js'

const user = useUser()
export default defineNuxtRouteMiddleware((to, from) => {
    // isAuthenticated() is an example method verifying if a user is authenticated
    if (user?.user?.verified === false || user?.user === null) {
      return navigateTo('/login')
    }
  })