<template>
  <div class="column">
    <h2 class="subtitle">Result</h2>
    <article class="message is-danger" v-if="error !== null">
      <div class="message-body">{{ error }}</div>
    </article>
    <pre><code v-for="line in result" v-bind:key="line" class="is-block">{{ line }}</code></pre>
    <div class="mt-1">
      <button @click="$parent.reset" class="button">Reset</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["error", "result"],
};
</script>
