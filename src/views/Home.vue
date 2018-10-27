<template>
  <div class="home">
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
