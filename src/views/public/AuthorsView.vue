<template>
  <section class="authors-page">

    <div class="container py-5">

      <!-- =========================
           PAGE HEADER
      ========================== -->

      <div class="page-header text-center mb-5">

        <span class="section-label">
          MEET THE AUTHORS
        </span>

        <h1 class="page-title mt-2">
          Discover Our Authors
        </h1>

        <p class="page-subtitle">
          Explore the writers behind your favorite stories
          and discover new voices to follow.
        </p>

      </div>


      <!-- =========================
           SEARCH
      ========================== -->

      <div class="search-wrapper mb-5">

        <div class="search-box">

          <span class="search-icon">
            🔍
          </span>

          <input
            v-model="searchQuery"
            type="text"
            class="search-input"
            placeholder="Search authors by name..."
            aria-label="Search authors"
          />

          <button
            v-if="searchQuery"
            type="button"
            class="clear-search"
            aria-label="Clear search"
            @click="searchQuery = ''"
          >
            ×
          </button>

        </div>


        <div
          v-if="searchQuery"
          class="search-result-text"
        >
          Showing results for
          <strong>
            "{{ searchQuery }}"
          </strong>
        </div>

      </div>


      <!-- =========================
           LOADING
      ========================== -->

      <div
        v-if="authorsStore.loading"
        class="state-container"
      >

        <div class="loading-spinner">

          <div
            class="spinner-border text-primary"
            role="status"
          >
            <span class="visually-hidden">
              Loading...
            </span>
          </div>

        </div>

        <h4 class="state-title">
          Loading Authors
        </h4>

        <p class="state-text">
          Please wait while we fetch our authors.
        </p>

      </div>


      <!-- =========================
           ERROR
      ========================== -->

      <div
        v-else-if="authorsStore.error"
        class="state-container error-container"
      >

        <div class="state-icon">
          ⚠️
        </div>

        <h4 class="state-title">
          Something went wrong
        </h4>

        <p class="state-text">
          {{ authorsStore.error }}
        </p>

        <button
          type="button"
          class="btn btn-primary retry-btn"
          @click="loadAuthors"
        >
          Try Again
        </button>

      </div>


      <!-- =========================
           AUTHORS
      ========================== -->

      <template v-else>

        <div
          v-if="filteredAuthors.length > 0"
          class="row g-4"
        >

          <div
            v-for="author in filteredAuthors"
            :key="author.id"
            class="col-sm-6 col-lg-4"
          >

            <article class="author-card h-100">

              <!-- Avatar -->

              <div class="author-avatar-section">

                <div class="avatar-ring">

                  <img
                    :src="author.avatarUrl"
                    :alt="`Photo of ${author.name}`"
                    class="author-avatar"
                    @error="handleImageError"
                  />

                </div>

                <span class="author-badge">
                  AUTHOR
                </span>

              </div>


              <!-- Content -->

              <div class="author-content">

                <h2 class="author-name">
                  {{ author.name }}
                </h2>

                <div class="name-line"></div>

                <p class="author-bio">
                  {{
                    author.bio ||
                    'No biography available.'
                  }}
                </p>

                <RouterLink
                  :to="`/authors/${author.id}`"
                  class="author-button mt-auto"
                >

                  <span>
                    View Author
                  </span>

                  <span class="arrow">
                    →
                  </span>

                </RouterLink>

              </div>

            </article>

          </div>

        </div>


        <!-- =========================
             EMPTY
        ========================== -->

        <div
          v-else
          class="state-container empty-container"
        >

          <div class="empty-icon">
            👤
          </div>

          <h3 class="state-title">
            No Authors Found
          </h3>

          <p class="state-text">
            {{
              searchQuery
                ? `We couldn't find an author matching "${searchQuery}".`
                : 'There are no authors available right now.'
            }}
          </p>

          <button
            v-if="searchQuery"
            type="button"
            class="btn btn-outline-primary"
            @click="searchQuery = ''"
          >
            Clear Search
          </button>

        </div>

      </template>

    </div>

  </section>
</template>


<script setup>

