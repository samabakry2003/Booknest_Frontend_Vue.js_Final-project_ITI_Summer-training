<template>
  <section class="author-form-page py-5">

    <div class="container">

      <!-- =========================================
           PAGE HEADER
      ========================================== -->

      <div class="page-header mb-4">

        <div>
          <span class="eyebrow">
            ADMIN PANEL
          </span>

          <h1 class="fw-bold mt-2 mb-1">
            {{ isEditMode ? 'Edit Author' : 'Add New Author' }}
          </h1>

          <p class="text-secondary mb-0">
            {{
              isEditMode
                ? 'Update the information of this author.'
                : 'Add a new author to your library.'
            }}
          </p>
        </div>

        <RouterLink
          to="/admin/authors"
          class="btn btn-outline-secondary"
        >
          ← Back to Authors
        </RouterLink>

      </div>


      <!-- =========================================
           LOADING
      ========================================== -->

      <div
        v-if="loadingAuthor"
        class="state-card"
      >

        <div
          class="spinner-border text-primary mb-3"
          role="status"
        >
          <span class="visually-hidden">
            Loading...
          </span>
        </div>

        <p class="mb-0">
          Loading author...
        </p>

      </div>


      <!-- =========================================
           FORM
      ========================================== -->

      <div
        v-else
        class="form-card"
      >

        <form
          @submit.prevent="submitForm"
          novalidate
        >

          <!-- =====================================
               NAME
          ====================================== -->

          <div class="mb-4">

            <label
              for="name"
              class="form-label"
            >
              Author Name
              <span class="required">*</span>
            </label>

            <input
              id="name"
              v-model="form.name"
              type="text"
              class="form-control"
              :class="{
                'is-invalid': errors.name
              }"
              placeholder="Enter author name"
              :aria-invalid="!!errors.name"
            />

            <div
              v-if="errors.name"
              class="invalid-feedback"
            >
              {{ errors.name }}
            </div>

          </div>


          <!-- =====================================
               BIO
          ====================================== -->

          <div class="mb-4">

            <label
              for="bio"
              class="form-label"
            >
              Biography
            </label>

            <textarea
              id="bio"
              v-model="form.bio"
              rows="6"
              maxlength="800"
              class="form-control"
              :class="{
                'is-invalid': errors.bio
              }"
              placeholder="Write a short biography..."
              :aria-invalid="!!errors.bio"
            ></textarea>

            <div class="character-count">
              {{ form.bio.length }} / 800
            </div>

            <div
              v-if="errors.bio"
              class="invalid-feedback"
            >
              {{ errors.bio }}
            </div>

          </div>


          <!-- =====================================
               AVATAR URL
          ====================================== -->

          <div class="mb-4">

            <label
              for="avatarUrl"
              class="form-label"
            >
              Avatar URL
            </label>

            <input
              id="avatarUrl"
              v-model="form.avatarUrl"
              type="url"
              class="form-control"
              :class="{
                'is-invalid': errors.avatarUrl
              }"
              placeholder="https://example.com/avatar.jpg"
              :aria-invalid="!!errors.avatarUrl"
            />

            <div
              v-if="errors.avatarUrl"
              class="invalid-feedback"
            >
              {{ errors.avatarUrl }}
            </div>

          </div>


          <!-- Avatar Preview -->

          <div
            v-if="form.avatarUrl && isValidUrl(form.avatarUrl)"
            class="avatar-preview mb-4"
          >

            <p class="preview-label">
              Preview
            </p>

            <img
              :src="form.avatarUrl"
              alt="Author avatar preview"
              @error="previewImageError = true"
            />

          </div>


          <!-- =====================================
               ERROR
          ====================================== -->

          <div
            v-if="submitError"
            class="alert alert-danger"
            role="alert"
          >
            {{ submitError }}
          </div>


          <!-- =====================================
               ACTIONS
          ====================================== -->

          <div class="form-actions">

            <RouterLink
              to="/admin/authors"
              class="btn btn-light"
            >
              Cancel
            </RouterLink>

            <button
              type="submit"
              class="btn btn-primary"
              :disabled="!isFormValid || submitting"
            >

              <span
                v-if="submitting"
                class="spinner-border spinner-border-sm me-2"
                role="status"
              ></span>

              {{
                submitting
                  ? (
                      isEditMode
                        ? 'Updating...'
                        : 'Saving...'
                    )
                  : (
                      isEditMode
                        ? 'Update Author'
                        : 'Create Author'
                    )
              }}

            </button>

          </div>

        </form>

      </div>

    </div>

  </section>
</template>


<script setup>

import {
  computed,
  onMounted,
  reactive,
  ref
} from 'vue'

import {
  useRoute,
  useRouter
} from 'vue-router'

import {
  useAuthorsStore
} from '../../stores/authors'


const route = useRoute()
const router = useRouter()

const authorsStore = useAuthorsStore()


// ========================================
// MODE
// ========================================

const isEditMode = computed(() => {
  return Boolean(route.params.id)
})


const currentAuthorId = computed(() => {
  return route.params.id
})


// ========================================
// FORM
// ========================================

const form = reactive({

  name: '',

  bio: '',

  avatarUrl: ''

})


// ========================================
// ERRORS
// ========================================

const errors = reactive({

  name: '',

  bio: '',

  avatarUrl: ''

})


// ========================================
// STATES
// ========================================

const loadingAuthor = ref(false)

const submitting = ref(false)

const submitError = ref('')

const previewImageError = ref(false)


// ========================================
// URL VALIDATION
// ========================================

function isValidUrl(value) {

  try {

    const url = new URL(value)

    return (
      url.protocol === 'http:' ||
      url.protocol === 'https:'
    )

  } catch {

    return false

  }

}


