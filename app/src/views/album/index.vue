<template>
  <div class="album-page page-view">
    <ms-album></ms-album>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import MsAlbum from "./MsAlbum.vue";

export default {
  components: {
    MsAlbum: defineAsyncComponent(() => import("./MsAlbum.vue")),
  },
  setup() {},
};
</script>
