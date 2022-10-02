<template>
  <article class="panel panel-compact">
    <h2 class="panel-heading">Dictionary Info</h2>
    <div class="panel-body">
      <div>
        <a :href="source" target="_blank" rel="noopener" title="Source">
          <v-icon name="bi-box-arrow-up-right" class="icon" />
        </a>
        {{ title }}
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.icon {
  width: 1.25rem;
  float: right;
  margin: 0 0 1ch 1ch;
}

.panel {
  & > .panel-body {
    & > h3 {
      margin: 0 0 0.25rem 0;
      font-size: 1rem;
      font-weight: 600;
    }

    & > p {
      margin: 0;
    }
  }
}
</style>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import dictionaryList from "../libs/load-dictionaries";
import { OhVueIcon } from "oh-vue-icons";

const dictionaries = dictionaryList.list();

export default defineComponent({
  props: {
    selected: {
      type: String,
      required: true,
    },
  },

  computed: {
    name(): string {
      return dictionaries.get(this.selected)?.name ?? "";
    },
    title(): string {
      return dictionaries.get(this.selected)?.title ?? "";
    },
    source(): string {
      return dictionaries.get(this.selected)?.source ?? "";
    },
  },

  components: {
    "v-icon": OhVueIcon,
  },
});
</script>
