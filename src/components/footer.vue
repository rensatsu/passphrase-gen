<template>
  <footer>
    <p class="text-center">&copy; Rensatsu {{ year }}</p>
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

<script>
import { defineComponent } from "@vue/runtime-core";
import dayjs from "dayjs";

export default defineComponent({
  data() {
    return {
      year: dayjs().format("YYYY"),
    };
  },
});
</script>
