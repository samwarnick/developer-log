<template>
  <li
    class="group flex justify-between items-start my-2 py-1 rounded-lg even:bg-grey-lightest odd:bg-grey-lighter text-grey-darkest"
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
</template>

<script>
import marked from "marked";

export default {
  name: "LogEntry",
  props: {
    entry: Object
  },
  methods: {
    convertToMarkdown(value) {
      return marked(value, { sanitize: true });
    }
  }
};
</script>

<style scoped>
</style>