<template>

  <div
    class="public-layout"
    :class="{ 'dark-mode': isDarkMode }"
  >

    <!-- =========================
         NAVBAR
    ========================== -->

    <nav class="navbar navbar-expand-lg site-navbar sticky-top">

      <div class="container">

        <!-- Logo -->

        <RouterLink
          to="/"
          class="navbar-brand fw-bold brand"
        >

          <span class="brand-icon">
            📚
          </span>

          <span class="brand-text">
            BookNest
          </span>

        </RouterLink>


        <!-- Right Controls -->

        <div class="d-flex align-items-center gap-2">

          <!-- Dark Mode Button -->

          <button
            type="button"
            class="theme-btn"
            :aria-label="
              isDarkMode
                ? 'Switch to light mode'
                : 'Switch to dark mode'
            "
            :title="
              isDarkMode
                ? 'Switch to light mode'
                : 'Switch to dark mode'
            "
            @click="toggleDarkMode"
          >

            <span v-if="isDarkMode">
              ☀️
            </span>

            <span v-else>
              🌙
            </span>

          </button>


          <!-- Mobile Toggle -->

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >

            <span class="navbar-toggler-icon"></span>

          </button>

        </div>


        <!-- Navigation -->

        <div
          id="mainNavbar"
          class="collapse navbar-collapse"
        >

          <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-2">

            <!-- Home -->

            <li class="nav-item">

              <RouterLink
                to="/"
                class="nav-link"
                active-class="active"
              >
                Home
              </RouterLink>

            </li>


            <!-- Books -->

            <li class="nav-item">

              <RouterLink
                to="/books"
                class="nav-link"
                active-class="active"
              >
                Books
              </RouterLink>

            </li>


            <!-- Authors -->

            <li class="nav-item">

              <RouterLink
                to="/authors"
                class="nav-link"
                active-class="active"
              >
                Authors
              </RouterLink>

            </li>


            <!-- About -->

            <li class="nav-item">

              <RouterLink
                to="/about"
                class="nav-link"
                active-class="active"
              >
                About
              </RouterLink>

            </li>


            <!-- Admin -->

            <li class="nav-item ms-lg-2">

              <RouterLink
                to="/admin"
                class="btn admin-btn"
              >

                <span>
                  ⚙️
                </span>

                Admin Dashboard

              </RouterLink>

            </li>

          </ul>

        </div>

      </div>

    </nav>


    <!-- =========================
         PAGE CONTENT
    ========================== -->

    <main class="main-content">

      <RouterView />

    </main>


    <!-- =========================
         FOOTER
    ========================== -->

    <footer class="footer">

      <div class="container">

        <div class="row g-4">

          <!-- Brand -->

          <div class="col-md-6">

            <h5 class="fw-bold footer-brand">

              📚 BookNest

            </h5>

            <p class="footer-description mb-0">

              Discover books, explore authors,
              and find your next great story.

            </p>

          </div>


          <!-- Quick Links -->

          <div class="col-md-3">

            <h6 class="fw-bold footer-title">
              Explore
            </h6>

            <ul class="footer-links">

              <li>

                <RouterLink to="/books">
                  Books
                </RouterLink>

              </li>

              <li>

                <RouterLink to="/authors">
                  Authors
                </RouterLink>

              </li>

              <li>

                <RouterLink to="/about">
                  About
                </RouterLink>

              </li>

            </ul>

          </div>


          <!-- Admin -->

          <div class="col-md-3">

            <h6 class="fw-bold footer-title">
              Management
            </h6>

            <ul class="footer-links">

              <li>

                <RouterLink to="/admin">
                  Admin Dashboard
                </RouterLink>

              </li>

            </ul>

          </div>

        </div>


        <hr class="footer-line my-4">


        <div class="text-center footer-bottom">

          © {{ currentYear }} BookNest.
          All rights reserved.

        </div>

      </div>

    </footer>

  </div>

</template>


<script setup>

import { ref, onMounted } from 'vue'


// ========================================
// CURRENT YEAR
// ========================================

const currentYear =
  new Date().getFullYear()


// ========================================
// DARK MODE
// ========================================

const isDarkMode =
  ref(false)


// ========================================
// LOAD SAVED THEME
// ========================================

onMounted(() => {

  const savedTheme =
    localStorage.getItem('booknest-theme')

  if (savedTheme === 'dark') {

    isDarkMode.value = true

  } else {

    isDarkMode.value = false

  }

})


// ========================================
// TOGGLE THEME
// ========================================

function toggleDarkMode() {

  isDarkMode.value =
    !isDarkMode.value


  localStorage.setItem(
    'booknest-theme',
    isDarkMode.value
      ? 'dark'
      : 'light'
  )

}

</script>


<style scoped>

/* ========================================
   LAYOUT
======================================== */

.public-layout {

  min-height: 100vh;

  display: flex;

  flex-direction: column;

  background: #f8f9fa;

  color: #212529;

  transition:
    background 0.3s ease,
    color 0.3s ease;

}


.main-content {

  flex: 1;

}


/* ========================================
   NAVBAR
======================================== */

