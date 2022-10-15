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

<script setup lang="ts">
import { ref } from "vue";
const url = ref("https://rensatsu.netlify.app");
</script>
