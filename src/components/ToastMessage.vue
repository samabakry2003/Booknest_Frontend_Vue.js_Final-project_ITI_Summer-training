<template>
  <div
    class="toast-container position-fixed top-0 end-0 p-3"
    style="z-index: 9999"
  >

    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="toast show shadow-sm border-0 mb-2"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >

      <div
        class="toast-body d-flex align-items-center justify-content-between gap-3"
      >

        <div class="d-flex align-items-center gap-2">

          <span
            class="toast-icon"
            :class="toast.type"
          >
            {{ toast.type === 'success' ? '✓' : '!' }}
          </span>

          <span>
            {{ toast.message }}
          </span>

        </div>

        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          @click="removeToast(toast.id)"
        ></button>

      </div>

    </div>

  </div>
</template>


<script setup>

import { ref } from 'vue'


const toasts = ref([])


let toastId = 0


function showToast(
  message,
  type = 'success'
) {

  const id = ++toastId

  toasts.value.push({
    id,
    message,
    type
  })


  setTimeout(() => {

    removeToast(id)

  }, 3500)

}


function removeToast(id) {

  toasts.value =
    toasts.value.filter(
      toast => toast.id !== id
    )

}


defineExpose({
  showToast
})

</script>


<style scoped>

.toast {
  min-width: 320px;
  background: white;
  border-radius: 12px;
}


.toast-icon {
  width: 28px;
  height: 28px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  font-weight: 700;
}


.toast-icon.success {
  background: #d1e7dd;
  color: #0f5132;
}


.toast-icon.error {
  background: #f8d7da;
  color: #842029;
}


@media (max-width: 576px) {

  .toast {
    min-width: auto;
    width: calc(100vw - 30px);
  }

}

</style>