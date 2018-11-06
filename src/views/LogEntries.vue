<template>
  <div class="log-entries">
    <div class="w-full mb-4 p-4 border-b">
      <form class="flex" @submit.prevent="addLogEntry">
        <textarea
          v-model="entry"
          type="text"
          class="border-2 px-2 py-1 rounded bg-grey-lighter focus:bg-white border-transparent focus:border-blue focus:outline-none focus:shadow flex-grow"
          rows="3"
          placeholder="What are you doing?"
        ></textarea>
        <button
          type="submit"
          class="border-2 border-blue bg-white hover:bg-blue text-blue hover:text-white rounded px-2 ml-2 flex items-center justify-center focus:outline-none shadow"
        >
          <FontAwesomeIcon icon="plus"/>
        </button>
      </form>
    </div>
    <LogEntryGroup v-for="group in logEntries" :key="group.day" :group="group"/>
  </div>
</template>

<script>
// @ is an alias to /src
import * as logEntriesGql from "@/graphql/LogEntries.gql";
import * as addLogEntryGql from "@/graphql/AddLogEntry.gql";
import moment from "moment/src/moment";
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
  methods: {
    dateIsToday(date) {
      date = new moment(date, "D MMM YYYY");
      return moment().diff(date, "days") === 0;
    },
    addLogEntry() {
      const newLogEntry = {
        content: this.entry
      };
      this.entry = "";

      this.$apollo.mutate({
        mutation: addLogEntryGql,
        variables: {
          input: newLogEntry
        },
        update: (store, { data: { addLogEntry } }) => {
          // Read the data from our cache for this query.
          const data = store.readQuery({ query: logEntriesGql });
          // Add our tag from the mutation to the end
          if (!this.dateIsToday(data.logEntries[0].day)) {
            data.logEntries.unshift({
              day: new moment().format("D MMM YYYY"),
              logEntries: []
            });
          }
          data.logEntries[0].logEntries = [
            addLogEntry,
            ...data.logEntries[0].logEntries
          ];
          // Write our data back to the cache.
          store.writeQuery({ query: logEntriesGql, data });
        },
        optimisticResponse: {
          __typename: "Mutation",
          addLogEntry: {
            __typename: "LogEntry",
            id: -1,
            created: new Date().toISOString(),
            ...newLogEntry
          }
        }
      });
    }
  },
  components: {
    LogEntryGroup
  }
};
</script>
