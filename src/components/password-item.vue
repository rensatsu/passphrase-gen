<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import delay from "delay";

interface Props {
  password: string;
}

const copied: Ref<Boolean> = ref(false);
const hide: Ref<Boolean> = ref(false);
const { password } = defineProps<Props>();

async function copy(text: string): Promise<void> {
  await navigator.clipboard.writeText(text).catch(() => {});

  copied.value = true;

  // restore copy icon
  await delay(1000);
  copied.value = false;
  hide.value = true;

  // reset focus
  await delay(1);
  hide.value = false;
}
</script>

<template>
  <div class="list-group-item" href="#">
    <pre><code>{{ password }}</code></pre>
    <a href="#" @click.prevent="copy(password)" title="Copy" :hidden="!!hide">
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
