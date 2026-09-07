
import { defineStore } from 'pinia'
import api from '../services/api'

export const useBooksStore = defineStore('books', {
  state: () => ({
    books: [],
    currentBook: null,

    loading: false,
    error: null,

    lastFetchedAt: null
  }),

  getters: {

    bookCount: (state) => state.books.length,

    getBookById: (state) => (id) => {
      return state.books.find(
        book => String(book.id) === String(id)
      )
    }

  },

  actions: {

    // ========================================
    // GET ALL BOOKS
    // ========================================

    async fetchList() {

      this.loading = true
      this.error = null

      try {

        const response = await api.get('/books')

        this.books = response.data

        this.lastFetchedAt = new Date()

        return response.data

      } catch (error) {

        this.error =
          'Unable to load books. Please try again.'

        console.error('fetchList:', error)

        throw error

      } finally {

        this.loading = false

      }

    },


    // ========================================
    // GET BOOK BY ID
    // ========================================

    async fetchById(id) {

      this.loading = true
      this.error = null
      this.currentBook = null

      try {

        const response =
          await api.get(`/books/${id}`)

        this.currentBook = response.data

        return response.data

      } catch (error) {

        this.error =
          'Unable to load this book.'

        console.error('fetchById:', error)

        throw error

      } finally {

        this.loading = false

      }

    },


    // ========================================
    // CREATE BOOK
    // ========================================

    async create(book) {

      this.loading = true
      this.error = null

      try {

        const response =
          await api.post('/books', book)

        this.books.push(response.data)

        return response.data

      } catch (error) {

        this.error =
          'Unable to create book.'

        console.error('create:', error)

        throw error

      } finally {

        this.loading = false

      }

    },


    // ========================================
    // UPDATE BOOK
    // ========================================

    async update(id, book) {

      this.loading = true
      this.error = null

      try {

        const response =
          await api.put(`/books/${id}`, book)

        const index =
          this.books.findIndex(
            item =>
              String(item.id) === String(id)
          )

        if (index !== -1) {

          this.books[index] = response.data

        }

        if (
          this.currentBook &&
          String(this.currentBook.id) === String(id)
        ) {

          this.currentBook = response.data

        }

        return response.data

      } catch (error) {

        this.error =
          'Unable to update book.'

        console.error('update:', error)

        throw error

      } finally {

        this.loading = false

      }

    },


    // ========================================
    // DELETE BOOK
    // ========================================

    async remove(id) {

      this.loading = true
      this.error = null

      try {

        await api.delete(`/books/${id}`)

        this.books =
          this.books.filter(
            book =>
              String(book.id) !== String(id)
          )

        if (
          this.currentBook &&
          String(this.currentBook.id) === String(id)
        ) {

          this.currentBook = null

        }

      } catch (error) {

        this.error =
          'Unable to delete book.'

        console.error('remove:', error)

        throw error

      } finally {

        this.loading = false

      }

    },


    // ========================================
    // CLEAR CURRENT BOOK
    // ========================================

    clearCurrentBook() {

      this.currentBook = null

    },


    // ========================================
    // CLEAR ERROR
    // ========================================

    clearError() {

      this.error = null

    }

  }
})

