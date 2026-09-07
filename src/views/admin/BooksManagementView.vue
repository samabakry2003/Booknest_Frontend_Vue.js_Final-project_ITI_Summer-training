
<template>
  <section class="books-management py-5">

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
            Books Management
          </h1>

          <p class="text-secondary mb-0">
            Create, edit and manage your books.
          </p>
        </div>

        <RouterLink
          to="/admin/books/new"
          class="btn btn-primary"
        >
          + Add New Book
        </RouterLink>

      </div>


      <!-- =========================================
           SEARCH TOOLBAR
      ========================================== -->

      <div class="toolbar mb-4">

        <div class="search-box">

          <span>
            🔍
          </span>

          <input
            v-model="searchQuery"
            type="text"
            class="form-control"
            placeholder="Search books by title..."
            aria-label="Search books by title"
          />

        </div>

        <span class="results-count">
          {{ filteredBooks.length }}
          {{ filteredBooks.length === 1 ? 'book' : 'books' }}
        </span>

      </div>


      <!-- =========================================
           LOADING STATE
      ========================================== -->

      <div
        v-if="booksStore.loading"
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
          Loading books...
        </p>

      </div>


      <!-- =========================================
           ERROR STATE
      ========================================== -->

      <div
        v-else-if="booksStore.error"
        class="state-card"
      >

        <div class="state-icon">
          ⚠️
        </div>

        <h5 class="fw-bold">
          Something went wrong
        </h5>

        <p class="text-secondary">
          {{ booksStore.error }}
        </p>

        <button
          type="button"
          class="btn btn-outline-primary"
          @click="loadBooks"
        >
          Try Again
        </button>

      </div>


      <!-- =========================================
           EMPTY STATE
      ========================================== -->

      <div
        v-else-if="filteredBooks.length === 0"
        class="state-card"
      >

        <div class="state-icon">
          📚
        </div>

        <h5 class="fw-bold">
          No books found
        </h5>

        <p class="text-secondary">
          Try another search or add a new book.
        </p>

        <RouterLink
          to="/admin/books/new"
          class="btn btn-primary"
        >
          Add New Book
        </RouterLink>

      </div>


      <!-- =========================================
           BOOKS TABLE
      ========================================== -->

      <div
        v-else
        class="table-card"
      >

        <div class="table-responsive">

          <table class="table align-middle">

            <thead>

              <tr>

                <th>
                  Book
                </th>

                <th>
                  Author ID
                </th>

                <th>
                  Year
                </th>

                <th>
                  Tags
                </th>

                <th class="text-end">
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              <tr
                v-for="book in filteredBooks"
                :key="book.id"
              >

                <!-- BOOK -->

                <td>

                  <div class="book-info">

                    <img
                      :src="book.coverUrl"
                      :alt="`Cover of ${book.title}`"
                      class="book-cover"
                      @error="handleImageError"
                    />

                    <div>

                      <div class="book-title">
                        {{ book.title }}
                      </div>

                      <small class="text-secondary">
                        ID: {{ book.id }}
                      </small>

                    </div>

                  </div>

                </td>


                <!-- AUTHOR -->

                <td>

                  <span class="author-badge">
                    Author #{{ book.authorId }}
                  </span>

                </td>


                <!-- YEAR -->

                <td>
                  {{ book.year }}
                </td>


                <!-- TAGS -->

                <td>

                  <template v-if="book.tags?.length">

                    <span
                      v-for="tag in book.tags"
                      :key="tag"
                      class="tag"
                    >
                      {{ tag }}
                    </span>

                  </template>

                  <span
                    v-else
                    class="text-secondary"
                  >
                    No tags
                  </span>

                </td>


                <!-- ACTIONS -->

                <td>

                  <div class="actions">

                    <!-- VIEW -->

                    <RouterLink
                      :to="`/books/${book.id}`"
                      class="btn btn-sm btn-light action-button"
                      title="View book"
                      aria-label="View book"
                    >
                      👁️
                    </RouterLink>


                    <!-- EDIT -->

                    <button
                      type="button"
                      class="btn btn-sm btn-light action-button"
                      title="Edit book"
                      aria-label="Edit book"
                      @click="editBook(book.id)"
                    >
                      ✏️
                    </button>


                    <!-- DELETE -->

                    <button
                      type="button"
                      class="btn btn-sm btn-light action-button delete-btn"
                      title="Delete book"
                      aria-label="Delete book"
                      @click="openDeleteModal(book)"
                    >
                      🗑️
                    </button>

                  </div>

                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>


    <!-- =========================================
         DELETE CONFIRMATION MODAL
    ========================================== -->

    <div
      v-if="showDeleteModal"
      class="modal-backdrop-custom"
      role="presentation"
      @click.self="closeDeleteModal"
    >

      <div
        class="delete-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="deleteModalTitle"
      >

        <div class="delete-icon">
          🗑️
        </div>

        <h4
          id="deleteModalTitle"
          class="fw-bold mt-3"
        >
          Delete Book?
        </h4>

        <p class="text-secondary">

          Are you sure you want to delete

          <strong>
            "{{ selectedBook?.title }}"
          </strong>

          ?

          <br>

          This action cannot be undone.

        </p>


        <div class="modal-actions">

          <button
            type="button"
            class="btn btn-light"
            :disabled="deleting"
            @click="closeDeleteModal"
          >
            Cancel
          </button>


          <button
            type="button"
            class="btn btn-danger"
            :disabled="deleting"
            @click="confirmDelete"
          >

            <span
              v-if="deleting"
              class="spinner-border spinner-border-sm me-2"
              role="status"
            ></span>

            {{ deleting ? 'Deleting...' : 'Delete Book' }}

          </button>

        </div>

      </div>

    </div>


    <!-- =========================================
         TOAST
    ========================================== -->

    <div
      v-if="toast.visible"
      class="custom-toast"
      :class="toast.type"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >

      <div class="toast-icon">

        {{ toast.type === 'success' ? '✓' : '!' }}

      </div>


      <div class="toast-content">

        <strong>
          {{ toast.type === 'success' ? 'Success' : 'Error' }}
        </strong>

        <p>
          {{ toast.message }}
        </p>

      </div>


      <button
        type="button"
        class="toast-close"
        aria-label="Close notification"
        @click="hideToast"
      >
        ×
      </button>

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


