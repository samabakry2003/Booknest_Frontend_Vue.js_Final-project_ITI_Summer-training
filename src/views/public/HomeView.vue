
<template>

  <div class="home-page">

    <!-- =====================================
         HERO
    ====================================== -->

    <section class="hero-section">

      <div class="container">

        <div class="row align-items-center min-vh-75">

          <!-- Hero Content -->

          <div class="col-lg-6 hero-content">

            <span class="hero-badge">
              📚 YOUR DIGITAL LIBRARY
            </span>


            <h1 class="hero-title">

              Discover Your

              <span>
                Next Great Read
              </span>

            </h1>


            <p class="hero-description">

              Explore amazing books, discover talented
              authors, and find your next favorite story
              with BookNest.

            </p>


            <div class="hero-actions">

              <RouterLink
                to="/books"
                class="btn btn-primary btn-lg hero-btn"
              >

                Explore Books

                <span>→</span>

              </RouterLink>


              <RouterLink
                to="/authors"
                class="btn btn-outline-secondary btn-lg hero-btn-outline"
              >

                Meet Authors

              </RouterLink>

            </div>


            <!-- Quick Stats -->

            <div class="hero-stats">

              <div class="hero-stat">

                <strong>
                  {{ booksCount }}
                </strong>

                <span>
                  Books
                </span>

              </div>


              <div class="stat-divider"></div>


              <div class="hero-stat">

                <strong>
                  {{ authorsCount }}
                </strong>

                <span>
                  Authors
                </span>

              </div>


              <div class="stat-divider"></div>


              <div class="hero-stat">

                <strong>
                  ∞
                </strong>

                <span>
                  Stories
                </span>

              </div>

            </div>

          </div>


          <!-- Hero Visual -->

          <div class="col-lg-6">

            <div class="hero-visual">

              <div class="floating-card floating-card-one">

                <span>
                  ⭐
                </span>

                <div>

                  <strong>
                    Great Stories
                  </strong>

                  <small>
                    Waiting for you
                  </small>

                </div>

              </div>


              <div class="book-stack">

                <div class="book-back"></div>

                <div class="book-middle"></div>

                <div class="book-front">

                  <div class="book-front-content">

                    <span class="mini-logo">
                      📚
                    </span>

                    <strong>
                      BookNest
                    </strong>

                    <small>
                      Discover. Read. Explore.
                    </small>

                  </div>

                </div>

              </div>


              <div class="floating-card floating-card-two">

                <span>
                  🤖
                </span>

                <div>

                  <strong>
                    AI Assistant
                  </strong>

                  <small>
                    Ask anything
                  </small>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>


    <!-- =====================================
         WHY BOOKNEST
    ====================================== -->

    <section class="features-section">

      <div class="container">

        <div class="section-heading text-center">

          <span class="section-label">
            WHY BOOKNEST?
          </span>

          <h2>
            Everything You Need in One Place
          </h2>

          <p>
            A smarter and simpler way to discover books
            and the people behind them.
          </p>

        </div>


        <div class="row g-4">

          <!-- Feature 1 -->

          <div class="col-md-4">

            <div class="feature-card">

              <div class="feature-icon">
                📚
              </div>

              <div class="feature-number">
                01
              </div>

              <h4>
                Discover Books
              </h4>

              <p>
                Explore books across different genres,
                topics, and styles and find your next
                favorite story.
              </p>

              <RouterLink to="/books">
                Explore collection →
              </RouterLink>

            </div>

          </div>


          <!-- Feature 2 -->

          <div class="col-md-4">

            <div class="feature-card">

              <div class="feature-icon">
                ✍️
              </div>

              <div class="feature-number">
                02
              </div>

              <h4>
                Meet Authors
              </h4>

              <p>
                Discover talented writers and learn more
                about their stories, backgrounds, and books.
              </p>

              <RouterLink to="/authors">
                Explore authors →
              </RouterLink>

            </div>

          </div>


          <!-- Feature 3 -->

          <div class="col-md-4">

            <div class="feature-card">

              <div class="feature-icon">
                🤖
              </div>

              <div class="feature-number">
                03
              </div>

              <h4>
                Ask BookNest AI
              </h4>

              <p>
                Get quick answers about the book or author
                you're currently exploring.
              </p>

              <span class="feature-ai">
                Available on book & author pages
              </span>

            </div>

          </div>

        </div>

      </div>

    </section>


    <!-- =====================================
         RECENT BOOKS
    ====================================== -->

    <section class="recent-books-section">

      <div class="container">

        <div
          class="section-heading-row"
        >

          <div>

            <span class="section-label">
              RECENTLY ADDED
            </span>

            <h2>
              Fresh From the Shelf
            </h2>

            <p>
              Take a look at some of the latest books
              in our collection.
            </p>

          </div>


          <RouterLink
            to="/books"
            class="view-all-btn"
          >
            View All Books →
          </RouterLink>

        </div>


        <!-- Loading -->

        <div
          v-if="booksStore.loading"
          class="state-box"
        >

          <div
            class="spinner-border text-primary"
            role="status"
          >

            <span class="visually-hidden">
              Loading...
            </span>

          </div>

          <p>
            Loading recent books...
          </p>

        </div>


        <!-- Error -->

        <div
          v-else-if="booksStore.error"
          class="state-box"
        >

          <div class="state-icon">
            ⚠️
          </div>

          <h5>
            Unable to load recent books
          </h5>

          <p>
            Something went wrong while loading the books.
          </p>

          <button
            type="button"
            class="btn btn-outline-primary"
            @click="loadBooks"
          >
            Try Again
          </button>

        </div>


        <!-- Empty -->

        <div
          v-else-if="recentBooks.length === 0"
          class="state-box"
        >

          <div class="state-icon">
            📚
          </div>

          <h5>
            No books available
          </h5>

          <p>
            Check back later for new books.
          </p>

        </div>


        <!-- Books -->

        <div
          v-else
          class="row g-4"
        >

          <div
            v-for="(book, index) in recentBooks"
            :key="book.id"
            class="col-sm-6 col-lg-4"
          >

            <div
              class="book-wrapper"
              :style="{
                '--delay': `${index * 0.1}s`
              }"
            >

              <BookCard
                :book="book"
              />

            </div>

          </div>

        </div>

      </div>

    </section>


    <!-- =====================================
         CTA
    ====================================== -->

    <section class="cta-section">

      <div class="container">

        <div class="cta-card">

          <div class="cta-decoration">
            ✨
          </div>


          <span class="cta-label">
            KEEP EXPLORING
          </span>


          <h2>
            Your Next Favorite Story
            Is Waiting.
          </h2>


          <p>
            Browse our growing collection, discover
            new authors, and let BookNest help you
            find something worth reading.
          </p>


          <div class="cta-actions">

            <RouterLink
              to="/books"
              class="btn btn-primary btn-lg"
            >
              Start Exploring
            </RouterLink>


            <RouterLink
              to="/about"
              class="btn btn-outline-secondary btn-lg"
            >
              Learn More
            </RouterLink>

          </div>

        </div>

      </div>

    </section>

  </div>

