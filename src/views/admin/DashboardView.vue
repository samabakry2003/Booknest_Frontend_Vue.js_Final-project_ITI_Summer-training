<template>
  <section class="dashboard-page py-5">

    <div class="container">

      <!-- Header -->
      <div
        class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-5"
      >

        <div>
          <span class="eyebrow">
            ADMIN PANEL
          </span>

          <h1 class="fw-bold mt-2 mb-2">
            Dashboard
          </h1>

          <p class="text-secondary mb-0">
            Manage your books and authors from one place.
          </p>
        </div>

        <RouterLink
          to="/"
          class="btn btn-outline-primary"
        >
          ← Back to Website
        </RouterLink>

      </div>


      <!-- Statistics -->
      <div class="row g-4 mb-5">

        <!-- Books -->
        <div class="col-md-6 col-lg-4">

          <div class="stat-card">

            <div class="stat-icon books-icon">
              📚
            </div>

            <div>

              <p class="stat-label">
                Total Books
              </p>

              <h2 class="stat-number">
                {{ booksStore.books.length }}
              </h2>

            </div>

          </div>

        </div>


        <!-- Authors -->
        <div class="col-md-6 col-lg-4">

          <div class="stat-card">

            <div class="stat-icon authors-icon">
              ✍️
            </div>

            <div>

              <p class="stat-label">
                Total Authors
              </p>

              <h2 class="stat-number">
                {{ authorsStore.authors.length }}
              </h2>

            </div>

          </div>

        </div>


        <!-- System -->
        <div class="col-md-6 col-lg-4">

          <div class="stat-card">

            <div class="stat-icon system-icon">
              ⚡
            </div>

            <div>

              <p class="stat-label">
                System Status
              </p>

              <h2 class="stat-number status">
                Online
              </h2>

            </div>

          </div>

        </div>

      </div>


      <!-- Quick Actions -->
      <div class="section-card mb-5">

        <div class="section-header">

          <div>
            <h3 class="fw-bold mb-1">
              Quick Actions
            </h3>

            <p class="text-secondary mb-0">
              Quickly manage your content.
            </p>
          </div>

        </div>


        <div class="row g-3 mt-2">

          <div class="col-md-6">

            <RouterLink
              to="/admin/books/new"
              class="action-card"
            >

              <div class="action-icon">
                ➕
              </div>

              <div>
                <h5>
                  Add New Book
                </h5>

                <p>
                  Create a new book record.
                </p>
              </div>

              <span class="arrow">
                →
              </span>

            </RouterLink>

          </div>


          <div class="col-md-6">

            <RouterLink
              to="/admin/authors/new"
              class="action-card"
            >

              <div class="action-icon">
                ✍️
              </div>

              <div>
                <h5>
                  Add New Author
                </h5>

                <p>
                  Create a new author record.
                </p>
              </div>

              <span class="arrow">
                →
              </span>

            </RouterLink>

          </div>


          <div class="col-md-6">

            <RouterLink
              to="/admin/books"
              class="action-card"
            >

              <div class="action-icon">
                📖
              </div>

              <div>
                <h5>
                  Manage Books
                </h5>

                <p>
                  View, edit and delete books.
                </p>
              </div>

              <span class="arrow">
                →
              </span>

            </RouterLink>

          </div>


          <div class="col-md-6">

            <RouterLink
              to="/admin/authors"
              class="action-card"
            >

              <div class="action-icon">
                👥
              </div>

              <div>
                <h5>
                  Manage Authors
                </h5>

                <p>
                  View, edit and delete authors.
                </p>
              </div>

              <span class="arrow">
                →
              </span>

            </RouterLink>

          </div>

        </div>

      </div>


      <!-- Recent Books -->
      <div class="section-card">

        <div
          class="d-flex justify-content-between align-items-center mb-4"
        >

          <div>

            <h3 class="fw-bold mb-1">
              Recent Books
            </h3>

            <p class="text-secondary mb-0">
              Latest books in your collection.
            </p>

          </div>

          <RouterLink
            to="/admin/books"
            class="btn btn-sm btn-outline-primary"
          >
            View All
          </RouterLink>

        </div>


        <!-- Empty -->
        <div
          v-if="booksStore.books.length === 0"
          class="empty-state"
        >

          <div class="empty-icon">
            📚
          </div>

          <h5>
            No books yet
          </h5>

          <p class="text-secondary">
            Add your first book to get started.
          </p>

        </div>


        <!-- Books -->
        <div
          v-else
          class="table-responsive"
        >

          <table class="table align-middle">

            <thead>

              <tr>
                <th>Book</th>
                <th>Author ID</th>
                <th>Year</th>
                <th>Tags</th>
              </tr>

            </thead>

            <tbody>

              <tr
                v-for="book in recentBooks"
                :key="book.id"
              >

                <td>

                  <div class="book-cell">

                    <img
                      :src="book.coverUrl"
                      :alt="book.title"
                      class="book-cover"
                    />

                    <div>
                      <strong>
                        {{ book.title }}
                      </strong>
                    </div>

                  </div>

                </td>

                <td>
                  {{ book.authorId }}
                </td>

                <td>
                  {{ book.year }}
                </td>

                <td>

                  <span
                    v-for="tag in book.tags"
                    :key="tag"
                    class="badge text-bg-light me-1"
                  >
                    {{ tag }}
                  </span>

                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>

  </section>
