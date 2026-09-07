<template>
  <article class="book-card h-100">

    <!-- =========================
         BOOK IMAGE
    ========================== -->

    <div class="book-image-wrapper">

      <img
        v-if="imageLoaded"
        :src="book.coverUrl"
        :alt="`Cover of ${book.title}`"
        class="book-image"
        @error="handleImageError"
      />

      <!-- Fallback -->
      <div
        v-else
        class="image-placeholder"
      >

        <div class="placeholder-icon">
          📚
        </div>

        <span>
          No Cover
        </span>

      </div>


      <!-- Overlay -->
      <div class="image-overlay"></div>


      <!-- Year -->
      <span class="year-badge">
        {{ book.year }}
      </span>

    </div>


    <!-- =========================
         CONTENT
    ========================== -->

    <div class="book-content">

      <!-- Title -->

      <h3
        class="book-title"
        :title="book.title"
      >
        {{ book.title }}
      </h3>


      <!-- Tags -->

      <div
        v-if="book.tags?.length"
        class="tags-container"
      >

        <span
          v-for="tag in book.tags"
          :key="tag"
          class="book-tag"
        >
          #{{ tag }}
        </span>

      </div>


      <!-- Description -->

      <p class="book-description">
        {{ book.description || 'No description available.' }}
      </p>


      <!-- Button -->

      <RouterLink
        :to="`/books/${book.id}`"
        class="details-button"
      >

        <span>
          View Details
        </span>

        <span class="arrow">
          →
        </span>

      </RouterLink>

    </div>

  </article>
</template>


<script setup>

import {
  ref,
  watch
} from 'vue'


// ========================================
// PROPS
// ========================================

const props = defineProps({

  book: {
    type: Object,
    required: true
  }

})


// ========================================
// IMAGE STATE
// ========================================

const imageLoaded = ref(true)


// ========================================
// IMAGE ERROR
// ========================================

function handleImageError() {

  imageLoaded.value = false

}


// ========================================
// RESET IMAGE
// ========================================

watch(
  () => props.book.coverUrl,
  () => {

    imageLoaded.value = true

  }
)

</script>


<style scoped>

/* ========================================
   CARD
======================================== */

.book-card {

  position: relative;

  background: var(
    --card-bg,
    #ffffff
  );

  border: 1px solid var(
    --card-border,
    #e9ecef
  );

  border-radius: 20px;

  overflow: hidden;

  display: flex;

  flex-direction: column;

  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;

}


.book-card:hover {

  transform: translateY(-7px);

  box-shadow:
    0 18px 40px
    rgba(0, 0, 0, 0.12);

  border-color:
    rgba(13, 110, 253, 0.25);

}


/* ========================================
   IMAGE
======================================== */

.book-image-wrapper {

  position: relative;

  width: 100%;

  height: 320px;

  overflow: hidden;

  background: #e9ecef;

}


.book-image {

  width: 100%;

  height: 100%;

  object-fit: cover;

  display: block;

  transition:
    transform 0.5s ease;

}


/* Zoom */

.book-card:hover .book-image {

  transform: scale(1.05);

}


/* ========================================
   IMAGE OVERLAY
======================================== */

.image-overlay {

  position: absolute;

  inset: 0;

  background:
    linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.02),
      rgba(0, 0, 0, 0.18)
    );

  pointer-events: none;

}


/* ========================================
   PLACEHOLDER
======================================== */

.image-placeholder {

  width: 100%;

  height: 100%;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  background: var(
    --placeholder-bg,
    #e9ecef
  );

  color: var(
    --muted-text,
    #6c757d
  );

}


.placeholder-icon {

  font-size: 60px;

  margin-bottom: 10px;

}


/* ========================================
   YEAR BADGE
======================================== */

.year-badge {

  position: absolute;

  top: 14px;

  right: 14px;

  padding: 7px 12px;

  border-radius: 999px;

  background:
    rgba(255, 255, 255, 0.94);

  color: #212529;

  font-size: 12px;

  font-weight: 700;

  box-shadow:
    0 5px 15px
    rgba(0, 0, 0, 0.16);

  backdrop-filter: blur(8px);

}


