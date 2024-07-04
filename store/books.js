import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useBooksStore = defineStore('books', () => {
  const books = ref([])

  // Učitavanje knjiga iz localStorage
  const loadBooks = () => {
    if (import.meta.client) {
      const storedBooks = localStorage.getItem('books')
      if (storedBooks) {
        try {
          books.value = JSON.parse(storedBooks)
          console.log('Books loaded from localStorage:', books.value)
        } catch (error) {
          console.error('Failed to parse books from localStorage:', error)
        }
      } else {
        console.log('No books found in localStorage.')
      }
    }
  }

  // Učitavanje knjiga kada se store inicijalizuje
  loadBooks()

  // Praćenje promena na books ref-u i čuvanje u localStorage
  watch(books, (newBooks) => {
    if (import.meta.client) {
      localStorage.setItem('books', JSON.stringify(newBooks))
    }
  }, { deep: true })

  // Dodavanje knjige
  const addBook = (book) => {
    book.id = books.value.length + 1
    books.value.push(book)
    console.log('Book added:', book)
  }

  // Ažuriranje knjige
  const updateBook = (updatedBook) => {
    const index = books.value.findIndex(book => book.id === updatedBook.id)
    if (index !== -1) {
      books.value[index] = { ...books.value[index], ...updatedBook }
      console.log('Book updated:', updatedBook)
    }
  }

  // Brisanje knjige
  const deleteBook = (id) => {
    books.value = books.value.filter(book => book.id !== id)
    console.log('Book deleted:', id)
  }

  // Izvlačenje knjige sa određenim ID-jem
  const getBookById = (id) => {
    return books.value.find(book => book.id === id)
  }

  return {
    books,
    addBook,
    updateBook,
    deleteBook,
    getBookById,
    loadBooks
  }
})
