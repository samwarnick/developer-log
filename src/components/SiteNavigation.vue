<template>
  <nav class="bg-blue flex justify-between items-center text-white shadow-md">
    <router-link to="/" class="mx-4 my-2 text-white no-underline">
      <h1 class="font-thin flex items-center">
        <FontAwesomeIcon icon="book-open" class="mr-4 text-2xl"></FontAwesomeIcon>Developer Log
      </h1>
    </router-link>
    <router-link
      v-if="!isLoggedIn"
      href="/auth/github"
      class="text-white border border-white rounded-full px-3 py-1 m-2 hover:text-blue hover:bg-white no-underline"
    >
      <FontAwesomeIcon :icon="['fab', 'github']" class="mr-2"></FontAwesomeIcon>Sign in with GitHub
    </router-link>
    <div v-else class="flex items-center">
      <router-link
        to="/log"
        class="text-white rounded-full px-3 py-1 m-2 hover:text-blue hover:bg-white no-underline"
      >My Log</router-link>
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
import { logout, isAuthenticated, login } from "@/utils/auth";
import isLoggedInGql from "@/graphql/LoggedIn.gql";
import userGql from "@/graphql/User.gql";

export default {
  name: "SiteNavigation",
  apollo: {
    isLoggedIn: isLoggedInGql,
    user: userGql
  },
  methods: {
    logout() {
      logout();
    }
  }
};
</script>