</template>


<script setup>

import {
  computed,
  onMounted
} from 'vue'

import {
  useBooksStore
} from '../../stores/books'

import BookCard
  from '../../components/books/BookCard.vue'


// ========================================
// STORE
// ========================================

const booksStore =
  useBooksStore()


// ========================================
// RECENT BOOKS
// ========================================

const recentBooks =
  computed(() => {

    return [...booksStore.books]
      .slice(-3)
      .reverse()

  })


// ========================================
// BOOK COUNT
// ========================================

const booksCount =
  computed(() => {

    return booksStore.books.length

  })


// ========================================
// AUTHORS COUNT
// ========================================

// Try to get authors count if the store
// already provides it.

const authorsCount =
  computed(() => {

    return (
      booksStore.authors?.length ||
      booksStore.authorCount ||
      0
    )

  })


// ========================================
// LOAD BOOKS
// ========================================

async function loadBooks() {

  try {

    await booksStore.fetchList()

  } catch (error) {

    console.error(
      'Failed to load books:',
      error
    )

  }

}


// ========================================
// INITIAL LOAD
// ========================================

onMounted(() => {

  loadBooks()

})

</script>


<style scoped>

/* ========================================
   BASE
======================================== */

.home-page {

  background: #ffffff;

  color: #172033;

  overflow: hidden;

  transition:
    background 0.3s ease,
    color 0.3s ease;

}


