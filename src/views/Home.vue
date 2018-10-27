<template>
  <div class="home">
    <a href="/auth/github">Click here</a>to begin!
    <h1 class="text-blue">Hello</h1>
    <ApolloExample/>
  </div>
</template>

<script>
// @ is an alias to /src
import ApolloExample from "@/components/ApolloExample.vue";

export default {
  name: "home",
  components: {
    ApolloExample
  }
};
</script>
