<template>
  <div class="content__info">
    <span> <Icon :icon="icon" size="19" /> </span>
    <small>
      <slot />
    </small>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

export default Vue.extend({
  props: {
    icon: String as PropType<string>,
  },
});
</script>

<style lang="postcss" scoped>
.content__info {
  @apply flex items-center justify-start md:justify-center border-solid border rounded-md border-gray-100 my-1 md:my-3 mx-2 md:w-auto w-full;
}

.content__info span {
  @apply font-bold py-1 px-3 bg-primary-base text-white;
}

.content__info small {
  @apply font-semibold px-4 text-base;
}
</style>
