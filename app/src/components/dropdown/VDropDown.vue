<template>
  <div
    class="filter-dropdown"
    ref="container"
    :class="disabledMessage ? 'mg-9' : false"
  >
    <label class="text-label" v-if="hasLabel">
      {{ label ? label : "" }}
      <span v-if="hasInput">&#8727;</span>
    </label>
    <button
      class="dropdown-menu-toggle"
      ref="dropdown"
      :class="disabledMessage ? 'error__message' : ''"
    >
      <div
        :class="[
          'app-icon icon--left',
          leftIcon,
          disabled ? 'disabled-icon' : '',
        ]"
        v-if="leftIcon"
      ></div>
      <input
        type="text"
        v-model="disp"
        :tabindex="tabindex"
        ref="input"
        :placeholder="placeholder"
        :readonly="readonly"
        v-on="eventListsioner"
        @keyup="search"
        @click="isShowMenu = true"
      />
      <div
        :class="[
          'app-icon icon--right',
          rightIcon,
          disabled ? 'disabled-icon' : '',
        ]"
        v-if="rightIcon"
        @click="isShowMenu = !isShowMenu"
      ></div>
    </button>

    <teleport to="body">
      <div
        class="dropdown-menu"
        ref="drop"
        :style="style"
        :class="autoHeight ? 'height_auto--cbo' : ''"
        v-if="isShowMenu"
      >
        <div class="dropdown-content">
          <div class="container-title">
            <div class="title-list">
              <div class="text__title" v-for="col in columns" :key="col">
                {{ col.titleField }}
              </div>
            </div>
          </div>

          <ul class="list-item--dropdown">
            <!-- <li>
              <div>Mã</div>
              <div>Bộ phận sử dụng</div>
            </li> -->
            <dropdown-item
              v-for="item in data"
              :key="item"
              :dataItem="item"
              :columns="columns"
              :displayField="displayField"
              :class="[
                modelValue && modelValue == item[valueField] ? 'selected' : '',
              ]"
              @menu-item-click="itemClick"
            >
            </dropdown-item>
          </ul>
        </div>
      </div>
    </teleport>
    <span v-if="disabledMessage" class="error-message">{{
      message ? message : ""
    }}</span>
  </div>
