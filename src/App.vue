<template>
  <div id="app" class="font-sans">
    <SiteNavigation/>
    <router-view/>
  </div>
</template>

<script>
import { isAuthenticated, ensureUserDataSet } from "./utils/auth";
import SiteNavigation from "@/components/SiteNavigation.vue";

export default {
  name: "App",
  async created() {
    if (isAuthenticated(this.$apollo)) {
      await ensureUserDataSet(this.$apollo);
    }
  },
  components: {
    SiteNavigation
  }
};
</script>


<style lang="scss">
</style>
