<template>
  <li
    tabindex="-1"
    @click="emitClick"
    @keyup.enter="emitClick"
    @keyup.space="emitClick"
  >
    <template v-if="icon">
      <div
        :class="[
          'app-icon icon--left',
          leftIcon,
          disabled ? 'disabled-icon' : '',
        ]"
        v-if="leftIcon"
      ></div>
      <div class="menu-item-content">
        <slot></slot>
      </div>
    </template>
    <slot v-else></slot>
  </li>
</template>
<script>
export default {
  props: {
    icon: {
      type: [Array, String],
      default: null,
    },
    leftIcon: {
      default: null,
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
  },
  methods: {
    emitClick() {
      this.$emit("menu-item-click");
    },
  },
  setup() {},
};
</script>
<style lang="scss" scoped></style>