/* ========================================
   CONTENT
======================================== */

.book-content {

  padding: 22px;

  display: flex;

  flex-direction: column;

  flex: 1;

}


/* ========================================
   TITLE
======================================== */

.book-title {

  color: var(
    --text-color,
    #212529
  );

  font-size: 20px;

  font-weight: 750;

  line-height: 1.3;

  margin-bottom: 12px;

  display: -webkit-box;

  line-clamp: 2;

  -webkit-line-clamp: 2;

  -webkit-box-orient: vertical;

  overflow: hidden;

}


/* ========================================
   TAGS
======================================== */

.tags-container {

  display: flex;

  flex-wrap: wrap;

  gap: 6px;

  margin-bottom: 14px;

}


.book-tag {

  padding: 5px 9px;

  border-radius: 999px;

  background: var(
    --tag-bg,
    #e7f1ff
  );

  color: var(
    --tag-color,
    #0d6efd
  );

  font-size: 11px;

  font-weight: 700;

  letter-spacing: 0.2px;

}


/* ========================================
   DESCRIPTION
======================================== */

.book-description {

  color: var(
    --muted-text,
    #6c757d
  );

  font-size: 14px;

  line-height: 1.65;

  margin-bottom: 22px;

  display: -webkit-box;

  line-clamp: 3;

  -webkit-line-clamp: 3;

  -webkit-box-orient: vertical;

  overflow: hidden;

}


/* ========================================
   DETAILS BUTTON
======================================== */

.details-button {

  margin-top: auto;

  width: 100%;

  min-height: 44px;

  padding: 10px 15px;

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 10px;

  border-radius: 12px;

  background: #0d6efd;

  color: #ffffff;

  text-decoration: none;

  font-size: 14px;

  font-weight: 700;

  transition:
    background 0.25s ease,
    transform 0.25s ease,
    box-shadow 0.25s ease;

}


.details-button:hover {

  background: #0b5ed7;

  color: #ffffff;

  transform: translateY(-2px);

  box-shadow:
    0 8px 20px
    rgba(13, 110, 253, 0.25);

}


.arrow {

  font-size: 18px;

  transition:
    transform 0.25s ease;

}


.details-button:hover .arrow {

  transform:
    translateX(4px);

}


/* ========================================
   DARK MODE
======================================== */

:global(body.dark-mode) .book-card {

  --card-bg: #182235;

  --card-border: #29364d;

  --text-color: #f1f5f9;

  --muted-text: #aeb9c9;

  --tag-bg:
    rgba(13, 110, 253, 0.16);

  --tag-color: #78adff;

  --placeholder-bg: #202c40;

  background: var(--card-bg);

  border-color: var(--card-border);

}


:global(body.dark-mode) .book-card:hover {

  border-color:
    rgba(120, 173, 255, 0.35);

  box-shadow:
    0 18px 40px
    rgba(0, 0, 0, 0.35);

}


:global(body.dark-mode) .book-image-wrapper {

  background: #202c40;

}


:global(body.dark-mode) .image-placeholder {

  background: #202c40;

  color: #9aa8bc;

}


:global(body.dark-mode) .year-badge {

  background:
    rgba(24, 34, 53, 0.92);

  color: #f1f5f9;

  border:
    1px solid rgba(255, 255, 255, 0.1);

}


:global(body.dark-mode) .details-button {

  background: #0d6efd;

}


:global(body.dark-mode) .details-button:hover {

  background: #3d8bfd;

}


/* ========================================
   RESPONSIVE
======================================== */

@media (max-width: 576px) {

  .book-image-wrapper {

    height: 280px;

  }


  .book-content {

    padding: 18px;

  }


  .book-title {

    font-size: 18px;

  }


  .book-description {

    font-size: 13px;

  }

}

</style>