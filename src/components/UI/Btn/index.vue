<template>
  <button v-on="$listeners" :class="classes">
    <spinner v-show="loading" size="21" />
    <slot v-show="!loading" />
  </button>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

export default Vue.extend({
  name: "Btn",

  props: {
    primary: Boolean as PropType<boolean>,
    secondary: Boolean as PropType<boolean>,
    block: Boolean as PropType<boolean>,
    loading: Boolean as PropType<boolean>,
    small: Boolean as PropType<boolean>,
    outlined: Boolean as PropType<boolean>,
  },

  computed: {
    classes() {
      return {
        btn: true,
        "btn--primary": this.primary,
        "btn--secondary": this.secondary,
        "btn--block": this.block,
        "btn--small": this.small,
        "btn--outlined": this.outlined,
      };
    },
  },
});
</script>

<style lang="postcss" scoped>
.btn {
  @apply rounded-md px-5 py-3 text-sm outline-none font-semibold text-white transition-colors;
}

.btn--primary {
  @apply bg-primary-base hover:bg-primary-light;
}

.btn--secondary {
  @apply bg-secondary-gray;
}

.btn--block {
  @apply w-full;
}

.btn:disabled {
  @apply bg-gray-300 text-gray-900 cursor-auto;
}

.btn--small {
  @apply px-7 py-2;
}

.btn--outlined {
  @apply border border-gray-100 text-light-onSurfacePrimary hover:border-black hover:text-black;
}
</style>
