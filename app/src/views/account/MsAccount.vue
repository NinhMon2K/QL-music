<template>
  <div class="contrainer-toolbar">
    <div class="toobar-left">
      <ms-input
        :hasLabel="false"
        leftIcon="ic-search "
        id="txt-search"
        :radius="true"
        placeholder="Tìm kiếm tài khoản"
      ></ms-input>
    </div>
    <div class="toolbar-right">
      <ms-button
        ref="ab"
        :text="ResourceButton.Buttons.ButtonAddAccount"
        id="btn-add"
        leftIcon="ic-add"
        :radius="true"
        @click="handleClickAdd"
      >
      </ms-button>
      <ms-button leftIcon="ic-export" id="btn-export" :radius="true">
      </ms-button>
      <!-- <ms-popup-asset ></ms-popup-asset> -->

      <ms-button leftIcon="ic-delete__toolbar" id="btn-delete" :radius="true">
      </ms-button>
      <ms-popup-asset titlePopup="Thêm mới" v-if="isShowPopup"></ms-popup-asset>
    </div>
  </div>
  <ms-grid :columns="columns" :allData="allData" ref="abc"> </ms-grid>
</template>
<script>
import MsButton from "@/components/button/MsButton.vue";
import MsInput from "@/components/input/MsInput.vue";
import MsPopupAsset from "@/components/popup/MsPopupAsset.vue";
import MsGrid from "@/components/gridViewer/MsGrid.vue";
import { getCurrentInstance, onMounted, ref } from "vue";
import ResourceTable from "./../../resource/dictionary/ResourceTable.js";
import ResourceButton from "./../../resource/dictionary/ResourceButton.js";

import testAPI from "@/apis/api/testAPI.js";

export default {
  name: "MsAccount",
  components: {
    MsButton,
    MsInput,
    MsGrid,
    MsPopupAsset,
  },
  methods: {
    handleClickAdd() {
      this.isShowPopup = true;
    },
    close() {
      this.isShowPopup = false;
    },
  },
  async setup() {
    const { proxy } = getCurrentInstance();
    window.a = proxy;

    const allData = ref([
      {
        fixedAssetId: 1,
        fixedAssetCode: "55H7WN72/2022",
        fixed_asset_name: "Dell Inspiron",
        fixed_asset_category_name: "Máy vi tính xách tay",
        department_name: "Phòng hành chính kế toán",
        cost: 1,
      },
      {
        fixedAssetId: 2,
        fixedAssetCode: "MXT88618",
        fixed_asset_name: "Máy tính xách tay Fujisu",
        fixed_asset_category_name: "Máy vi tính xách tay",
        department_name: "Phòng thư ký",
        cost: 1,
      },
    ]);

    onMounted(async () => {
      let res = await testAPI.get("categoryGetAll", {});
      // console.log(res?.Data);
      proxy.allData.value = res?.Data;
    });

    const columns = ref([
      {
        field: "selected",
        title: "abc",
        type: "Checkbox",
        width: 48,
      },
      {
        field: ResourceTable.FieldAccount.AccountId,
        title: "STT",
        type: "Number",
        width: 48,
      },
      {
        field: ResourceTable.FieldAccount.AccountName,
        title: ResourceTable.tablesAccount.AccountUser,
        type: "Text",
        width: 150,
      },
      {
        field: ResourceTable.FieldAccount.Name,
        title: ResourceTable.tablesAccount.AccountName,
        type: "Text",
        minWidth: 159,
      },
      {
        field: ResourceTable.FieldAccount.Phone,
        title: ResourceTable.tablesAccount.AccountPhone,
        type: "Text",
        width: 163,
      },
      {
        field: ResourceTable.FieldAccount.Sex,
        title: ResourceTable.tablesAccount.AccountSex,
        type: "Text",
        width: 178,
      },
      {
        field: ResourceTable.FieldAccount.Birthday,
        title: ResourceTable.tablesAccount.AccountBirthday,
        type: "Number",
        width: 98,
      },
      {
        field: "c",
        title: ResourceTable.Controls.FunctionControl,
        type: "Action",
        width: 83,
        action: [
          {
            command: "Edit",
            icon: "ic-edit",
          },
          {
            command: "Edit",
            icon: "ic-replication",
          },
        ],
      },
    ]);

    // const loadAccountData = async ()=> {
    //   return new Promise((resolve, reject) => {
    //     setTimeout(()=> {
    //       resolve(this.dt)
    //     },10000)
    //   })
    // }
    // const AccountData = ref(await loadAccountData())
    return {
      columns,
      allData,
      //  AccountData
      ResourceTable,
      ResourceButton,
    };
  },
  data() {
    return {
      isShowPopup: false,
    };
  },
  // proxy.$el.f
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/view/assetsQLTS/MsAsset.scss";
</style>
