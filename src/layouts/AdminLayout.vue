<template>
  <div class="admin-layout">

    <!-- =========================
         MOBILE TOP BAR
    ========================== -->

    <header class="mobile-header">

      <button
        type="button"
        class="menu-button"
        @click="toggleSidebar"
        aria-label="Open admin menu"
      >
        ☰
      </button>

      <RouterLink
        to="/admin"
        class="mobile-brand"
      >
        📚 BookNest
      </RouterLink>

    </header>


    <!-- =========================
         SIDEBAR
    ========================== -->

    <aside
      class="sidebar"
      :class="{ 'sidebar-open': sidebarOpen }"
    >

      <div class="sidebar-inner">

        <!-- Brand -->

        <div class="sidebar-brand">

          <RouterLink
            to="/admin"
            class="brand-link"
          >
            <span class="brand-icon">
              📚
            </span>

            <span>
              BookNest
            </span>
          </RouterLink>

        </div>


        <!-- Navigation -->

        <nav class="sidebar-nav">

          <p class="nav-label">
            MAIN
          </p>


          <!-- Dashboard -->

          <RouterLink
            to="/admin"
            class="nav-link"
            active-class="active"
            @click="closeSidebar"
          >
            <span class="nav-icon">
              📊
            </span>

            <span>
              Dashboard
            </span>
          </RouterLink>


          <!-- Books -->

          <RouterLink
            to="/admin/books"
            class="nav-link"
            active-class="active"
            @click="closeSidebar"
          >
            <span class="nav-icon">
              📚
            </span>

            <span>
              Books
            </span>
          </RouterLink>


          <!-- Authors -->

          <RouterLink
            to="/admin/authors"
            class="nav-link"
            active-class="active"
            @click="closeSidebar"
          >
            <span class="nav-icon">
              ✍️
            </span>

            <span>
              Authors
            </span>
          </RouterLink>


          <p class="nav-label second-label">
            WEBSITE
          </p>


          <!-- Public Website -->

          <RouterLink
            to="/"
            class="nav-link"
            @click="closeSidebar"
          >
            <span class="nav-icon">
              🌐
            </span>

            <span>
              Back to Website
            </span>
          </RouterLink>

        </nav>


        <!-- User Area -->

        <div class="sidebar-bottom">

          <div class="user-card">

            <div class="user-avatar">
              A
            </div>

            <div class="user-info">

              <strong>
                {{ authStore.user?.username || 'Admin' }}
              </strong>

              <small>
                Administrator
              </small>

            </div>

          </div>


          <!-- Logout -->

          <button
            type="button"
            class="logout-button"
            @click="handleLogout"
          >
            <span>
              🚪
            </span>

            Logout
          </button>

        </div>

      </div>

    </aside>


    <!-- =========================
         MOBILE OVERLAY
    ========================== -->

    <div
      v-if="sidebarOpen"
      class="sidebar-overlay"
      @click="closeSidebar"
    ></div>


    <!-- =========================
         MAIN CONTENT
    ========================== -->

    <main class="admin-main">

      <div class="admin-content">

        <RouterView />

      </div>

    </main>

  </div>
</template>


<script setup>

import {
  ref
} from 'vue'

import {
  useRouter
} from 'vue-router'

import {
  useAuthStore
} from '../stores/auth'


const router = useRouter()

const authStore = useAuthStore()


const sidebarOpen = ref(false)


function toggleSidebar() {

  sidebarOpen.value =
    !sidebarOpen.value

}


function closeSidebar() {

  sidebarOpen.value = false

}


function handleLogout() {

  authStore.logout()

  closeSidebar()

  router.push('/login')

}

</script>


<style scoped>

.admin-layout {
  min-height: 100vh;

  background: #f8f9fa;
}


/* ========================================
   SIDEBAR
======================================== */

.sidebar {
  position: fixed;

  top: 0;
  left: 0;
  bottom: 0;

  width: 255px;

  background: #ffffff;

  border-right: 1px solid #e9ecef;

  z-index: 2000;
}


