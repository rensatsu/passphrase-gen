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

<script>
export default {
  props: ["dictionaries", "selected"],
  computed: {
    name: function () {
      return this.dictionaries[this.selected].name;
    },
    title: function () {
      return this.dictionaries[this.selected].title;
    },
    source: function () {
      return this.dictionaries[this.selected].source;
    },
  },
};
</script>
