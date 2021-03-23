<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>&copy; Rensatsu {{ year }}</p>
    </div>
  </footer>
</template>

<script>
import dayjs from "dayjs";

export default {
  data() {
    return {
      year: dayjs().format("YYYY"),
    };
  },
};
</script>
