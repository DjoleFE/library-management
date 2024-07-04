<template>
    <div class="login-page__wrapper fill-height">
        <v-container class="d-flex justify-center fill-height">
            <v-card class="login-page__card" rounded="lg">
                <v-card-title class="text-center py-8 px-8">
                <h2 class="mb-3">Library management</h2>
                <h5>Login</h5>
                </v-card-title>
                <v-card-text class="px-8 pb-8">
              <v-form @submit.prevent="handleLogin" ref="form">
                <v-text-field
                  v-model="email"
                  label="Email"
                  type="email"
                  :rules="[rules.required, rules.email]"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  label="Password"
                  type="password"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
                <v-btn type="submit" color="indigo-darken-3">Login</v-btn>
                
              </v-form>
            </v-card-text>
          </v-card>
    </v-container>
    <v-alert 
        v-if="showError" 
        type="error" 
        class="lm-alert position-fixed"
        dismissible 
        color="#C51162"
        icon="mdi-alert-circle"
        theme="dark"
    >{{ errorMessage }}</v-alert>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '~/store/user'
  
  const email = ref('')
  const password = ref('')
  const form = ref(null)
  const showError = ref(false)
  const router = useRouter()
  const userStore = useUserStore()
  
  const errorMessage = computed(() => userStore.errorMessage)
  
  const rules = {
    required: (value) => !!value || 'Required.',
    email: (value) => /.+@.+\..+/.test(value) || 'E-mail must be valid.',
  }
  
  const handleLogin = () => {
    form.value.validate().then((success) => {
      if (success) {
        if (userStore.login(email.value, password.value)) {
          router.push('/')
        } else {
          showError.value = true
          setTimeout(() => {
            showError.value = false
          }, 3000)
        }
      }
    })
  }
  </script>
  
  <style scoped>
  /* Custom CSS */
  </style>
  