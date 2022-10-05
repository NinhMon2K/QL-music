<template>
  <div class="container-albums">
    <div class="container-toolbar">
      <ms-input
        :hasLabel="false"
        leftIcon="ic-search "
        id="txt-search"
        :radius="true"
        placeholder="Tìm kiếm album"
      ></ms-input>

      <ms-button
        ref="ab"
        :text="ResourceButton.Buttons.ButtonAddAlbum"
        id="btn-add"
        leftIcon="ic-add"
        :radius="true"
      >
      </ms-button>
    </div>

    <div class="container-content">
      <div class="product-album">
        <ul class="list-album">
          <li
            class="item-album"
            v-for="(itemAlbum, index) in allData"
            :key="index"
          >
            <div class="img-item">
              <img src="@/assets/images/icons8-album-64.png" alt="" />
            </div>
            <div class="amount-song">
              <p>Số bài hát:</p>
              <p>{{ itemAlbum.amountSong }}</p>
            </div>
            <div class="title-item">
              <p>{{ itemAlbum.name }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, getCurrentInstance, onMounted, ref } from "vue";
import MsButton from "@/components/button/MsButton.vue";
import MsInput from "@/components/input/MsInput.vue";
import ResourceButton from "./../../resource/dictionary/ResourceButton.js";
export default defineComponent({
  name: "MsAlbum",
  components: {
    MsButton,
    MsInput,
  },
  setup() {
    const allData = ref([
      {
        image: "",
        amountSong: 20,
        name: "Album 1",
      },
      {
        image: "",
        amountSong: 20,
        name: "Album 1",
      },
      {
        image: "",
        amountSong: 20,
        name: "Album 1",
      },
      {
        image: "",
        amountSong: 20,
        name: "Album 1",
      },
      {
        image: "",
        amountSong: 20,
        name: "Album 1",
      },
      {
        image: "",
        amountSong: 20,
        name: "Album 1",
      },
      {
        image: "",
        amountSong: 20,
        name: "Album 1",
      },
      {
        image: "",
        amountSong: 20,
        name: "Album 1",
      },
      {
        image: "",
        amountSong: 20,
        name: "Album 1",
      },
      {
        image: "",
        amountSong: 20,
        name: "Album 1",
      },
      {
        image: "",
        amountSong: 20,
        name: "Album 1",
      },
      {
        image: "",
        amountSong: 20,
        name: "Album 1",
      },
      {
        image: "",
        amountSong: 20,
        name: "Album 1",
      },
    ]);

    return {
      allData,
      ResourceButton,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "@/assets/scss/view/album/MsAllBum.scss";
</style>