.sidebar-inner {
  height: 100%;

  display: flex;

  flex-direction: column;
}


/* Brand */

.sidebar-brand {
  height: 75px;

  display: flex;

  align-items: center;

  padding: 0 22px;

  border-bottom: 1px solid #e9ecef;
}


.brand-link {
  display: flex;

  align-items: center;

  gap: 10px;

  color: #212529;

  text-decoration: none;

  font-size: 20px;

  font-weight: 700;
}


.brand-icon {
  width: 38px;
  height: 38px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 10px;

  background: #e7f1ff;

  font-size: 20px;
}


/* Navigation */

.sidebar-nav {
  flex: 1;

  padding: 25px 15px;
}


.nav-label {
  margin: 0 12px 10px;

  color: #adb5bd;

  font-size: 11px;

  font-weight: 700;

  letter-spacing: 1.5px;
}


.second-label {
  margin-top: 30px;
}


.nav-link {
  display: flex;

  align-items: center;

  gap: 12px;

  padding: 12px 14px;

  margin-bottom: 5px;

  border-radius: 10px;

  color: #495057;

  text-decoration: none;

  font-size: 14px;

  font-weight: 500;

  transition:
    background 0.2s ease,
    color 0.2s ease;
}


.nav-link:hover {
  background: #f1f5f9;

  color: #0d6efd;
}


.nav-link.active {
  background: #e7f1ff;

  color: #0d6efd;

  font-weight: 600;
}


.nav-icon {
  width: 24px;

  text-align: center;

  font-size: 18px;
}


/* Bottom */

.sidebar-bottom {
  padding: 15px;

  border-top: 1px solid #e9ecef;
}


.user-card {
  display: flex;

  align-items: center;

  gap: 10px;

  padding: 10px;

  margin-bottom: 10px;
}


.user-avatar {
  width: 40px;
  height: 40px;

  border-radius: 50%;

  background: #0d6efd;

  color: white;

  display: flex;

  align-items: center;

  justify-content: center;

  font-weight: 700;
}


.user-info {
  display: flex;

  flex-direction: column;
}


.user-info strong {
  font-size: 13px;
}


.user-info small {
  color: #6c757d;

  font-size: 11px;
}


.logout-button {
  width: 100%;

  border: none;

  background: #fff5f5;

  color: #dc3545;

  padding: 11px 14px;

  border-radius: 10px;

  text-align: left;

  display: flex;

  gap: 10px;

  align-items: center;

  font-size: 14px;

  cursor: pointer;
}


.logout-button:hover {
  background: #ffe3e3;
}


/* ========================================
   MAIN
======================================== */

.admin-main {
  min-height: 100vh;

  margin-left: 255px;
}


.admin-content {
  min-height: 100vh;
}


/* ========================================
   MOBILE HEADER
======================================== */

.mobile-header {
  display: none;
}


/* ========================================
   OVERLAY
======================================== */

.sidebar-overlay {
  display: none;
}


/* ========================================
   MOBILE
======================================== */

@media (max-width: 991px) {

  .sidebar {
    transform: translateX(-100%);

    transition: transform 0.25s ease;
  }


  .sidebar.sidebar-open {
    transform: translateX(0);
  }


  .admin-main {
    margin-left: 0;

    padding-top: 65px;
  }


  .mobile-header {
    position: fixed;

    top: 0;
    left: 0;
    right: 0;

    height: 65px;

    background: white;

    border-bottom: 1px solid #e9ecef;

    display: flex;

    align-items: center;

    gap: 15px;

    padding: 0 18px;

    z-index: 1500;
  }


  .menu-button {
    border: none;

    background: transparent;

    font-size: 24px;

    cursor: pointer;
  }


  .mobile-brand {
    color: #212529;

    text-decoration: none;

    font-weight: 700;

    font-size: 18px;
  }


  .sidebar-overlay {
    position: fixed;

    inset: 0;

    display: block;

    background: rgba(0, 0, 0, 0.35);

    z-index: 1900;
  }

}

</style>