</template>
<script>
import {
  computed,
  getCurrentInstance,
  nextTick,
  onMounted,
  reactive,
  ref,
  watch,
} from "@vue/runtime-core";
import DropdownItem from "./VDropDownDetail.vue";
export default {
  name: "MsDropdown",
  components: {
    DropdownItem,
  },
  props: {
    modelValue: {
      default: null,
    },
    texts: {
      default: null,
      type: String,
    },
    leftIcon: {
      default: null,
      type: String,
    },
    dataAll: {
      default: [],
    },
    rightIcon: {
      default: null,
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    placeholder: {
      default: null,
      type: [Number, String],
    },
    valueField: {
      default: null,
      type: String,
    },
    displayField: {
      default: null,
      type: String,
    },
    label: {
      default: null,
      type: String,
    },
    hasInput: {
      default: false,
      type: Boolean,
    },
    hasLabel: {
      default: false,
      type: Boolean,
    },
    heightCb: {
      default: 0,
    },
    readonly: {
      default: false,
      type: Boolean,
    },
    tabindex: {
      default: null,
      type: String,
    },
    message: {
      default: null,
      type: String,
    },
    disabledMessage: {
      default: false,
      type: Boolean,
    },
    columns: {
      default: [],
    },
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();

    const data = ref(props.dataAll);
    const disp = ref("");
    const autoHeight = ref(false);

    window.dr = proxy;

    // Lấy dữ liệu những item selected
    const selected = computed(() => {
      if (proxy.modelValue) {
        return proxy.dataAll.find(
          (x) => x[proxy.valueField] == proxy.modelValue
        );
      } else {
        return null;
      }
    });
    onMounted(() => {
      proxy.data = proxy.dataAll;
      proxy.disp = display.value;
      watch(
        () => proxy.dataAll,
        () => {
          search();
        }
      );
    });

    //Tìm kiếm dữ liệu trong dropdown
    const search = function (e) {
      setTimeout(() => {
        let val = proxy.$refs.input.value;
        proxy.data = proxy.dataAll.filter((x) =>
          x[props.displayField].toLowerCase()?.includes(val.toLowerCase())
        );
        // Kiểm tra giá trị input khác "" hay k
        if (val != "") {
          proxy.autoHeight = true;
        }
        disp.value = display.value;
      }, 100);
    };

    const display = computed(
      () => proxy.selected && proxy.selected[proxy.displayField]
    );

    const offsetPosi = reactive({
      top: 0,
      left: 0,
    });
    const offsetDropdown = reactive({
      width: 0,
      height: 0,
    });

    // Biến show menu list item dropdown
    const isShowMenu = ref(false);

    /**
     * Xet style cho dropdown
     * Author: NNNinh (14/10/2022)
     */
    const style = computed(() => {
      let arr = [];
      arr.push(`top: ${offsetPosi.top}px`);
      arr.push(`left: ${offsetPosi.left}px`);
      arr.push(`width: ${offsetDropdown.width}px`);
      arr.push(`height: ${offsetDropdown.height}px`);
      return arr.join("; ");
    });

    /**
     * Theo dõi biến isShowMenu là true hay false
     * Author: NNNinh (14/10/2022)
     */
    watch(
      () => isShowMenu.value,
      (newVal) => {
        if (newVal) {
          proxy.setPosition();
        }
      }
    );

    /**
     * Xự kiện click itemdropdown
     * Author: NNNinh (16/10/2022)
     */
    const itemClick = (item) => {
      emit("update:modelValue", item[proxy.valueField]);
      nextTick(() => {
        emit("item-click", item);
      });
    };

    watch(
      () => proxy.modelValue,
      (newVal) => {
        disp.value = display.value;
      }
    );
    onMounted(() => {
      proxy.setPosition();
      proxy.setDropdown();
      proxy.initEvent();
    });

    /**
     * Set vị trí cho dropdown
     * Author: NNNinh (16/10/2022)
     */
    function setPosition() {
      let offset = proxy.$refs.dropdown.getBoundingClientRect();
      offsetPosi.top = offset.bottom;
      offsetPosi.left = offset.left;
    }

    //Xử lý sự kiện
    const cancelEvent = (e) => {
      if (e) {
        //phương thức hủy sự kiện nếu nó có thể hủy được, nghĩa là hành động mặc định của sự kiện sẽ không xảy ra.
        if (typeof e.preventDefault === "function") {
          e.preventDefault();
        }
        //phương thức ngăn không cho sự lan truyền của cùng một sự kiện được gọi.
        if (typeof e.stopPropagation === "function") {
          e.stopPropagation();
        }
        //Sự kiện ngăn không cho người nghe khác của cùng một sự kiện được gọi.
        if (typeof e.stopImmediatePropagation === "function") {
          e.stopImmediatePropagation();
        }
      }
    };

    onMounted(() => {
      document.addEventListener("click", (e) => {
        let target = e.target;
        let cont = target.closest(".filter-dropdown");
        if (cont && cont.isEqualNode(proxy.$refs.container)) {
          e.preventDefault();
          e.stopPropagation();
        } else {
          isShowMenu.value = false;
        }
      });
    });

     const onBlur = (e) => {
      emit('blur',proxy.disp)
     };
    const eventListsioner = computed(() => {
      const me = this;
      return {
        click: (e) => {
          // proxy.cancelEvent(e);
          proxy.isShowMenu = !proxy.isShowMenu;
        },
        blur: (e) => {
          // proxy.cancelEvent(e);
           proxy.onBlur(e);
        },
        focus: (e) => {
          // proxy.cancelEvent(e);
          // proxy.onFocus(e);
        },
        change: (e) => {
          // proxy.cancelEvent(e);
           proxy.changeValue(e);
        },
        keydown: (e) => {
          emit("keydown", e);
        },
        keyup: (e) => {
          emit("keyup", e);
        },
      };
    });

    /**
     * Set width,height cho dropdown
     * Author: NNNinh (16/10/2022)
     */
    function setDropdown() {
      let offset = proxy.$refs.dropdown.getBoundingClientRect();
      offsetDropdown.width = offset.width;
      offsetDropdown.height = 200.5 - this.heightCb;
    }

    /**
     *Đóng menu dropdown khi windown click
     * Author: NNNinh (15/10/2022)
     */
    function initEvent() {
      document.addEventListener("click", (e) => {
        if (proxy.isShowMenu) {
          let target = e.target;
          let cbo =
            target.closest(".dropdown-menu") ||
            target.closest(".dropdown-menu-toggle");
          if (!cbo) {
            proxy.isShowMenu = false;
          }
        }
      });
    }

    return {
      itemClick,
      cancelEvent,
      eventListsioner,
      setPosition,
      setDropdown,
      style,
      isShowMenu, //Show menu dropdown
      display,
      selected,
      initEvent, //Đóng menu dropdown khi windown click,
      search,
      data,
      disp, // Gán giá trị
      autoHeight,
      onBlur
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/components/v_dropdown.scss";
.container-title {
  width: 100%;
  padding: 3px 6px;
  width: 100%;
  height: 36px;

  .title-list {
    display: flex;
    width: 100%;
    height: 36px;
    min-height: 36px;
    align-items: center;
    border-radius: 3px;
    background-color: #96c6ee;
    z-index: 9999;
    position: relative;
    .text__title {
      font-size: 13px;
      font-weight: 700;
      &:first-child {
        width: 86px;
        text-align: center;
      }
    }
  }
}
.selected {
  transition: 0.2s;
  background-color: #c7e0f5;
  cursor: pointer;
  border-radius: 4px;
  .inline-block {
    .item-dropdown {
    }
  }
}
</style>
