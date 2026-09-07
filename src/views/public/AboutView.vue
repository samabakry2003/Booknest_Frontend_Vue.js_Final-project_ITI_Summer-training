<template>
  <section class="about-page">
<!-- =========================
     HERO
====== -->
<section class="about-hero">
  <div class="container">
    <div class="hero-content text-center">
      <span class="eyebrow">
        ABOUT BOOKNEST
      </span>
      <h1 class="hero-title">
        Discover Your Next
        <span>Great Story</span>
      </h1>
      <p class="hero-text">
        BookNest is a modern platform for discovering books,
        exploring authors, and getting closer to the stories
        you love.
      </p>
      <div class="hero-actions">
        <RouterLink
          to="/books"
          class="btn btn-primary hero-btn"
        >
          Explore Books
          <span>→</span>
        </RouterLink>

        <RouterLink
          to="/authors"
          class="btn btn-outline-dark hero-btn-outline"
        >
          Meet Authors
        </RouterLink>

      </div>

    </div>

  </div>

</section>


<!-- =========================
     FEATURES
========================== -->

<section class="features-section">

  <div class="container">

    <div class="section-heading text-center">

      <span class="eyebrow">
        WHY BOOKNEST?
      </span>

      <h2>
        Everything You Need
        <span>in One Place</span>
      </h2>

      <p>
        A simple and enjoyable way to explore the world
        of books and authors.
      </p>

    </div>


    <div class="row g-4">

      <!-- Feature 1 -->

      <div class="col-md-4">

        <article class="feature-card h-100">

          <div class="feature-number">
            01
          </div>

          <div class="feature-icon">
            📚
          </div>

          <h3>
            Discover Books
          </h3>

          <p>
            Explore a collection of books across different
            genres and discover stories worth reading.
          </p>

          <RouterLink
            to="/books"
            class="feature-link"
          >
            Explore collection
            <span>→</span>
          </RouterLink>

        </article>

      </div>

      <!-- Feature 2 -->

      <div class="col-md-4">

        <article class="feature-card h-100">

          <div class="feature-number">
            02
          </div>

          <div class="feature-icon">
            ✍️
          </div>

          <h3>
            Meet Authors
          </h3>

          <p>
            Learn more about the writers behind your favorite
            books and explore their work.
          </p>

          <RouterLink
            to="/authors"
            class="feature-link"
          >
            Meet our authors
            <span>→</span>
          </RouterLink>

        </article>

      </div>
      <!-- Feature 3 -->

      <div class="col-md-4">

        <article class="feature-card h-100">

          <div class="feature-number">
            03
          </div>

          <div class="feature-icon ai-icon">
            🤖
          </div>

          <h3>
            Ask BookNest AI
          </h3>

          <p>
            Get interactive answers about the book or author
            you're currently exploring.
          </p>

          <span class="feature-link">
            AI powered discovery
            <span>✦</span>
          </span>

        </article>

      </div>

    </div>

  </div>

</section>

<section class="how-section">

  <div class="container">

    <div class="how-card">

      <div class="row align-items-center g-5">

        <div class="col-lg-5">

          <span class="eyebrow">
            SIMPLE & EASY
          </span>

          <h2 class="how-title">
            Your next favorite book
            is just a few clicks away.
          </h2>

          <p class="how-text">
            BookNest makes it easy to discover books,
            explore authors, and get useful information
            while you browse.
          </p>

        </div>


        <div class="col-lg-7">

          <div class="steps">

            <div class="step">

              <div class="step-icon">
                🔎
              </div>

              <div>
                <h4>
                  Explore
                </h4>

                <p>
                  Browse books and authors from our collection.
                </p>
              </div>

            </div>


            <div class="step">

              <div class="step-icon">
                📖
              </div>

              <div>
                <h4>
                  Discover
                </h4>

                <p>
                  Open details and learn more about every story.
                </p>
              </div>

            </div>


            <div class="step">

              <div class="step-icon">
                🤖
              </div>

              <div>
                <h4>
                  Ask AI
                </h4>

                <p>
                  Ask BookNest AI questions about what you're reading.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

</section>


<!-- =========================
     FAQ
========================== -->

