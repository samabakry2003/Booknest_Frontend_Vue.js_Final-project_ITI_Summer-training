
<template>
  <section class="book-form-page py-5">
    <div class="container">

      <!-- =========================
           PAGE HEADER
      ========================== -->

      <div class="page-header mb-4">

        <div>
          <span class="eyebrow">
            ADMIN PANEL
          </span>

          <h1 class="fw-bold mt-2 mb-1">
            {{ isEditMode ? 'Edit Book' : 'Add New Book' }}
          </h1>

          <p class="text-secondary mb-0">
            {{
              isEditMode
                ? 'Update the information of this book.'
                : 'Add a new book to your library.'
            }}
          </p>
        </div>

        <RouterLink
          to="/admin/books"
          class="btn btn-outline-secondary"
        >
          ← Back to Books
        </RouterLink>

      </div>


      <!-- =========================
           LOADING EXISTING BOOK
      ========================== -->

      <div
        v-if="loadingBook"
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
          Loading book...
        </p>

      </div>


      <!-- =========================
           FORM
      ========================== -->

      <div
        v-else
        class="form-card"
      >

        <form
          @submit.prevent="submitForm"
          novalidate
        >

          <!-- =====================
               TITLE
          ====================== -->

          <div class="mb-4">

            <label
              for="title"
              class="form-label"
            >
              Book Title
              <span class="required">*</span>
            </label>

            <input
              id="title"
              v-model="form.title"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.title }"
              placeholder="Enter book title"
              aria-describedby="titleError"
              :aria-invalid="!!errors.title"
            />

            <div
              v-if="errors.title"
              id="titleError"
              class="invalid-feedback"
            >
              {{ errors.title }}
            </div>

          </div>


          <!-- =====================
               AUTHOR
          ====================== -->

          <div class="mb-4">

            <label
              for="author"
              class="form-label"
            >
              Author
              <span class="required">*</span>
            </label>

            <select
              id="author"
              v-model="form.authorId"
              class="form-select"
              :class="{ 'is-invalid': errors.authorId }"
              :aria-invalid="!!errors.authorId"
            >

              <option value="">
                Select an author
              </option>

              <option
                v-for="author in authorsStore.authors"
                :key="author.id"
                :value="String(author.id)"
              >
                {{ author.name }}
              </option>

            </select>

            <div
              v-if="errors.authorId"
              class="invalid-feedback"
            >
              {{ errors.authorId }}
            </div>

          </div>


          <!-- =====================
               YEAR
          ====================== -->

          <div class="mb-4">

            <label
              for="year"
              class="form-label"
            >
              Publication Year
              <span class="required">*</span>
            </label>

            <input
              id="year"
              v-model.number="form.year"
              type="number"
              min="1800"
              :max="currentYear"
              class="form-control"
              :class="{ 'is-invalid': errors.year }"
              :aria-invalid="!!errors.year"
            />

            <div
              v-if="errors.year"
              class="invalid-feedback"
            >
              {{ errors.year }}
            </div>

          </div>


          <!-- =====================
               TAGS
          ====================== -->

          <div class="mb-4">

            <label
              for="tags"
              class="form-label"
            >
              Tags
            </label>

            <input
              id="tags"
              v-model="tagsInput"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.tags }"
              placeholder="fantasy, magic, adventure"
              :aria-invalid="!!errors.tags"
              @blur="updateTags"
            />

            <div class="form-text">
              Enter up to 8 tags separated by commas.
            </div>

            <div
              v-if="form.tags.length"
              class="selected-tags mt-2"
            >

              <span
                v-for="tag in form.tags"
                :key="tag"
                class="tag-preview"
              >
                #{{ tag }}
              </span>

            </div>

            <div
              v-if="errors.tags"
              class="invalid-feedback d-block"
            >
              {{ errors.tags }}
            </div>

          </div>


          <!-- =====================
               COVER URL
          ====================== -->

          <div class="mb-4">

            <label
              for="coverUrl"
              class="form-label"
            >
              Cover Image URL
            </label>

            <input
              id="coverUrl"
              v-model="form.coverUrl"
              type="url"
              class="form-control"
              :class="{ 'is-invalid': errors.coverUrl }"
              placeholder="https://example.com/book-cover.jpg"
              :aria-invalid="!!errors.coverUrl"
            />

            <div
              v-if="errors.coverUrl"
              class="invalid-feedback"
            >
              {{ errors.coverUrl }}
            </div>

          </div>


          <!-- =====================
               DESCRIPTION
          ====================== -->

          <div class="mb-4">

            <label
              for="description"
              class="form-label"
            >
              Description
            </label>

            <textarea
              id="description"
              v-model="form.description"
              rows="6"
              maxlength="2000"
              class="form-control"
              :class="{ 'is-invalid': errors.description }"
              placeholder="Write a short description about the book..."
              :aria-invalid="!!errors.description"
            ></textarea>

            <div class="character-count">
              {{ form.description.length }} / 2000
            </div>

            <div
              v-if="errors.description"
              class="invalid-feedback"
            >
              {{ errors.description }}
            </div>

          </div>


          <!-- =====================
               API ERROR
          ====================== -->

          <div
            v-if="submitError"
            class="alert alert-danger"
            role="alert"
          >
            {{ submitError }}
          </div>


          <!-- =====================
               ACTIONS
          ====================== -->

          <div class="form-actions">

            <RouterLink
              to="/admin/books"
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
                  ? (isEditMode ? 'Updating...' : 'Saving...')
                  : (isEditMode ? 'Update Book' : 'Create Book')
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
  useBooksStore
} from '../../stores/books'

