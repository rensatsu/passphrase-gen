<template>
  <div class="column">
    <h2 class="subtitle">Result</h2>
    <article class="message is-danger" v-if="error && error !== null">
      <div class="message-body">{{ error }}</div>
    </article>
    <pre><code v-for="line in result" v-bind:key="line" class="is-block">{{ line }}</code></pre>
    <div class="mt-1">
      <button @click="reset" class="button">Reset</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";

export default defineComponent({
  props: {
    error: String,
    result: {
      type: Array as PropType<Array<string>>,
      default: [],
    }
  },

  methods: {
    reset(): void {
      this.$emit("reset");
    }
  }
});
</script>
