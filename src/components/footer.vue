<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>&copy; Rensatsu {{ year }}</p>
    </div>
  </footer>
</template>

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