import {
  useAuthorsStore
} from '../../stores/authors'

import api from '../../services/api'


const route = useRoute()
const router = useRouter()

const booksStore = useBooksStore()
const authorsStore = useAuthorsStore()


// ========================================
// MODE
// ========================================

const isEditMode = computed(() => {
  return Boolean(route.params.id)
})

const currentBookId = computed(() => {
  return route.params.id
})


// ========================================
// FORM
// ========================================

const form = reactive({
  title: '',
  authorId: '',
  year: '',
  tags: [],
  coverUrl: '',
  description: ''
})


// ========================================
// TAGS
// ========================================

const tagsInput = ref('')


// ========================================
// ERRORS
// ========================================

const errors = reactive({
  title: '',
  authorId: '',
  year: '',
  tags: '',
  coverUrl: '',
  description: ''
})


// ========================================
// STATES
// ========================================

const submitting = ref(false)
const loadingBook = ref(false)
const submitError = ref('')


// ========================================
// CURRENT YEAR
// ========================================

const currentYear = new Date().getFullYear()


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
// UPDATE TAGS
// ========================================

function updateTags() {

  const value = tagsInput.value.trim()

  if (!value) {

    form.tags = []

    return

  }

  form.tags = value
    .split(',')
    .map(tag => tag.trim())
    .filter(Boolean)

}


// ========================================
// CLEAR ERRORS
// ========================================

function clearErrors() {

  errors.title = ''
  errors.authorId = ''
  errors.year = ''
  errors.tags = ''
  errors.coverUrl = ''
  errors.description = ''

  submitError.value = ''

}


// ========================================
// CHECK AUTHOR EXISTS
// ========================================

async function authorExists(authorId) {

  if (!authorId) {
    return false
  }

  try {

    await api.get(`/authors/${authorId}`)

    return true

  } catch (error) {

    if (error.response?.status === 404) {
      return false
    }

    throw error

  }

}


// ========================================
// DUPLICATE TITLE
// ========================================

function hasDuplicateTitle() {

  const normalizedTitle =
    form.title
      .trim()
      .toLowerCase()

  return booksStore.books.some(book => {

    const sameTitle =
      book.title
        ?.trim()
        .toLowerCase() === normalizedTitle

    const sameAuthor =
      String(book.authorId) ===
      String(form.authorId)

    const differentBook =
      String(book.id) !==
      String(currentBookId.value)

    return (
      sameTitle &&
      sameAuthor &&
      differentBook
    )

  })

}


// ========================================
// VALIDATE FORM
// ========================================

async function validateForm() {

  clearErrors()

  updateTags()

  const title =
    form.title.trim()


  // TITLE
  if (!title) {

    errors.title =
      'Book title is required.'

  } else if (
    title.length < 3 ||
    title.length > 100
  ) {

    errors.title =
      'Title must be between 3 and 100 characters.'

  } else if (hasDuplicateTitle()) {

    errors.title =
      'A book with this title already exists for this author.'

  }


  // AUTHOR
  if (!form.authorId) {

    errors.authorId =
      'Please select an author.'

  } else {

    try {

      const exists =
        await authorExists(form.authorId)

      if (!exists) {

        errors.authorId =
          'The selected author does not exist.'

      }

    } catch (error) {

      errors.authorId =
        'Unable to verify the selected author.'

      console.error(error)

    }

  }


  // YEAR
  if (!form.year) {

    errors.year =
      'Publication year is required.'

  } else if (
    Number(form.year) < 1800 ||
    Number(form.year) > currentYear
  ) {

    errors.year =
      `Year must be between 1800 and ${currentYear}.`

  }


  // TAGS
  if (form.tags.length > 8) {

    errors.tags =
      'You can add up to 8 tags.'

  }

  for (const tag of form.tags) {

    if (
      tag.length < 2 ||
      tag.length > 20
    ) {

      errors.tags =
        'Each tag must be between 2 and 20 characters.'

      break

    }

  }


  // COVER URL
  if (form.coverUrl.trim()) {

    if (!isValidUrl(form.coverUrl.trim())) {

      errors.coverUrl =
        'Please enter a valid URL.'

    }

  }


  // DESCRIPTION
  if (form.description.length > 2000) {

    errors.description =
      'Description cannot exceed 2000 characters.'

  }


  return Object.values(errors)
    .every(error => !error)

}


