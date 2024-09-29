<template>
  <footer>
    <p class="text-center">
      Created by <ExtLink :href="url">Rensatsu</ExtLink>
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
import { defineComponent } from "vue";
import ExtLink from "./ext-link.vue";

export default defineComponent({
  data() {
    return {
      url: "https://rensatsu.com",
    };
  },

  components: {
    ExtLink,
  },
});
</script>
