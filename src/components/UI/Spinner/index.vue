<template>
  <div class="spinner-container">
    <span class="spinner" :style="styles"></span>
  </div>
</template>
<script lang="ts">
import Vue, { PropOptions } from "vue";
import CSS from "csstype";

export default Vue.extend({
  name: "Spinner",

  props: {
    size: {
      type: [String, Number],
      default: "inherit",
    } as PropOptions<string | number>,
  },

  computed: {
    styles(): CSS.Properties {
      return {
        minHeight: `${this.size}px`,
        minWidth: `${this.size}px`,
      };
    },
  },
});
</script>
<style lang="postcss" scoped>
.spinner-container {
  @apply relative flex justify-center items-center min-h-full min-w-full;
}

.spinner {
  @apply pointer-events-none border-solid rounded-full  border-primary-base  p-1;

  border-width: 0.3rem;
  border-top-color: white;
  animation: spinner 0.5s linear infinite;
}

@keyframes spinner {
  100% {
    transform: rotate(360deg);
  }
}
</style>
