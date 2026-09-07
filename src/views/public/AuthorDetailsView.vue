<template>
  <section class="author-details-page py-5">
<div class="container">

  <!-- =====================================
       AUTHOR LOADING
  ====================================== -->

  <div
    v-if="authorsStore.loading"
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
      Loading author...
    </p>

  </div>


  <!-- =====================================
       AUTHOR ERROR
  ====================================== -->

  <div
    v-else-if="authorsStore.error"
    class="text-center py-5"
  >

    <div class="display-4">
      ⚠️
    </div>

    <h3 class="fw-bold mt-3">
      Unable to load author
    </h3>

    <p class="text-secondary">
      {{ authorsStore.error }}
    </p>

    <button
      type="button"
      class="btn btn-primary"
      @click="loadAuthor"
    >
      Retry
    </button>

  </div>


  <!-- =====================================
       AUTHOR DETAILS
  ====================================== -->

  <div
    v-else-if="author"
    class="author-details-card"
  >

    <div class="row g-5 align-items-center">

      <!-- Avatar -->

      <div class="col-md-4 text-center">

        <img
          v-if="imageLoaded"
          :src="author.avatarUrl"
          :alt="`Photo of ${author.name}`"
          class="author-avatar"
          @error="handleImageError"
        />

        <div
          v-else
          class="avatar-placeholder"
          role="img"
          :aria-label="`No photo available for ${author.name}`"
        >
          👤
        </div>

      </div>


      <!-- Information -->

      <div class="col-md-8">

        <span class="badge bg-primary mb-3">
          AUTHOR
        </span>

        <h1 class="display-5 fw-bold mb-3">
          {{ author.name }}
        </h1>

        <p class="author-bio">
          {{ author.bio }}
        </p>

        <div class="author-meta">

          <strong>
            Author ID:
          </strong>

          {{ author.id }}

        </div>


        <RouterLink
          to="/authors"
          class="btn btn-outline-primary mt-4"
        >
          ← Back to Authors
        </RouterLink>

      </div>

    </div>

  </div>


  <!-- =====================================
       AUTHOR NOT FOUND
  ====================================== -->

  <div
    v-else
    class="text-center py-5"
  >

    <div class="display-1">
      👤
    </div>

    <h2 class="fw-bold mt-3">
      Author Not Found
    </h2>

    <p class="text-secondary">
      The author you're looking for doesn't exist.
    </p>

    <RouterLink
      to="/authors"
      class="btn btn-primary"
    >
      Browse Authors
    </RouterLink>

  </div>


  <!-- =====================================
       BOOKS BY AUTHOR
  ====================================== -->

  <div
    v-if="author"
    class="author-books-section mt-5"
  >

    <div class="text-center mb-4">

      <span class="text-primary fw-semibold">
        AUTHOR'S COLLECTION
      </span>

      <h2 class="fw-bold mt-2">
        Books by {{ author.name }}
      </h2>

      <p class="text-secondary">
        Explore the books written by this author.
      </p>

    </div>


    <!-- Books Loading -->

    <div
      v-if="booksLoading"
      class="text-center py-5"
    >

      <div
        class="spinner-border text-primary"
        role="status"
      >
        <span class="visually-hidden">
          Loading books...
        </span>
      </div>

      <p class="text-secondary mt-3">
        Loading books...
      </p>

    </div>


    <!-- Books Error -->

    <div
      v-else-if="booksError"
      class="text-center py-5"
    >

      <div class="display-5">
        ⚠️
      </div>

      <h4 class="fw-bold mt-3">
        Unable to load books
      </h4>

      <p class="text-secondary">
        {{ booksError }}
      </p>

      <button
        type="button"
        class="btn btn-primary"
        @click="loadAuthorBooks"
      >
        Retry
      </button>

    </div>


    <!-- Books -->

    <div
      v-else-if="authorBooks.length > 0"
      class="row g-4"
    >

      <div
        v-for="book in authorBooks"
        :key="book.id"
        class="col-sm-6 col-lg-4 col-xl-3"
      >

        <BookCard :book="book" />

      </div>

    </div>


    <!-- No Books -->

    <div
      v-else
      class="text-center py-5"
    >

      <div class="display-1">
        📚
      </div>

      <h3 class="fw-bold mt-3">
        No Books Found
      </h3>

      <p class="text-secondary">
        This author doesn't have any books yet.
      </p>

    </div>

  </div>

