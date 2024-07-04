<template>
  <div v-if="user" class="pb-4">
    <v-container class="mt-16">
      <v-row>
        <v-col cols="12" md="10" offset-md="1">
          <div class="d-flex justify-end mt-6">
            <v-btn @click="addBook">Add Book</v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="10" offset-md="1">
          <v-card
                title="Books"
                flat
            >
            <template v-slot:text>
                <v-text-field
                    v-model="search"
                    label="Search"
                    prepend-inner-icon="mdi-magnify"
                    variant="outlined"
                    hide-details
                    single-line
                ></v-text-field>
            </template>
            <v-data-table
              :headers="headers"
              :items="filteredBooks"
              :search="search"
              item-key="id"
              items-per-page="5"
              class="elevation-1"
            >
            <template v-slot:item.actions="{ item }">
              <div class="text-end">
                <v-btn @click="editBook(item.id)" icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn @click="openDeleteDialog(item.id)" icon>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-btn @click="goToBook(item.id)" icon>
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
              </div>
            </template>
          </v-data-table>
          </v-card>

        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="deleteDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Delete Book</v-card-title>
        <v-card-text>Are you sure you want to delete this book?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closeDeleteDialog">No</v-btn>
          <v-btn color="red darken-1" text @click="confirmDelete">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  
  <div v-else>
    <p>Not logged in. Redirecting to login...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '~/store/user'
import { useBooksStore } from '~/store/books'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const booksStore = useBooksStore()
const { books } = storeToRefs(booksStore)
const search = ref('')
const deleteDialog = ref(false)
const bookToDelete = ref(null)

const currentUser = ref(null)

const checkAuth = () => {
  userStore.loadUser()
  if (user.value) {
    currentUser.value = user.value
  } else {
    navigateTo('/login')
  }
}


onMounted(() => {
  checkAuth()
  booksStore.loadBooks()
  console.log('Books after loading:', books.value)
})

const headers = [
  { title: 'Title', value: 'title' },
  { title: 'Author', value: 'author' },
  { title: 'Year', value: 'year' },
  { title: 'Genre', value: 'genre' },
  { title: 'Actions', value: 'actions', align: 'end' },
]

const filteredBooks = computed(() => {
  if (!books.value || !currentUser.value) {
    return []
  }
  const userBooks = books.value.filter(book => book.user === currentUser.value.email)
  console.log('Filtered books:', userBooks)
  return userBooks
})

const goToBook = (id) => {
  navigateTo(`/books/${id}`)
}

const addBook = () => {
  navigateTo('/books/add')
}

const editBook = (id) => {
  navigateTo(`/books/edit/${id}`)
}

const openDeleteDialog = (id) => {
  bookToDelete.value = id
  deleteDialog.value = true
}

const closeDeleteDialog = () => {
  deleteDialog.value = false
  bookToDelete.value = null
}

const confirmDelete = () => {
  if (bookToDelete.value !== null) {
    booksStore.deleteBook(bookToDelete.value)
    deleteDialog.value = false
    bookToDelete.value = null
  }
}
</script>

