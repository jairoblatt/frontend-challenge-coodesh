<template>
  <div class="search-bar">
    <input class="search-bar__input" type="text" placeholder="Search user:" @input="onInput" />
    <div class="search-bar__prepend">
      <Icon size="28">mdi-account</Icon>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";

export default Vue.extend({
  props: {
    debounceDelay: {
      type: Number,
      default: 400,
    } as PropOptions<number>,
  },

  data: () => ({
    timeoutId: 0,
  }),

  methods: {
    onInput($event: Event) {
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        this.$emit("input", ($event.target as HTMLInputElement)?.value);
      }, this.debounceDelay);
    },
  },
});
</script>

<style lang="postcss" scoped>
.search-bar {
  @apply w-full border border-gray-100 bg-white rounded-md pl-5 flex justify-between items-center overflow-hidden transition-colors;
}

.search-bar__input {
  @apply outline-none h-full pl-5 w-full text-light-onSurfacePrimary font-semibold;
}

.search-bar__prepend {
  @apply border border-gray-100 flex justify-center;
}

.search-bar__prepend >>> i {
  @apply text-light-onSurfacePrimary;
}

.search-bar:focus-within {
  @apply border-primary-light;
}

.search-bar:focus-within .search-bar__prepend {
  @apply bg-primary-light border-primary-light;
}

.search-bar:focus-within .search-bar__prepend >>> i {
  @apply text-white;
}
</style>