/* ========================================
   HERO
======================================== */

.hero-section {

  position: relative;

  background:
    radial-gradient(
      circle at 80% 30%,
      rgba(13, 110, 253, 0.12),
      transparent 35%
    ),
    linear-gradient(
      135deg,
      #ffffff 0%,
      #f1f6ff 100%
    );

}


.min-vh-75 {

  min-height: 78vh;

}


.hero-content {

  position: relative;

  z-index: 2;

}


.hero-badge {

  display: inline-flex;

  align-items: center;

  gap: 7px;

  padding: 8px 14px;

  border-radius: 999px;

  background: #e7f1ff;

  color: #0d6efd;

  font-size: 11px;

  font-weight: 800;

  letter-spacing: 1.5px;

}


.hero-title {

  margin-top: 20px;

  margin-bottom: 22px;

  max-width: 650px;

  font-size: clamp(3rem, 5vw, 5rem);

  line-height: 1.02;

  font-weight: 850;

  letter-spacing: -0.055em;

}


.hero-title span {

  display: block;

  color: #0d6efd;

}


.hero-description {

  max-width: 570px;

  color: #6c757d;

  font-size: 1.1rem;

  line-height: 1.8;

}


.hero-actions {

  display: flex;

  flex-wrap: wrap;

  gap: 12px;

  margin-top: 28px;

}


.hero-btn {

  border-radius: 12px;

  padding: 12px 22px;

  font-weight: 700;

}


.hero-btn-outline {

  border-radius: 12px;

  padding: 12px 22px;

  font-weight: 700;

}


.hero-stats {

  display: flex;

  align-items: center;

  gap: 22px;

  margin-top: 38px;

}


.hero-stat {

  display: flex;

  flex-direction: column;

}


.hero-stat strong {

  font-size: 1.5rem;

  font-weight: 800;

}


.hero-stat span {

  margin-top: 2px;

  color: #6c757d;

  font-size: 12px;

}


.stat-divider {

  width: 1px;

  height: 35px;

  background: #dee2e6;

}


/* ========================================
   HERO VISUAL
======================================== */

.hero-visual {

  position: relative;

  min-height: 500px;

  display: flex;

  align-items: center;

  justify-content: center;

}


.book-stack {

  position: relative;

  width: 290px;

  height: 370px;

  transform:
    rotate(5deg);

}


.book-back,
.book-middle,
.book-front {

  position: absolute;

  border-radius: 12px;

  box-shadow:
    0 25px 50px rgba(23, 32, 51, 0.18);

}


.book-back {

  width: 240px;

  height: 320px;

  right: 0;

  bottom: 10px;

  background:
    linear-gradient(
      135deg,
      #172033,
      #34425d
    );

  transform:
    rotate(-10deg);

}


.book-middle {

  width: 250px;

  height: 340px;

  left: 15px;

  bottom: 0;

  background:
    linear-gradient(
      135deg,
      #0d6efd,
      #66a3ff
    );

  transform:
    rotate(-3deg);

}


