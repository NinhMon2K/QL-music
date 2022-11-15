<template>
  <div class="main-header">
    <div class="left-header">
      <span class="title-page">Danh sách nhạc</span>
    </div>
    <div class="right-header">
      <!-- <div class="organization-name header-item">Nhạc</div> -->
      <div class="tool-header">
        <div class="tool notification">
          <v-tooltip content="Thông báo" placement="bottom">
            <div class="app-icon ic-notification"></div>
          </v-tooltip>
        </div>
        <div class="tool tf-home">
          <v-tooltip content="Lưới" placement="bottom">
            <div class="app-icon ic-view-grid"></div>
          </v-tooltip>
        </div>
        <div class="tool help">
          <v-tooltip content="Trợ giúp" placement="bottom">
            <div class="app-icon ic-question-message"></div>
          </v-tooltip>
        </div>
      </div>
      <div class="user-header">
        <div class="c-2 avatar">
          <v-tooltip content="Tài khoản" placement="bottom">
            <div class="app-icon ic-user"></div>
          </v-tooltip>
        </div>
        <div class="c-2 more">
          <v-tooltip content="Xuống" placement="bottom">
            <div class="app-icon ic-arow"></div>
          </v-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VTooltip from "@/components/tooltip/VTooltip.vue";
export default {
  name: "TheHeader",
  components: { VTooltip },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scope>
@import "@/assets/scss/layouts/the_header.scss";
</style>
