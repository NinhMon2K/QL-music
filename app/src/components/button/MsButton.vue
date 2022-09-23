<template>
  <button
    class="btn"
    :id="id ? id : ''"
    :class="[
      type,
      text ? '' : '',
      radius ? 'btn-radius' : '',
      btn_boder ? '' : 'btn-boder-none',
      disabled ? 'disabled-icon' : '',
    ]"
    :disabled="disabled || false"
  >
    <div
      :class="[
        'app-icon icon--left',
        leftIcon,
        disabled ? 'disabled-icon' : '',
      ]"
      v-if="leftIcon"
    ></div>
    <div class="btn-text" v-if="text">
      {{ text }}
    </div>
    <div
      :class="[
        'app-icon icon--right',
        rightIcon,
        disabled ? 'disabled-icon' : '',
      ]"
      v-if="rightIcon"
    ></div>
  </button>
</template>
<script>
import {
  defineComponent,
  computed,
  ref,
  getCurrentInstance,
  reactive,
  onMounted,
} from "vue";

export default defineComponent({
  name: "msButton",
  props: {
    //Text hiển thị button
    title: {
      default: null,
      type: String,
    },
    //Text hiển thị button
    text: {
      default: null,
      type: String,
    },
    // Icon bên trái button
    leftIcon: {
      default: null,
      type: String,
    },
    // Icon bên phải button
    rightIcon: {
      default: null,
      type: String,
    },
    // Mặc định button
    type: {
      default: "primary",
      type: String,
    },
    // Boder button
    btn_boder: {
      default: false,
      type: Boolean,
    },
    // boder radius button
    radius: {
      default: false,
      type: Boolean,
    },
    // trạng thái button
    disabled: {
      default: false,
      type: Boolean,
    },
    id: {
      default: null,
      type: String,
    },
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    // window.pro = proxy;
    // const abc = ref(null);

    // abc.value = "abc";

    // const obj = reactive({});

    // obj.abc = "xyz";

    // obj.compu = computed(() => {
    //   if (obj.abc == "xyz") {
    //     return "la xyz";
    //   } else {
    //     return "Ko xyz";
    //   }
    // });

    // const listeners = computed(() => ({
    //   click: (e) => {
    //     console.log("a");

    //     emit("e-click", "abc", 1);
    //   },
    // }));
    // return { abc, obj, listeners };
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import "./../../assets/scss/components/MsButton.scss";
</style>