import {
  ref,
  computed,
  onMounted
} from 'vue'

import {
  useAuthorsStore
} from '../../stores/authors'


// ========================================
// STORE
// ========================================

const authorsStore = useAuthorsStore()


// ========================================
// SEARCH
// ========================================

const searchQuery = ref('')


const filteredAuthors = computed(() => {

  const search =
    searchQuery.value
      .toLowerCase()
      .trim()


  if (!search) {

    return authorsStore.authors

  }


  return authorsStore.authors.filter(
    author =>
      author.name
        ?.toLowerCase()
        .includes(search)
  )

})


// ========================================
// LOAD AUTHORS
// ========================================

async function loadAuthors() {

  try {

    await authorsStore.fetchList()

  } catch (error) {

    console.error(
      'Failed to load authors:',
      error
    )

  }

}


// ========================================
// IMAGE FALLBACK
// ========================================

function handleImageError(event) {

  event.target.src =
    'https://placehold.co/200x200?text=Author'

}


// ========================================
// INITIAL LOAD
// ========================================

onMounted(() => {

  loadAuthors()

})

</script>


<style scoped>

/* ========================================
   PAGE
======================================== */

.authors-page {

  min-height: 80vh;

  background:
    linear-gradient(
      180deg,
      var(
        --color-background,
        #f8f9fa
      ) 0%,

      var(
        --color-surface,
        #ffffff
      ) 100%
    );

  color:
    var(
      --color-text,
      #172033
    );

}


/* ========================================
   HEADER
======================================== */

.page-header {

  max-width: 700px;

  margin-left: auto;

  margin-right: auto;

}


.section-label {

  display: inline-block;

  color:
    var(
      --color-accent,
      #0d6efd
    );

  font-size: 0.72rem;

  font-weight: 800;

  letter-spacing: 0.14em;

}


.page-title {

  color:
    var(
      --color-text,
      #172033
    );

  font-size:
    clamp(
      2.2rem,
      5vw,
      3.5rem
    );

  font-weight: 850;

  letter-spacing: -0.045em;

}


.page-subtitle {

  max-width: 580px;

  margin:
    15px auto 0;

  color:
    var(
      --color-muted,
      #6c757d
    );

  font-size: 1rem;

  line-height: 1.7;

}


/* ========================================
   SEARCH
======================================== */

.search-wrapper {

  max-width: 720px;

  margin-left: auto;

  margin-right: auto;

}


.search-box {

  position: relative;

  display: flex;

  align-items: center;

  background:
    var(
      --color-surface,
      #ffffff
    );

  border:
    1px solid
    var(
      --color-border,
      #e1e5eb
    );

  border-radius: 16px;

  padding: 5px;

  box-shadow:
    0 8px 30px
    rgba(23, 32, 51, 0.06);

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

}


.search-box:focus-within {

  border-color:
    var(
      --color-accent,
      #0d6efd
    );

  box-shadow:
    0 0 0 4px
    rgba(13, 110, 253, 0.1);

}


.search-icon {

  width: 50px;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 18px;

}


.search-input {

  flex: 1;

  min-width: 0;

  border: none;

  outline: none;

  background: transparent;

  color:
    var(
      --color-text,
      #172033
    );

  padding: 13px 8px;

  font-size: 0.95rem;

}


.search-input::placeholder {

  color:
    var(
      --color-muted,
      #8a93a3
    );

}


.clear-search {

  width: 38px;

  height: 38px;

  border: none;

  border-radius: 10px;

  background:
    var(
      --color-background,
      #f1f3f5
    );

  color:
    var(
      --color-muted,
      #6c757d
    );

  font-size: 22px;

  cursor: pointer;

}


.clear-search:hover {

  color:
    var(
      --color-text,
      #172033
    );

}


.search-result-text {

  margin-top: 12px;

  text-align: center;

  color:
    var(
      --color-muted,
      #6c757d
    );

  font-size: 0.82rem;

}


/* ========================================
   AUTHOR CARD
======================================== */

