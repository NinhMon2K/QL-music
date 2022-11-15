<template>
  <div class="filter-combobox" ref="container">
    <label class="text-label" v-if="hasLabel" :for="id">
      {{ label ? label : "" }}
      <span v-if="hasInput">*</span>
    </label>

    <button
      class="combobox-menu-toggle"
      ref="input"
      @click="isShowMenu = !isShowMenu"
    >
      <div
        :class="[
          'app-icon icon--left',
          leftIcon,
          disabled ? 'disabled-icon' : '',
        ]"
        v-if="leftIcon"
      ></div>
      <div
        class="container-list_combo"
        v-if="selected.length == 0 ? false : true"
      >
        <div
          class="item-checked__combobox"
          v-for="item in selected"
          :key="item[valueField]"
        >
          <v-tooltip
            :content="item[displayField]"
            placement="bottom"
            right="bottom"
          >
            <div class="text-cbo">{{ item[displayField] }}</div>
          </v-tooltip>
          <div
            class="app-icon ic-remove__cbo"
            @click="handleRemoveItem(item[valueField])"
          ></div>
        </div>
      </div>
      <input
        type="text"
        :placeholder="placeholder"
        ref="inputCbo"
        @keyup="search"
        :id="id"
      />
      <div
        :class="[
          'app-icon icon--right',
          rightIcon,
          disabled ? 'disabled-icon' : '',
        ]"
        v-if="rightIcon"
      ></div>
    </button>

    <teleport to="body">
      <div
        class="combobox-menu"
        ref="cbo"
        :style="style"
        :class="autoHeight ? 'height_auto--cbo' : ''"
        v-if="isShowMenu"
      >
        <div class="combobox-content">
          <ul class="list-item--combobox">
            <v-combobox-detail
              v-for="item in data"
              :key="item"
              :dataItem="item"
              :displayField="displayField"
              :valueField="valueField"
              :class="[
                selected?.find((x) => x[valueField] == item[valueField])
                  ? 'selected'
                  : '',
              ]"
              :selected="
                selected?.some((x) => x[valueField] == item[valueField])
              "
              @change-value="changeValue"
            >
            </v-combobox-detail>
          </ul>
        </div>
      </div>
    </teleport>
  </div>
