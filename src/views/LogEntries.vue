<template>
  <div class="log-entries">
    <div class="w-full mb-4 p-4 border-b">
      <AddLogEntry/>
    </div>
    <LogEntryGroup v-for="group in logEntries" :key="group.day" :group="group"/>
  </div>
</template>

<script>
// @ is an alias to /src
import * as logEntriesGql from "@/graphql/LogEntries.gql";
import moment from "moment/src/moment";
import AddLogEntry from "@/components/AddLogEntry";
import LogEntryGroup from "@/components/LogEntryGroup";

export default {
  name: "LogEntries",
  data() {
    return {
      logEntries: [],
      entry: "",
      moment: moment
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