</template>


<script setup>

import {
  computed,
  onMounted
} from 'vue'

import {
  useBooksStore
} from '../../stores/books'

import {
  useAuthorsStore
} from '../../stores/authors'


const booksStore = useBooksStore()

const authorsStore = useAuthorsStore()


const recentBooks = computed(() => {

  return [...booksStore.books]
    .slice(-5)
    .reverse()

})


onMounted(async () => {

  if (booksStore.books.length === 0) {
    await booksStore.fetchList()
  }

  if (authorsStore.authors.length === 0) {
    await authorsStore.fetchList()
  }

})

</script>


<style scoped>

.dashboard-page {
  min-height: 100vh;

  background: #f8f9fa;
}


/* Header */

.eyebrow {
  color: #0d6efd;

  font-size: 12px;

  font-weight: 700;

  letter-spacing: 2px;
}


/* Statistics */

.stat-card {
  background: white;

  border: 1px solid #e9ecef;

  border-radius: 18px;

  padding: 25px;

  display: flex;

  align-items: center;

  gap: 20px;

  box-shadow:
    0 5px 20px rgba(0, 0, 0, 0.04);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}


.stat-card:hover {
  transform: translateY(-4px);

  box-shadow:
    0 12px 30px rgba(0, 0, 0, 0.08);
}


.stat-icon {
  width: 60px;

  height: 60px;

  border-radius: 15px;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 28px;
}


.books-icon {
  background: #e7f1ff;
}


.authors-icon {
  background: #fff3cd;
}


.system-icon {
  background: #d1e7dd;
}


.stat-label {
  color: #6c757d;

  margin: 0 0 5px;

  font-size: 14px;
}


.stat-number {
  margin: 0;

  font-weight: 700;
}


.status {
  font-size: 20px;

  color: #198754;
}


/* Sections */

.section-card {
  background: white;

  border: 1px solid #e9ecef;

  border-radius: 18px;

  padding: 30px;

  box-shadow:
    0 5px 20px rgba(0, 0, 0, 0.04);
}


/* Actions */

.action-card {
  display: flex;

  align-items: center;

  gap: 15px;

  padding: 18px;

  border: 1px solid #e9ecef;

  border-radius: 14px;

  text-decoration: none;

  color: inherit;

  transition:
    border-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}


.action-card:hover {
  border-color: #0d6efd;

  transform: translateY(-3px);

  box-shadow:
    0 8px 20px rgba(0, 0, 0, 0.07);
}


.action-icon {
  width: 45px;

  height: 45px;

  flex-shrink: 0;

  border-radius: 12px;

  background: #eef5ff;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 21px;
}


.action-card h5 {
  margin: 0 0 4px;

  font-size: 16px;
}


.action-card p {
  margin: 0;

  color: #6c757d;

  font-size: 13px;
}


.arrow {
  margin-left: auto;

  color: #0d6efd;

  font-size: 20px;
}


/* Table */

.table {
  margin-bottom: 0;
}


.table thead th {
  background: #f8f9fa;

  color: #6c757d;

  font-size: 13px;

  text-transform: uppercase;

  letter-spacing: 0.5px;

  white-space: nowrap;
}


.book-cell {
  display: flex;

  align-items: center;

  gap: 12px;
}


.book-cover {
  width: 42px;

  height: 58px;

  object-fit: cover;

  border-radius: 6px;
}


/* Empty */

.empty-state {
  text-align: center;

  padding: 50px 20px;
}


.empty-icon {
  font-size: 45px;

  margin-bottom: 15px;
}


/* Mobile */

@media (max-width: 768px) {

  .dashboard-page {
    padding-top: 30px;
  }

  .section-card {
    padding: 20px;
  }

  .stat-card {
    padding: 20px;
  }

}

</style>