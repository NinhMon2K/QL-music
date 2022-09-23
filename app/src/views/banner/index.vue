<template>
  <div class="banner-page page-view">
    <ms-banner> </ms-banner>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import MsBanner from "./MsBanner.vue";

export default {
  components: {
    MsBanner: defineAsyncComponent(() => import("./MsBanner.vue")),
  },
  setup() {},
};
</script>
