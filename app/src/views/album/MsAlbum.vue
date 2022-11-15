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

  <!-- Dialog xóa nhiều dòng -->
  <teleport to="body">
    <v-message-box
      :disabledTop="false"
      leftIcon="ic-warning"
      :valueMessageBox="valueMessageBox"
      :textMessageBox="Resource.TitleDialogMessage.DeleteMultiple.VI"
      :disabledValueLeft="true"
      :disabledValueRight="false"
      v-if="isDialogMessDeleMultiple"
    >
      <v-button
        :text="Resource.TitleBtnDialog.Delete.VI"
        radius
        @click="handleMultiDelete"
      ></v-button>
      <v-button
        :text="Resource.TitleBtnDialog.NoCancel.VI"
        type="secodary"
        @click="isDialogMessDeleMultiple = false"
        radius
      ></v-button>
    </v-message-box>
  </teleport>

  <!-- Dialog xóa 1 dòng -->
  <teleport to="body">
    <v-message-box
      :disabledTop="false"
      leftIcon="ic-warning"
      :valueMessageBox="valueMessageBox"
      :textMessageBox="Resource.TitleDialogMessage.DeleteOneAsset.VI"
      :disabledValueLeft="false"
      :disabledValueRight="true"
      v-if="isDialogMessDelete"
    >
      <v-button
        :text="Resource.TitleBtnDialog.Delete.VI"
        @click="handleDelete"
        radius
      ></v-button>
      <v-button
        :text="Resource.TitleBtnDialog.NoCancel.VI"
        type="secodary"
        @click="isDialogMessDelete = false"
        radius
      >
      </v-button>
    </v-message-box>
  </teleport>

  <!-- Dialog cancel xóa -->
  <teleport to="body">
    <v-message-box
      :disabledTop="false"
      leftIcon="ic-warning"
      :valueMessageBox="valueMessageBox"
      :textMessageBox="Resource.TitleDialogMessage.CancelDelete.VI"
      :disabledValueLeft="false"
      :disabledValueRight="false"
      v-if="isDialogMessCancelDelete"
    >
      <v-button :text="Resource.TitleBtnDialog.Close.VI" radius></v-button>
    </v-message-box>
  </teleport>

  <!-- Dialog cancel xóa nhiều dòng -->
  <teleport to="body">
    <v-message-box
      :disabledTop="false"
      leftIcon="ic-warning"
      :valueMessageBox="valueMessageBox"
      :textMessageBox="Resource.TitleDialogMessage.CancelDeleteMultiple.VI"
      :disabledValueLeft="true"
      :disabledValueRight="false"
      v-if="isDialogMessCancelDeleMultiple"
    >
      <v-button :text="Resource.TitleBtnDialog.Agree.VI" radius></v-button>
    </v-message-box>
  </teleport>

  <!-- Khi không chọn dữ để xóa cảnh báo  -->
  <teleport to="body">
    <v-message-box
      :disabledTop="false"
      leftIcon="ic-warning"
      :textMessageBox="Resource.TitleDialogMessage.DeleteNoData.VI"
      :disabledValueLeft="false"
      :disabledValueRight="false"
      v-if="isDialogMessDeleNoData"
    >
      <v-button
        :text="Resource.TitleBtnDialog.Close.VI"
        radius
        @click="isDialogMessDeleNoData = false"
      ></v-button>
    </v-message-box>
  </teleport>
  <!-- Loading form -->
  <teleport to="body">
    <v-loading v-if="isLoading"></v-loading>
  </teleport>
  <v-grid
    :columns="columns"
    :allData="allData"
    :selectedCol="true"
    :dataTotal="dataTotal"
    ref="table"
    v-model:selectedData="dataSelected"
    @currentPage="handleTotalPage"
    @changeTabView="handleChangeTab"
  >
  </v-grid>
  <teleport to="body">
    <v-message
      :iconMessage="confirmMessage.iconMessage"
      :textMessage="confirmMessage.textMessage"
      v-show="confirmMessage.isShow"
    ></v-message>
  </teleport>
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
    const isLoading = ref(false);
    const isDialogMessDeleMultiple = ref(false);
    const isDialogMessDelete = ref(false);
    const isDialogMessCancelDelete = ref(false);
    const isDialogMessCancelDeleMultiple = ref(false);
    const isDialogMessDeleNoData = ref(false);
    const valueMessageBox = ref("");
    const allData = ref([]);
    const txtSearch = ref(" ");
    const currentPage = ref(0);
    const tableView = ref(0);
    const isShowPopup = ref(false);
    const DataAssetCategory = ref([]);
    const DataDepartment = ref([]);
    const dataAssetID = ref({});
    const dataSelected = ref([]);
    const disabledButton = reactive({
      disabledExport: true,
      disabledDelete: true,
    });

    let pram = reactive({
      mode: 0,
      fixed_asset_id: "",
    });

    const dataTotal = ref({
      totalCount: 0, // Tổng số bản ghi
      totalQuantity: 0, // Tổng số lượng
      totalCost: 0, // Tổng số nguyên giá
      totalDepreciation: 0, // Tổng số hao mòn lũy kế
      totalRemain: 0, // Tổng số còn lại
    });

    /**
     * Hiện thi giá trị cảnh báo
     * @param {string} iconMessage icon cho cảnh báo
     * @param {string} textMessage title cho cảnh báo
     * @param {boolean} isShow Có hiển thị cảnh báo hay không
     * Author: NNNinh (16/10/2022)
     */
    const confirmMessage = reactive({
      iconMessage: "",
      textMessage: "",
      isShow: false,
    });

    // Thực hiện gọi dữ liệu api bộ phận sử dụng và loại tài sản
    onMounted(() => {
      proxy.loadDataCombotCategory();
      proxy.loadDataComboDepartment();
    });

    // Reset lại giá trị show toast message
    onUpdated(() => {
      if (proxy.confirmMessage.isShow == true) {
        setTimeout(() => {
          proxy.confirmMessage.isShow = false;
        }, 2500);
      }
    });

    watch(
      () => dataSelected.value,
      (newVal) => {
        if (proxy.dataSelected.length == 0) {
          proxy.disabledButton.disabledExport = true;
          proxy.disabledButton.disabledDelete = true;
        } else {
          //kiểm tra dataSelected bằng 1 => Hiển thị message : Bạn có muốn xóa tài sản <<Mã - Tên tài sản>?
          if (proxy.dataSelected.length == 1) {
            proxy.disabledButton.disabledExport = false;
            proxy.disabledButton.disabledDelete = false;
          } else {
            proxy.disabledButton.disabledExport = false;
            proxy.disabledButton.disabledDelete = false;
          }
        }
      }
    );

    //Load dữ liệu tài sản
    async function loadDataAsset() {
      try {
        proxy.isLoading = true;
        let res = await assetAPI.filters(
          "Assets/Filters",
          proxy.txtSearch,
          " ",
          " ",
          proxy.tableView,
          proxy.currentPage
        );
        proxy.isLoading = false;
        proxy.dataTotal.totalCount = res.totalCount;
        proxy.dataTotal.totalQuantity = res.totalQuantity;
        proxy.dataTotal.totalCost = res.totalCost;
        proxy.dataTotal.totalDepreciation = res.totalDepreciation;
        proxy.dataTotal.totalRemain = res.totalRemain;
        let data = res?.data;
        let o = (proxy.currentPage - 1) * proxy.tableView;
        data.forEach((x, i) => {
          x.STT = i + 1 + o;
          x.depreciation_residual = x.depreciation_year * x.life_time;
        });
        proxy.allData = data;
      } catch (error) {
        proxy.isLoading = false;
        console.log(error);
      }
    }

    //Load dữ liệu data combobox loại tài sản
    async function loadDataCombotCategory() {
      try {
        let res = await assetAPI.get("Categories", {});
        proxy.DataAssetCategory.value = res;
      } catch (error) {
        console.log(error);
      }
    }

    //Load dữ liệu data combobox tên bộ phận
    async function loadDataComboDepartment() {
      try {
        let res = await assetAPI.get("Departments", {});
        proxy.DataDepartment.value = res;
      } catch (error) {
        console.log(error);
      }
    }

    // API Xóa 1 dòng dữ liệu
    async function deleteAsset() {
      try {
        let fixed_asset_id = proxy.dataSelected[0].fixed_asset_id;
        let res = await assetAPI.delete("Assets", fixed_asset_id);
        if (res != null || res != "") {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    }

    //API Xóa nhiều dữ liệu
    async function deleteMultiAsset() {
      try {
        let arr = [];
        proxy.dataSelected.forEach((data) => {
          arr.push(data.fixed_asset_id);
        });
        let res = await assetAPI.post("Assets/batch-delete", arr);
        if (res != null || res != "") {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    }

    /**
     * Hiện thị toast mesage 
     * @param {string} mode xác định form thêm mới ,nhân bản hay sử dữ liệu
     * @param {string} isShowMessage xác định xóa thành công hay thất bại
     * Author: NNNinh (13/11/2022)
     */
    const handleShowMess = (mode, isShowMessage) => {
      if (mode == Enum.Mode.Add || mode == Enum.Mode.Duplicate) {
        proxy.loadDataAsset();
        proxy.confirmMessage.iconMessage = "ic-success";
        proxy.confirmMessage.textMessage = "Thêm mới thành công!";
        proxy.confirmMessage.isShow = true;
      } else {
        proxy.loadDataAsset();
        proxy.confirmMessage.iconMessage = "ic-success";
        proxy.confirmMessage.textMessage = "Sửa dữ liệu thành công!";
        proxy.confirmMessage.isShow = true;
      }
    };

    // Sự kiện change page number
    const handleTotalPage = (tableView, val) => {
      proxy.tableView = tableView;
      proxy.currentPage = val;
      proxy.loadDataAsset();
    };

    // Sự kiện change giới hạn bản ghi
    const handleChangeTab = (val) => {
      proxy.tableView = val;
      proxy.loadDataAsset();
    };

    //Custom giá trị truyền vào messbox
    function customValueMessBox(val) {
      if (val == 1) {
        return `<<${proxy.dataSelected[0].fixed_asset_code} - ${proxy.dataSelected[0].fixed_asset_name}>>`;
      } else if (val < 10) {
        return `0${val}`;
      } else return val;
    }

    //Sự kiện đóng popup
    const handlClosePopup = (value) => {
      proxy.isShowPopup = value;
    };

    /**
     * Sự kiện show mesagebox
     *  @author NNNinh(20/10/2021)
     */
    const handleShowMessBox = () => {
      //kiểm tra dataSelected bằng 0 => Hiển thị message : Bạn chưa chọn dữ liệu để xóa
      if (proxy.dataSelected.length == 0) {
        proxy.isDialogMessDeleNoData = true;
      } else {
        //kiểm tra dataSelected bằng 1 => Hiển thị message : Bạn có muốn xóa tài sản <<Mã - Tên tài sản>?
        if (proxy.dataSelected.length == 1) {
          proxy.valueMessageBox = proxy.customValueMessBox(proxy.dataSelected.length);
          proxy.isDialogMessDelete = true;
        } else {
          //kiểm tra dataSelected lớn hơn 1 => Hiển thị message : Số bản ghi đc chọn...
          proxy.valueMessageBox = proxy.customValueMessBox(proxy.dataSelected.length);
          proxy.isDialogMessDeleMultiple = true;
        }
      }
    };

    // Sự kiện xóa dữ liệu 1 dòng
    const handleDelete = async () => {
      let result = await proxy.deleteAsset();
      if (result) {
        proxy.isDialogMessDelete = false;
        proxy.confirmMessage.iconMessage = "ic-success";
        proxy.confirmMessage.textMessage = "Xóa dữ liệu thành công!";
        proxy.confirmMessage.isShow = true;
        proxy.loadDataAsset();
        proxy.$refs.table.reset();
      } else {
        proxy.isDialogMessDelete = false;
        proxy.confirmMessage.iconMessage = "ic-success";
        proxy.confirmMessage.textMessage = "Xóa dữ liệu thất bại!";
        proxy.confirmMessage.isShow = true;
        proxy.loadDataAsset();
        proxy.$refs.table.reset();
      }
    };

    // Xử lý sự kiện change input tìm kiếm
    const handleChangeSeach = () => {
      setTimeout(() => {
        proxy.loadDataAsset();
      }, 2000);
    };

    // Sự kiện xóa dữ liệu 1 dòng
    const handleMultiDelete = async () => {
      let result = await proxy.deleteMultiAsset();
      console.log(result);
      if (result) {
        proxy.isDialogMessDeleMultiple = false;
        proxy.confirmMessage.iconMessage = "ic-success";
        proxy.confirmMessage.textMessage =
          proxy.customValueMessBox(proxy.dataSelected.length) +
          " Xóa dữ liệu thành công!";
        proxy.confirmMessage.isShow = true;
        proxy.loadDataAsset();
        proxy.$refs.table.reset();
      } else {
        proxy.isDialogMessDeleMultiple = false;
        proxy.confirmMessage.iconMessage = "ic-success";
        proxy.confirmMessage.textMessage =
          proxy.customValueMessBox(proxy.dataSelected.length) + " Xóa dữ liệu thất bại!";
        proxy.confirmMessage.isShow = true;
        proxy.loadDataAsset();
        proxy.$refs.table.reset();
      }
    };

    /**
     * Xử lý sự kiện click thêm mới
     *  @author NNNinh(20/10/2021)
     */
    const handleClickAdd = () => {
      proxy.pram.mode = Enum.Mode.Add;
      proxy.isShowPopup = true;
    };

    /**
     * Sự kiện click chức năng sửa hay nhân bản
     * @param {string} action xác định cho form là sửa hay nhân bản
     * @param {string} val giá trị mã tài sản
     * Author: NNNinh (16/10/2022)
     */
    const clickMenu = async (action, val) => {
      switch (action) {
        case 0: // kiểm tra action = 0 là sửa
          proxy.pram.mode = Enum.Mode.Update;
          proxy.dataAssetID = proxy.allData.filter((x) =>
            x["fixed_asset_id"]?.includes(val)
          );
          proxy.isShowPopup = true;
          break;
        case 1: // kiểm tra action = 1 là nhân bản
          proxy.pram.mode = Enum.Mode.Duplicate;
          proxy.dataAssetID = proxy.allData.filter((x) =>
            x["fixed_asset_id"]?.includes(val)
          );
          proxy.isShowPopup = true;
          break;
      }
    };

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
      isLoading, // loading trang
      isDialogMessDeleMultiple, // show message xóa nhiều dữ liệu
      isDialogMessDelete, // Hiển thị dialog xóa hay không
      isDialogMessCancelDelete, // Hiển thị thông báo không thể xóa
      isDialogMessCancelDeleMultiple,// Hiển thị thông báo không thể xóa nhiều khi có chứng từ phát sinh
      isShowPopup, // Có hiện show popup hay không
      isDialogMessDeleNoData, // show message chưa chọn dữ liệu để xóa
      disabledButton, // disabled buttom hay không
      txtSearch, // Từ khóa để tìm kiếm (theo mã và tên tài sản )
      tableView, // Số bản ghi muốn hiện lên trong 1 trang
      currentPage, // Trang đang chọn, đang đứng hiện tại 
      columns, // Mảng xác định các cột, trường dữ liệu của table
      allData, // Mảng lưu toàn bộ dữ liệu tài sản
      pram, // Đối tượng xác định là thêm mới, nhân bản, sử tài sản
      dataAssetID, // Biến lấy dữ liệu mã tài sản
      dataSelected, // Mảng lấy dữ liệu những dòng checked
      dataTotal, // Đối tượng lấy tổng số bản ghi, số lượng, nguyên giá, hao mòn lũy kế,tổng số còn lại
      customValueMessBox, // custom lại giá trị khi cho vào message
      DataAssetCategory, // dữ liệu data mã loại tài sản
      DataDepartment, // dữ liệu data bộ phận
      ResourceTable, // Resource table
      Resource, // Resource
      confirmMessage, // Hiển thị cảnh báo 
      valueMessageBox, // title của messagebox
      clickMenu, // Xử lý sự kiện click menu
      loadDataAsset, // Lấy dữ liệu toàn bộ tài sản
      loadDataCombotCategory, // Lấy dữ liệu toàn bộ loại tài sản
      loadDataComboDepartment, // Lấy dữ liệu toàn bộ phận xử dụng
      handleClickAdd, // Xử lý sự kiện click buttom thêm mới tài sản
      handleDelete, // Sự kiện xóa dữ liệu 1 dòng
      handleTotalPage, // Sự kiện change trang trong pageding
      handleShowMessBox, // Sự kiện show mesagebox
      handlClosePopup, // Sự kiện close popup
      handleShowMess, // Hiện thị toast mesage 
      deleteAsset, // Xử lý sự kiện xóa dữ liệu tài sản
      handleMultiDelete, // Xử lý sự kiện xóa nhiều dữ liệu dữ liệu tài sản
      deleteMultiAsset, // API xóa nhiều tài sản
      handleChangeSeach, // Xử lý sự kiện change tìm kiếm
      handleChangeTab, // Xử lý sự kiện change dữ liệu tabview
    };
  },
};
</script>
<style lang="scss" scoped>

</style>
