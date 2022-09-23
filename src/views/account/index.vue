<template>
  <div class="account-page page-view">
    <ms-account> </ms-account>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import MsAccount from "./MsAccount.vue";

export default {
  components: {
    MsAccount: defineAsyncComponent(() => import("./MsAccount.vue")),
  },
  setup() {},
};
</script>
