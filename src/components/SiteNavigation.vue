<template>
  <nav class="bg-blue flex justify-between items-center text-white shadow-md">
    <router-link to="/" class="mx-4 my-2 text-white no-underline">
      <h1>Developer Log</h1>
    </router-link>
    <a
      v-if="!isLoggedIn"
      href="/auth/github"
      class="text-white border border-white rounded-full px-3 py-1 m-2 hover:text-blue hover:bg-white no-underline"
    >
      <FontAwesomeIcon :icon="['fab', 'github']" class="mr-2"></FontAwesomeIcon>Sign in with GitHub
    </a>
    <div v-else class="flex items-center">
      <img :src="user.profileImage" :alt="user.displayName" class="rounded-full h-10 m-2">
      <span class="mr-8">{{user.displayName}}</span>
      <button
        @click="logout"
        class="text-white border border-white rounded-full px-3 py-1 m-2 hover:text-blue hover:bg-white no-underline"
      >Logout</button>
    </div>
  </nav>
</template>

<script>
import { logout } from "@/utils/auth";

export default {
  name: "SiteNavigation",
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    logout() {
      logout(this.$apollo.provider.defaultClient);
    }
  }
};
</script>
