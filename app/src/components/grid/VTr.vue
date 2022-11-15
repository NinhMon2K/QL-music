<template>
  <tr :tabindex="7" class="ms-tr">
    <ms-td v-if="selectedCol" :config="configSelect" v-model:value="select">
    </ms-td>
    <ms-td
      v-for="col in columns"
      :key="col"
      :config="col"
      :value="data[col.field]"
    >
    </ms-td>
  </tr>
</template>
<script>
import {
  getCurrentInstance,
  onMounted,
  ref,
  reactive,
  watch,
  defineComponent,
} from "vue";
import MsTd from "@/components/grid/VTd.vue";

export default {
  name: "MsTr",
  props: {
    selected: {
      default: false,
      type: Boolean,
    },
    selectedCol: {
      default: false,
      type: Boolean,
    },

    columns: {
      default: [],
    },

    data: {
      default: {},
    },
  },
  components: {
    MsTd,
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    !window.mk && (window.mk = proxy);

    window.tr = proxy;
    const select = ref(props.selected);

    const configSelect = reactive({
      field: "selected",
      title: "checkbox",
      type: "Checkbox",
      width: 50,
    });

    onMounted(() => {
      watch(
        () => proxy.select,
        (newVal) => {
          emit("update:selected", newVal);
        }
      );

      watch(
        () => proxy.selected,
        (val) => {
          proxy.select = val;
        }
      );
    });

    return {
      configSelect,
      select,
    };
  },
};
</script>
<style lang="scss" scoped></style>
