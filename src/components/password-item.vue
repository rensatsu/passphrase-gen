<template>
  <div class="list-group-item" href="#">
    <pre><code>{{ password }}</code></pre>
    <a href="#" @click.prevent="copy(password)" title="Copy" :hidden="hide">
      <fa-icon class="icon" icon="fa-solid fa-clipboard" v-if="!copied" />
      <fa-icon class="icon" icon="fa-solid fa-check" v-else />
    </a>
  </div>
</template>

<style lang="scss" scoped>
.list-group {
  & > .list-group-item {
    display: grid;
    grid-template: auto / auto 3ch;
    gap: 1ch;

    & > a {
      display: flex;
      align-items: center;
      justify-content: center;

      & > .icon {
        width: 1.25rem;
        height: 1.25rem;
      }
    }
  }
}

pre {
  & > code {
    white-space: pre-wrap;
    word-break: break-all;
    overflow-wrap: anywhere;
  }
}
</style>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import delay from "delay";

export default defineComponent({
  data() {
    return {
      copied: false,
      hide: false,
    };
  },

  props: {
    password: {
      type: String,
      required: true,
    },
  },

  methods: {
    async copy(text: string): Promise<void> {
      await navigator.clipboard.writeText(text).catch(() => {});

      this.copied = true;

      // restore copy icon
      await delay(1000);
      this.copied = false;
      this.hide = true;

      // reset focus
      await delay(1);
      this.hide = false;
    },
  },
});
</script>
