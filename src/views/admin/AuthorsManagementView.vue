<template>
  <section class="authors-management py-5">
    <div class="container">

      <div class="page-header mb-4">
        <div>
          <span class="eyebrow">ADMIN PANEL</span>

          <h1 class="fw-bold mt-2 mb-1">
            Authors Management
          </h1>

          <p class="text-secondary mb-0">
            Create, edit and manage your authors.
          </p>
        </div>

        <RouterLink
          to="/admin/authors/new"
          class="btn btn-primary"
        >
          + Add New Author
        </RouterLink>
      </div>


      <!-- Search -->
      <div class="toolbar mb-4">

        <div class="search-box">

          <span>🔍</span>

          <input
            v-model="searchQuery"
            type="text"
            class="form-control"
            placeholder="Search authors by name..."
            aria-label="Search authors by name"
          />

        </div>

        <span class="results-count">
          {{ filteredAuthors.length }}
          {{ filteredAuthors.length === 1 ? 'author' : 'authors' }}
        </span>

      </div>

      <!-- Loading -->
      <div
        v-if="authorsStore.loading"
        class="state-card"
      >

        <div
          class="spinner-border text-primary mb-3"
          role="status"
        ></div>

        <p class="mb-0">
          Loading authors...
        </p>

      </div>


      <!-- Error -->
      <div
        v-else-if="authorsStore.error"
        class="state-card"
      >

        <div class="state-icon">
          ⚠️
        </div>

        <h5 class="fw-bold">
          Something went wrong
        </h5>

        <p class="text-secondary">
          {{ authorsStore.error }}
        </p>

        <button
          type="button"
          class="btn btn-outline-primary"
          @click="loadAuthors"
        >
          Try Again
        </button>

      </div>


      <!-- Empty -->
      <div
        v-else-if="filteredAuthors.length === 0"
        class="state-card"
      >

        <div class="state-icon">
          👥
        </div>

        <h5 class="fw-bold">
          No authors found
        </h5>

        <p class="text-secondary">
          Try another search or add a new author.
        </p>

        <RouterLink
          to="/admin/authors/new"
          class="btn btn-primary"
        >
          Add New Author
        </RouterLink>

      </div>


      <!-- Table -->
      <div
        v-else
        class="table-card"
      >

        <div class="table-responsive">

          <table class="table align-middle">

            <thead>
              <tr>
                <th>Author</th>
                <th>Bio</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              <tr
                v-for="author in filteredAuthors"
                :key="author.id"
              >

                <!-- Author -->
                <td>

                  <div class="author-info">

                    <img
                      :src="author.avatarUrl"
                      :alt="`Photo of ${author.name}`"
                      class="author-avatar"
                      @error="handleImageError"
                    />

                    <div>

                      <div class="author-name">
                        {{ author.name }}
                      </div>

                      <small class="text-secondary">
                        ID: {{ author.id }}
                      </small>

                    </div>

                  </div>

                </td>


                <!-- Bio -->
                <td>

                  <p class="author-bio mb-0">
                    {{ author.bio || 'No bio available.' }}
                  </p>

                </td>


                <!-- Actions -->
                <td>

                  <div class="actions">

                    <RouterLink
                      :to="`/authors/${author.id}`"
                      class="btn btn-sm btn-light action-button"
                      title="View author"
                      aria-label="View author"
                    >
                      👁️
                    </RouterLink>

                    <button
                      type="button"
                      class="btn btn-sm btn-light action-button"
                      title="Edit author"
                      aria-label="Edit author"
                      @click="editAuthor(author.id)"
                    >
                      ✏️
                    </button>

                    <button
                      type="button"
                      class="btn btn-sm btn-light action-button delete-btn"
                      title="Delete author"
                      aria-label="Delete author"
                      @click="openDeleteModal(author)"
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


    <!-- Delete Modal -->
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
          Delete Author?
        </h4>

        <p class="text-secondary">

          Are you sure you want to delete

          <strong>
            "{{ selectedAuthor?.name }}"
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
            ></span>

            {{ deleting ? 'Deleting...' : 'Delete Author' }}

          </button>

        </div>

      </div>

    </div>


    <!-- Toast -->
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
        @click="hideToast"
        aria-label="Close notification"
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
  useAuthorsStore
} from '../../stores/authors'


const router = useRouter()
const route = useRoute()

const authorsStore = useAuthorsStore()


// ========================================
// SEARCH
// ========================================

const searchQuery = ref('')


const filteredAuthors = computed(() => {

  const query =
    searchQuery.value
      .trim()
      .toLowerCase()

  if (!query) {
    return authorsStore.authors
  }

  return authorsStore.authors.filter(author =>
    author.name
      ?.toLowerCase()
      .includes(query)
  )

})


// ========================================
// DELETE
// ========================================

const showDeleteModal = ref(false)

const selectedAuthor = ref(null)

const deleting = ref(false)


function openDeleteModal(author) {

  selectedAuthor.value = author

  showDeleteModal.value = true

}


function closeDeleteModal() {

  if (deleting.value) {
    return
  }

  showDeleteModal.value = false

  selectedAuthor.value = null

}


async function confirmDelete() {

  if (!selectedAuthor.value) {
    return
  }

  deleting.value = true

  try {

    await authorsStore.remove(
      selectedAuthor.value.id
    )

    showToast(
      'Author deleted successfully.',
      'success'
    )

    showDeleteModal.value = false
    selectedAuthor.value = null

  } catch (error) {

    console.error(error)

    showToast(
      'Failed to delete the author.',
      'error'
    )

  } finally {

    deleting.value = false

  }

}


// ========================================
// EDIT
// ========================================

function editAuthor(id) {

  router.push(
    `/admin/authors/${id}/edit`
  )

}


// ========================================
// LOAD
// ========================================

async function loadAuthors() {

  try {

    await authorsStore.fetchList()

  } catch (error) {

    console.error(error)

  }

}


// ========================================
// IMAGE FALLBACK
// ========================================

function handleImageError(event) {

  event.target.src =
    'https://placehold.co/100x100?text=Author'

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

  await loadAuthors()

  const success = route.query.success

  if (success === 'created') {

    showToast(
      'Author created successfully.',
      'success'
    )

  }

  if (success === 'updated') {

    showToast(
      'Author updated successfully.',
      'success'
    )

  }

})

</script>


<style scoped>

.authors-management {
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


/* Toolbar */

.toolbar {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 16px;
  padding: 15px 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;
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


.results-count {
  color: #6c757d;
  font-size: 14px;
  white-space: nowrap;
}


/* Table */

.table-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 18px;
  overflow: hidden;
}


.table {
  margin: 0;
}


.table thead th {
  background: #f8f9fa;
  color: #6c757d;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 16px;
}


.table tbody td {
  padding: 16px;
}


/* Author */

.author-info {
  display: flex;
  align-items: center;
  gap: 12px;

  min-width: 220px;
}


.author-avatar {
  width: 55px;
  height: 55px;

  border-radius: 50%;

  object-fit: cover;

  background: #e9ecef;
}


.author-name {
  font-weight: 600;
}


.author-bio {
  max-width: 500px;
  color: #6c757d;
  line-height: 1.6;
}


/* Actions */

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


/* States */

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


/* Modal */

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


/* Toast */

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
}


.toast-close {
  border: none;

  background: transparent;

  color: #6c757d;

  font-size: 22px;

  cursor: pointer;
}


/* Mobile */

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
    left: 15px;
    right: 15px;
    min-width: auto;
  }

}

</style>

