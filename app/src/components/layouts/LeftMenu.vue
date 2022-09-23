<template>
  <div
    class="wrap-left"
    :class="{ 'menu-hide': collapsed }"
    :style="{ width: sideBarWidth }"
  >
    <div class="wrap-logo">
      <div class="logo app-icon ic-home"></div>
      <span class="abc"> QL MUSIC</span>
    </div>
    <div class="menu">
      <div class="menu-group">
        <a
          class="menu-item"
          v-for="(item, index) in menuItems"
          :key="index"
          :href="item.path"
          :title="collapsed ? item.text : ''"
        >
          <div :class="['app-icon', item.icon]"></div>
          <span class="text-menu">{{ item.text }}</span>
          <div class="arrow-menu misa-icon app-icon" :class="item.arrow"></div>
        </a>
      </div>
    </div>

    <div class="wrap-bottom-menu">
      <div
        class="menu-resize"
        :class="{ 'rotate-180': collapsed }"
        @click="toggleSideBar"
      >
        <div class="resize-icon app-icon ic-back"></div>
      </div>
    </div>
  </div>
</template>
<script>
//import { getCurrentInstance } from "vue";
import Resource from "./../../resource/dictionary/Resource.js";
import { collapsed, sideBarWidth } from "./../../commons/state.js";
import { ref } from "vue";

export default {
  name: "LeftMenu",
  components: {},
  data() {
    return {};
  },
  computed: {
    menuItems() {
      return this.getMenuItems();
    },
  },
  setup() {
    //  const { proxy } = getCurrentInstance();

    const collapsed = ref(false);
    const toggleSideBar = () => {
      collapsed.value = !collapsed.value;
    };

    const getMenuItems = () => {
      let menuItems = [
        {
          path: "/account",
          icon: "ic-account",
          text: Resource.LeftMenu.Account,
          arrow: "",
        },
        {
          path: "/music",
          icon: "ic-car",
          text: Resource.LeftMenu.Music,
          arrow: "ic-angle-down",
        },
        {
          path: "/singer",
          icon: "ic-asset",
          text: Resource.LeftMenu.Singer,
          arrow: "ic-angle-down",
        },
        {
          path: "/category",
          icon: "ic-tools",
          text: Resource.LeftMenu.Category,
          arrow: "ic-angle-down",
        },
        {
          path: "/album",
          icon: "ic-dictionary",
          text: Resource.LeftMenu.Album,
          arrow: "",
        },
        {
          path: "/banner",
          icon: "ic-dictionary",
          text: Resource.LeftMenu.Banner,
          arrow: "",
        },
        {
          path: "/playlist",
          icon: "ic-menu__search",
          text: Resource.LeftMenu.Playlist,
          arrow: "ic-angle-down",
        },
        {
          path: "/report",
          icon: "ic-report ",
          text: Resource.LeftMenu.Statistical,
          arrow: "ic-angle-down",
        },
      ];
      return menuItems;
    };

    return {
      getMenuItems,
      collapsed,
      toggleSideBar,
      sideBarWidth,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/layouts/leftMenu.scss";
</style>
