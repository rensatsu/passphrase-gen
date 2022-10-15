<template>
  <footer>
    <p class="text-center">
      Created by <a :href="url" target="_blank" rel="noopener">Rensatsu</a>
    </p>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  margin-top: 2rem;
  margin-bottom: 2rem;

  & > p {
    margin: 0;
  }
}
</style>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  data() {
    return {
      url: "https://rensatsu.netlify.app",
    };
  },
});
</script>
