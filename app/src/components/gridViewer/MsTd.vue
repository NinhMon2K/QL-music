<template>
  <td :style="styles" :class="cls">
    <div class="td-inner">
      <template v-if="config.type == ColumnType.Checkbox">
        <input type="checkbox" :value="value" />
      </template>

      <template v-else-if="config.type == ColumnType.Action">
        <div class="action-group">
          <div
            v-for="btn in config.action"
            :key="btn"
            class="app-icon icon"
            :class="btn.icon"
          ></div>
        </div>
      </template>

      <template v-else> {{ text }} </template>
    </div>
  </td>
</template>

<script>
import ColumnType from "@/commons/constant/ColumnType";
import { computed } from "@vue/runtime-core";
import commonFunction from "@/commons/commonFunction";

export default {
  name: "MsTd",
  props: {
    config: {
      default: {},
    },
    value: {
      default: null,
    },
  },
  setup(props, { emit }) {
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

    return {
      text,
      ColumnType,
      styles,
      cls,
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
}
</style>
