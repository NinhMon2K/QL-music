<template>
  <div class="container-albums__detail">
    <div class="container-content__detail">
      <table>
        <thead>
          <th>Danh sách bài hát</th>
          <th>Danh sách bài hát album</th>
        </thead>
        <tbody>
          <tr>
            <td class="c-3">
              <div>Tìm kiếm</div>
              <div class="ct1__album-detail">
                <ms-input
                  :hasLabel="false"
                  leftIcon="ic-search "
                  id="txt-search"
                  :radius="true"
                  placeholder="Tìm kiếm tài khoản"
                ></ms-input>
              </div>
              <div class="ct2__album-detail">
                <ms-input
                  :hasLabel="false"
                  leftIcon="ic-search "
                  id="txt-search"
                  :radius="true"
                  placeholder="Tìm kiếm tài khoản"
                ></ms-input>
                <ms-button
                  ref="ab"
                  :text="ResourceButton.Buttons.ButtomSearch"
                  id="btn-add"
                  leftIcon="ic-add"
                  :radius="true"
                  @click="handleClickAdd"
                >
                </ms-button>
              </div>
              <div class="ct3__album-detail">
                <ms-grid :columns="columnsAlbums" :allData="allData" ref="abc">
                </ms-grid>
              </div>
            </td>
            <td class="c-1">
            
              <div class="box-remove">
                 <ms-button
                ref="ab"
                :text="ResourceButton.Buttons.ButtonDelete"
                id="btn-add"
                leftIcon="ic-add"
                :radius="true"
                @click="handleClickAdd"
              ></ms-button></div>
              <div>
                <ms-grid
                :columns="columnsAlbums"
                :allData="allData"
                ref="abc"
              ></ms-grid>
              </div>
             
              
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { defineComponent, getCurrentInstance, onMounted, ref } from "vue";
import MsButton from "@/components/button/MsButton.vue";
import MsInput from "@/components/input/MsInput.vue";
import MsGrid from "@/components/gridViewer/MsGrid.vue";
import ResourceButton from "./../../resource/dictionary/ResourceButton.js";
export default defineComponent({
  name: "MsAlbum",
  components: {
    MsButton,
    MsInput,
    MsGrid,
  },
  setup() {
    const columnsAlbums = ref([]);
    const allDataAlbums = ref([]);
    const columnsAlbumsDetail = ref([]);
    const allDataAlbumsDetail = ref([]);
    return {
      columnsAlbums,
      allDataAlbums,
      columnsAlbumsDetail,
      allDataAlbumsDetail,
      ResourceButton,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "@/assets/scss/view/album/MsAlbumDetail.scss";
</style>
