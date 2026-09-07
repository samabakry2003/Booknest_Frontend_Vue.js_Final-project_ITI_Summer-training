import { defineStore } from 'pinia'

const STORAGE_KEY = 'booknest_auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null
  }),

  actions: {

    // ========================================
    // INITIALIZE AUTH FROM SESSION STORAGE
    // ========================================

    initialize() {

      const savedAuth =
        sessionStorage.getItem(STORAGE_KEY)

      if (!savedAuth) {
        return
      }

      try {

        const authData =
          JSON.parse(savedAuth)

        this.isAuthenticated =
          Boolean(authData.isAuthenticated)

        this.user =
          authData.user || null

      } catch (error) {

        console.error(
          'Failed to restore authentication:',
          error
        )

        sessionStorage.removeItem(STORAGE_KEY)

      }

    },


    // ========================================
    // LOGIN
    // ========================================

    login(username, password) {

      const validCredentials =
        username === 'admin' &&
        password === 'admin123'

      if (!validCredentials) {

        this.isAuthenticated = false
        this.user = null

        return false

      }


      this.isAuthenticated = true

      this.user = {
        username: 'admin',
        role: 'admin'
      }


      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          isAuthenticated: true,
          user: this.user
        })
      )


      return true

    },


    // ========================================
    // LOGOUT
    // ========================================

    logout() {

      this.isAuthenticated = false
      this.user = null

      sessionStorage.removeItem(STORAGE_KEY)

    }

  }
})

