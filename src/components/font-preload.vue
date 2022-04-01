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

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import "@fontsource/public-sans/variable.css";
import "@fontsource/ibm-plex-mono/400.css";

export default defineComponent({
  data() {
    return {
      testString: "abcXYZ123",
    };
  },
});
</script>
