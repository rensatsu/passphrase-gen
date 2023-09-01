<style lang="scss">
.font-preload {
  position: fixed;
  top: 0;
  left: -100px;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}
</style>

<template>
  <div class="font-preload">
    <p>{{ testString }}</p>
    <pre>{{ testString }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import "@fontsource-variable/public-sans";
import "@fontsource-variable/jetbrains-mono";
import delimiters from "../libs/delimiters";

const testString = ref("abcXYZ123" + [...delimiters.values()].join(""));
</script>
