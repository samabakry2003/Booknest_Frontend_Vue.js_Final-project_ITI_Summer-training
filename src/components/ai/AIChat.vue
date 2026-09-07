
<template>
  <!-- Floating AI Button -->
  <button
    v-if="!isOpen"
    type="button"
    class="ai-button"
    aria-label="Open BookNest AI assistant"
    title="Ask BookNest AI"
    @click="openChat"
  >
    🤖
  </button>


  <!-- Chat Window -->
  <div
    v-if="isOpen"
    class="ai-chat"
    role="dialog"
    aria-modal="false"
    aria-labelledby="aiTitle"
  >

    <!-- Header -->
    <div class="ai-header">

      <div class="ai-brand">

        <div class="ai-avatar">
          🤖
        </div>

        <div>

          <strong id="aiTitle">
            BookNest AI
          </strong>

          <small>
            {{ contextLabel }}
          </small>

        </div>

      </div>


      <button
        type="button"
        class="close-button"
        aria-label="Close AI assistant"
        @click="closeChat"
      >
        ×
      </button>

    </div>


    <!-- Messages -->
    <div
      ref="messagesContainer"
      class="ai-body"
    >

      <!-- Welcome -->
      <div class="message ai-message">

        <div class="message-avatar">
          🤖
        </div>

        <div class="message-content">
          {{ welcomeMessage }}
        </div>

      </div>


      <!-- Conversation -->
      <div
        v-for="message in messages"
        :key="message.id"
        class="message-row"
        :class="message.sender === 'user'
          ? 'user-row'
          : 'ai-row'"
      >

        <div
          v-if="message.sender === 'ai'"
          class="message-avatar"
        >
          🤖
        </div>


        <div
          class="message"
          :class="message.sender === 'user'
            ? 'user-message'
            : 'ai-message'"
        >
          {{ message.text }}
        </div>

      </div>


      <!-- Typing -->
      <div
        v-if="isLoading"
        class="message-row ai-row"
      >

        <div class="message-avatar">
          🤖
        </div>

        <div class="message ai-message typing-message">

          <span></span>
          <span></span>
          <span></span>

        </div>

      </div>

    </div>


    <!-- Input -->
    <form
      class="ai-input"
      @submit.prevent="sendMessage"
    >

      <input
        ref="inputElement"
        v-model="userMessage"
        type="text"
        :placeholder="inputPlaceholder"
        :disabled="isLoading"
        aria-label="Ask BookNest AI"
      />

      <button
        type="submit"
        :disabled="!canSend"
        aria-label="Send message"
      >
        ➤
      </button>

    </form>

  </div>
</template>


<script setup>

import {
  computed,
  nextTick,
  ref
} from 'vue'

import {
  getAIResponse
} from '../../services/ai'


const props = defineProps({

  contextType: {
    type: String,
    required: true,

    validator: (value) =>
      ['book', 'author'].includes(value)
  },

  contextData: {
    type: Object,
    required: true
  }

})


const isOpen = ref(false)

const userMessage = ref('')

const isLoading = ref(false)

const messages = ref([])

const messagesContainer = ref(null)

const inputElement = ref(null)


const contextLabel = computed(() => {

  if (props.contextType === 'book') {

    return `About "${props.contextData.title}"`

  }

  return `About "${props.contextData.name}"`

})


const welcomeMessage = computed(() => {

  if (props.contextType === 'book') {

    return `Hi! I can help you learn more about "${props.contextData.title}". Ask me about the story, author, year, tags, or description.`

  }

  return `Hi! I can help you learn more about "${props.contextData.name}". Ask me about this author or their books.`

})


const inputPlaceholder = computed(() => {

  return props.contextType === 'book'
    ? 'Ask about this book...'
    : 'Ask about this author...'

})


const canSend = computed(() => {

  return (
    userMessage.value.trim().length > 0 &&
    !isLoading.value
  )

})


function openChat() {

  isOpen.value = true

  nextTick(() => {

    inputElement.value?.focus()

  })

}


function closeChat() {

  isOpen.value = false

}


async function sendMessage() {

  const text =
    userMessage.value.trim()

  if (!text || isLoading.value) {

    return

  }


  messages.value.push({

    id: Date.now(),

    sender: 'user',

    text

  })


  userMessage.value = ''

  isLoading.value = true


  scrollToBottom()


  try {

    const response =
      await getAIResponse({

        message: text,

        contextType:
          props.contextType,

        contextData:
          props.contextData

      })


    messages.value.push({

      id: Date.now() + 1,

      sender: 'ai',

      text: response

    })

  } catch (error) {

    console.error('AI error:', error)

    messages.value.push({

      id: Date.now() + 1,

      sender: 'ai',

      text:
        'Sorry, I could not process your request right now.'

    })

  } finally {

    isLoading.value = false

    scrollToBottom()

    nextTick(() => {

      inputElement.value?.focus()

    })

  }

}


