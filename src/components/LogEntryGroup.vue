<template>
  <ul class="list-reset" :key="group.day">
    <li>
      <h2 class="pl-4 font-thin">{{ dateIsToday(group.day) ? "Today" : group.day }}</h2>
    </li>
    <ul class="list-reset">
      <LogEntry v-for="entry in group.logEntries" :key="entry.id" :entry="entry"/>
    </ul>
  </ul>
</template>

<script>
import dateMixin from "@/utils/dateMixin";
import LogEntry from "@/components/LogEntry";

export default {
  name: "LogEntryGroup",
  props: {
    group: Object
  },
  components: {
    LogEntry
  },
  mixins: [dateMixin]
};
</script>

<style scoped>
</style>