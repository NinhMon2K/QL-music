<template>
  <teleport to="body">
    <div class="model" v-on:keydown="keyboardEvent">
      <div class="form-asset">
        <div class="header-popup">
          <div class="form-asset__title">
            {{ title }}
          </div>
          <v-tooltip content="Hủy" placement="bottom" right="bottom">
            <div
              class="form-asset__close app-icon ic-close"
              @click="handlePopupClose"
            ></div>
          </v-tooltip>
        </div>
        <div class="content-popup">
          <div class="form-asset__body">
            <div class="form-group">
              <div class="form-group__left">
                <v-input
                  label="Mã tài sản"
                  tabindex="101"
                  hasLabel
                  hasInput
                  :maxLength="50"
                  ref="inputAssetCode"
                  v-model="dataForm.fixed_asset_code"
                  :radius="false"
                  placeholder="Mã tài sản"
                  @blur="changeValueInput"
                  @focus="changeValueInput"
                  :disabledMessage="errorMessage.AssetCode && isSubmited"
                  :message="Resource.ErrorInput.AssetCode.VI"
                ></v-input>
              </div>
              <div class="form-group__right">
                <v-input
                  label="Tên tài sản"
                  tabindex="102"
                  hasLabel
                  :maxLength="255"
                  hasInput
                  v-model="dataForm.fixed_asset_name"
                  :valueField="ResourceTable.FieldAsset.fixedAssetName"
                  :radius="true"
                  placeholder="Nhập tên tài sản"
                  :disabledMessage="errorMessage.AssetName && isSubmited"
                  :message="Resource.ErrorInput.AssetName.VI"
                  @blur="onBlurInput"
                  @focus="changeValueInput"
                ></v-input>
              </div>
            </div>
            <div class="form-group">
              <div class="form-group__left">
                <v-drop-down
                  label="Mã bộ phận sử dụng"
                  tabindex="103"
                  ref="cb"
                  hasLabel
                  hasInput
                  :heightCb="-25"
                  :columns="columnsDepartment"
                  v-model="dataForm.department_id"
                  :valueField="ResourceTable.FieldDepartment.departmentId"
                  displayField="department_code"
                  rightIcon="ic-angle-downs"
                  @blur="onBlurDropdown"
                  :dataAll="DataDepartment.value"
                  :disabledMessage="errorMessage.DepartmentCode && isSubmited"
                  :message="Resource.ErrorInput.DepartmentCode.VI"
                  placeholder="Chọn mã bộ phận sử dụng"
                  @item-click="clickDataDepartment"
                ></v-drop-down>
              </div>
              <div class="form-group__right">
                <v-input
                  label="Tên bộ phận sử dụng"
                  hasLabel
                  v-model="dataForm.department_name"
                  :hasReadonly="true"
                  :disabled="true"
                  :radius="true"
                  @changeValue="changeValueInput"
                ></v-input>
              </div>
            </div>
            <div class="form-group">
              <div class="form-group__left">
                <v-drop-down
                  label="Mã loại tài sản"
                  ref="hu"
                  tabindex="104"
                  hasLabel
                  hasInput
                  :heightCb="-25"
                  v-model="dataForm.fixed_asset_category_id"
                  :valueField="ResourceTable.FieldAssetCategory.fixedAssetCategoryId"
                  displayField="fixed_asset_category_code"
                  rightIcon="ic-angle-downs"
                  :columns="columnsAssetCategory"
                  placeholder="Chọn mã loại tài sản"
                  :dataAll="DataAssetCategory.value"
                  @item-click="clickDataAssetCategory"
                  :disabledMessage="errorMessage.AssetCategoryCode && isSubmited"
                  :message="Resource.ErrorInput.AssetCategoryCode.VI"
                ></v-drop-down>
              </div>
              <div class="form-group__right">
                <v-input
                  label="Tên loại tài sản"
                  :hasReadonly="true"
                  hasLabel
                  v-model="dataForm.fixed_asset_category_name"
                  :disabled="true"
                  :radius="true"
                ></v-input>
              </div>
            </div>
            <div class="form-group">
              <div class="form-group__left">
                <v-input-number
                  label="Số lượng"
                  tabindex="105"
                  hasLabel
                  hasInput
                  v-model="dataForm.quantity"
                  :valueField="ResourceTable.FieldAsset.quantity"
                  topIcon="ic-angle_up"
                  bottomIcon="ic-angle_down"
                  :radius="true"
                  @changeValue="changeValueInput"
                  :disabledMessage="errorMessage.Quantity && isSubmited"
                  :message="Resource.ErrorInput.Quantity.VI"
                >
                </v-input-number>
              </div>
              <div class="form-group__right">
                <v-input-number
                  label="Nguyên giá"
                  tabindex="106"
                  hasLabel
                  hasInput
                  v-model="dataForm.cost"
                  :radius="true"
                  :disabledMessage="errorMessage.Cost && isSubmited"
                  :message="Resource.ErrorInput.Cost.VI"
                >
                </v-input-number>
                <v-input-number
                  label="Số năm sử dụng"
                  tabindex="107"
                  hasLabel
                  hasInput
                  v-model="dataForm.life_time"
                  :valueField="ResourceTable.FieldAssetCategory.lifeTime"
                  :radius="true"
                  :disabledMessage="errorMessage.LifeTime && isSubmited"
                  :message="Resource.ErrorInput.LifeTime.VI"
                ></v-input-number>
              </div>
            </div>
            <div class="form-group">
              <div class="form-group__left">
                <v-input-number
                  label="Tỉ lệ hao mòn (%)"
                  tabindex="108"
                  hasLabel
                  hasInput
                  v-model="dataForm.depreciation_rate"
                  :valueField="ResourceTable.FieldAssetCategory.depreciationRate"
                  topIcon="ic-angle_up"
                  bottomIcon="ic-angle_down"
                  :radius="true"
                  :disabledMessage="errorMessage.DepreciationRate && isSubmited"
                  :message="titleErrorMess.DepreciationRate"
                >
                </v-input-number>
              </div>
              <div class="form-group__right">
                <v-input-number
                  label="Giá trị hao mòn năm"
                  hasLabel
                  hasInput
                  typeValue="money"
                  v-model="dataForm.depreciation_year"
                  :valueField="ResourceTable.FieldAsset.depreciationYear"
                  :radius="true"
                  :disabledMessage="errorMessage.DepreciationYear && isSubmited"
                  :message="Resource.ErrorInput.DepreciationYear.VI"
                ></v-input-number>
                <v-input-number
                  label="Năm theo dõi"
                  hasLabel
                  v-model="dataForm.tracked_year"
                  valueField="tracked_year"
                  :radius="true"
                  :disabled="true"
                ></v-input-number>
              </div>
            </div>
            <div class="form-group">
              <div class="form-group__left">
                <v-input-date
                  label="Ngày mua"
                  hasLabel
                  hasInput
                  tabindex="109"
                  :id="ResourceTable.FieldAsset.purchaseDate"
                  v-model="dataForm.purchase_date"
                  :valueField="ResourceTable.FieldAsset.purchaseDate"
                  rightIcon="ic-date"
                  :radius="true"
                ></v-input-date>
              </div>
              <div class="form-group__right">
                <div class="form-group__right__1">
                  <v-input-date
                    label="Ngày bắt đầu sử dụng"
                    hasLabel
                    hasInput
                    tabindex="110"
                    :id="ResourceTable.FieldAsset.productionDate"
                    v-model="dataForm.production_date"
                    :valueField="ResourceTable.FieldAsset.productionDate"
                    rightIcon="ic-date"
                    topIcon="ic-angle_up"
                    bottomIcon="ic-angle_down"
                    :radius="true"
                    :disabledMessage="errorMessage.ProductionDate && isSubmited"
                    message="Ngày sử dụng lớn hơn hoặc bằng ngày mua"
                  ></v-input-date>
                </div>
                <div class="right-center"></div>
                <div class="form-group__right__2"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-popup">
          <div class="form-asset__footer">
            <v-tooltip content="Hủy" placement="top" right="top">
              <v-button
                text="Hủy"
                tabindex="112"
                type="secodary"
                @click="handlePopupClose"
                radius
              >
              </v-button>
            </v-tooltip>
            <v-tooltip content="Lưu và cất" placement="top" right="top">
              <v-button text="Lưu" @click="saveData" tabindex="111" radius></v-button>
            </v-tooltip>
          </div>
        </div>
      </div>
    </div>
  </teleport>



  <!-- Dialog messagebox hủy bỏ khai báo -->
  <teleport to="body">
    <v-message-box
      leftIcon="ic-warning"
      :textMessageBox="Resource.TitleDialogMessage.AddAsset.VI"
      :disabledValueLeft="false"
      :disabledValueRight="false"
      v-if="isDialogMessCancelAdd"
    >
      <v-button
        :text="Resource.TitleBtnDialog.Cancel.VI"
        radius
        @click="handleClosePop"
      ></v-button>
      <v-button
        :text="Resource.TitleBtnDialog.NoCancel.VI"
        type="secodary"
        @click="isDialogMessCancelAdd = false"
        radius
      ></v-button>
    </v-message-box>
  </teleport>

  <!-- Dialog messagebox cập nhật -->
  <teleport to="body">
    <v-message-box
      leftIcon="ic-warning"
      :textMessageBox="Resource.TitleDialogMessage.SaveUpdate.VI"
      :disabledValueLeft="false"
      :disabledValueRight="false"
      v-if="isDialogMessUpdate"
    >
      <v-button
        :text="Resource.TitleBtnDialog.Save.VI"
        radius
        @click="handleUpdate"
      ></v-button>
      <v-button
        :text="Resource.TitleBtnDialog.NoSave.VI"
        type="abort"
        @click="isDialogMessUpdate = false"
        radius
      ></v-button>
      <v-button
        :text="Resource.TitleBtnDialog.Cancel.VI"
        type="secodary"
        @click="handleClosePop"
        radius
      ></v-button>
    </v-message-box>
  </teleport>

  <!-- Toast message thông báo error multiple -->
  <teleport to="body">
    <v-message-box
      :disabledTop="true"
      title="Thông báo"
      icClose="ic-close"
      disabled
      disabledLeftMultiple
      :valueMultiple="titleErrValidate"
      :disabledMultiple="true"
      :disabledValueLeft="false"
      :disabledValueRight="false"
      v-if="isShowDialogDetail"
    >
      <v-button
        :text="Resource.TitleBtnDialog.Close.VI"
        radius
        @click="handleCloseErrorMultiple"
      ></v-button>
    </v-message-box>
  </teleport>
