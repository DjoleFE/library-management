<template>
  <v-container class="fill-height">
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <v-card class="px-2 py-2" rounded="lg">
          <v-card-title>
            <span class="headline">Edit Book</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" @submit.prevent="submit">
              <v-text-field class="mb-2" v-model="title" label="Title" :rules="[rules.required]"
                required></v-text-field>
              <v-text-field class="mb-2" v-model="author" label="Author" :rules="[rules.required]"
                required></v-text-field>
              <v-text-field class="mb-2" v-model="year" label="Year" :rules="[rules.required, rules.year]"
                required></v-text-field>
              <v-text-field class="mb-2" v-model="genre" label="Genre" :rules="[rules.required]"
                required></v-text-field>
              <v-btn type="submit" color="indigo-darken-3" :disabled="!valid">Update Book</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useBooksStore } from '~/store/books'
import { useRoute, useRouter } from 'vue-router'

const booksStore = useBooksStore()
const route = useRoute()
const router = useRouter()

const title = ref('')
const author = ref('')
const year = ref('')
const genre = ref('')
const valid = ref(false)
const form = ref(null)

const rules = {
  required: value => !!value || 'Required.',
  year: value => /^\d{4}$/.test(value) || 'Year must be a valid 4-digit year.',
}

onMounted(() => {
  const bookId = route.params.id
  const book = booksStore.getBookById(Number(bookId))
  if (book) {
    title.value = book.title
    author.value = book.author
    year.value = book.year
    genre.value = book.genre
  }
})

const submit = () => {
  form.value.validate().then(success => {
    if (success) {
      booksStore.updateBook({
        id: Number(route.params.id),
        title: title.value,
        author: author.value,
        year: year.value,
        genre: genre.value
      })
      navigateTo('/')
    }
  })
}
</script>
