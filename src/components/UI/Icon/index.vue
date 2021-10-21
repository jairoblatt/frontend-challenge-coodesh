<template>
  <i v-if="iconSanitize" :class="`mdi ${iconSanitize}`" :style="styles"></i>
</template>

<script lang="ts">
import Vue, { PropOptions, PropType } from "vue";
import CSS from "csstype";

export default Vue.extend({
  name: "Icon",

  props: {
    size: {
      type: [String, Number],
      default: 14,
    } as PropOptions<string | number>,

    color: String as PropType<string>,

    icon: {
      type: String,
      default: "",
    } as PropOptions<string>,
  },

  computed: {
    iconSanitize(): string {
      return this.$slots.default?.[0]?.text || this.icon;
    },

    styles(): CSS.Properties {
      return {
        fontSize: this.size + "px",
        ...(this.color && { color: this.color }),
      };
    },
  },
});
</script>
