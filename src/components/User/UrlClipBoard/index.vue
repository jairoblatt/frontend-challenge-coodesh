<template>
  <div :class="classes">
    <input :value="locationHref" type="text" readonly @focus="copyToClipBoard" />
    <Btn data-testid="clipboard" @click="copyToClipBoard">
      <Icon :icon="iconClipBoard" />
    </Btn>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { sleep } from "@/utils";

export default Vue.extend({
  data: () => ({
    copied: false,
  }),

  computed: {
    classes(): { [key: string]: boolean } {
      return {
        user__url: true,
        "user__url--copied": this.copied,
      };
    },

    locationHref(): string {
      return window.location.href;
    },

    iconClipBoard(): string {
      return this.copied ? "mdi-check" : "mdi-content-copy";
    },
  },

  methods: {
    async copyToClipBoard() {
      if (!this.copied) {
        await navigator.clipboard.writeText(this.locationHref);
        this.copied = true;

        await sleep(5000);
        this.copied = false;
      }
    },
  },
});
</script>
<style lang="postcss" scoped>
.user__url {
  @apply border border-light-onSurfacePrimary w-11/12 md:w-2/3 overflow-hidden border-opacity-40 border-solid rounded-sm mt-2 flex justify-between items-center;
}

.user__url input {
  @apply outline-none font-semibold px-2 w-full;
}
.user__url >>> button {
  @apply text-light-onSurfacePrimary border-l rounded-none border-light-onSurfacePrimary border-opacity-40 border-solid hover:bg-light-onSurfacePrimary hover:text-white;
}

.user__url--copied {
  @apply border-primary-base;
}

.user__url--copied >>> button {
  @apply border-primary-base hover:bg-primary-base bg-primary-base text-white;
}
</style>
