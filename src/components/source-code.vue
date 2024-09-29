<template>
  <article class="panel panel-compact">
    <div class="panel-heading">Source code</div>
    <div class="panel-body">
      Source code is available on
      <ExtLink href="https://github.com/rensatsu/passphrase-gen"
        >GitHub</ExtLink
      >
      and licensed under
      <ExtLink
        href="https://github.com/rensatsu/passphrase-gen/blob/master/LICENSE"
        >MIT License</ExtLink
      >
      terms.
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ExtLink from "./ext-link.vue";

export default defineComponent({
  components: {
    ExtLink,
  },
});
</script>
