<template>
  <div
    class="wrap-left"
    :class="{ 'menu-hide': collapsed }"
    :style="{ width: sideBarWidth }"
  >
    <div class="wrap-logo">
      <div class="logo app-icon ic-home"></div>
      <span class="title--logo">{{ Resource.LeftMenu.TitleLogo }}</span>
    </div>
    <div class="menu">
      <div class="menu-group">
        <div v-for="(item, index) in menuItems" :key="index">
          <v-tooltip
            :content="collapsed ? item.title : ''"
            placement="right"
            right="right"
          >
            <a
              class="menu-item"
              :href="item.path"
              :class="[item.path == activeItem?.path ? 'active' : '']"
              @click="() => clickMenu(item)"
            >
              <div :class="['app-icon', item.icon]"></div>
              <span class="text-menu">{{ item.text }}</span>
              <div
                class="arrow-menu misa-icon app-icon"
                :class="item.arrow"
              ></div>
            </a>
          </v-tooltip>
        </div>
      </div>
    </div>

    <div class="wrap-bottom-menu">
      <v-tooltip
        :content="collapsed ? 'Mở ra' : 'Thu vào'"
        placement="top"
        right="top"
      >
        <div
          class="menu-resize"
          :class="{ 'rotate-180': collapsed }"
          @click="toggleSideBar"
        >
          <div class="resize-icon app-icon ic-back"></div>
        </div>
      </v-tooltip>
    </div>
  </div>
</template>
<script>
//import { getCurrentInstance } from "vue";
import Resource from "@/assets/js/resource/resource.js";
import VTooltip from "@/components/tooltip/VTooltip.vue";
import { collapsed, sideBarWidth } from "@/assets/js/commons/state.js";
import {
  computed,
  getCurrentInstance,
  onMounted,
  onUpdated,
  reactive,
  ref,
  watch,
} from "@vue/runtime-core";

export default {
  name: "LeftMenu",
  components: { VTooltip },
  data() {
    return {};
  },
  computed: {
    menuItems() {
      return this.getMenuItems();
    },
  },

  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();

    const isActive = ref(false);

    const activeItem = ref(null);

    function setActive() {
      proxy.isActive = true;
    }
    onMounted(() => {
      proxy.activeMenu();
    });

    watch(
      () => activeItem.value,
      (newVal) => {
        if (newVal) {
          proxy.activeMenu();
        }
      }
    );

    function activeMenu() {
      let pathName = location.pathname.toLowerCase();
      let item = proxy.menuItems.find((x) => x.path == pathName);
      proxy.activeItem = item || proxy.menuItems[1];
    }

    const cancelEvent = (e) => {
      if (e) {
        if (typeof e.preventDefault === "function") {
          e.preventDefault();
        }
        if (typeof e.stopPropagation === "function") {
          e.stopPropagation();
        }
        if (typeof e.stopImmediatePropagation === "function") {
          e.stopImmediatePropagation();
        }
      }
    };

    const Listsioner = computed(() => {
      const me = this;
      return {
        click: (event) => {
          cancelEvent(event);
        },
        mousedown: (event) => {
          cancelEvent(event);
        },
        keydown: (event) => {
          cancelEvent(event);
          emit("keydown", event);
        },
        focus: (event) => {
          cancelEvent(event);
          emit("keydown", event);
        },
      };
    });
    const collapsed = ref(false);
    const toggleSideBar = () => {
      collapsed.value = !collapsed.value;
    };

    const getMenuItems = () => {
      let menuItems = [
        {
          path: "/account",
          icon: "ic-car",
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

    function clickMenu(item) {
      proxy.$router.push(item.path);
    }

    return {
      getMenuItems,
      collapsed,
      toggleSideBar,
      sideBarWidth,
      Listsioner,
      isActive,
      clickMenu,
      activeItem,
      activeMenu,
      Resource,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/layouts/the_sidebar.scss";
</style>
