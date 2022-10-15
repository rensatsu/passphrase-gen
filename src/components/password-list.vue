<template>
  <div>
    <article class="panel">
      <h2 class="panel-heading">Result</h2>
      <div class="panel-body" v-if="error && error !== null">
        <article class="alert alert-danger" v-if="error && error !== null">
          {{ error }}
        </article>
      </div>
      <div v-else class="list-group" v-for="line in result" :key="line">
        <PasswordItem :password="line"></PasswordItem>
      </div>

      <div class="panel-footer">
        <button @click="reset" class="btn btn-small">Clear results</button>
      </div>
    </article>
  </div>
</template>

<style lang="scss" scoped>
.list-group {
  --list-padding: 1rem 1.25rem;
}
</style>

<script setup lang="ts">
import PasswordItem from "./password-item.vue";

interface Props {
  error?: string;
  result: string[];
}

const { error, result } = withDefaults(defineProps<Props>(), {
  result: () => [],
});

const emit = defineEmits<{
  (event: "reset"): void;
}>();

function reset(): void {
  emit("reset");
}
</script>
