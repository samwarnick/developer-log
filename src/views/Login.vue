<template>
  <div class="flex justify-center items-center">
    <h2 v-if="!isLoggedIn" class="mt-12">Please Sign in with GitHub</h2>
  </div>
</template>

<script>
import { isAuthenticated, login } from "@/utils/auth";

export default {
  name: "Login",
  async mounted() {
    if (isAuthenticated()) {
      await login(this.$apollo.provider.defaultClient);
      this.$router.push("/log");
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    }
  }
};
</script>
