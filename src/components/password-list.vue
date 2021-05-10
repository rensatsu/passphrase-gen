<template>
  <div>
    <article class="panel">
      <h2 class="panel-heading">Result</h2>
      <div class="panel-body" v-if="error && error !== null">
        <article class="alert alert-danger" v-if="error && error !== null">
          {{ error }}
        </article>
      </div>
      <div v-else class="list-group" v-for="line in result" v-bind:key="line">
        <PasswordItem :password="line"></PasswordItem>
      </div>

      <div class="panel-footer">
        <button @click="reset" class="btn btn-small">Reset</button>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";
import passwordItem from "./password-item.vue";

export default defineComponent({
  props: {
    error: String,
    result: {
      type: Array as PropType<Array<string>>,
      default: [],
    },
  },

  components: {
    PasswordItem: passwordItem,
  },

  methods: {
    reset(): void {
      this.$emit("reset");
    },
  },
});
</script>
