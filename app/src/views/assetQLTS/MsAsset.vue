<template>
  <div class="contrainer-toolbar">
    <div class="toobar-left">
      <div class="container__search">
        <v-input
          :hasLabel="false"
          leftIcon="ic-search"
          id="txt-search"
          :radius="true"
          v-model="txtSearch"
          @blur="handleChangeSeach"
          placeholder="Tìm kiếm tài sản"
          :disabledMessage="false"
          message=""
        ></v-input>
      </div>
      <v-combobox
        leftIcon="ic-fillter"
        valueField="fixed_asset_category_id"
        displayField="fixed_asset_category_name"
        rightIcon="ic-angle-downs"
        placeholder="Loại tài sản"
        :heightCb="13"
        :dataAll="DataAssetCategory.value"
      ></v-combobox>
      <v-combobox
        leftIcon="ic-fillter"
        valueField="department_id"
        :heightCb="13"
        displayField="department_name"
        rightIcon="ic-angle-downs"
        placeholder="Bộ phận sử dụng"
        :dataAll="DataDepartment.value"
      ></v-combobox>
    </div>
    <div class="toolbar-right">
      <v-tooltip content="Thêm mới tài sản" placement="bottom" right="bottom">
        <v-button
          ref="MsPopupAsset"
          text="Thêm tài sản"
          id="btn-add"
          leftIcon="ic-add"
          :radius="true"
          @click="handleClickAdd"
        >
        </v-button>
      </v-tooltip>
      <v-tooltip content="Xuất Excel" placement="bottom">
        <v-button
          leftIcon="ic-export"
          id="btn-export"
          :disabled="disabledButton.disabledExport"
          :radius="true"
        ></v-button>
      </v-tooltip>
      <v-tooltip content="Xóa" placement="bottom">
        <v-button
          leftIcon="ic-delete__toolbar"
          id="btn-delete"
          :radius="true"
          :disabled="disabledButton.disabledDelete"
          @click="handleShowMessBox"
        >
        </v-button>
      </v-tooltip>
      <v-popup-asset
        v-if="isShowPopup"
        :formModel="pram"
        :allData="dataAssetID[0]"
        @handle-close="handlClosePopup"
        @show-message="handleShowMess"
      ></v-popup-asset>
    </div>
  </div>
</template>
<script>
import VButton from "@/components/button/VButton.vue";
import VInput from "@/components/input/VInput.vue";
import VPopupAsset from "@/components/popup/VPopupAsset.vue";
import VMessageBox from "@/components/toast/VMessageBox.vue";
import VCombobox from "@/components/combobox/VCombobox.vue";
import VGrid from "@/components/grid/VGrid.vue";
import VTooltip from "@/components/tooltip/VTooltip.vue";
import VLoading from "@/components/loading/VLoading.vue";
import VMessage from "@/components/toast/VToastMessage.vue";
import {
  computed,
  getCurrentInstance,
  onMounted,
  onUpdated,
  reactive,
  ref,
  watch,
} from "vue";
import assetAPI from "@/apis/api/assetAPI.js";
import ResourceTable from "@/assets/js/resource/resourceTable";
import Enum from "@/assets/js/enums/enum.js";
import Resource from "@/assets/js/resource/resource.js";
export default {
  name: "MsAsset",
  components: {
    VButton,
    VInput,
    VGrid,
    VPopupAsset,
    VLoading,
    VCombobox,
    VTooltip,
    VMessageBox,
    VMessage,
  },
  methods: {
    close() {
      this.isShowPopup = false;
    },
    hanhdleAccumulated() {},
  },
  async setup() {
    const { proxy } = getCurrentInstance();
    window.asset = proxy;
   

    return {
    };
  },
};
</script>
<style lang="scss" scoped>

</style>
