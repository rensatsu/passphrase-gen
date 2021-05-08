<template>
  <h2 class="subtitle">Dictionary information</h2>
  <article class="message">
    <div class="message-body">
      <h3 class="mb-1">{{ name }}</h3>
      <p>{{ title }}</p>
      <p>
        <a :href="source" rel="nofollow" target="_blank">Source</a>
      </p>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import dictionaryList from "../libs/load-dictionaries";
const dictionaries = dictionaryList.list();

export default defineComponent({
  props: {
    selected: {
      type: String,
      required: true,
    },
  },
  computed: {
    name(): string {
      return dictionaries.get(this.selected)?.name ?? "";
    },
    title(): string {
      return dictionaries.get(this.selected)?.title ?? "";
    },
    source(): string {
      return dictionaries.get(this.selected)?.source ?? "";
    },
  },
});
</script>
