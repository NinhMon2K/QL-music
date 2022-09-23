<template>
  <div class="main-header">
    <div class="left-header">
      <span class="title-page">Danh sách</span>
    </div>
    <div class="right-header">
      <!-- <div class="organization-name header-item">Sở tài chính</div>
      <div class="ctr-number header-item">
        <label>Năm</label>
        <input type="number" value="2022" />
      </div> -->
      <div class="tool-header">
        <div class="tool notification">
          <div class="app-icon ic-notification"></div>
        </div>
        <div class="tool tf-home">
          <div class="app-icon ic-view-grid"></div>
        </div>
        <div class="tool help">
          <div class="app-icon ic-question-message"></div>
        </div>
      </div>
      <div class="user-header">
        <div class="c-2 avatar">
          <div class="app-icon ic-user"></div>
        </div>
        <div class="c-2 more">
          <div class="app-icon ic-arow"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TheHeader",
  components: {},
  data() {
    return {};
  },
};
</script>

<style lang="scss" scope>
@import "@/assets/scss/layouts/TheHeader.scss";
</style>
