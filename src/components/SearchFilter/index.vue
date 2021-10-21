<template>
  <div v-clickOutside="clickOutsideHandle" class="search__filter">
    <span class="search__title">
      <slot />
    </span>

    <div @click="showOptions = !showOptions" class="filter__input">
      <span> {{ resolveName }} </span>
      <Btn> <Icon :icon="openedIcon" /> </Btn>
    </div>

    <transition name="fade-top-2x">
      <ul v-show="showOptions" class="filter__options">
        <li
          v-for="(option, key) in options"
          :key="`option-${key}`"
          :class="{ 'option--active': option.value === value }"
          @click="selectOption(option)"
        >
          {{ option.name }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { clickOutside } from "@/directives";

interface IOption {
  value: number | string;
  name: string;
}

export default Vue.extend({
  props: {
    options: Array as PropType<IOption[]>,
    value: [String, Number] as PropType<string | number>,
  },

  directives: { clickOutside },

  data: () => ({
    showOptions: false,
  }),

  computed: {
    openedIcon(): string {
      return this.showOptions ? "mdi-chevron-up" : "mdi-chevron-down";
    },

    resolveName(): string {
      const { options, value } = this;
      let optionsSelected: IOption | undefined;

      if (Array.isArray(options) && value) {
        optionsSelected = options.find((option: IOption) => {
          return option.value === value;
        });
      }

      return optionsSelected?.name || "";
    },
  },

  methods: {
    selectOption(option: IOption) {
      if (this.value !== option.value) {
        this.$emit("input", option.value);
        this.showOptions = false;
      }
    },

    clickOutsideHandle() {
      this.showOptions = false;
    },
  },
});
</script>

<style lang="postcss" scoped>
.search__filter {
  @apply relative ml-2 h-full w-full;
}

@screen md {
  .search__filter {
    width: 12rem;
  }
}

.search__title {
  @apply text-light-onSurfacePrimary font-semibold text-base;
}

.filter__input {
  @apply bg-white flex cursor-pointer items-center justify-between rounded-lg mt-1 border border-gray-100;
}

.filter__input span {
  @apply outline-none text-light-onSurfacePrimary pl-3 whitespace-nowrap overflow-ellipsis;
}

.filter__input >>> i {
  @apply text-light-onSurfacePrimary;
}
.filter__options {
  @apply absolute cursor-pointer z-30 rounded-sm mt-1 border-gray-100 p-1 bg-white shadow-lg text-light-onSurfacePrimary w-full overflow-y-auto;

  max-height: 15rem;
}

.filter__options li {
  @apply p-2 border border-gray-100 hover:bg-gray-50  mt-1 rounded-lg transition-colors;
}

.option--active {
  @apply bg-gray-100;
}
</style>
