<template>
  <div class="container-albums">
    

    <div class="container-content">

      <div class="container-content__left">

        <div class="product-album">
          <ul class="list-album" >
            <li class="item-album" v-for="(itemAlbum,index) in allData" :key="index">
              <div class="app-icon ic-albums"></div>
              <p>{{itemAlbum.name}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="container-content__right">

      </div>

    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "MsAlbum",
  setup() {

    const allData = [
      {
        name:'asdasd',

      },
       {
        name:'asdasd',

      },
      
    ];
    return {
      allData

    }
  },
});
</script>
<style lang="scss" scoped>

</style>