</template>
<script>
import {
  getCurrentInstance,
  onMounted,
  ref,
  watch,
  computed,
  onUnmounted,
  resolveComponent as _resolveComponent,
  mergeProps as _mergeProps,
  onBeforeMount,
  onUpdated,
  nextTick,
  reactive,
} from "vue";
import {
  ssrRenderComponent as _ssrRenderComponent,
  ssrRenderAttrs as _ssrRenderAttrs,
} from "vue/server-renderer";
import VButton from "@/components/button/VButton.vue";
import VInput from "@/components/input/VInput.vue";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import VInputDate from "@/components/date/VInputDate.vue";
import VInputNumber from "@/components/number/VInputNumber.vue";
import VDropDown from "@/components/dropdown/VDropDown.vue";
import VTooltip from "@/components/tooltip/VTooltip.vue";
import VMessageBox from "@/components/toast/VMessageBox.vue";
import Resource from "@/assets/js/resource/resource.js";
import ResourceTable from "@/assets/js/resource/resourceTable";
import Enum from "@/assets/js/enums/enum.js";
import assetAPI from "@/apis/api/assetAPI.js";
import _ from "lodash";

export default {
  name: "MsPopupAsset",
  components: {
    VButton,
    VInput,
    VDropDown,
    VInputNumber,
    VInputDate,
    VTooltip,
    VMessageBox,
  },
  props: {
    configStyle: {
      default: {},
    },
    statePopup: {
      default: false,
    },
    formModel: {
      default: {},
    },
    allData: {
      default: {},
    },
    dataPram: {
      default: {},
    },
  },
  emits: ["handle-close", "show-message"],
  methods: {
    close() {
      this.$parent.close();
    },
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    //Show toastMessage
    window.popup = proxy;
    // colums bộ phận sử dụng
    const columnsDepartment = ref([
      {
        field: ResourceTable.FieldDepartment.departmentCode,
        titleField: "Mã",
      },
      {
        field: ResourceTable.FieldDepartment.departmentName,
        titleField: "Tên bộ phận sử dụng",
      },
    ]);
    // colums loại tài sản
    const columnsAssetCategory = ref([
      {
        field: ResourceTable.FieldAssetCategory.fixedAssetCategoryCode,
        titleField: "Mã",
      },
      {
        field: ResourceTable.FieldAssetCategory.fixedAssetCategoryName,
        titleField: "Tên loại tài sản",
      },
    ]);
    // biến show popup
    const isShowPopup = ref(false);
    const isDialogMessCancelAdd = ref(false);
    const titleErrorMess = reactive({
      DepreciationRate: "",
    });
    const errorMessage = ref({});
    //Show dialog cập nhật
    const isDialogMessUpdate = ref(false);
    const titleErrValidate = ref([]);
    const isShowDialogDetail = ref(false);
    const isSubmited = ref(false);
    const isEdited = ref(false);
    const oldDataForm = ref({});
    const ctrlPressed = ref(false);
    // Lưu dữ liệu 1 tài sản
    const dataForm = ref({
      fixed_asset_id: "",
      fixed_asset_code: "",
      fixed_asset_name: "",
      organization_id: "",
      organization_code: "",
      organization_name: "",
      department_id: "",
      department_code: "",
      department_name: "",
      fixed_asset_category_id: "",
      fixed_asset_category_code: "",
      fixed_asset_category_name: "",
      quantity: 1,
      cost: 0,
      depreciation_rate: 0,
      purchase_date: "",
      production_year: "",
      production_date: "",
      tracked_year: 0,
      life_time: 0,
      active: "",
      depreciation_year: "",
      created_by: "",
      created_date: "",
      modified_by: "",
      modified_date: "",
    });
    // Kiểm tra dữ liệu 1 tài sản đã chỉnh sữa hay không
    const EqualData = computed(() => {
      return _.isEqual(proxy.dataForm, proxy.oldDataForm);
    });
    // Validate form
    const dataFormValidate = computed(() => {
      return {
        fixed_asset_code: { required },
        fixed_asset_name: { required },
        department_code: { required },
        fixed_asset_category_code: { required },
        quantity: { required },
        cost: { required },
        depreciation_rate: { required },
        purchase_date: { required },
        production_date: { required },
        life_time: { required },
        depreciation_year: { required },
      };
    });
    const v$ = useValidate(dataFormValidate, dataForm);

    const DataAssetCategory = ref([]);
    const DataDepartment = ref([]);

    const title = ref("");

    //Gọi sự kiện load bộ phận và loại tài sản
    onMounted(() => {
      proxy.loadDataCategory();
      proxy.loadDataDepartment();
    });

    onMounted(() => {
      watch(
        () => dataForm.value,
        (newVal, old) => {
          // proxy.dataForm = newVal;
        },
        () => proxy.dataForm.depreciation_rate,
        (newVal, old) => {
          proxy.updateValDepYear();
        },
        () => proxy.dataForm.cost,
        (newVal, old) => {
          proxy.updateValDepYear();
        }
      );
    });

    /**
     * Tự động cập nhật giá trị hao mòn năm
     *  @author NNNinh(21/10/2021)
     */
    onUpdated(() => {
      proxy.updateValDepYear();
    });

    onMounted(() => {
      proxy.focusInput();
    });

    onMounted(() => {
      try {
        /**
         * Kiểm tra giá trị mode là add hay cập nhật,nhân bản
         *  @author NNNinh(17/10/2021)
         */
        switch (proxy.formModel.mode) {
          //Kiểm tra giá trị mode là cập nhật
          case Enum.Mode.Update:
            proxy.title = Resource.TitleFormPopup.FormUpdateAsset.VI;
            // Lấy dữ liệu tài sản theo id tài sản
            proxy.dataForm = proxy.allData;
            proxy.setValueDateYear();
            proxy.oldDataForm = _.cloneDeep(proxy.dataForm);
            break;
          //Kiểm tra giá trị mode là thêm
          case Enum.Mode.Add:
            proxy.title = Resource.TitleFormPopup.FormAddAsset.VI;
            proxy.defaultValueDate();
            proxy.getAssetNextCode();
            proxy.setValueDateYear();
            break;

          //Kiểm tra giá trị mode là nhân bản
          case Enum.Mode.Duplicate:
            proxy.title = Resource.TitleFormPopup.FormDuplicateAsset.VI;
            proxy.dataForm = proxy.allData;
            proxy.getAssetNextCode();
            proxy.setValueDateYear();
            break;
          default:
            break;
        }
      } catch (error) {
        console.log(error);
      }
    });

    /**
     * Lấy dữ liệu toàn bộ loại tài sản
     *  @author NNNinh(20/10/2021)
     */
    async function loadDataCategory() {
      try {
        let res = await assetAPI.get("Categories", {});
        proxy.DataAssetCategory.value = res;
      } catch (error) {
        console.log(error);
      }
    }

    /**
     * Lấy dữ liệu toàn bộ loại bộ phận
     *  @author NNNinh(18/10/2021)
     */
    async function loadDataDepartment() {
      try {
        let res = await assetAPI.get("Departments", {});
        proxy.DataDepartment.value = res;
      } catch (error) {
        console.log(error);
      }
    }

    //Sự kiện close error message Multiple
    const handleCloseErrorMultiple = () => {
      if(proxy.formModel.mode == Enum.Mode.Update){
      proxy.isShowDialogDetail = false;
      proxy.isSubmited = true;
      proxy.isDialogMessUpdate = false;
      proxy.focusInput();
      }
      proxy.isShowDialogDetail = false;
      proxy.isSubmited = true;
      proxy.focusInput();
    };

    /**
     * Cập nhật giá trị hao mòn năm
     *  @author NNNinh(21/10/2021)
     */
    function updateValDepYear() {
      proxy.dataForm.depreciation_year =
        (proxy.dataForm.depreciation_rate * proxy.dataForm.cost) / 100;
      if (proxy.dataForm.depreciation_rate > 100) proxy.dataForm.depreciation_rate = 100;
    }

    // focus vào input dầu tiên
    const focusInput = () => {
      proxy.$refs.inputAssetCode.$el.getElementsByTagName("input")[0].focus();
    };

    /**
     * Xét giá trị ban đầu cho ngày mua và ngày sử dụng
     *  @author NNNinh(21/10/2021)
     */
    const defaultValueDate = () => {
      nextTick(() => {
        // xét giá trị ban đầu cho ngày mua
        if (proxy.dataForm.purchase_date == "") {
          proxy.dataForm.purchase_date =
            new Date().toLocaleDateString() + new Date().toString();
        }
        // xét giá trị ban đầu cho ngày sử dụng
        if (proxy.dataForm.production_date == "") {
          proxy.dataForm.production_date =
            new Date().toLocaleDateString() + new Date().toString();
        }
      });
    };

    // Xét giá trị năm theo dõi mặc định là năm hiện tại
    function setValueDateYear() {
      proxy.dataForm.tracked_year = new Date().getFullYear();
    }

    /**
     * Lấy mã tài sản tự động tăng
     *  @author NNNinh(21/10/2021)
     */
    async function getAssetNextCode() {
      try {
        let result = await assetAPI.get("Assets/nextCode", {});
        proxy.dataForm.fixed_asset_code = result?.code;
        proxy.oldDataForm = _.cloneDeep(proxy.dataForm);
      } catch (error) {
        console.log(error);
      }
    }

    /**
     * Xử lí sự kiện keyboard shortcut
     * @author NNNINH (14/11/2022)
     */
    const keyboardEvent = (e) => {
      if (e.which == Enum.KeyCode.ESC) {
        if (this.notifyShow == true) {
          console.log("notifyShow");
        } else if (this.validateShow == true) {
          console.log("notifyShow");
        } else if (this.validateProShow == true) {
          console.log("notifyShow");
        }
      } else if (e.which == Enum.KeyCode.Ctrl) {
        proxy.ctrlPressed = true;
      } else if (e.which == Enum.KeyCode.F8 && proxy.ctrlPressed == true) {
        proxy.btnSaveOnClick();
        proxy.ctrlPressed = false;
      } else if (e.which == Enum.KeyCode.F9 && proxy.ctrlPressed == true) {
        proxy.btnCloseOnClick();
        proxy.ctrlPressed = false;
      }
    };

    const take_decimal_number = (num, n) => {
      //num : số cần xử lý
      //n: số chữ số sau dấu phẩy cần lấy
      let base = 10 ** n;
      let result = Math.round(num * base) / base;
      return result;
    };

    /**
     * Xử lý sự kiện click mã bộ phận câp nhật lại tên bộ phận cho input
     *  @author NNNinh(15/10/2021)
     */
    const clickDataDepartment = (item) => {
      proxy.dataForm.department_name = item.department_name;
      proxy.dataForm.department_code = item.department_code;
    };

    //Sự kiện blur của input
    const onBlurInput = (isValue, valueField, e) => {
      switch (valueField) {
        case "fixed_asset_name": {
          if (isValue != "") {
            proxy.errorMessage.AssetName = false;
            proxy.dataForm.fixed_asset_name = isValue;
          } else {
            proxy.errorMessage.AssetName = true;
          }
          break;
        }
        case "fixed_asset_code": {
          if (isValue != "") {
            proxy.errorMessage.AssetCode = false;
            proxy.dataForm.fixed_asset_code = isValue;
          } else {
            proxy.errorMessage.AssetCode = true;
          }

          break;
        }

        default: {
          break;
        }
      }
    };

    const onBlurDropdown = (val) => {
      console.log(val);
    };

    /**
     * Xử lý cập nhật lại dữ liệu dataForm
     *  @pram {isValue,valueField} - valueField: Trường dữ liệu, isValue: giá trị
     *  @author NNNinh(15/10/2021)
     */
    const changeValueInput = (isValue, valueField) => {
      switch (valueField) {
        case "department_name": {
          proxy.dataForm.department_name = isValue;
          break;
        }
        case "quantity": {
          proxy.dataForm.quantity = isValue;
          break;
        }
        case "life_time": {
          proxy.dataForm.life_time = isValue;
          break;
        }
        case "depreciation_rate": {
          proxy.dataForm.depreciation_rate = isValue;
          break;
        }
        case "depreciation_year": {
          proxy.dataForm.depreciation_year = isValue;
          break;
        }
        case "tracked_year": {
          proxy.dataForm.tracked_year = isValue;
          break;
        }
        case "purchase_date": {
          proxy.dataForm.purchase_date = isValue;
          break;
        }
        case "production_date": {
          proxy.dataForm.production_date = isValue;
          break;
        }
        default: {
          break;
        }
      }
    };

    /**
     * Xử lý sự kiện click mã loại tài sản câp nhật lại tên tài sản cho input
     *  @author NNNinh(16/10/2021)
     */
    const clickDataAssetCategory = (item) => {
      proxy.dataForm.fixed_asset_category_name = item.fixed_asset_category_name;
      proxy.dataForm.life_time = item.life_time;
      proxy.dataForm.depreciation_rate = item.depreciation_rate
        ? item.depreciation_rate * 100
        : null;
      proxy.dataForm.fixed_asset_category_code = item.fixed_asset_category_code;
    };

    // Validate dữ liệu
    const validateData = () => {
      proxy.v$.$validate();
      if (proxy.v$.$error) {
        proxy.titleErrValidate = [];
        proxy.errorMessage = {};
        if (proxy.dataForm.fixed_asset_code == "") {
          proxy.titleErrValidate.push(Resource.ErrorValidate.AssetCode.VI);
          proxy.errorMessage.AssetCode = true;
        }
        if (proxy.dataForm.fixed_asset_name == "") {
          proxy.titleErrValidate.push(Resource.ErrorValidate.AssetName.VI);
          proxy.errorMessage.AssetName = true;
        }

        if (proxy.dataForm.department_code == "") {
          proxy.titleErrValidate.push(Resource.ErrorValidate.DepartmentCode.VI);
          proxy.errorMessage.DepartmentCode = true;
        }

        if (proxy.dataForm.fixed_asset_category_code == "") {
          proxy.titleErrValidate.push(Resource.ErrorValidate.AssetCategoryCode.VI);
          proxy.errorMessage.AssetCategoryCode = true;
        }
        if (proxy.dataForm.quantity == 0) {
          proxy.titleErrValidate.push(Resource.ErrorValidate.Quantity.VI);
          proxy.errorMessage.Quantity = true;
        }
        if (proxy.dataForm.cost == 0) {
          proxy.titleErrValidate.push(Resource.ErrorValidate.Cost.VI);
          proxy.errorMessage.Cost = true;
        }
        if (proxy.dataForm.life_time == 0) {
          proxy.titleErrValidate.push(Resource.ErrorValidate.LifeTime.VI);
          proxy.errorMessage.LifeTime = true;
          proxy.titleErrorMess.DepreciationRate = Resource.ErrorInput.DepreciationYear.VI;
        }
        if (proxy.dataForm.depreciation_year == null) {
          proxy.titleErrValidate.push(Resource.ErrorInput.DepreciationRate.VI);
          proxy.errorMessage.DepreciationYear = true;
        }

        if (proxy.dataForm.depreciation_rate == 0) {
          proxy.titleErrValidate.push(Resource.ErrorValidate.DepreciationRate.VI);
          proxy.errorMessage.DepreciationRate = true;
        }

        if (proxy.dataForm.purchase_date == "") {
          proxy.titleErrValidate.push(Resource.ErrorValidate.PurchaseDate.VI);
        }
        if (proxy.dataForm.production_date == null) {
          proxy.titleErrValidate.push(Resource.ErrorValidate.ProductionDate.VI);
        }
        proxy.isShowDialogDetail = true;
        return false;
      } else if (proxy.dataForm.depreciation_year > proxy.dataForm.cost) {
        proxy.titleErrValidate = [];
        proxy.errorMessage = {};
        proxy.titleErrValidate.push(Resource.ErrorValidate.CompareDepreciationYear.VI);
        proxy.isShowDialogDetail = true;
        return false;
      } else if (
        proxy.dataForm.depreciation_rate !=
        parseFloat(100 / proxy.dataForm.life_time).toFixed(2)
      ) {
        console.log(parseFloat(100 / proxy.dataForm.life_time).toFixed(2));
        proxy.titleErrValidate = [];
        proxy.errorMessage = {};
        proxy.titleErrValidate.push("Tỉ lệ hao mòn phải bằng 1/Số năm sử dụng");
        proxy.titleErrorMess.DepreciationRate =
          Resource.ErrorInput.DepreciationRateVali.VI;
        proxy.isShowDialogDetail = true;
        return false;
      } else {
        proxy.errorMessage = {};
        return true;
      }
    };

    /**
     * Hiện thị cảnh báo lỗi truyền từ BackEnd
     * @author NNNinh(21/10/2021)
     */
    const backEndErrorNotify = (moreInfo) => {
      proxy.titleErrValidate = [];
      if (moreInfo != null) {
        moreInfo.forEach((data) => {
          proxy.titleErrValidate.push(data);
        });
        proxy.errorBackend = true;
      } else {
        proxy.errorBackend = false;
      }
    };

    const errorBackend = ref(false);
    /**
     * Thêm mới tài sản
     *  @author NNNinh(21/10/2021)
     */
    async function handleInsertAsset(val) {
      try {
        let result = await assetAPI.post("Assets", val);
        if (result != null || result != "") {
          proxy.errorBackend == false;
          return true;
        } else return false;
      } catch (error) {
        switch (error.response.status) {
          case 400:
            proxy.backEndErrorNotify(error.response.data.moreInfo);
            break;
          case 405:
            this.backEndErrorNotify(Resource.ErrorCode[405]);
            break;
          case 500:
            this.backEndErrorNotify(Resource.ErrorCode[500]);
            break;
          default:
        }
      }
    }

    /**
     * API Sửa dữ liệu tài sản
     *  @author NNNinh(21/10/2021)
     */
    async function handleUpdateAsset(recordId, val) {
      try {
        let result = await assetAPI.put("Assets", recordId, val);
        if (result != null || result != "") {
          proxy.errorBackend == false;
          return true;
        } else return false;
      } catch (error) {
        switch (error.response.status) {
          case 400:
            proxy.backEndErrorNotify(error.response.data.moreInfo);
            break;
          case 405:
            this.backEndErrorNotify(Resource.ErrorCode[405]);
            break;
          case 500:
            this.backEndErrorNotify(Resource.ErrorCode[500]);
            break;
          default:
        }
      }
    }

    // Xử lý sự kiện chỉnh sử dữ liệu
    const handleUpdate = async () => {
      let res =  await proxy.handleUpdateAsset(proxy.dataForm.fixed_asset_id, proxy.dataForm);
      if (res && proxy.errorBackend == false) {
              emit("handle-close", false);
              emit("show-message", proxy.formModel.mode, true);
              console.log("ok");
            } else {
              proxy.isShowDialogDetail = true;
              console.log("false");
            }
    };

    //Sự kiện lưu dữ liệu data
    const saveData = async () => {
      try {
        if (proxy.validateData() == false) {
          proxy.isShowDialogDetail = true;
        } else {
          if (proxy.formModel.mode == Enum.Mode.Update) {
            proxy.isDialogMessUpdate = true;
          } else {
            let res = await proxy.handleInsertAsset(proxy.dataForm);
            if (res && proxy.errorBackend == false) {
              emit("handle-close", false);
              emit("show-message", proxy.formModel.mode, true);
              console.log("ok");
            } else {
              proxy.isShowDialogDetail = true;
              console.log("false");
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Sự kiện đóng close popup
    const handleClosePop = () => {
      emit("handle-close", false);
    };

    // Sự kiện đóng close popup kiểm tra có sửa dữ liệu hay không
    const handlePopupClose = () => {
      if (proxy.EqualData) {
        emit("handle-close", false);
      } else {
        proxy.isDialogMessCancelAdd = true;
      }
    };

    return {
      title,
      isShowPopup, // biến show popup
      titleErrValidate, // Mảng dữ liệu titile error validate
      isDialogMessCancelAdd,
      isDialogMessUpdate, //Show dialog cập nhật
      isSubmited, // Kiểm tra xem có submid hay không
      Resource, // Resource
      ResourceTable, // ResourceTable
      dataForm, // Lưu dữ liệu 1 tài sản
      DataAssetCategory, // Biến lấy dữ liệu loại tài sản
      DataDepartment, // Biến lấy dữ liệu bộ phạn sử dụng
      isShowDialogDetail, // show dialog validate popup
      loadDataCategory, // Lấy toàn bộ dữ liệu loại tài sản
      loadDataDepartment, // Lấy toàn bộ dữ liệu bộ phận sử dụng
      clickDataDepartment, // Xử lý sự kiện click mã bộ phận câp nhật lại tên bộ phận cho input
      focusInput, // Xử lý sự kiện focus của input
      clickDataAssetCategory, // Xử lý sự kiện click mã loại tài sản câp nhật lại tên tài sản cho input
      setValueDateYear, // Xét giá trị năm theo dõi mặc định là năm hiện tại
      defaultValueDate, // Xét giá trị ban đầu cho ngày mua và ngày sử dụng
      changeValueInput, // Bắt sự kiện change input
      updateValDepYear, // Cập nhật giá trị hao mòn năm
      getAssetNextCode, // Gọi API lấy mã tài sản tiếp theo
      saveData, // Xử lý xự kiện lưu dữ liệu
      handlePopupClose, // sự kiện đóng popup có kiểm tra chỉnh sửa dữ liệu hay không
      handleClosePop, // sự kiện đóng popup không kiểm tra chỉnh sửa dữ liệu hay không
      errorMessage, // Đối tượng có error dữ liệu hay không
      validateData, // Validate dữ liệu
      onBlurInput, //Sự kiện blur của input
      dataFormValidate, // Validate form
      handleCloseErrorMultiple, // Sự kiện đóng dialog error
      take_decimal_number,
      columnsAssetCategory, // colums loại tài sản
      columnsDepartment, // colums bộ phận sử dụng
      isEdited,
      oldDataForm, // Đối tượng để kiểm tra xem có sửa dữ liệu hay không
      EqualData, // Kiểm tra dữ liệu 1 tài sản đã chỉnh sữa hay không
      titleErrorMess,
      handleInsertAsset,
      handleUpdateAsset,
      handleUpdate, // Xử lý sự kiện update dữ liệu
      onBlurDropdown, // sự kiện blur ra ngoài của dropdown
      backEndErrorNotify, //  Hiện thị cảnh báo lỗi truyền từ BackEnd
      errorBackend, // Kiểm tra xem backend có lỗi hay không
      keyboardEvent,
      ctrlPressed, // Nút Ctrl có đang được bấm hay không
      v$,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./../../assets/scss/components/v_popup_asset.scss";
@import "./../../assets/scss/datepicker.scss";
</style>