.site-navbar {

  min-height: 72px;

  background: rgba(255, 255, 255, 0.94);

  backdrop-filter: blur(12px);

  border-bottom:
    1px solid #e9ecef;

  transition:
    background 0.3s ease,
    border-color 0.3s ease;

}


/* ========================================
   BRAND
======================================== */

.brand {

  display: inline-flex;

  align-items: center;

  gap: 10px;

  color: #0d6efd !important;

  text-decoration: none;

  font-size: 24px;

  letter-spacing: -0.5px;

}


.brand-icon {

  width: 42px;

  height: 42px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 12px;

  background: #0d6efd;

  font-size: 20px;

}


.brand-text {

  font-weight: 800;

}


/* ========================================
   NAVIGATION
======================================== */

.nav-link {

  color: #495057 !important;

  font-weight: 500;

  padding: 8px 14px !important;

  border-radius: 8px;

  transition:
    background 0.2s ease,
    color 0.2s ease;

}


.nav-link:hover {

  color: #0d6efd !important;

  background: #eef5ff;

}


.nav-link.active {

  color: #0d6efd !important;

  background: #eef5ff;

  font-weight: 600;

}


/* ========================================
   DARK MODE BUTTON
======================================== */

.theme-btn {

  width: 42px;

  height: 42px;

  border: 1px solid #dee2e6;

  border-radius: 50%;

  background: #ffffff;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 18px;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    background 0.3s ease,
    border-color 0.3s ease;

}


.theme-btn:hover {

  transform: rotate(15deg) scale(1.08);

  background: #f1f3f5;

}


/* ========================================
   MOBILE TOGGLE
======================================== */

.navbar-toggler {

  border: none;

  padding: 8px 10px;

  box-shadow: none !important;

}


/* ========================================
   ADMIN BUTTON
======================================== */

.admin-btn {

  display: inline-flex;

  align-items: center;

  gap: 7px;

  padding: 9px 16px;

  border-radius: 9px;

  background: #0d6efd;

  color: white !important;

  font-weight: 600;

  transition:
    transform 0.2s ease,
    background 0.2s ease;

}


.admin-btn:hover {

  background: #0b5ed7;

  color: white !important;

  transform: translateY(-2px);

}


/* ========================================
   FOOTER
======================================== */

.footer {

  background: #ffffff;

  border-top:
    1px solid #e9ecef;

  padding:
    45px 0 25px;

  margin-top: 60px;

  transition:
    background 0.3s ease,
    border-color 0.3s ease;

}


.footer-brand {

  color: #212529;

}


.footer-description {

  color: #6c757d;

  line-height: 1.7;

}


.footer-title {

  color: #212529;

}


.footer-links {

  list-style: none;

  padding: 0;

  margin: 15px 0 0;

}


.footer-links li {

  margin-bottom: 8px;

}


.footer-links a {

  color: #6c757d;

  text-decoration: none;

  transition: color 0.2s ease;

}


.footer-links a:hover {

  color: #0d6efd;

}


.footer-line {

  border-color: #e9ecef;

}


.footer-bottom {

  color: #6c757d;

  font-size: 13px;

}


/* ========================================
   DARK MODE
======================================== */

.dark-mode {

  background: #111827;

  color: #f8f9fa;

}


.dark-mode .site-navbar {

  background: rgba(17, 24, 39, 0.95);

  border-bottom-color:
    #374151;

}


.dark-mode .brand {

  color: #60a5fa !important;

}


.dark-mode .brand-icon {

  background: #2563eb;

}


.dark-mode .nav-link {

  color: #d1d5db !important;

}


.dark-mode .nav-link:hover {

  color: #60a5fa !important;

  background: #1f2937;

}


.dark-mode .nav-link.active {

  color: #60a5fa !important;

  background: #1f2937;

}


.dark-mode .theme-btn {

  background: #1f2937;

  border-color: #4b5563;

}


.dark-mode .theme-btn:hover {

  background: #374151;

}


.dark-mode .navbar-toggler {

  color: white;

}


.dark-mode .admin-btn {

  background: #2563eb;

}


.dark-mode .admin-btn:hover {

  background: #1d4ed8;

}


.dark-mode .footer {

  background: #0f172a;

  border-top-color: #374151;

}


.dark-mode .footer-brand {

  color: #f8f9fa;

}


.dark-mode .footer-title {

  color: #f8f9fa;

}


.dark-mode .footer-description {

  color: #9ca3af;

}


.dark-mode .footer-links a {

  color: #9ca3af;

}


.dark-mode .footer-links a:hover {

  color: #60a5fa;

}


.dark-mode .footer-line {

  border-color: #374151;

}


.dark-mode .footer-bottom {

  color: #6b7280;

}


/* ========================================
   MOBILE
======================================== */

@media (max-width: 991px) {

  .navbar-nav {

    padding: 15px 0;

  }


  .nav-link {

    padding: 10px 12px !important;

  }


  .admin-btn {

    display: inline-flex;

    margin-top: 8px;

  }

}


@media (max-width: 576px) {

  .brand-text {

    font-size: 20px;

  }


  .brand-icon {

    width: 38px;

    height: 38px;

    font-size: 18px;

  }


  .theme-btn {

    width: 38px;

    height: 38px;

    font-size: 16px;

  }

}

</style>