// ========================================
// BUTTON VALID STATE
// ========================================

const isFormValid = computed(() => {

  const titleLength =
    form.title.trim().length

  const validTitle =
    titleLength >= 3 &&
    titleLength <= 100

  const validAuthor =
    Boolean(form.authorId)

  const validYear =
    Number(form.year) >= 1800 &&
    Number(form.year) <= currentYear

  const validTags =
    form.tags.length <= 8 &&
    form.tags.every(
      tag =>
        tag.length >= 2 &&
        tag.length <= 20
    )

  const validCover =
    !form.coverUrl.trim() ||
    isValidUrl(form.coverUrl.trim())

  const validDescription =
    form.description.length <= 2000


  return (
    validTitle &&
    validAuthor &&
    validYear &&
    validTags &&
    validCover &&
    validDescription
  )

})


// ========================================
// LOAD EXISTING BOOK
// ========================================

async function loadExistingBook() {

  if (!isEditMode.value) {
    return
  }

  loadingBook.value = true
  submitError.value = ''

  try {

    const book =
      await booksStore.fetchById(
        currentBookId.value
      )


    if (!book) {

      submitError.value =
        'Book not found.'

      return

    }


    form.title =
      book.title || ''

    form.authorId =
      String(book.authorId || '')

    form.year =
      book.year || ''

    form.tags =
      Array.isArray(book.tags)
        ? [...book.tags]
        : []

    tagsInput.value =
      form.tags.join(', ')

    form.coverUrl =
      book.coverUrl || ''

    form.description =
      book.description || ''

  } catch (error) {

    console.error(error)

    submitError.value =
      'Unable to load this book.'

  } finally {

    loadingBook.value = false

  }

}


// ========================================
// SUBMIT
// ========================================

async function submitForm() {

  submitError.value = ''

  const valid =
    await validateForm()

  if (!valid) {
    return
  }

  submitting.value = true


  try {

    const bookData = {

      title:
        form.title.trim(),

      authorId:
        String(form.authorId),

      year:
        Number(form.year),

      tags:
        [...form.tags],

      coverUrl:
        form.coverUrl.trim(),

      description:
        form.description.trim(),

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

      await booksStore.update(
        currentBookId.value,
        bookData
      )

    } else {

      await booksStore.create(bookData)

    }


    router.push({
      path: '/admin/books',
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
        ? 'Failed to update the book. Please try again.'
        : 'Failed to create the book. Please try again.'

  } finally {

    submitting.value = false

  }

}


// ========================================
// INITIAL LOAD
// ========================================

onMounted(async () => {

  try {

    if (authorsStore.authors.length === 0) {
      await authorsStore.fetchList()
    }

    if (booksStore.books.length === 0) {
      await booksStore.fetchList()
    }

    await loadExistingBook()

  } catch (error) {

    console.error(error)

  }

})

</script>


<style scoped>

.book-form-page {
  min-height: 100vh;
  background: #f8f9fa;
}


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


.form-control,
.form-select {
  min-height: 48px;
  border-radius: 10px;
}


textarea.form-control {
  min-height: 140px;
}


.character-count {
  text-align: right;
  color: #6c757d;
  font-size: 12px;
  margin-top: 5px;
}


.selected-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}


.tag-preview {
  background: #eef5ff;
  color: #0d6efd;
  border-radius: 20px;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: 600;
}


.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  border-top: 1px solid #eee;

  padding-top: 25px;
  margin-top: 30px;
}


.state-card {
  max-width: 850px;
  margin: auto;

  background: white;

  border: 1px solid #e9ecef;

  border-radius: 20px;

  padding: 70px 20px;

  text-align: center;
}


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