<section class="faq-section">

  <div class="container">

    <div class="section-heading text-center">

      <span class="eyebrow">
        FAQ
      </span>

      <h2>
        Frequently Asked
        <span>Questions</span>
      </h2>

      <p>
        Everything you need to know about BookNest.
      </p>

    </div>


    <div
      class="accordion faq-accordion"
      id="faqAccordion"
    >

      <!-- FAQ 1 -->

      <div class="accordion-item">

        <h2 class="accordion-header">

          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#faqOne"
            aria-expanded="true"
            aria-controls="faqOne"
          >
            <span class="faq-number">
              01
            </span>

            What is BookNest?

          </button>

        </h2>

        <div
          id="faqOne"
          class="accordion-collapse collapse show"
          data-bs-parent="#faqAccordion"
        >

          <div class="accordion-body">

            BookNest is a single-page application for
            discovering and managing books and authors.
            It provides an easy way to explore stories,
            learn about authors, and manage the collection.

          </div>

        </div>

      </div>


      <!-- FAQ 2 -->

      <div class="accordion-item">

        <h2 class="accordion-header">

          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#faqTwo"
            aria-expanded="false"
            aria-controls="faqTwo"
          >
            <span class="faq-number">
              02
            </span>

            Can I search for books?

          </button>

        </h2>

        <div
          id="faqTwo"
          class="accordion-collapse collapse"
          data-bs-parent="#faqAccordion"
        >

          <div class="accordion-body">

            Yes. The Books page allows you to search
            books by title and filter them by author.

          </div>

        </div>

      </div>


      <!-- FAQ 3 -->

      <div class="accordion-item">

        <h2 class="accordion-header">

          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#faqThree"
            aria-expanded="false"
            aria-controls="faqThree"
          >
            <span class="faq-number">
              03
            </span>

            Can I learn about an author?

          </button>

        </h2>

        <div
          id="faqThree"
          class="accordion-collapse collapse"
          data-bs-parent="#faqAccordion"
        >

          <div class="accordion-body">

            Absolutely. Every author has a dedicated
            details page containing their biography,
            information, and related books.

          </div>

        </div>

      </div>


      <!-- FAQ 4 -->

      <div class="accordion-item">

        <h2 class="accordion-header">

          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#faqFour"
            aria-expanded="false"
            aria-controls="faqFour"
          >
            <span class="faq-number">
              04
            </span>

            What is BookNest AI?

          </button>

        </h2>

        <div
          id="faqFour"
          class="accordion-collapse collapse"
          data-bs-parent="#faqAccordion"
        >

          <div class="accordion-body">

            BookNest AI is an AI-powered assistant that
            allows users to ask questions about the book
            or author currently being viewed.

          </div>

        </div>

      </div>

    </div>

  </div>

</section>


<!-- =========================
     FINAL CTA
========================== -->

<section class="final-cta">

  <div class="container">

    <div class="final-cta-card text-center">

      <span class="cta-icon">
        📚
      </span>

      <h2>
        Ready to Find Your Next Story?
      </h2>

      <p>
        Start exploring BookNest and discover books
        and authors you'll love.
      </p>

      <RouterLink
        to="/books"
        class="btn btn-primary px-4"
      >
        Start Exploring
        <span class="ms-2">→</span>
      </RouterLink>

    </div>

  </div>

