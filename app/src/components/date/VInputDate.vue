<template>
  <div class="input-date__field">
    <label class="text-label" v-if="hasLabel" :for="id">
      {{ label ? label : "" }}
      <span v-if="hasInput">&#8727;</span>
    </label>
    <div
      class="flex-row"
      :class="[
        leftIcon ? 'has-icon' : '',
        disabledMessage ? 'input__error' : '',
      ]"
    >
      <el-date-picker
        :id="id ? id : ''"
        class="input-text"
        format="DD/MM/YYYY"
        value-format="YYYY-MM-DDTHH:mm:ss"
        type="date"
        ref="inputdate"
        :tabindex="tabindex"
        v-model="isValue"
        @change="changeValue"
        @blur="changeValue"
        :placeholder="placeholder"
        :disabled="disabled || false"
        :readonly="hasReadonly || false"
      />
      <label :for="id">
        <div
          :class="[
            'app-icon icon--right',
            rightIcon,
            disabled ? 'disabled-icon' : '',
          ]"
          @click="handleClick"
          v-if="rightIcon"
        ></div>
      </label>
    </div>
    <span v-if="disabledMessage" class="error-message">{{
      message ? message : ""
    }}</span>
  </div>
</template>
<script>
import {
  defineComponent,
  computed,
  ref,
  watch,
  nextTick,
  getCurrentInstance,
  onBeforeMount,
  reactive,
  onMounted,
} from "vue";

export default defineComponent({
  name: "vInput",
  props: {
    modelValue: {
      default: null,
    },
    configStyle: {
      default: {},
    },
    placeholder: {
      default: null,
      type: [Number, String],
    },
    leftIcon: {
      default: null,
      type: String,
    },
    rightIcon: {
      default: null,
      type: String,
    },
    inputBoder: {
      default: true,
      type: Boolean,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    disabledMessage: {
      default: false,
      type: Boolean,
    },
    customWarring: {
      default: null,
      type: Object,
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
    hasReadonly: {
      default: false,
      type: Boolean,
    },
    id: {
      default: null,
      type: String,
    },
    message: {
      default: null,
      type: String,
    },
    valueField: {
      default: null,
      type: String,
    },
    tabindex: {
      default: null,
      type: [Number, String],
    },
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    window.ipdate = proxy;
    const isValue = ref("");

    watch(
      () => proxy.modelValue,
      (newVal) => {
        proxy.isValue = newVal;
      }
    );
    onMounted(() => {
      proxy.changeValue();
    });
    const changeValue = function (e) {
      proxy.$emit("update:modelValue", proxy.isValue);
      nextTick(() => {
        emit("changeValue", proxy.isValue, proxy.valueField);
      });
    };
    return { isValue, changeValue };
  },
});
</script>
<style lang="scss" scope="">
@import "./../../assets/scss/components/v_input_date.scss";
</style>
