<template>
  <div class="category-page page-view">
    <ms-category></ms-category>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import MsCategory from "./MsCategory.vue";

export default {
  components: {
    MsCategory: defineAsyncComponent(() => import("./MsCategory.vue")),
  },
  setup() {},
};
</script>