</section>
```

  </section>
</template>

<script setup>
// About page does not require business logic.
</script>

<style scoped>

/* ========================================
   PAGE
======================================== */

.about-page {

  min-height: 100vh;

  background:
    var(--color-background, #f8f9fa);

  color:
    var(--color-text, #172033);

}


/* ========================================
   HERO
======================================== */

.about-hero {

  padding: 100px 20px;

  background:
    linear-gradient(
      135deg,
      rgba(13, 110, 253, 0.08),
      var(--color-surface, #ffffff)
    );

  border-bottom:
    1px solid
    var(--color-border, #e9ecef);

}


.hero-content {

  max-width: 850px;

  margin: auto;

}


.eyebrow {

  display: inline-block;

  color:
    var(--color-accent, #0d6efd);

  font-size: 0.72rem;

  font-weight: 800;

  letter-spacing: 0.16em;

}


.hero-title {

  margin-top: 18px;

  font-size: clamp(2.5rem, 6vw, 4.5rem);

  font-weight: 850;

  letter-spacing: -0.055em;

  line-height: 1.05;

}


.hero-title span {

  display: block;

  color:
    var(--color-accent, #0d6efd);

}


.hero-text {

  max-width: 680px;

  margin: 25px auto 0;

  color:
    var(--color-muted, #6c757d);

  font-size: 1.08rem;

  line-height: 1.8;

}


.hero-actions {

  display: flex;

  justify-content: center;

  flex-wrap: wrap;

  gap: 12px;

  margin-top: 32px;

}


.hero-btn {

  padding: 12px 20px;

  border-radius: 12px;

  font-weight: 700;

}


.hero-btn span {

  margin-left: 8px;

}


.hero-btn-outline {

  padding: 12px 20px;

  border-radius: 12px;

  font-weight: 700;

}


/* ========================================
   SECTIONS
======================================== */

.features-section,
.faq-section {

  padding: 90px 0;

}


.section-heading {

  max-width: 650px;

  margin:
    0 auto 50px;

}


.section-heading h2 {

  margin-top: 12px;

  font-size: clamp(2rem, 4vw, 3rem);

  font-weight: 850;

  letter-spacing: -0.04em;

}


.section-heading h2 span {

  color:
    var(--color-accent, #0d6efd);

}


.section-heading p {

  margin-top: 12px;

  color:
    var(--color-muted, #6c757d);

  line-height: 1.7;

}


/* ========================================
   FEATURES
======================================== */

.feature-card {

  position: relative;

  padding: 35px 28px;

  background:
    var(--color-surface, #ffffff);

  border:
    1px solid
    var(--color-border, #e5e8ed);

  border-radius: 22px;

  box-shadow:
    0 8px 25px rgba(23, 32, 51, 0.05);

  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;

}


.feature-card:hover {

  transform: translateY(-8px);

  border-color:
    rgba(13, 110, 253, 0.25);

  box-shadow:
    0 20px 45px rgba(23, 32, 51, 0.12);

}


.feature-number {

  position: absolute;

  top: 20px;

  right: 22px;

  color:
    var(--color-muted, #adb5bd);

  font-size: 0.7rem;

  font-weight: 800;

  letter-spacing: 0.1em;

}


.feature-icon {

  width: 68px;

  height: 68px;

  margin-bottom: 22px;

  border-radius: 18px;

  background:
    rgba(13, 110, 253, 0.1);

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 31px;

}


.feature-card h3 {

  color:
    var(--color-text, #172033);

  font-size: 1.25rem;

  font-weight: 800;

  margin-bottom: 12px;

}


.feature-card p {

  color:
    var(--color-muted, #6c757d);

  line-height: 1.7;

  margin-bottom: 25px;

}


.feature-link {

  display: inline-flex;

  align-items: center;

  gap: 8px;

  color:
    var(--color-accent, #0d6efd);

  font-size: 0.82rem;

  font-weight: 750;

  text-decoration: none;

}


.feature-link span {

  transition:
    transform 0.2s ease;

}


.feature-link:hover span {

  transform: translateX(4px);

}


/* ========================================
   HOW IT WORKS
======================================== */

.how-section {

  padding: 20px 0 90px;

}


.how-card {

  padding: 55px;

  border-radius: 28px;

  background:
    var(--color-primary, #172033);

  color: white;

  overflow: hidden;

  position: relative;

}


.how-card::after {

  content: '';

  position: absolute;

  width: 260px;

  height: 260px;

  right: -100px;

  top: -100px;

  border-radius: 50%;

  background:
    rgba(13, 110, 253, 0.18);

}


.how-title {

  margin-top: 15px;

  font-size: clamp(2rem, 4vw, 2.8rem);

  font-weight: 800;

  letter-spacing: -0.04em;

}


.how-text {

  margin-top: 18px;

  color: #adb5bd;

  line-height: 1.8;

}


.steps {

  display: flex;

  flex-direction: column;

  gap: 18px;

}


.step {

  position: relative;

  z-index: 1;

  display: flex;

  align-items: center;

  gap: 18px;

  padding: 18px;

  border:
    1px solid
    rgba(255, 255, 255, 0.1);

  border-radius: 16px;

  background:
    rgba(255, 255, 255, 0.04);

}


.step-icon {

  width: 48px;

  height: 48px;

  flex-shrink: 0;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 13px;

  background:
    rgba(13, 110, 253, 0.18);

  font-size: 22px;

}


.step h4 {

  margin: 0 0 5px;

  font-size: 1rem;

  font-weight: 750;

}


.step p {

  margin: 0;

  color: #9ca5b5;

  font-size: 0.83rem;

  line-height: 1.5;

}


/* ========================================
   FAQ
======================================== */

.faq-accordion {

  max-width: 900px;

  margin: auto;

}


.faq-accordion .accordion-item {

  margin-bottom: 12px;

  border:
    1px solid
    var(--color-border, #e3e6eb);

  border-radius: 15px !important;

  overflow: hidden;

  background:
    var(--color-surface, #ffffff);

}


.faq-accordion .accordion-button {

  padding: 20px;

  background:
    var(--color-surface, #ffffff);

  color:
    var(--color-text, #172033);

  font-weight: 700;

  box-shadow: none;

}


.faq-accordion .accordion-button:not(.collapsed) {

  color:
    var(--color-accent, #0d6efd);

  background:
    rgba(13, 110, 253, 0.07);

}


.faq-accordion .accordion-button:focus {

  box-shadow:
    0 0 0 3px
    rgba(13, 110, 253, 0.1);

}


.faq-number {

  margin-right: 15px;

  color:
    var(--color-accent, #0d6efd);

  font-size: 0.7rem;

  font-weight: 800;

}


.faq-accordion .accordion-body {

  padding:
    0 20px 22px 55px;

  color:
    var(--color-muted, #6c757d);

  line-height: 1.7;

}


/* ========================================
   FINAL CTA
======================================== */

.final-cta {

  padding: 20px 0 90px;

}


.final-cta-card {

  padding: 60px 25px;

  border:
    1px solid
    var(--color-border, #dce8ff);

  border-radius: 25px;

  background:
    linear-gradient(
      135deg,
      rgba(13, 110, 253, 0.09),
      var(--color-surface, #ffffff)
    );

}


.cta-icon {

  display: block;

  margin-bottom: 15px;

  font-size: 42px;

}


.final-cta-card h2 {

  color:
    var(--color-text, #172033);

  font-size: clamp(1.8rem, 4vw, 2.6rem);

  font-weight: 850;

}


.final-cta-card p {

  max-width: 550px;

  margin: 12px auto 25px;

  color:
    var(--color-muted, #6c757d);

  line-height: 1.7;

}


/* ========================================
   DARK MODE SUPPORT
======================================== */

:global([data-theme="dark"]) .about-hero {

  background:
    linear-gradient(
      135deg,
      #111827,
      #0f172a
    );

}


:global([data-theme="dark"]) .feature-card {

  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.25);

}


:global([data-theme="dark"]) .feature-card:hover {

  box-shadow:
    0 20px 45px rgba(0, 0, 0, 0.4);

}


:global([data-theme="dark"]) .final-cta-card {

  background:
    linear-gradient(
      135deg,
      rgba(13, 110, 253, 0.15),
      #111827
    );

}


:global([data-theme="dark"]) .hero-btn-outline {

  color: white;

  border-color: #6c757d;

}


:global([data-theme="dark"]) .hero-btn-outline:hover {

  background: white;

  color: #172033;

}


/* ========================================
   MOBILE
======================================== */

@media (max-width: 768px) {

  .about-hero {

    padding: 75px 20px;

  }


  .hero-title {

    font-size: 2.5rem;

  }


  .hero-text {

    font-size: 0.95rem;

  }


  .features-section,
  .faq-section {

    padding: 65px 0;

  }


  .how-card {

    padding: 35px 22px;

  }


  .how-section {

    padding-bottom: 65px;

  }


  .final-cta {

    padding-bottom: 65px;

  }


  .faq-accordion .accordion-body {

    padding-left: 20px;

  }

}

</style>