function scrollToBottom() {

  nextTick(() => {

    const element =
      messagesContainer.value

    if (!element) {

      return

    }

    element.scrollTop =
      element.scrollHeight

  })

}

</script>


<style scoped>

.ai-button {
  position: fixed;

  right: 24px;
  bottom: 24px;

  width: 64px;
  height: 64px;

  border: none;

  border-radius: 50%;

  background: #0d6efd;

  color: white;

  font-size: 28px;

  cursor: pointer;

  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.2);

  z-index: 5000;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}


.ai-button:hover {
  transform: scale(1.08);

  box-shadow:
    0 14px 35px rgba(0, 0, 0, 0.25);
}


/* Chat */

.ai-chat {
  position: fixed;

  right: 24px;
  bottom: 24px;

  width: 380px;

  max-width:
    calc(100vw - 30px);

  height: 560px;

  display: flex;

  flex-direction: column;

  background: white;

  border:
    1px solid #e9ecef;

  border-radius: 20px;

  overflow: hidden;

  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.2);

  z-index: 5000;
}


/* Header */

.ai-header {
  display: flex;

  align-items: center;

  justify-content: space-between;

  padding: 15px 16px;

  background:
    linear-gradient(
      135deg,
      #0d6efd,
      #0b5ed7
    );

  color: white;
}


.ai-brand {
  display: flex;

  align-items: center;

  gap: 10px;
}


.ai-avatar {
  width: 38px;
  height: 38px;

  flex-shrink: 0;

  border-radius: 50%;

  background: rgba(255, 255, 255, 0.18);

  display: flex;

  align-items: center;

  justify-content: center;
}


.ai-header strong {
  display: block;

  font-size: 14px;
}


.ai-header small {
  display: block;

  margin-top: 2px;

  font-size: 11px;

  opacity: 0.85;
}


.close-button {
  border: none;

  background: transparent;

  color: white;

  font-size: 28px;

  line-height: 1;

  cursor: pointer;
}


/* Body */

.ai-body {
  flex: 1;

  padding: 15px;

  overflow-y: auto;

  background: #f8f9fa;
}


.message-row {
  display: flex;

  align-items: flex-end;

  gap: 8px;

  margin-bottom: 12px;
}


.ai-row {
  justify-content: flex-start;
}


.user-row {
  justify-content: flex-end;
}


.message {
  max-width: 82%;

  padding: 10px 13px;

  border-radius: 15px;

  font-size: 14px;

  line-height: 1.55;

  word-break: break-word;
}


.ai-message {
  background: white;

  color: #212529;

  border:
    1px solid #e9ecef;

  border-bottom-left-radius: 5px;
}


.user-message {
  background: #0d6efd;

  color: white;

  border-bottom-right-radius: 5px;
}


.message-avatar {
  width: 28px;
  height: 28px;

  flex-shrink: 0;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  background: #e7f1ff;

  font-size: 14px;
}


/* Typing */

.typing-message {
  display: flex;

  align-items: center;

  gap: 4px;

  min-width: 55px;
}


.typing-message span {
  width: 6px;
  height: 6px;

  border-radius: 50%;

  background: #adb5bd;

  animation:
    typing 1.2s infinite ease-in-out;
}


.typing-message span:nth-child(2) {
  animation-delay: 0.15s;
}


.typing-message span:nth-child(3) {
  animation-delay: 0.3s;
}


@keyframes typing {

  0%,
  60%,
  100% {
    transform: translateY(0);
  }

  30% {
    transform: translateY(-4px);
  }

}


/* Input */

.ai-input {
  display: flex;

  gap: 8px;

  padding: 12px;

  background: white;

  border-top:
    1px solid #e9ecef;
}


.ai-input input {
  flex: 1;

  min-width: 0;

  border:
    1px solid #ced4da;

  border-radius: 11px;

  padding: 10px 12px;

  outline: none;

  font-size: 14px;
}


.ai-input input:focus {
  border-color: #0d6efd;

  box-shadow:
    0 0 0 3px rgba(13, 110, 253, 0.1);
}


.ai-input button {
  width: 42px;

  border: none;

  border-radius: 11px;

  background: #0d6efd;

  color: white;

  font-size: 18px;

  cursor: pointer;
}


.ai-input button:disabled {
  opacity: 0.45;

  cursor: not-allowed;
}


/* Mobile */

@media (max-width: 576px) {

  .ai-button {
    right: 15px;

    bottom: 15px;

    width: 58px;

    height: 58px;
  }


  .ai-chat {
    right: 15px;

    bottom: 15px;

    width:
      calc(100vw - 30px);

    height:
      calc(100vh - 110px);

    max-height: 600px;
  }

}

</style>