.book-front {

  width: 255px;

  height: 350px;

  left: 5px;

  top: 5px;

  background:
    linear-gradient(
      145deg,
      #ffffff,
      #eef5ff
    );

  display: flex;

  align-items: center;

  justify-content: center;

  transform:
    rotate(2deg);

  border:
    1px solid #dce8ff;

}


.book-front-content {

  width: 80%;

  height: 80%;

  border:
    2px solid #0d6efd;

  border-radius: 8px;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  text-align: center;

}


.mini-logo {

  font-size: 40px;

  margin-bottom: 12px;

}


.book-front-content strong {

  color: #172033;

  font-size: 28px;

  letter-spacing: -1px;

}


.book-front-content small {

  margin-top: 8px;

  color: #6c757d;

  font-size: 11px;

  letter-spacing: 1px;

}


/* ========================================
   FLOATING CARDS
======================================== */

.floating-card {

  position: absolute;

  z-index: 5;

  display: flex;

  align-items: center;

  gap: 10px;

  padding: 13px 16px;

  border:
    1px solid rgba(255, 255, 255, 0.8);

  border-radius: 14px;

  background:
    rgba(255, 255, 255, 0.88);

  backdrop-filter:
    blur(12px);

  box-shadow:
    0 15px 35px rgba(23, 32, 51, 0.12);

  animation:
    floating 4s ease-in-out infinite;

}


.floating-card > span {

  font-size: 22px;

}


.floating-card strong {

  display: block;

  font-size: 12px;

}


.floating-card small {

  display: block;

  margin-top: 2px;

  color: #6c757d;

  font-size: 10px;

}


.floating-card-one {

  top: 65px;

  left: 5px;

}


.floating-card-two {

  right: 5px;

  bottom: 70px;

  animation-delay: 1s;

}


@keyframes floating {

  0%,
  100% {

    transform:
      translateY(0);

  }

  50% {

    transform:
      translateY(-10px);

  }

}


/* ========================================
   SECTIONS
======================================== */

.features-section,
.recent-books-section {

  padding:
    95px 0;

}


.features-section {

  background: #f8f9fa;

}


.section-heading {

  max-width: 700px;

  margin:
    0 auto 55px;

}


.section-heading h2,
.section-heading-row h2 {

  margin-top: 10px;

  margin-bottom: 10px;

  font-size: clamp(
    1.8rem,
    3vw,
    2.6rem
  );

  font-weight: 800;

  letter-spacing: -0.035em;

}


.section-heading p,
.section-heading-row p {

  margin: 0;

  color: #6c757d;

  line-height: 1.7;

}


.section-label {

  color: #0d6efd;

  font-size: 11px;

  font-weight: 800;

  letter-spacing: 2px;

}


/* ========================================
   FEATURE CARDS
======================================== */

.feature-card {

  position: relative;

  height: 100%;

  padding: 32px;

  background: #ffffff;

  border:
    1px solid #e9ecef;

  border-radius: 20px;

  overflow: hidden;

  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;

}


.feature-card::after {

  content: '';

  position: absolute;

  width: 100px;

  height: 100px;

  right: -35px;

  bottom: -35px;

  border-radius: 50%;

  background: #eef5ff;

}


.feature-card:hover {

  transform:
    translateY(-8px);

  border-color:
    #cfe0ff;

  box-shadow:
    0 20px 45px rgba(23, 32, 51, 0.1);

}


.feature-icon {

  width: 62px;

  height: 62px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 17px;

  background: #e7f1ff;

  font-size: 28px;

}


.feature-number {

  margin-top: 24px;

  color: #adb5bd;

  font-size: 11px;

  font-weight: 800;

  letter-spacing: 1px;

}


.feature-card h4 {

  margin:
    7px 0 12px;

  font-size: 20px;

  font-weight: 800;

}


.feature-card p {

  color: #6c757d;

  font-size: 14px;

  line-height: 1.7;

}


