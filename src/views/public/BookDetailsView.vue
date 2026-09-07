<template>
  <section class="book-details-page py-5">

    <div class="container">

      <!-- =====================================
           LOADING
      ====================================== -->

      <div
        v-if="booksStore.loading"
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
          Loading book...
        </p>

      </div>


      <!-- =====================================
           ERROR
      ====================================== -->

      <div
        v-else-if="booksStore.error"
        class="text-center py-5"
      >

        <div class="display-4">
          ⚠️
        </div>

        <h3 class="fw-bold mt-3">
          Unable to load book
        </h3>

        <p class="text-secondary">
          {{ booksStore.error }}
        </p>

        <button
          type="button"
          class="btn btn-primary"
          @click="loadBook"
        >
          Retry
        </button>

      </div>


      <!-- =====================================
           BOOK DETAILS
      ====================================== -->

      <div
        v-else-if="book"
        class="row g-5 align-items-start"
      >

        <!-- Cover -->

        <div class="col-md-5 col-lg-4">

          <div class="cover-wrapper">

            <img
              v-if="imageLoaded"
              :src="book.coverUrl"
              :alt="`Cover of ${book.title}`"
              class="book-cover"
              @error="handleImageError"
            />

            <div
              v-else
              class="cover-placeholder"
            >

              <span>
                📚
              </span>

              <p>
                No Cover Available
              </p>

            </div>

          </div>

        </div>


        <!-- Information -->

        <div class="col-md-7 col-lg-8">

          <span class="badge bg-primary mb-3">
            {{ book.year }}
          </span>


          <h1 class="display-5 fw-bold mb-3">
            {{ book.title }}
          </h1>


          <!-- Author -->

          <div
            v-if="author"
            class="author-info mb-4"
          >

            <span class="text-secondary">
              Written by
            </span>

            <RouterLink
              :to="`/authors/${author.id}`"
              class="author-link"
            >
              {{ author.name }}
            </RouterLink>

          </div>


          <!-- Tags -->

          <div
            v-if="book.tags?.length"
            class="d-flex flex-wrap gap-2 mb-4"
          >

            <span
              v-for="tag in book.tags"
              :key="tag"
              class="badge rounded-pill text-bg-light"
            >
              #{{ tag }}
            </span>

          </div>


          <!-- Description -->

          <h4 class="fw-bold mb-3">
            About this book
          </h4>

          <p class="description">
            {{ book.description }}
          </p>


          <!-- Back -->

          <RouterLink
            to="/books"
            class="btn btn-outline-primary mt-3"
          >
            ← Back to Books
          </RouterLink>

        </div>

      </div>


      <!-- =====================================
           NOT FOUND
      ====================================== -->

      <div
        v-else
        class="text-center py-5"
      >

        <div class="display-1">
          📖
        </div>

        <h2 class="fw-bold mt-3">
          Book Not Found
        </h2>

        <p class="text-secondary">
          The book you're looking for doesn't exist.
        </p>

        <RouterLink
          to="/books"
          class="btn btn-primary"
        >
          Browse Books
        </RouterLink>

      </div>

    </div>


    <!-- =====================================
         AI ASSISTANT
    ====================================== -->

    <AIChat
      v-if="book"
      context-type="book"
      :context-data="aiBookContext"
    />

  </section>
</template>


<script setup>

import {
  computed,
  onMounted,
  ref
} from 'vue'

import {
  useRoute
} from 'vue-router'

import {
  useBooksStore
} from '../../stores/books'

import {
  useAuthorsStore
} from '../../stores/authors'

import AIChat from '../../components/ai/AIChat.vue'


// ========================================
// ROUTE
// ========================================

const route = useRoute()


// ========================================
// STORES
// ========================================

const booksStore = useBooksStore()

const authorsStore = useAuthorsStore()


// ========================================
// IMAGE
// ========================================

const imageLoaded = ref(true)


// ========================================
// BOOK
// ========================================

const book = computed(() => {

  return booksStore.currentBook

})


// ========================================
// AUTHOR
// ========================================

const author = computed(() => {

  if (!book.value) {
    return null
  }


  return authorsStore.authors.find(
    item =>
      String(item.id) ===
      String(book.value.authorId)
  )

})


// ========================================
// AI CONTEXT
// ========================================

const aiBookContext = computed(() => {

  if (!book.value) {
    return {}
  }


  return {

    title:
      book.value.title,

    authorName:
      author.value?.name || 'Unknown',

    year:
      book.value.year,

    tags:
      book.value.tags || [],

    description:
      book.value.description || ''

  }

})


// ========================================
// LOAD BOOK
// ========================================

async function loadBook() {

  const id =
    route.params.id


  try {

    await booksStore.fetchById(id)


    if (
      authorsStore.authors.length === 0
    ) {

      await authorsStore.fetchList()

    }

  } catch (error) {

    console.error(
      'Failed to load book:',
      error
    )

  }

}


// ========================================
// IMAGE ERROR
// ========================================

function handleImageError() {

  imageLoaded.value = false

}


// ========================================
// INITIAL LOAD
// ========================================

onMounted(() => {

  loadBook()

})

</script>


<style scoped>

.book-details-page {
  min-height: 100vh;

  background: #f8f9fa;
}


/* Cover */

.cover-wrapper {
  width: 100%;

  max-width: 420px;

  margin: auto;

  border-radius: 20px;

  overflow: hidden;

  background: #e9ecef;

  box-shadow:
    0 15px 40px rgba(0, 0, 0, 0.12);
}


.book-cover {
  width: 100%;

  height: 600px;

  object-fit: cover;

  display: block;
}


.cover-placeholder {
  height: 600px;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  color: #6c757d;
}


.cover-placeholder span {
  font-size: 80px;
}


/* Author */

.author-info {
  font-size: 17px;
}


.author-link {
  margin-left: 6px;

  color: #0d6efd;

  font-weight: 600;

  text-decoration: none;
}


.author-link:hover {
  text-decoration: underline;
}


/* Description */

.description {
  color: #6c757d;

  font-size: 17px;

  line-height: 1.8;

  max-width: 750px;
}


/* Mobile */

@media (max-width: 768px) {

  .book-cover,
  .cover-placeholder {
    height: 500px;
  }

}

</style>
