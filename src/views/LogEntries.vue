<template>
  <div class="log-entries">
    <div class="w-full mb-4 p-4 border-b">
      <AddLogEntry/>
    </div>
    <div class="px-4 mt-4 max-w-lg mx-auto">
      <LogEntryGroup v-for="group in logEntries" :key="group.day" :group="group"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import * as logEntriesGql from "@/graphql/LogEntries.gql";
import AddLogEntry from "@/components/AddLogEntry";
import LogEntryGroup from "@/components/LogEntryGroup";

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
    LogEntryGroup
  }
};
</script>
