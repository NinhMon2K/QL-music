<template>
  <div class="singer-page page-view">
    <ms-singer></ms-singer>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import MsReport from "./MsSinger.vue";
import MsSinger from "./MsSinger.vue";

export default {
  components: {
    MsSinger: defineAsyncComponent(() => import("./MsSinger.vue")),
  },
  setup() {},
};
</script>
