<template>
  <section class="books-page py-5">
<div class="container">

  <!-- Page Header -->
  <div class="text-center mb-5">

    <span class="text-primary fw-semibold">
      OUR COLLECTION
    </span>

    <h1 class="display-5 fw-bold mt-2">
      Explore Our Books
    </h1>

    <p class="text-secondary">
      Discover books from different genres and authors.
    </p>

  </div>


  <!-- Search & Author Filter -->
  <div class="row g-3 mb-5">

    <!-- Search -->
    <div class="col-lg-7">

      <div class="input-group input-group-lg">

        <span class="input-group-text bg-white">
          🔍
        </span>

        <input
          v-model="searchQuery"
          type="text"
          class="form-control"
          placeholder="Search by book title..."
          aria-label="Search books by title"
        />

      </div>

    </div>


    <!-- Author Filter -->
    <div class="col-lg-5">

      <select
        v-model="selectedAuthor"
        class="form-select form-select-lg"
        aria-label="Filter books by author"
      >

        <option value="">
          All Authors
        </option>

        <option
          v-for="author in authorsStore.authors"
          :key="author.id"
          :value="String(author.id)"
        >
          {{ author.name }}
        </option>

      </select>

    </div>

  </div>


  <!-- Loading -->
  <div
    v-if="booksStore.loading || authorsStore.loading"
    class="text-center py-5"
  >

    <div
      class="spinner-border text-primary"
      role="status"
    >
      <span class="visually-hidden">
        Loading...
      </span>
    </div>

    <p class="text-secondary mt-3">
      Loading books and authors...
    </p>

  </div>


  <!-- Error -->
  <div
    v-else-if="booksStore.error || authorsStore.error"
    class="text-center py-5"
  >

    <div class="display-5">
      ⚠️
    </div>

    <h4 class="fw-bold mt-3">
      Something went wrong
    </h4>

    <p class="text-secondary">
      {{ booksStore.error || authorsStore.error }}
    </p>

    <button
      @click="loadData"
      class="btn btn-primary"
    >
      Retry
    </button>

  </div>


  <!-- Content -->
  <template v-else>

    <!-- Results Header -->
    <div
      class="d-flex justify-content-between align-items-center mb-4"
    >

      <h5 class="fw-bold mb-0">
        {{ filteredBooks.length }} Books Found
      </h5>

      <button
        v-if="searchQuery || selectedAuthor"
        @click="clearFilters"
        class="btn btn-outline-secondary btn-sm"
      >
        Clear Filters
      </button>

    </div>


    <!-- Books -->
    <div class="row g-4">

      <div
        v-for="book in filteredBooks"
        :key="book.id"
        class="col-sm-6 col-lg-4 col-xl-3"
      >

        <BookCard :book="book" />

      </div>

    </div>


    <!-- Empty State -->
    <div
      v-if="filteredBooks.length === 0"
      class="text-center py-5"
    >

      <div class="display-1">
        📚
      </div>

      <h3 class="fw-bold mt-3">
        No Books Found
      </h3>

      <p class="text-secondary">
        Try changing your search or author filter.
      </p>

      <button
        v-if="searchQuery || selectedAuthor"
        @click="clearFilters"
        class="btn btn-primary mt-2"
      >
        Clear Filters
      </button>

    </div>

  </template>

</div>
```

  </section>
</template>

<script setup>

import { ref, computed, onMounted } from 'vue'

import { useBooksStore } from '../../stores/books'

import { useAuthorsStore } from '../../stores/authors'

import BookCard from '../../components/books/BookCard.vue'


// ========================================
// PINIA STORES
// ========================================

const booksStore = useBooksStore()

const authorsStore = useAuthorsStore()


// ========================================
// FILTERS
// ========================================

const searchQuery = ref('')

const selectedAuthor = ref('')


// ========================================
// LOAD BOOKS & AUTHORS
// ========================================

const loadData = async () => {

  try {

    await Promise.all([
      booksStore.fetchList(),
      authorsStore.fetchList()
    ])

  } catch (error) {

    console.error('loadData:', error)

  }

}


// ========================================
// LOAD WHEN PAGE OPENS
// ========================================

onMounted(() => {

  loadData()

})


// ========================================
// FILTER BOOKS
// ========================================

const filteredBooks = computed(() => {

  const search = searchQuery.value
    .toLowerCase()
    .trim()

  return booksStore.books.filter(book => {

    // Search by title
    const matchesSearch =
      !search ||
      String(book.title || '')
        .toLowerCase()
        .includes(search)


    // Filter by author
    const matchesAuthor =
      !selectedAuthor.value ||
      String(book.authorId) === String(selectedAuthor.value)


    return matchesSearch && matchesAuthor

  })

})


// ========================================
// CLEAR FILTERS
// ========================================

const clearFilters = () => {

  searchQuery.value = ''

  selectedAuthor.value = ''

}

</script>

<style scoped>

.books-page {
  min-height: 80vh;
  background: #f8f9fa;
}

.input-group-text {
  border-right: 0;
}

.input-group .form-control {
  border-left: 0;
}

.input-group .form-control:focus {
  border-left: 0;
  box-shadow: none;
}

.form-select {
  border-radius: 0.375rem;
}

.form-select:focus {
  border-color: #86b7fe;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.15);
}

</style>
