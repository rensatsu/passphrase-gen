<template>
  <article class="panel panel-compact">
    <h2 class="panel-heading">What is it?</h2>
    <div class="panel-body">
      <div>This is a password phrase generator.</div>
      <div>
        Create strong, memorable password phrases based on words from the
        selected dictionary.
      </div>
      <div>
        You also have the option to increase security by incorporating digits
        into your generated password phrases.
      </div>
      <div>
        <ExtLink href="https://xkcd.com/936/">
          Check out the xkcd comic about password strength</ExtLink
        >.
      </div>
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
