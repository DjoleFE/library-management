<template>
  <v-container class="fill-height">
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <v-card v-if="book" class="px-2 py-2">
          <v-card-title>
            Book Title: {{ book.title }}
          </v-card-title>
          <v-card-subtitle>
            Author: {{ book.author }}
          </v-card-subtitle>
          <v-card-text>
            <p>Genre: {{ book.genre }}</p>
            <p>Year: {{ book.year }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="goBack">Back</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-alert v-if="!book" type="error">
      Book not found.
    </v-alert>
  </v-container>
</template>

<script setup>
import { useBooksStore } from '~/store/books'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const booksStore = useBooksStore()
const route = useRoute()
const router = useRouter()
const book = ref(null)

onMounted(() => {
  const bookId = route.params.id
  book.value = booksStore.getBookById(Number(bookId))
})

const goBack = () => {
  navigateTo('/')
}
</script>
