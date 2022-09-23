<template>
  <div class="music-page page-view">
    <ms-music></ms-music>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  components: {
    MsMusic: defineAsyncComponent(() => import("./MsMusic.vue")),
  },
  setup() {},
};
</script>