.author-card {

  position: relative;

  background:
    var(
      --color-surface,
      #ffffff
    );

  border:
    1px solid
    var(
      --color-border,
      #e4e7ec
    );

  border-radius: 22px;

  overflow: hidden;

  display: flex;

  flex-direction: column;

  box-shadow:
    0 8px 25px
    rgba(23, 32, 51, 0.05);

  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;

}


.author-card:hover {

  transform:
    translateY(-8px);

  border-color:
    rgba(13, 110, 253, 0.25);

  box-shadow:
    0 20px 45px
    rgba(23, 32, 51, 0.12);

}


/* ========================================
   AVATAR
======================================== */

.author-avatar-section {

  position: relative;

  padding:
    35px 20px 28px;

  display: flex;

  flex-direction: column;

  align-items: center;

  background:
    linear-gradient(
      135deg,
      rgba(13, 110, 253, 0.08),
      rgba(13, 110, 253, 0.02)
    );

}


.avatar-ring {

  width: 135px;

  height: 135px;

  padding: 5px;

  border-radius: 50%;

  background:
    linear-gradient(
      135deg,
      var(
        --color-accent,
        #0d6efd
      ),
      #8bbcff
    );

}


.author-avatar {

  width: 100%;

  height: 100%;

  object-fit: cover;

  border-radius: 50%;

  display: block;

  border:
    4px solid
    var(
      --color-surface,
      #ffffff
    );

}


.author-badge {

  margin-top: 15px;

  padding: 5px 11px;

  border-radius: 999px;

  background:
    var(
      --color-primary,
      #172033
    );

  color: white;

  font-size: 0.62rem;

  font-weight: 800;

  letter-spacing: 0.1em;

}


/* ========================================
   CONTENT
======================================== */

.author-content {

  padding: 25px;

  display: flex;

  flex-direction: column;

  flex: 1;

}


.author-name {

  margin: 0;

  color:
    var(
      --color-text,
      #172033
    );

  text-align: center;

  font-size: 1.3rem;

  font-weight: 800;

}


.name-line {

  width: 35px;

  height: 3px;

  margin:
    12px auto 16px;

  border-radius: 99px;

  background:
    var(
      --color-accent,
      #0d6efd
    );

}


.author-bio {

  color:
    var(
      --color-muted,
      #6c757d
    );

  text-align: center;

  font-size: 0.88rem;

  line-height: 1.7;

  margin-bottom: 24px;

  display: -webkit-box;

  line-clamp: 4;

  -webkit-line-clamp: 4;

  -webkit-box-orient: vertical;

  overflow: hidden;

}


/* ========================================
   BUTTON
======================================== */

.author-button {

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 10px;

  width: 100%;

  padding: 11px 16px;

  border-radius: 12px;

  background:
    var(
      --color-primary,
      #172033
    );

  color: white;

  text-decoration: none;

  font-size: 0.85rem;

  font-weight: 700;

  transition:
    background 0.25s ease,
    transform 0.25s ease;

}


.author-button:hover {

  background:
    var(
      --color-accent,
      #0d6efd
    );

  color: white;

}


.arrow {

  transition:
    transform 0.2s ease;

}


.author-button:hover .arrow {

  transform:
    translateX(4px);

}


/* ========================================
   STATES
======================================== */

.state-container {

  text-align: center;

  padding: 75px 20px;

}


.state-icon,
.empty-icon {

  font-size: 55px;

}


.loading-spinner {

  margin-bottom: 20px;

}


.state-title {

  margin-top: 15px;

  color:
    var(
      --color-text,
      #172033
    );

  font-weight: 800;

}


.state-text {

  max-width: 500px;

  margin:
    10px auto 22px;

  color:
    var(
      --color-muted,
      #6c757d
    );

  line-height: 1.7;

}


.retry-btn {

  border-radius: 10px;

}


/* ========================================
   RESPONSIVE
======================================== */

@media (max-width: 576px) {

  .authors-page {

    padding-top: 10px;

  }


  .page-title {

    font-size: 2.2rem;

  }


  .page-subtitle {

    font-size: 0.9rem;

  }


  .author-content {

    padding: 22px;

  }

}

</style>