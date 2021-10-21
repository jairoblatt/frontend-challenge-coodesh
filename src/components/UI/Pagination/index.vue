<template>
  <div class="pagination" :class="{ 'pagination--active': this.loading }">
    <transition name="slide-up">
      <Spinner v-show="loading" size="40" />
    </transition>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions, PropType } from "vue";
import { sleep } from "@/utils/index";

export default Vue.extend({
  props: {
    distance: {
      type: Number,
      default: 40,
    } as PropOptions<number>,

    delay: {
      type: Number,
      default: 1000,
    } as PropOptions<number>,

    loading: Boolean as PropType<boolean>,
    forceInit: Boolean as PropType<boolean>,
  },

  data: () => ({
    ready: true,
  }),

  mounted() {
    this.forceInit && this.onLoadMore();
    document.addEventListener("scroll", this.infiniteScroll);
  },

  beforeDestroy() {
    document.removeEventListener("scroll", this.infiniteScroll);
  },

  methods: {
    async infiniteScroll() {
      const scroll = document.documentElement.clientHeight + document.documentElement.scrollTop;

      if (scroll >= document.documentElement.scrollHeight - this.distance && this.ready) {
        this.ready = false;
        this.onLoadMore();

        await sleep(this.delay);
        this.ready = true;
      }
    },

    onLoadMore() {
      this.$emit("loadMore");
    },
  },
});
</script>

<style lang="postcss" scoped>
.pagination {
  @apply w-full fixed bottom-0 left-2/4 transform -translate-x-2/4;
}

.pagination--active {
  @apply transition-colors;

  height: 10rem;
  background: linear-gradient(0deg, rgba(199, 199, 199, 0.548) 0%, rgba(255, 255, 255, 0) 86%);
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.2s, transform 0.2s ease-in-out;
}
</style>
