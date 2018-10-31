<template>
  <div id="app">
    <SiteNavigation/>
    <router-view/>
  </div>
</template>

<script>
import SiteNavigation from "@/components/SiteNavigation.vue";

export default {
  name: "App",
  components: {
    SiteNavigation
  }
};
</script>


<style lang="scss">
</style>
