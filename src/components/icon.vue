<template>
  <FontAwesomeIcon :icon="icon" fixed-width></FontAwesomeIcon>
</template>

<style lang="scss">
@import url("../../node_modules/@fortawesome/fontawesome-svg-core/styles.css");
</style>

<script lang="ts">
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/vue-fontawesome";
import { DefineComponent, defineComponent, PropType } from "@vue/runtime-core";

export default defineComponent({
  props: {
    icon: Array as PropType<Array<string>>,
  },
  components: {
    // Hack to make `vue-fontawesome` work with TypeScript
    // https://github.com/FortAwesome/vue-fontawesome/issues/295#issuecomment-823411585
    FontAwesomeIcon: (FontAwesomeIcon as unknown) as DefineComponent<FontAwesomeIconProps>,
  },
});
</script>
