<template>
  <div class="m-toast">
    <div class="m-toast-main">
      <div class="left-toast">
        <div
          class="icon-message"
          :class="[
            'app-icon icon--left',
            iconMessage,
            disabled ? 'disabled-icon' : '',
          ]"
        ></div>
        <div class="toast-content">
          <div class="title-toast">
            {{ textMessage }}
          </div>
        </div>
      </div>
      <div class="icon-close mr-8" @click="closeOpenToast()"></div>
    </div>
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
  watch,
} from "vue";
export default {
  name: "VMessage",
  props: {
    textMessage: {
      default: null,
      type: [String, Number],
    },
    iconMessage: {
      default: null,
      type: String,
    },
    disabled: {
      default: null,
      type: Boolean,
    },
  },
};
</script>
<style lang="scss" scoped>
.m-toast {
  position: fixed;
  right: 32px;
  top: 32px;
  z-index: 9999;
  display: block;
  .m-toast-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 300px;
    border: solid 1px #ccc;
    height: 48px;
    min-height: 48px;
    background-color: #fff;
    padding: 16px;
    border-radius: 4px;
    animation: toastLeft ease 0.3s, toastOut linear 1s 3s forwards;
    .left-toast {
      display: flex;
      .icon-message {
        margin-right: 14px;
      }
      .toast-content {
        align-items: center;
        flex-direction: column;
        justify-content: start;
        .title-toast {
          display: block;
          font-size: 16px;
        }
      }
    }
  }
}
@keyframes toastLeft {
  from {
    opacity: 0;
    transform: translateX(calc(100% + 32px));
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes toastOut {
  to {
    opacity: 0;
  }
}
</style>
