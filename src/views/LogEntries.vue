<template>
  <div class="log-entries">
    <div class="w-full mb-4 p-4 border-b">
      <AddLogEntry :no-entries="logEntries.length === 0"/>
    </div>
    <div class="px-4 mt-4 max-w-lg mx-auto">
      <div
        v-if="!$apollo.loading && logEntries.length === 0"
        class="flex flex-col items-center mt-12"
      >
        <EmptyList/>
        <h2 class="mt-8 font-thin">Go ahead, do something and log it.</h2>
      </div>
      <LogEntryGroup v-for="group in logEntries" :key="group.day" :group="group"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import * as logEntriesGql from "@/graphql/LogEntries.gql";
import AddLogEntry from "@/components/AddLogEntry";
import LogEntryGroup from "@/components/LogEntryGroup";
import EmptyList from "@/components/EmptyList";

export default {
  name: "LogEntries",
  data() {
    return {
      logEntries: [],
      entry: ""
    };
  },
  apollo: {
    logEntries: {
      query: logEntriesGql
    }
  },
  components: {
    AddLogEntry,
    LogEntryGroup,
    EmptyList
  }
};
</script>
