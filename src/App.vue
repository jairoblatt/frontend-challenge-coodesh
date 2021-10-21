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
import { IAlert } from "./types/IAlert";
import { Nullable } from "./types/IUser";

export default Vue.extend({
  name: "App",

  computed: {
    alertContent(): Nullable<IAlert> | undefined {
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
}

.app {
  @apply relative box-border;
}

.app__main {
  @apply container mx-auto;

  min-height: 100vh;
}
</style>
