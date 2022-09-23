<template>
  <teleport to="body">
    <div class="model">
      <div class="form-asset">
        <div class="header-popup">
          <div class="form-asset__title">{{ title }}</div>
        </div>
        <div class="content-popup">
          <div class="form-asset__body">
            <div class="form-group">
              <div class="form-group__left">  
                <ms-input
              label="Mã tài sản"
              hasLabel
              hasInput
              :radius="true"
              placeholder="Mã tài sản"
              message="Nhập mã tài sản"
            ></ms-input>
              </div>
              <div class="form-group__right">
                <ms-input
              label="Tên tài sản"
              hasLabel
              hasInput
              :radius="true"
              placeholder="Nhập tên tài sản"
            ></ms-input>
              </div>
            </div>
            <div class="form-group">
              <div class="form-group__left">  
                <ms-input
              label="Mã tài sản"
              hasLabel
              hasInput
              :radius="true"
              placeholder="Mã tài sản"
            ></ms-input>
              </div>
              <div class="form-group__right">
                <ms-input
              label="Tên tài sản"
              hasLabel
              hasInput
              :radius="true"
              placeholder="Nhập tên tài sản"
            ></ms-input>
              </div>
            </div>
            <div class="form-group">
              <div class="form-group__left">  
                <ms-input
              label="Mã tài sản"
              hasLabel
              hasInput
              :radius="true"
              placeholder="Mã tài sản"
            ></ms-input>
              </div>
              <div class="form-group__right">
                <ms-input
              label="Tên tài sản"
              hasLabel
              hasInput
              :radius="true"
              placeholder="Nhập tên tài sản"
            ></ms-input>
              </div>
            </div>
            <div class="form-group">
              <div class="form-group__left">  
                <ms-input
              label="Mã tài sản"
              hasLabel
              hasInput
              :radius="true"
              placeholder="Mã tài sản"
            ></ms-input>
              </div>
              <div class="form-group__right">
                <ms-input
              label="Tên tài sản"
              hasLabel
              hasInput
              :radius="true"
              placeholder="Nhập tên tài sản"
            ></ms-input>
              </div>
            </div>
            <div class="form-group">
              <div class="form-group__left">  
                <ms-input
              label="Mã tài sản"
              hasLabel
              hasInput
              :radius="true"
              placeholder="Mã tài sản"
            ></ms-input>
              </div>
              <div class="form-group__right">
                <ms-input
              label="Tên tài sản"
              hasLabel
              hasInput
              :radius="true"
              placeholder="Nhập tên tài sản"
            ></ms-input>
              </div>
            </div>
         
            <!-- <div class="form-group__left">       
              <ms-input
              label="Mã tài sản"
              hasLabel
              hasInput
              :radius="true"
              placeholder="Mã tài sản"
            ></ms-input>
            <ms-input
              label="Mã tài sản"
              hasLabel
              hasInput
              :radius="true"
              placeholder="Mã tài sản"
            ></ms-input>
            <ms-input
              label="Mã tài sản"
              hasLabel
              hasInput
              :radius="true"
              placeholder="Mã tài sản"
            ></ms-input>
            </div>
            <div class="form-group__right">
              <ms-input
              label="Tên tài sản"
              hasLabel
              hasInput
              :radius="true"
              placeholder="Nhập tên tài sản"
            ></ms-input>
            <ms-input
              label="Tên bộ phận sử dụng"
              hasLabel         
              :radius="true"
            ></ms-input>
            <ms-input
              label="Tên loại tài sản"
              hasLabel
              :radius="true"     
            ></ms-input>
            </div> -->
            
          </div>
        </div>
        <div class="footer-popup">
          <div class="form-asset__footer">
            <ms-button @click="close" text="Hủy" radius> </ms-button>
            <ms-button text="Lưu" radius></ms-button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script>
import { computed } from "@vue/runtime-core";
import MsButton from "@/components/button/MsButton.vue";
import MsInput from "@/components/input/MsInput.vue";
export default {
  name: "MsPopupAsset",
  components: {
    MsButton,
    MsInput,
  },
  props: {
    configStyle: {
      default: {},
    },
    statePopup: {
      default: false,
    },
    titlePopup: {
      default: null,
    },
  },
  methods: {
    close() {
      this.$parent.close();
    },
  },
  setup(props, { emit }) {
    // function show() {
    //   props.statePopup = true;
    // }
    const showTitle = () => {
      let rs = props.titlePopup ? props.titlePopup : "";
      return rs;
    };

    const title = computed(() => showTitle());
    const styles = computed(() => {
      let arr = [];
      if (props.configStyle.width) {
        arr.push("width: " + props.configStyle.width + "px;");
        arr.push("min-width: " + props.configStyle.width + "px;");
      }

      if (props.configStyle.minWidth) {
        arr.push("min-width: " + props.configStyle.minWidth + "px;");
      }
      if (props.configStyle.height) {
        arr.push("height: " + props.configStyle.height + "px;");
        arr.push("min-height: " + props.configStyle.height + "px;");
      }
      return arr.join("; ");
    });

    return {
      styles,
      title,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./../../assets/scss/components/MsPopupAsset.scss";

</style>
