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
          placeholder="Tìm kiếm tài khoản"
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
      ></v-combobox>
      <v-combobox
        leftIcon="ic-fillter"
        valueField="department_id"
        :heightCb="13"
        displayField="department_name"
        rightIcon="ic-angle-downs"
        placeholder="Bộ phận sử dụng"
      ></v-combobox>
    </div>
    <div class="toolbar-right">
      <v-tooltip content="Thêm mới tài sản" placement="bottom" right="bottom">
        <v-button
          ref="MsPopupAsset"
          text="Thêm tài khoản"
          id="btn-add"
          leftIcon="ic-add"
          :radius="true"
        >
        </v-button>
      </v-tooltip>
      <v-tooltip content="Xuất Excel" placement="bottom">
        <v-button
          leftIcon="ic-export"
          id="btn-export"
      
          :radius="true"
        ></v-button>
      </v-tooltip>
      <v-tooltip content="Xóa" placement="bottom">
        <v-button
          leftIcon="ic-delete__toolbar"
          id="btn-delete"
          :radius="true"
        >
        </v-button>
      </v-tooltip>
    </div>
  </div>
  <v-grid></v-grid>
</template>
<script>
import VButton from "@/components/button/VButton.vue";
import VInput from "@/components/input/VInput.vue";
import VCombobox from "@/components/combobox/VCombobox.vue";
import VTooltip from "@/components/tooltip/VTooltip.vue";
import {
  computed,
  getCurrentInstance,
  onMounted,
  onUpdated,
  reactive,
  ref,
  watch,
} from "vue";
import VGrid from "@/components/grid/VGrid.vue"
import ResourceTable from "@/assets/js/resource/resourceTable";
import Enum from "@/assets/js/enums/enum.js";
import Resource from "@/assets/js/resource/resource.js";
export default {
  name: "MsAsset",
  components: {
    VButton,
    VInput,
    VTooltip,
    VGrid
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
  
    /**
     * Xác định cột cho table
     * @param {string} type giá trị là number,text hay checked
     * @param {string} field trường để map dữ liệu
     * @param {string} title text hiện thị lên giao diện
     * @param {string} width độ rộng của cột
     * @param {string} align vị trí bên trái, phải, center
     * Author: NNNinh (16/10/2022)
     */
     const columns = ref([
      {
        field: ResourceTable.FieldAsset.STT,
        title: ResourceTable.lblTableAssets.STT,
        type: "Number",
        width: 48,
        align: "Center",
      },
      {
        field: ResourceTable.FieldAsset.fixedAssetCode,
        title: ResourceTable.lblTableAssets.lblAssetCode,
        type: "Text",
        width: 80,
      },
      {
        field: ResourceTable.FieldAsset.fixedAssetName,
        title: ResourceTable.lblTableAssets.lblAssetName,
        type: "Text",
        minWidth: 140,
      },
      {
        field: ResourceTable.FieldAsset.fixedAssetCategoryName,
        title: ResourceTable.lblTableAssets.lblAssetCategoryName,
        type: "Text",
        width: 250,
      },
      {
        field: ResourceTable.FieldDepartment.departmentName,
        title: ResourceTable.lblTableAssets.lblDepartmentName,
        type: "Text",
        width: 165,
      },
      {
        field: ResourceTable.FieldAsset.quantity,
        title: ResourceTable.lblTableAssets.lblQuantity,
        type: "Number",
        width: 60,
      },
      {
        field: ResourceTable.FieldAsset.cost,
        title: ResourceTable.lblTableAssets.lblCost,
        type: "Number",
        width: 110,
      },
      {
        field: ResourceTable.FieldAsset.depreciationResidual,
        title: ResourceTable.lblTableAssets.lblAccumulated,
        type: "Number",
        width: 110,
      },
      {
        field: ResourceTable.FieldAsset.depreciationResidual,
        title: ResourceTable.lblTableAssets.lblAsset,
        type: "Number",
        width: 110,
      },
      {
        field: ResourceTable.FieldAsset.fixedAssetId,
        title: ResourceTable.Controls.FunctionControl,
        type: "Action",
        width: 100,
        action: [
          {
            command: 0,
            icon: "ic-edit",
            click: clickMenu,
          },
          {
            command: 1,
            icon: "ic-replication",
            click: clickMenu,
          },
        ],
      },
    ]);

    return {
     
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/view/account/MsAccount.scss";
@import "@/assets/scss/components/v_message_box.scss";
</style>