const router = useRouter()
const route = useRoute()

const booksStore = useBooksStore()


// ========================================
// SEARCH
// ========================================

const searchQuery = ref('')


const filteredBooks = computed(() => {

  const query =
    searchQuery.value
      .trim()
      .toLowerCase()

  if (!query) {
    return booksStore.books
  }

  return booksStore.books.filter(book =>
    book.title
      ?.toLowerCase()
      .includes(query)
  )

})


// ========================================
// DELETE MODAL
// ========================================

const showDeleteModal = ref(false)

const selectedBook = ref(null)

const deleting = ref(false)


function openDeleteModal(book) {

  selectedBook.value = book

  showDeleteModal.value = true

}


function closeDeleteModal() {

  if (deleting.value) {
    return
  }

  showDeleteModal.value = false

  selectedBook.value = null

}


async function confirmDelete() {

  if (!selectedBook.value) {
    return
  }

  deleting.value = true


  try {

    await booksStore.remove(
      selectedBook.value.id
    )


    showToast(
      'Book deleted successfully.',
      'success'
    )


    showDeleteModal.value = false

    selectedBook.value = null


  } catch (error) {

    console.error(error)

    showToast(
      'Failed to delete the book.',
      'error'
    )

  } finally {

    deleting.value = false

  }

}


// ========================================
// EDIT
// ========================================

function editBook(id) {

  router.push(
    `/admin/books/${id}/edit`
  )

}


// ========================================
// LOAD BOOKS
// ========================================

async function loadBooks() {

  try {

    await booksStore.fetchList()

  } catch (error) {

    console.error(error)

  }

}


// ========================================
// IMAGE FALLBACK
// ========================================

function handleImageError(event) {

  event.target.src =
    'https://placehold.co/80x100?text=Book'

}


// ========================================
// TOAST
// ========================================

const toast = reactive({

  visible: false,

  message: '',

  type: 'success'

})


let toastTimer = null


function showToast(
  message,
  type = 'success'
) {

  toast.message = message

  toast.type = type

  toast.visible = true


  clearTimeout(toastTimer)


  toastTimer = setTimeout(() => {

    toast.visible = false

  }, 3500)

}


function hideToast() {

  toast.visible = false

  clearTimeout(toastTimer)

}


// ========================================
// INITIAL LOAD
// ========================================

onMounted(async () => {

  await loadBooks()


  // Show success toast after create/update

  const success = route.query.success

  if (success === 'created') {

    showToast(
      'Book created successfully.',
      'success'
    )

  }


  if (success === 'updated') {

    showToast(
      'Book updated successfully.',
      'success'
    )

  }

})

</script>


<style scoped>

.books-management {
  min-height: 100vh;
  background: #f8f9fa;
}


/* ========================================
   PAGE HEADER
======================================== */

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


/* ========================================
   TOOLBAR
======================================== */

.toolbar {
  background: white;

  border: 1px solid #e9ecef;

  border-radius: 16px;

  padding: 15px 20px;

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 20px;
}


.search-box {
  display: flex;

  align-items: center;

  gap: 10px;

  max-width: 500px;

  width: 100%;
}


