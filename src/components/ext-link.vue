<template>
  <a :href="href" :target="target" rel="noopener">
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      default: "_blank",
    },
  },
};
</script>
