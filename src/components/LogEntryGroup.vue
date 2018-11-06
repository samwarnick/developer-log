<template>
  <ul class="list-reset mt-4 max-w-lg mx-auto" :key="group.day">
    <li>
      <h2>{{ dateIsToday(group.day) ? "Today" : group.day }}</h2>
    </li>
    <ul class="list-reset">
      <LogEntry v-for="entry in group.logEntries" :key="entry.id" :entry="entry"/>
    </ul>
  </ul>
</template>

<script>
import moment from "moment/src/moment";
import LogEntry from "@/components/LogEntry";

export default {
  name: "LogEntryGroup",
  props: {
    group: Object
  },
  methods: {
    dateIsToday(date) {
      date = new moment(date, "D MMM YYYY");
    }
  },
  components: {
    LogEntry
  }
};
</script>

<style scoped>
</style>