</div>


<!-- =====================================
     AI ASSISTANT
====================================== -->

<AIChat
  v-if="author"
  context-type="author"
  :context-data="author"
/>
```

  </section>
</template>

<script setup>

import {
  onMounted,
  ref,
  computed
} from 'vue'

import {
  useRoute
} from 'vue-router'

import {
  useAuthorsStore
} from '../../stores/authors'

import BookCard
  from '../../components/books/BookCard.vue'

import AIChat
  from '../../components/ai/AIChat.vue'

import api
  from '../../services/api'


// ========================================
// ROUTE
// ========================================

const route = useRoute()


// ========================================
// STORES
// ========================================

const authorsStore = useAuthorsStore()


// ========================================
// IMAGE
// ========================================

const imageLoaded = ref(true)


// ========================================
// AUTHOR
// ========================================

const author = computed(() => {

  return authorsStore.currentAuthor

})


// ========================================
// AUTHOR BOOKS
// ========================================

const authorBooks = ref([])

const booksLoading = ref(false)

const booksError = ref(null)


// ========================================
// LOAD AUTHOR
// ========================================

async function loadAuthor() {

  const id = route.params.id

  imageLoaded.value = true

  try {

    await authorsStore.fetchById(id)

    if (authorsStore.currentAuthor) {

      await loadAuthorBooks()

    }

  } catch (error) {

    console.error(
      'Failed to load author:',
      error
    )

  }

}


// ========================================
// LOAD AUTHOR BOOKS
// ========================================

async function loadAuthorBooks() {

  const id = route.params.id

  booksLoading.value = true

  booksError.value = null

  try {

    const response =
      await api.get(`/books?authorId=${id}`)

    authorBooks.value = response.data

  } catch (error) {

    booksError.value =
      'Unable to load books for this author.'

    console.error(
      'Failed to load author books:',
      error
    )

  } finally {

    booksLoading.value = false

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

  loadAuthor()

})

</script>

<style scoped>

.author-details-page {
  min-height: 100vh;
  background: #f8f9fa;
}


/* ========================================
   AUTHOR CARD
======================================== */

.author-details-card {

  background: white;

  border-radius: 24px;

  padding: 50px;

  box-shadow:
    0 15px 40px rgba(0, 0, 0, 0.08);

}


/* ========================================
   AVATAR
======================================== */

.author-avatar {

  width: 250px;

  height: 250px;

  object-fit: cover;

  border-radius: 50%;

  border: 8px solid #e7f1ff;

}


.avatar-placeholder {

  width: 250px;

  height: 250px;

  margin: auto;

  border-radius: 50%;

  background: #e9ecef;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 90px;

}


/* ========================================
   TEXT
======================================== */

.author-bio {

  color: #6c757d;

  font-size: 17px;

  line-height: 1.8;

  max-width: 700px;

}


.author-meta {

  color: #6c757d;

}


/* ========================================
   BOOKS SECTION
======================================== */

.author-books-section {

  padding-top: 20px;

}


.author-books-section h2 {

  font-size: 32px;

}


/* ========================================
   MOBILE
======================================== */

@media (max-width: 768px) {

  .author-details-card {

    padding: 30px 20px;

  }


  .author-avatar,
  .avatar-placeholder {

    width: 180px;

    height: 180px;

  }


  .author-books-section h2 {

    font-size: 26px;

  }

}

</style>
