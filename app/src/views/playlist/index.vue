<template>
  <div class="playlist-page page-view">
    <ms-playlist></ms-playlist>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import MsPlaylist from "./MsPlaylist.vue";

export default {
  components: {
    MsPlaylist: defineAsyncComponent(() => import("./MsPlaylist.vue")),
  },
  setup() {},
};
</script>
