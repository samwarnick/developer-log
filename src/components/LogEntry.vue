<template>
  <li
    class="group flex justify-between items-start my-2 py-1 rounded-lg even:bg-grey-lightest odd:bg-grey-lighter text-grey-darkest"
  >
    <div class="flex-grow flex justify-between">
      <span class="px-4 font-semibold" v-html="convertToMarkdown(entry.content)"></span>
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
</template>

<script>
import marked from "marked";
import * as logEntriesGql from "@/graphql/LogEntries.gql";
import * as deleteLogEntryGql from "@/graphql/DeleteLogEntry.gql";

export default {
  name: "LogEntry",
  props: {
    entry: Object
  },
  methods: {
    convertToMarkdown(value) {
      return marked(value, { sanitize: true });
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
