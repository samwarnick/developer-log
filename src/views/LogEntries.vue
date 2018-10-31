<template>
  <div class="log-entries">
    <h1 class="m-10">Developer Log</h1>
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
    <template v-for="group in logEntries">
      <ul class="list-reset mt-4 max-w-lg mx-auto" :key="group.day">
        <li>
          <h2>{{ dateIsToday(group.day) ? "Today" : group.day }}</h2>
        </li>
        <ul class="list-reset">
          <li
            class="group flex justify-between items-start my-2 py-1 rounded-lg even:bg-grey-lightest odd:bg-grey-lighter text-grey-darkest"
            v-for="entry in group.logEntries"
            :key="entry.id"
          >
            <div class="flex-grow flex justify-between">
              <span class="px-4" v-html="convertToMarkdown(entry.content)"></span>
              <span class="text-grey-dark flex-no-shrink">{{ entry.created | moment("calendar") }}</span>
            </div>
            <button>
              <FontAwesomeIcon
                icon="trash-alt"
                class="text-grey-dark opacity-25 group-hover:opacity-100 hover:text-red-dark mx-2"
                @click="deleteLogEntry(entry.id)"
              ></FontAwesomeIcon>
            </button>
          </li>
        </ul>
      </ul>
    </template>
  </div>
</template>

<script>
// @ is an alias to /src
import * as logEntriesGql from "@/graphql/LogEntries.gql";
import * as addLogEntryGql from "@/graphql/AddLogEntry.gql";
import * as deleteLogEntryGql from "@/graphql/DeleteLogEntry.gql";
import marked from "marked";
import moment from "moment";

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
    convertToMarkdown(value) {
      return marked(value, { sanitize: true });
    },
    dateIsToday(date) {
      date = new moment(date, "D MMM YYYY");
      return moment().diff(date, "days") === 0;
    },
    addLogEntry() {
      const newLogEntry = {
        content: this.entry
      };
      const created = new Date().toISOString();
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
            created,
            ...newLogEntry
          }
        }
      });
    },
    deleteLogEntry(id) {
      this.$apollo.mutate({
        mutation: deleteLogEntryGql,
        variables: {
          input: { id }
        },
        update: store => {
          const data = store.readQuery({ query: logEntriesGql });

          data.logEntries = data.logEntries.filter(group => {
            group.logEntries = group.logEntries.filter(
              entry => entry.id !== id
            );
            return group.logEntries.length;
          });

          store.writeQuery({ query: logEntriesGql, data });
        },
        optimisticResponse: {
          __typename: "Mutation",
          deleteLogEntry: {
            __typename: "DeleteLogEntry",
            id: id
          }
        }
      });
    }
  }
};
</script>
