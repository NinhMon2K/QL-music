<template>
  <div class="input-field" :class="disabledMessage ? 'mg-9' : false">
    <label class="text-label" v-if="hasLabel" for="input__text">
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
      <div class="icon-filter">
        <span
          :class="[
            'app-icon icon--left',
            leftIcon,
            disabled ? 'disabled-icon' : '',
          ]"
          v-if="leftIcon"
        ></span>
      </div>

      <input
        id="input__text"
        class="input-text"
        type="text"
        v-model.trim="isValue"
        :tabindex="tabindex"
        :maxlength="maxLength"
        :placeholder="placeholder"
        :disabled="disabled || false"
        :readonly="hasReadonly || false"
        v-on="eventListsioner"
      />
      <div
        :class="[
          'app-icon icon--right',
          rightIcon,
          disabled ? 'disabled-icon' : '',
        ]"
        v-if="rightIcon"
      ></div>
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
  getCurrentInstance,
  reactive,
  onMounted,
  nextTick,
  watch,
} from "vue";

export default defineComponent({
  name: "VInput",
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
      type: String,
    },
    maxLength: {
      default: null,
      type: [Number, String],
    },
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();

    const forcused = ref(false);
    const isValue = ref("");

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

    const onFocus = (e) => {
      proxy.forcused = true;
      emit("focus", proxy.isValue, proxy.valueField, e);
    };
    const onBlur = (e) => {
      proxy.forcused = false;
      emit("blur", proxy.isValue, proxy.valueField, e);
    };
    const eventListsioner = computed(() => {
      const me = this;
      return {
        blur: (e) => {
          cancelEvent(e);
          proxy.onBlur(e);
        },
        focus: (e) => {
          cancelEvent(e);
          proxy.onFocus(e);
        },
        change: (e) => {
          cancelEvent(e);
          proxy.changeValue(e);
        },
        keydown: (e) => {
          emit("keydown", proxy.isValue, proxy.valueField, e);
        },
        keyup: (e) => {
          emit("keyup", proxy.isValue, proxy.valueField, e);
        },
      };
    });
    watch(
      () => proxy.modelValue,
      (newVal) => {
        proxy.isValue = newVal;
      }
    );
    const changeValue = function (e) {
      proxy.$emit("update:modelValue", proxy.isValue);
      nextTick(() => {
        emit("changeValue", proxy.isValue, proxy.valueField);
      });
    };
    return {
      isValue,
      changeValue,
      forcused,
      eventListsioner,
      cancelEvent,
      onFocus,
      onBlur,
    };
  },
});
</script>
<style lang="scss" scope="">
@import "./../../assets/scss/components/v_input.scss";
</style>
