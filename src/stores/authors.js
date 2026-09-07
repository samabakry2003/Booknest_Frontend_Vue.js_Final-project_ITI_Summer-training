
import { defineStore } from 'pinia'
import api from '../services/api'

export const useAuthorsStore = defineStore('authors', {
  state: () => ({
    authors: [],
    currentAuthor: null,

    loading: false,
    error: null,

    lastFetchedAt: null
  }),

  getters: {
    authorCount: (state) => state.authors.length,

    getAuthorById: (state) => (id) => {
      return state.authors.find(
        (author) => String(author.id) === String(id)
      )
    }
  },

  actions: {
    // ========================================
    // GET ALL AUTHORS
    // ========================================

    async fetchList() {
      this.loading = true
      this.error = null

      try {
        const response = await api.get('/authors')

        this.authors = response.data
        this.lastFetchedAt = new Date()

        return response.data
      } catch (error) {
        this.error =
          'Unable to load authors. Please try again.'

        console.error('fetchList:', error)

        throw error
      } finally {
        this.loading = false
      }
    },

    // ========================================
    // GET AUTHOR BY ID
    // ========================================

    async fetchById(id) {
      this.loading = true
      this.error = null
      this.currentAuthor = null

      try {
        const response =
          await api.get(`/authors/${id}`)

        this.currentAuthor = response.data

        return response.data
      } catch (error) {
        this.error =
          'Unable to load this author.'

        console.error('fetchById:', error)

        throw error
      } finally {
        this.loading = false
      }
    },

    // ========================================
    // CREATE AUTHOR
    // ========================================

    async create(author) {
      this.loading = true
      this.error = null

      try {
        const response =
          await api.post('/authors', author)

        this.authors.push(response.data)

        return response.data
      } catch (error) {
        this.error =
          'Unable to create author.'

        console.error('create:', error)

        throw error
      } finally {
        this.loading = false
      }
    },

    // ========================================
    // UPDATE AUTHOR
    // ========================================

    async update(id, author) {
      this.loading = true
      this.error = null

      try {
        const response =
          await api.put(`/authors/${id}`, author)

        const index =
          this.authors.findIndex(
            (item) =>
              String(item.id) === String(id)
          )

        if (index !== -1) {
          this.authors[index] = response.data
        }

        if (
          this.currentAuthor &&
          String(this.currentAuthor.id) === String(id)
        ) {
          this.currentAuthor = response.data
        }

        return response.data
      } catch (error) {
        this.error =
          'Unable to update author.'

        console.error('update:', error)

        throw error
      } finally {
        this.loading = false
      }
    },

    // ========================================
    // DELETE AUTHOR
    // ========================================

    async remove(id) {
      this.loading = true
      this.error = null

      try {
        // Check whether this author has books
        const response =
          await api.get(`/books?authorId=${id}`)

        const relatedBooks = response.data

        if (relatedBooks.length > 0) {
          const error = new Error(
            'This author cannot be deleted because books are associated with this author.'
          )

          this.error = error.message

          throw error
        }

        // Delete author
        await api.delete(`/authors/${id}`)

        // Update local state
        this.authors =
          this.authors.filter(
            (author) =>
              String(author.id) !== String(id)
          )

        // Clear current author
        if (
          this.currentAuthor &&
          String(this.currentAuthor.id) === String(id)
        ) {
          this.currentAuthor = null
        }
      } catch (error) {
        if (!this.error) {
          this.error =
            'Unable to delete author.'
        }

        console.error('remove:', error)

        throw error
      } finally {
        this.loading = false
      }
    },

    // ========================================
    // CLEAR CURRENT AUTHOR
    // ========================================

    clearCurrentAuthor() {
      this.currentAuthor = null
    },

    // ========================================
    // CLEAR ERROR
    // ========================================

    clearError() {
      this.error = null
    }
  }
})

