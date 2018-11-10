<template>
  <div class="flex justify-center items-center">
    <h2 v-if="!isLoggedIn" class="mt-12">Please Sign in with GitHub</h2>
  </div>
</template>

<script>
import isLoggedInGql from "@/graphql/LoggedIn.gql";
import { isAuthenticated, login } from "@/utils/auth";

export default {
  name: "Login",
  async mounted() {
    if (isAuthenticated()) {
      await login(this.$apollo);
      this.$router.push("/log");
    }
  },
  apollo: {
    isLoggedIn: isLoggedInGql
  }
};
</script>
