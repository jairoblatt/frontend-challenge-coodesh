<template>
  <div class="app">
    <main class="app__main">
      <router-view />
    </main>

    <transition name="fade">
      <Alert v-if="hasAlert" :content="alertContent" />
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Alert } from "./types/Alert";
import { Nullable } from "./types/User";

export default Vue.extend({
  name: "App",

  computed: {
    alertContent(): Nullable<Alert | undefined> {
      return this.$store.getters["alert/get"];
    },

    hasAlert(): boolean {
      return Boolean(this.alertContent?.id);
    },
  },

  metaInfo: {
    titleTemplate: "%s - Pharma Inc",
  },
});
</script>

<style lang="postcss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600&display=swap");

body {
  background-color: #f9fbff;
  font-family: "Quicksand", sans-serif;
  box-sizing: border-box;
}

::-webkit-scrollbar {
  width: 4.5px;
  height: 4.5px;
  border-radius: 20px;
}

::-webkit-scrollbar-thumb {
  @apply bg-primary-base;

  border-radius: 20px;
}

.app {
  @apply relative box-border;
}

.app__main {
  @apply container mx-auto;

  min-height: 100vh;
}
</style>