.feature-card a {

  position: relative;

  z-index: 2;

  display: inline-block;

  margin-top: 12px;

  color: #0d6efd;

  font-size: 13px;

  font-weight: 700;

  text-decoration: none;

}


.feature-ai {

  position: relative;

  z-index: 2;

  display: inline-block;

  margin-top: 12px;

  color: #6c757d;

  font-size: 11px;

  font-weight: 600;

}


/* ========================================
   RECENT BOOKS
======================================== */

.recent-books-section {

  background: #ffffff;

}


.section-heading-row {

  display: flex;

  align-items: flex-end;

  justify-content: space-between;

  gap: 25px;

  margin-bottom: 40px;

}


.view-all-btn {

  flex-shrink: 0;

  padding: 10px 16px;

  border:
    1px solid #cfe0ff;

  border-radius: 10px;

  color: #0d6efd;

  font-size: 13px;

  font-weight: 700;

  text-decoration: none;

  transition:
    background 0.2s ease,
    transform 0.2s ease;

}


.view-all-btn:hover {

  background: #eef5ff;

  transform:
    translateY(-2px);

}


.book-wrapper {

  height: 100%;

  animation:
    cardAppear 0.5s ease both;

  animation-delay:
    var(--delay);

}


@keyframes cardAppear {

  from {

    opacity: 0;

    transform:
      translateY(15px);

  }

  to {

    opacity: 1;

    transform:
      translateY(0);

  }

}


/* ========================================
   STATES
======================================== */

.state-box {

  min-height: 300px;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  text-align: center;

  padding: 50px 20px;

}


.state-box p {

  margin-top: 10px;

  color: #6c757d;

}


.state-icon {

  font-size: 45px;

  margin-bottom: 10px;

}


/* ========================================
   CTA
======================================== */

.cta-section {

  padding:
    30px 0 95px;

  background: #ffffff;

}


.cta-card {

  position: relative;

  overflow: hidden;

  padding:
    75px 25px;

  text-align: center;

  border:
    1px solid #dce8ff;

  border-radius: 28px;

  background:
    radial-gradient(
      circle at 15% 20%,
      rgba(13, 110, 253, 0.12),
      transparent 25%
    ),
    linear-gradient(
      135deg,
      #eef5ff,
      #ffffff
    );

}


.cta-card::before {

  content: '';

  position: absolute;

  width: 220px;

  height: 220px;

  top: -110px;

  right: -70px;

  border-radius: 50%;

  background:
    rgba(13, 110, 253, 0.08);

}


.cta-decoration {

  font-size: 30px;

  margin-bottom: 10px;

}


.cta-label {

  color: #0d6efd;

  font-size: 11px;

  font-weight: 800;

  letter-spacing: 2px;

}


.cta-card h2 {

  position: relative;

  margin:
    12px auto 15px;

  max-width: 650px;

  font-size: clamp(
    2rem,
    4vw,
    3.2rem
  );

  font-weight: 850;

  letter-spacing: -0.045em;

}


.cta-card p {

  position: relative;

  max-width: 650px;

  margin:
    0 auto;

  color: #6c757d;

  line-height: 1.8;

}


.cta-actions {

  position: relative;

  display: flex;

  justify-content: center;

  flex-wrap: wrap;

  gap: 12px;

  margin-top: 30px;

}


.cta-actions .btn {

  border-radius: 11px;

  padding:
    11px 22px;

  font-weight: 700;

}


/* ========================================
   DARK MODE
======================================== */

:global(.dark-mode) .home-page {

  background: #111827;

  color: #f8f9fa;

}


:global(.dark-mode) .hero-section {

  background:
    radial-gradient(
      circle at 80% 30%,
      rgba(37, 99, 235, 0.18),
      transparent 35%
    ),
    linear-gradient(
      135deg,
      #111827,
      #172033
    );

}


:global(.dark-mode) .hero-description {

  color: #9ca3af;

}


