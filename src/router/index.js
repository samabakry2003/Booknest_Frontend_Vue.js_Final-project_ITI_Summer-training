import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '../stores/auth'

// ========================================
// LAYOUTS
// ========================================

import PublicLayout from '../layouts/PublicLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'

// ========================================
// PUBLIC PAGES
// ========================================

import HomeView from '../views/public/HomeView.vue'
import BooksView from '../views/public/BooksView.vue'
import BookDetailsView from '../views/public/BookDetailsView.vue'
import AuthorsView from '../views/public/AuthorsView.vue'
import AboutView from '../views/public/AboutView.vue'
import LoginView from '../views/public/LoginView.vue'

// ========================================
// ADMIN PAGES
// ========================================

import DashboardView from '../views/admin/DashboardView.vue'
import BooksManagementView from '../views/admin/BooksManagementView.vue'
import BookFormView from '../views/admin/BookFormView.vue'
import AuthorsManagementView from '../views/admin/AuthorsManagementView.vue'

// ========================================
// ROUTER
// ========================================

const router = createRouter({
  history: createWebHistory(),

  // Always start the new page from the top
  scrollBehavior() {
    return {
      top: 0
    }
  },

  routes: [

    // ====================================
    // PUBLIC
    // ====================================

    {
      path: '/',
      component: PublicLayout,

      children: [

        // Home
        {
          path: '',
          name: 'home',
          component: HomeView
        },

        // Books
        {
          path: 'books',
          name: 'books',
          component: BooksView
        },

        // Book Details
        {
          path: 'books/:id',
          name: 'book-details',
          component: BookDetailsView
        },

        // Authors
        {
          path: 'authors',
          name: 'authors',
          component: AuthorsView
        },

        // Author Details
        {
          path: 'authors/:id',
          name: 'author-details',
          component: () =>
            import('../views/public/AuthorDetailsView.vue')
        },

        // About
        {
          path: 'about',
          name: 'about',
          component: AboutView
        },

        // Login
        {
          path: 'login',
          name: 'login',
          component: LoginView
        }

      ]
    },


    // ====================================
    // ADMIN
    // ====================================

    {
      path: '/admin',
      component: AdminLayout,

      meta: {
        requiresAuth: true
      },

      children: [

        // Dashboard
        {
          path: '',
          name: 'admin',
          component: DashboardView
        },

        // ====================================
        // BOOKS
        // ====================================

        {
          path: 'books',
          name: 'admin-books',
          component: BooksManagementView
        },

        // Add Book
        {
          path: 'books/new',
          name: 'admin-books-new',
          component: BookFormView
        },

        // Edit Book
        {
          path: 'books/:id/edit',
          name: 'admin-books-edit',
          component: BookFormView
        },

        // ====================================
        // AUTHORS
        // ====================================

        {
          path: 'authors',
          name: 'admin-authors',
          component: AuthorsManagementView
        },

        // Add Author
        {
          path: 'authors/new',
          name: 'admin-authors-new',
          component: () =>
            import('../views/admin/AuthorFormView.vue')
        },

        // Edit Author
        {
          path: 'authors/:id/edit',
          name: 'admin-authors-edit',
          component: () =>
            import('../views/admin/AuthorFormView.vue')
        }

      ]
    }

  ]
})


// ========================================
// AUTH GUARD
// ========================================

router.beforeEach((to) => {

  const authStore = useAuthStore()

  // Restore authentication from sessionStorage
  authStore.initialize()


  // ----------------------------------------
  // Protect Admin Routes
  // ----------------------------------------

  if (
    to.meta.requiresAuth &&
    !authStore.isAuthenticated
  ) {

    return {
      name: 'login',

      query: {
        redirect: to.fullPath
      }
    }

  }


  // ----------------------------------------
  // Prevent Logged-in User From Login Page
  // ----------------------------------------

  if (
    to.name === 'login' &&
    authStore.isAuthenticated
  ) {

    return {
      name: 'admin'
    }

  }

})


export default router