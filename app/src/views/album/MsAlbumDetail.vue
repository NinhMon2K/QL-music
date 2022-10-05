<template>
    <div class="container-albums">
      <div class="container-content">
        <div class="container-content__left">
          
        </div>
        <div class="container-content__right">
          <ms-grid :columns="columns" :allData="allData" ref="abc"> </ms-grid>
        </div>
      </div>
    </div>
  </template>
  <script>
    import MsGrid from "@/components/gridViewer/MsGrid.vue";
  import {defineComponent, getCurrentInstance, onMounted, ref } from "vue";
  import ResourceTable from "./../../resource/dictionary/ResourceTable.js";
  import ResourceButton from "./../../resource/dictionary/ResourceButton.js";
  export default defineComponent({
    name: "MsAlbum",
    setup() {
      const allDataItem = [
        {
          name: "asdasd",
        },
        {
          name: "asdasd",
        },
        {
          name: "asdasd",
        },
        {
          name: "asdasd",
        },
       
      ];
      const columns = ref([
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
      const allData = ref([
        {
          name:'Hồ ngọc hà',
          nametheloai:'Bolero'
        },
        {
          name:'Hồ ngọc hà',
          nametheloai:'Bolero'
        },
        {
          name:'Hồ ngọc hà',
          nametheloai:'Bolero'
        },
      ]);
  
  
      return {
        allDataItem,allData
      };
    },
  });
  </script>
  <style lang="scss" scoped>
  @import "@/assets/scss/view/album/MsAllBum.scss";
  </style>
  