</template>
<script>
import {
  computed,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  watch,
} from "@vue/runtime-core";
import VComboboxDetail from "./VComboboxDetail.vue";
import VTooltip from "@/components/tooltip/VTooltip.vue";
export default {
  name: "MsCombobox",
  components: {
    VComboboxDetail,
    VTooltip,
  },
  props: {
    modelValue: {
      default: null,
    },
    // Icon bên trái combobox
    leftIcon: {
      default: null,
      type: String,
    },
    dataAll: {
      default: [],
    },
    id: {
      default: null,
      type: String,
    },
    // Icon bên phải combobox
    rightIcon: {
      default: null,
      type: String,
    },
    // trạng thái icon
    disabled: {
      default: false,
      type: Boolean,
    },
    // chú giải
    placeholder: {
      default: null,
      type: [Number, String],
    },
    // trường dữ liệu
    valueField: {
      default: null,
      type: String,
    },
    // hiển thị dữ liệu nào
    displayField: {
      default: null,
      type: String,
    },
    //lable combobox
    label: {
      default: null,
      type: String,
    },
    // có bắt buộc nhập hay không
    hasInput: {
      default: false,
      type: Boolean,
    },
    // trạng thái lable mặc định false
    hasLabel: {
      default: false,
      type: Boolean,
    },
    // Giảm đi height list-item
    heightCb: {
      default: 0,
    },
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();

    const selected = ref([]);
    const data = ref(props.dataAll);
    const autoHeight = ref(false);
    window.cb = proxy;
    const display = computed(() =>
      proxy.selected.map((x) => x[props.displayField]).join("; ")
    );

    const objSelected = computed(() =>
      proxy.dataAll.reduce(
        (o, x) => ({
          ...o,
          [x[proxy.valueField]]: proxy.selected.includes(x),
        }),
        {}
      )
    );
    const handleRemoveItem = (item) => {
      proxy.isShowMenu = true;
      let i = proxy.selected.findIndex((x) => x[proxy.valueField] == item);
      proxy.selected.splice(i, 1);
    };

    /**
     * Xet positon cho combobox
     * @param {top,left} type top: vị trí top,left: vị trí left
     * Author: NNNinh (16/10/2022)
     */
    const offsetPosi = reactive({
      top: 0,
      left: 0,
    });

    /**
     * Xet positon cho combobox
     * @param {width,height} type width: chiều dài list-item, height: chiều cao list-item
     * Author: NNNinh (18/10/2022)
     */
    const offsetDropdown = reactive({
      width: 0,
      height: 0,
    });

    //Biến show list item
    const isShowMenu = ref(false);

    //Xét style cho list
    const style = computed(() => {
      let arr = [];
      arr.push(`top: ${offsetPosi.top}px`);
      arr.push(`left: ${offsetPosi.left}px`);
      arr.push(`width: ${offsetDropdown.width}px`);
      arr.push(`height: ${offsetDropdown.height}px`);
      return arr.join("; ");
    });

    // Sự kiện chỉ hiện menu cho 1 combobox
    onMounted(() => {
      document.addEventListener("click", (e) => {
        let target = e.target;

        let cont = target.closest(".filter-combobox");
        if (cont && cont.isEqualNode(proxy.$refs.container)) {
          e.preventDefault();
          e.stopPropagation();
        } else {
          let cont = target.closest(".combobox-menu");
          if (!cont || !cont.isEqualNode(proxy.$refs.cbo)) {
            isShowMenu.value = false;
          }
        }
      });
    });

    //Theo dõi show list
    watch(
      () => isShowMenu.value,
      (newVal) => {
        if (newVal) {
          proxy.setPosition();
        }
      }
    );

    /**
     * Tìm kiếm dữ liệu khi nhập input
     * NNNinh (01/11/2022)
     */
    const search = function (e) {
      setTimeout(() => {
        let val = proxy.$refs.inputCbo.value;
        proxy.data = proxy.dataAll.filter((x) =>
          x[props.displayField].toLowerCase()?.includes(val.toLowerCase())
        );
      }, 100);
    };

    // Sự kiện click item
    const itemClick = (item) => {
      selected.value = item;
      emit("item-click", item);
    };

    onMounted(() => {
      proxy.data = proxy.dataAll;
      watch(
        () => proxy.dataAll,
        () => {
          search();
        }
      );
    });
    
    onMounted(() => {
      proxy.setPosition();
      proxy.setDropdown();
      proxy.initEvent();
    });
    function setPosition() {
      let offset = proxy.$refs.input.getBoundingClientRect();
      offsetPosi.top = offset.bottom;
      offsetPosi.left = offset.left;
    }

    /**
     *Xet width, height cho combobox
     * Author: NNNinh (15/10/2022)
     */
    function setDropdown() {
      let offset = proxy.$refs.input.getBoundingClientRect();
      offsetDropdown.width = offset.width;
      offsetDropdown.height = 200.5 - this.heightCb;
    }

    const changeValue = function (item, select) {
      if (
        proxy.selected?.some(
          (x) => x[proxy.valueField] == item[proxy.valueField]
        )
      ) {
        return false;
      }
      // Kiểm tra select là true ỏ false
      // Nếu true push vào mảng , false xóa khỏi mảng
      if (select) {
        proxy.selected.push(item);
      } else {
        let i = proxy.selected.findIndex(
          (x) => x[proxy.valueField] == item[proxy.valueField]
        );
        proxy.selected.splice(i, 1);
      }
      proxy.$emit("change-value", proxy.selected, proxy.dataItem);
      proxy.$emit("update:modelValue", proxy.selected);
    };

    /**
     *Sự kiện event click windown ẩn list combobox
     * Author: NNNinh (15/10/2022)
     */
    function initEvent() {
      document.addEventListener("click", (e) => {
        if (proxy.isShowMenu) {
          let target = e.target;
          let cbo =
            target.closest(".combobox-menu") ||
            target.closest(".combobox-menu-toggle");
          if (!cbo) {
            proxy.isShowMenu = false;
          }
        }
      });
    }

    return {
      initEvent, //Sự kiện event click windown ẩn list combobox
      itemClick, //Sự kiện event click item
      setPosition, // Xét giá trị vị trí cho list cbo
      setDropdown, // Xét giá trị width,height
      style, //Xét style cho list
      isShowMenu, // Show list item
      display,
      data,
      search, // Tìm kiếm dữ liệu
      selected,
      changeValue,
      handleRemoveItem,
      objSelected,
      autoHeight, // Xét style height auto khi tìm kiếm cho list
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/components/v_combobox.scss";
</style>
