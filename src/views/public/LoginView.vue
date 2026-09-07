<template>
  <section class="login-page">

    <div class="login-container">

      <div class="login-card">

        <!-- =========================
             LOGO
        ========================== -->

        <div class="text-center mb-4">

          <div class="brand-icon">
            📚
          </div>

          <h1 class="fw-bold">
            Welcome Back
          </h1>

          <p class="text-secondary mb-0">
            Sign in to access the BookNest admin dashboard.
          </p>

        </div>


        <!-- =========================
             LOGIN FORM
        ========================== -->

        <form
          @submit.prevent="handleLogin"
          novalidate
        >

          <!-- Username -->

          <div class="mb-3">

            <label
              for="username"
              class="form-label"
            >
              Username
            </label>

            <input
              id="username"
              v-model="username"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errorMessage }"
              placeholder="Enter username"
              autocomplete="username"
              :aria-invalid="!!errorMessage"
              aria-describedby="loginError"
            />

          </div>


          <!-- Password -->

          <div class="mb-3">

            <label
              for="password"
              class="form-label"
            >
              Password
            </label>

            <input
              id="password"
              v-model="password"
              type="password"
              class="form-control"
              :class="{ 'is-invalid': errorMessage }"
              placeholder="Enter password"
              autocomplete="current-password"
              :aria-invalid="!!errorMessage"
              aria-describedby="loginError"
            />

          </div>


          <!-- Error -->

          <div
            v-if="errorMessage"
            id="loginError"
            class="alert alert-danger"
            role="alert"
          >
            {{ errorMessage }}
          </div>


          <!-- Sign In -->

          <button
            type="submit"
            class="btn btn-primary w-100"
            :disabled="isSubmitting"
          >

            <span
              v-if="isSubmitting"
              class="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>

            {{
              isSubmitting
                ? 'Signing in...'
                : 'Sign In'
            }}

          </button>

        </form>


        <!-- =========================
             BACK TO WEBSITE
        ========================== -->

        <div class="text-center mt-4">

          <RouterLink
            to="/"
            class="back-link"
          >
            ← Back to BookNest
          </RouterLink>

        </div>

      </div>

    </div>

  </section>
</template>


<script setup>

import { ref } from 'vue'

import { useRouter } from 'vue-router'

import { useAuthStore } from '../../stores/auth'


const router = useRouter()

const authStore = useAuthStore()


// ========================================
// FORM STATE
// ========================================

const username = ref('')

const password = ref('')

const errorMessage = ref('')

const isSubmitting = ref(false)


// ========================================
// LOGIN
// ========================================

function handleLogin() {

  errorMessage.value = ''


  // Validate username

  if (!username.value.trim()) {

    errorMessage.value =
      'Please enter your username.'

    return

  }


  // Validate password

  if (!password.value) {

    errorMessage.value =
      'Please enter your password.'

    return

  }


  isSubmitting.value = true


  // Try login

  const success =
    authStore.login(
      username.value.trim(),
      password.value
    )


  if (!success) {

    errorMessage.value =
      'Invalid username or password.'

    isSubmitting.value = false

    return

  }


  // Login successful

  router.push('/admin')

}

</script>


<style scoped>

.login-page {
  min-height: 100vh;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 40px 15px;

  background:
    linear-gradient(
      135deg,
      #eef5ff,
      #ffffff
    );
}


.login-container {
  width: 100%;

  max-width: 460px;
}


.login-card {
  background: white;

  border:
    1px solid #e9ecef;

  border-radius: 22px;

  padding: 40px;

  box-shadow:
    0 15px 45px
    rgba(0, 0, 0, 0.08);
}


/* Logo */

.brand-icon {
  width: 70px;

  height: 70px;

  margin: 0 auto 20px;

  border-radius: 20px;

  background: #e7f1ff;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 35px;
}


/* Form */

.form-label {
  font-weight: 600;

  margin-bottom: 8px;
}


.form-control {
  min-height: 48px;

  border-radius: 10px;
}


.form-control:focus {
  box-shadow:
    0 0 0 3px
    rgba(13, 110, 253, 0.1);
}


/* Back link */

.back-link {
  color: #0d6efd;

  text-decoration: none;

  font-weight: 500;
}


.back-link:hover {
  text-decoration: underline;
}


/* Mobile */

@media (max-width: 576px) {

  .login-page {
    padding: 25px 15px;
  }


  .login-card {
    padding: 28px 20px;
  }

}

</style>