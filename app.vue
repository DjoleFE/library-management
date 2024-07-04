<template>
  <NuxtLayout>
    <v-app>
      <v-app-bar v-if="user" color="teal-darken-4" class="py-2" image="https://picsum.photos/1920/1080?random">
        <template v-slot:image>
          <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
        </template>

        <v-app-bar-title>Welcome, {{ user.username }}</v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn icon @click="logout">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-app-bar>
      <NuxtPage />
    </v-app>
  </NuxtLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { navigateTo } from "#app";
import { useUserStore } from "~/store/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const isAuthenticated = ref(false);
const { user } = storeToRefs(userStore);

const checkAuth = () => {
  userStore.loadUser();
  if (userStore.user) {
    isAuthenticated.value = true;
  } else {
    navigateTo("/login");
  }
};

const logout = () => {
  userStore.clearUser();
  navigateTo("/login");
};

onMounted(() => {
  checkAuth();
});
</script>