// ========================================
// CLEAR ERRORS
// ========================================

function clearErrors() {

  errors.name = ''

  errors.bio = ''

  errors.avatarUrl = ''

  submitError.value = ''

}


// ========================================
// VALIDATE
// ========================================

function validateForm() {

  clearErrors()


  // NAME

  const name =
    form.name.trim()


  if (!name) {

    errors.name =
      'Author name is required.'

  } else if (
    name.length < 2 ||
    name.length > 60
  ) {

    errors.name =
      'Name must be between 2 and 60 characters.'

  }


  // BIO

  if (form.bio.length > 800) {

    errors.bio =
      'Biography cannot exceed 800 characters.'

  }


  // AVATAR URL

  if (form.avatarUrl.trim()) {

    if (!isValidUrl(form.avatarUrl.trim())) {

      errors.avatarUrl =
        'Please enter a valid URL.'

    }

  }


  return Object.values(errors)
    .every(error => !error)

}


// ========================================
// FORM VALID STATE
// ========================================

const isFormValid = computed(() => {

  const nameLength =
    form.name.trim().length

  const validName =
    nameLength >= 2 &&
    nameLength <= 60

  const validBio =
    form.bio.length <= 800

  const validAvatar =
    !form.avatarUrl.trim() ||
    isValidUrl(form.avatarUrl.trim())

  return (
    validName &&
    validBio &&
    validAvatar
  )

})


// ========================================
// LOAD EXISTING AUTHOR
// ========================================

async function loadExistingAuthor() {

  if (!isEditMode.value) {
    return
  }


  loadingAuthor.value = true

  submitError.value = ''


  try {

    const author =
      await authorsStore.fetchById(
        currentAuthorId.value
      )


    if (!author) {

      submitError.value =
        'Author not found.'

      return

    }


    form.name =
      author.name || ''

    form.bio =
      author.bio || ''

    form.avatarUrl =
      author.avatarUrl || ''


  } catch (error) {

    console.error(error)

    submitError.value =
      'Unable to load this author.'

  } finally {

    loadingAuthor.value = false

  }

}


// ========================================
// SUBMIT
// ========================================

async function submitForm() {

  const valid =
    validateForm()


  if (!valid) {
    return
  }


  submitting.value = true

  submitError.value = ''


  try {

    const authorData = {

      name:
        form.name.trim(),

      bio:
        form.bio.trim(),

      avatarUrl:
        form.avatarUrl.trim(),

      ...(isEditMode.value
        ? {
            updatedAt:
              new Date().toISOString()
          }
        : {
            createdAt:
              new Date().toISOString(),

            updatedAt:
              new Date().toISOString()
          })

    }


    if (isEditMode.value) {

      await authorsStore.update(
        currentAuthorId.value,
        authorData
      )

    } else {

      await authorsStore.create(
        authorData
      )

    }


    router.push({

      path: '/admin/authors',

      query: {
        success:
          isEditMode.value
            ? 'updated'
            : 'created'
      }

    })


  } catch (error) {

    console.error(error)

    submitError.value =
      isEditMode.value
        ? 'Failed to update the author. Please try again.'
        : 'Failed to create the author. Please try again.'

  } finally {

    submitting.value = false

  }

}


// ========================================
// INITIAL LOAD
// ========================================

onMounted(async () => {

  try {

    if (
      authorsStore.authors.length === 0
    ) {

      await authorsStore.fetchList()

    }


    await loadExistingAuthor()

  } catch (error) {

    console.error(error)

  }

})

</script>


<style scoped>

.author-form-page {
  min-height: 100vh;
  background: #f8f9fa;
}


/* Header */

.page-header {
  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 20px;
}


.eyebrow {
  color: #0d6efd;

  font-size: 12px;

  font-weight: 700;

  letter-spacing: 2px;
}


/* Form */

.form-card {
  max-width: 850px;

  margin: auto;

  background: white;

  border: 1px solid #e9ecef;

  border-radius: 20px;

  padding: 35px;
}


.form-label {
  font-weight: 600;
}


.required {
  color: #dc3545;
}


.form-control {
  min-height: 48px;

  border-radius: 10px;
}


textarea.form-control {
  min-height: 150px;
}


.character-count {
  text-align: right;

  color: #6c757d;

  font-size: 12px;

  margin-top: 5px;
}


/* Preview */

.avatar-preview {
  border: 1px solid #e9ecef;

  border-radius: 15px;

  padding: 20px;

  background: #f8f9fa;

  text-align: center;
}


.preview-label {
  color: #6c757d;

  font-size: 13px;

  margin-bottom: 15px;
}


.avatar-preview img {
  width: 130px;

  height: 130px;

  object-fit: cover;

  border-radius: 50%;

  border: 5px solid white;

  box-shadow:
    0 5px 20px rgba(0, 0, 0, 0.1);
}


/* Actions */

.form-actions {
  display: flex;

  justify-content: flex-end;

  gap: 10px;

  border-top: 1px solid #eee;

  padding-top: 25px;

  margin-top: 30px;
}


/* Loading */

.state-card {
  max-width: 850px;

  margin: auto;

  background: white;

  border: 1px solid #e9ecef;

  border-radius: 20px;

  padding: 70px 20px;

  text-align: center;
}


/* Mobile */

@media (max-width: 768px) {

  .page-header {
    flex-direction: column;

    align-items: flex-start;
  }


  .form-card {
    padding: 20px;
  }


  .form-actions {
    flex-direction: column;
  }


  .form-actions .btn {
    width: 100%;
  }

}

</style>