.search-box input {
  border: none;

  box-shadow: none;
}


.search-box input:focus {
  box-shadow: none;
}


.results-count {
  color: #6c757d;

  font-size: 14px;

  white-space: nowrap;
}


/* ========================================
   TABLE
======================================== */

.table-card {
  background: white;

  border: 1px solid #e9ecef;

  border-radius: 18px;

  overflow: hidden;
}


.table {
  margin: 0;
}


.table thead {
  position: sticky;

  top: 0;

  z-index: 1;
}


.table thead th {
  background: #f8f9fa;

  color: #6c757d;

  font-size: 13px;

  text-transform: uppercase;

  letter-spacing: 0.5px;

  white-space: nowrap;

  padding: 16px;
}


.table tbody td {
  padding: 16px;
}


/* ========================================
   BOOK
======================================== */

.book-info {
  display: flex;

  align-items: center;

  gap: 12px;

  min-width: 230px;
}


.book-cover {
  width: 48px;

  height: 65px;

  object-fit: cover;

  border-radius: 7px;

  background: #e9ecef;
}


.book-title {
  font-weight: 600;

  max-width: 230px;
}


/* ========================================
   AUTHOR
======================================== */

.author-badge {
  background: #eef5ff;

  color: #0d6efd;

  padding: 6px 10px;

  border-radius: 8px;

  font-size: 12px;
}


/* ========================================
   TAGS
======================================== */

.tag {
  display: inline-block;

  background: #f1f3f5;

  color: #495057;

  padding: 5px 8px;

  border-radius: 6px;

  font-size: 12px;

  margin: 2px;
}


/* ========================================
   ACTIONS
======================================== */

.actions {
  display: flex;

  justify-content: flex-end;

  gap: 6px;
}


.action-button {
  width: 36px;

  height: 36px;

  display: flex;

  align-items: center;

  justify-content: center;
}


.delete-btn:hover {
  color: #dc3545;

  background: #fff5f5;
}


/* ========================================
   STATES
======================================== */

.state-card {
  background: white;

  border: 1px solid #e9ecef;

  border-radius: 18px;

  padding: 70px 20px;

  text-align: center;
}


.state-icon {
  font-size: 45px;

  margin-bottom: 15px;
}


/* ========================================
   DELETE MODAL
======================================== */

.modal-backdrop-custom {
  position: fixed;

  inset: 0;

  background: rgba(0, 0, 0, 0.45);

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 20px;

  z-index: 3000;
}


.delete-modal {
  width: 100%;

  max-width: 430px;

  background: white;

  border-radius: 20px;

  padding: 30px;

  text-align: center;

  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.2);
}


.delete-icon {
  width: 64px;

  height: 64px;

  margin: auto;

  border-radius: 50%;

  background: #fff0f0;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 28px;
}


.modal-actions {
  display: flex;

  justify-content: flex-end;

  gap: 10px;

  margin-top: 25px;
}


/* ========================================
   TOAST
======================================== */

.custom-toast {
  position: fixed;

  top: 25px;

  right: 25px;

  min-width: 320px;

  max-width: 420px;

  background: white;

  border-radius: 14px;

  padding: 15px;

  display: flex;

  align-items: flex-start;

  gap: 12px;

  box-shadow:
    0 12px 35px rgba(0, 0, 0, 0.15);

  z-index: 4000;

  border-left: 5px solid #198754;
}


.custom-toast.error {
  border-left-color: #dc3545;
}


.toast-icon {
  width: 32px;

  height: 32px;

  flex-shrink: 0;

  border-radius: 50%;

  background: #d1e7dd;

  color: #0f5132;

  display: flex;

  align-items: center;

  justify-content: center;

  font-weight: 700;
}


.custom-toast.error .toast-icon {
  background: #f8d7da;

  color: #842029;
}


.toast-content {
  flex: 1;
}


.toast-content strong {
  display: block;

  margin-bottom: 3px;
}


.toast-content p {
  margin: 0;

  color: #6c757d;

  font-size: 14px;

  line-height: 1.5;
}


.toast-close {
  border: none;

  background: transparent;

  color: #6c757d;

  font-size: 22px;

  line-height: 1;

  cursor: pointer;

  padding: 0;
}


/* ========================================
   MOBILE
======================================== */

@media (max-width: 768px) {

  .page-header {
    flex-direction: column;

    align-items: flex-start;
  }


  .toolbar {
    flex-direction: column;

    align-items: stretch;
  }


  .search-box {
    max-width: none;
  }


  .custom-toast {
    top: 15px;

    right: 15px;

    left: 15px;

    min-width: auto;

    max-width: none;
  }


  .delete-modal {
    padding: 25px 20px;
  }

}

</style>

