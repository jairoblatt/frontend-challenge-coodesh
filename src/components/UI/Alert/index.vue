<template>
  <div :class="['alert', `alert--${content.theme}`]">
    <Btn class="alert__head" @click="removeAlert">
      <Icon size="20" icon="mdi-close" />
    </Btn>
    <div class="alert__content">
      <span>{{ content.title }}</span>
      <p v-if="content.description">{{ content.description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { IAlert } from "@/types/IAlert";
import { sleep } from "@/utils";

export default Vue.extend({
  name: "Alert",

  props: {
    content: {
      type: Object,
      required: true,
      default: () => null,
    } as PropOptions<IAlert>,
  },

  async mounted() {
    if (this.content.timeOut) {
      await sleep(Number(this.content.timeOut));
      this.removeAlert();
    }
  },

  methods: {
    removeAlert() {
      this.$store.dispatch("alert/remove", this.content.id);
    },
  },
});
</script>
<style lang="postcss" scoped>
.alert {
  @apply flex flex-col items-center shadow-md right-2 md:right-11 md:translate-x-px top-8 fixed bg-white px-2 md:px-5 rounded-sm max-w-sm md:max-w-md;

  border-left: 7px solid;
  z-index: 999999;
}

.alert--success {
  @apply border-primary-base;
}

.alert--wran {
  border-color: #fb8c00;
}

.alert--fail {
  border-color: #ff1744;
}

.alert--default {
  border-color: transparent;
}

.alert__head {
  @apply self-end cursor-pointer absolute top-0 right-3 p-2 text-light-onSurfacePrimary;
}

.alert__content {
  @apply pt-1 pb-4;
}

.alert__content span {
  @apply text-light-onSurfacePrimary font-bold text-lg pb-0;
}

.alert__content p {
  @apply text-light-onSurfacePrimary text-base;
}
</style>
