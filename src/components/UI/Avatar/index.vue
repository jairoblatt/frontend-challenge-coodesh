<template>
  <component :is="tag" class="avatar" :style="styles">
    <slot />
  </component>
</template>

<script lang="ts">
import Vue, { PropOptions, PropType } from "vue";
import CSS from "csstype";

export default Vue.extend({
  name: "Avatar",

  props: {
    tag: {
      type: String,
      default: "div",
    } as PropOptions<string>,
    // The prop size it's definedly with 'rem' css unit meansure
    size: {
      type: [String, Number],
      default: 2,
    } as PropOptions<string | number>,
    // The prop border it's definedly with 'px' css unit meansure
    border: [String, Number] as PropType<string | number>,
  },

  computed: {
    styles(): CSS.Properties {
      return {
        height: `${this.size}rem`,
        width: `${this.size}rem`,
        borderWidth: `${this.border || Number(this.size) / 2}px`,
      };
    },
  },
});
</script>

<style lang="postcss" scoped>
.avatar {
  @apply rounded-full border-4 border-primary-base border-solid overflow-hidden;
}

.avatar img,
source {
  @apply min-w-full h-auto object-contain;
}

/* absolute -top-28 left-2/4 transform -translate-x-2/4 */

/* .user__avatar img,
source {
  height: 12rem;
  width: 12rem;
} */
</style>