:global(.dark-mode) .hero-badge {

  background: #1e3a5f;

  color: #60a5fa;

}


:global(.dark-mode) .hero-stat span {

  color: #9ca3af;

}


:global(.dark-mode) .stat-divider {

  background: #374151;

}


:global(.dark-mode) .book-front {

  background:
    linear-gradient(
      145deg,
      #1f2937,
      #172033
    );

  border-color: #374151;

}


:global(.dark-mode) .book-front-content strong {

  color: #f8f9fa;

}


:global(.dark-mode) .book-front-content small {

  color: #9ca3af;

}


:global(.dark-mode) .floating-card {

  background:
    rgba(31, 41, 55, 0.9);

  border-color:
    rgba(255, 255, 255, 0.08);

}


:global(.dark-mode) .floating-card small {

  color: #9ca3af;

}


:global(.dark-mode) .features-section {

  background: #0f172a;

}


:global(.dark-mode) .feature-card {

  background: #1f2937;

  border-color: #374151;

}


:global(.dark-mode) .feature-card:hover {

  border-color: #4b5563;

}


:global(.dark-mode) .feature-card::after {

  background: #24334a;

}


:global(.dark-mode) .feature-card p {

  color: #9ca3af;

}


:global(.dark-mode) .feature-ai {

  color: #9ca3af;

}


:global(.dark-mode) .feature-icon {

  background: #243b5e;

}


:global(.dark-mode) .recent-books-section {

  background: #111827;

}


:global(.dark-mode) .section-heading p,
:global(.dark-mode) .section-heading-row p {

  color: #9ca3af;

}


:global(.dark-mode) .view-all-btn {

  border-color: #374151;

}


:global(.dark-mode) .view-all-btn:hover {

  background: #1f2937;

}


:global(.dark-mode) .cta-section {

  background: #111827;

}


:global(.dark-mode) .cta-card {

  border-color: #374151;

  background:
    radial-gradient(
      circle at 15% 20%,
      rgba(37, 99, 235, 0.18),
      transparent 25%
    ),
    linear-gradient(
      135deg,
      #172033,
      #1f2937
    );

}


:global(.dark-mode) .cta-card p {

  color: #9ca3af;

}


/* ========================================
   RESPONSIVE
======================================== */

@media (max-width: 991px) {

  .hero-section {

    padding:
      45px 0 65px;

  }


  .hero-visual {

    min-height: 450px;

    margin-top: 25px;

  }


  .floating-card-one {

    left: 10%;

  }


  .floating-card-two {

    right: 10%;

  }

}


@media (max-width: 768px) {

  .hero-title {

    font-size: 42px;

  }


  .hero-description {

    font-size: 1rem;

  }


  .hero-stats {

    gap: 15px;

  }


  .hero-visual {

    min-height: 390px;

    transform:
      scale(0.88);

  }


  .section-heading-row {

    align-items: flex-start;

    flex-direction: column;

  }


  .features-section,
  .recent-books-section {

    padding:
      70px 0;

  }


  .cta-section {

    padding:
      20px 0 70px;

  }


  .cta-card {

    padding:
      55px 20px;

  }

}


@media (max-width: 576px) {

  .hero-title {

    font-size: 36px;

  }


  .hero-actions {

    flex-direction: column;

  }


  .hero-actions .btn {

    width: 100%;

  }


  .hero-stats {

    justify-content: space-between;

    gap: 10px;

  }


  .hero-stat strong {

    font-size: 1.25rem;

  }


  .hero-visual {

    min-height: 350px;

    transform:
      scale(0.75);

    margin:
      -20px 0 -20px;

  }


  .floating-card {

    transform:
      scale(0.85);

  }


  .floating-card-one {

    left: 0;

  }


  .floating-card-two {

    right: 0;

  }


  .cta-actions {

    flex-direction: column;

  }


  .cta-actions .btn {

    width: 100%;

  }

}

</style>

