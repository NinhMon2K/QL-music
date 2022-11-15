<template>
  <td :style="styles" :class="[cls, styleAlign]">
    <div class="td-inner" ref="td">
      <template v-if="config.type == ColumnType.Checkbox">
        <v-checkbox v-model="data"></v-checkbox>
      </template>

      <template v-else-if="config.type == ColumnType.Action">
        <div class="action-group">
          <div v-for="btn in config.action" :key="btn">
            <v-tooltip
              :content="btn.command == 0 ? 'Sửa' : 'Nhân bản'"
              placement="top"
              right="top"
            >
              <div
                class="app-icon icon"
                :class="btn.icon"
                @click="btn.click && btn.click(btn.command, data)"
              ></div>
            </v-tooltip>
          </div>
        </div>
      </template>

      <template v-else-if="config.align == ColumnType.AlignCenter">
        {{ text }}
      </template>
      <template v-else> {{ text }} </template>
    </div>
  </td>
</template>

<script>
import {
  computed,
  getCurrentInstance,
  onMounted,
  reactive,
  methods,
  nextTick,
  ref,
  watch,
} from "@vue/runtime-core";
import ColumnType from "@/assets/js/constant/ColumnType.js";
import commonFunction from "@/assets/js/commons/commonFunction.js";
import Resource from "@/assets/js/resource/resource.js";
import VTooltip from "@/components/tooltip/VTooltip.vue";
import VCheckbox from "@/components/input/VCheckbox.vue";
export default {
  name: "MsTd",
  components: {
    VTooltip,
    VCheckbox,
  },
  props: {
    config: {
      default: {},
    },
    value: {
      default: null,
    },
  },
  methods: {},
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const data = ref(props.value);

    onMounted(() => {
      watch(
        () => data.value,
        (newVal) => {
          proxy.$emit("update:value", newVal);
        }
      );

      watch(
        () => proxy.value,
        (newVal) => {
          proxy.data = newVal;
        }
      );
    });

    const setTooltipDisplay = () => {
      let offset = proxy.$refs.td.getBoundingClientRect();
      if (proxy.text.length > offset.width) {
        return proxy.text;
      } else return "";
    };
    // Xét style cho td
    const styles = computed(() => {
      let arr = [];
      if (props.config.width) {
        arr.push("width: " + props.config.width + "px;");
        arr.push("min-width: " + props.config.width + "px;");
      }
      if (props.config.minWidth) {
        arr.push("min-width: " + props.config.minWidth + "px;");
      }

      return arr.join("; ");
    });

    // Show giá trị value td
    const showValue = () => {
      let rs = props.value;

      switch (props.config.type) {
        case ColumnType.Text:
          rs = props.value || "";
          break;
        case ColumnType.Number:
          rs = commonFunction.formatNumber(props.value);
          break;
      }

      return rs;
    };

    // Giá trị hiện lên Dom
    const text = computed(() => showValue());

    const cls = computed(() => {
      let rs = [];

      switch (props.config.type) {
        case ColumnType.Checkbox:
          rs.push("text-center");
          break;
        case ColumnType.Number:
          rs.push("text-right");
          break;
      }

      return rs.join(" ");
    });

    //Căn chỉnh nội dung bên trái,phải hay center
    const styleAlign = computed(() => {
      let rs = [];

      switch (props.config.align) {
        case ColumnType.AlignCenter:
          rs.push("text-align__center");
          break;
        case ColumnType.AlignLeft:
          rs.push("text-align__left");
          break;
        case ColumnType.AlignRight:
          rs.push("text-align__right");
          break;
      }

      return rs.join(" ");
    });

    return {
      text,
      ColumnType,
      styles,
      cls,
      Resource,
      data,
      setTooltipDisplay,
      styleAlign,
    };
  },
};
</script>

<style lang="scss" scope="">
.action-group {
  display: flex;
  justify-content: center;

  .icon {
    cursor: pointer;
    margin: 0 4px;
  }
}

.th-inner {
  font-size: 13px;
}

.td-inner {
  font-size: 13px;
  max-width: 248px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

input[type="checkbox"] {
  width: 14px;
  height: 14px;
}
.ms-tr {
  .text-center {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    &:first-child {
      margin-left: -3px;
    }
  }
  .text-right {
    &:first-child {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
  }
}
.text-align__center {
  text-align: center;
}
</style>
