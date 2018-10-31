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
    <button
      v-else
      @click="logout"
      class="text-white border border-white rounded-full px-3 py-1 m-2 hover:text-blue hover:bg-white no-underline"
    >Logout</button>
  </nav>
</template>

<script>
import { logout } from "@/utils/auth";
export default {
  name: "SiteNavigation",
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    }
  },
  methods: {
    logout: logout
  }
};
</script>
