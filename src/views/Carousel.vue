<template>
  <div class="block">
    <span class="demonstration">网络安全走马灯展示</span>
    <el-carousel  type="card" interval="1500">
      <el-carousel-item v-for="item in imagesbox" :key="item.id">
        <img :src="item.idView" class="imageAnquan" >
      </el-carousel-item>
    </el-carousel>
  </div>

</template>
<script>
export default {
  name:'zoumadeng',
  data(){
    return {
      imagesbox:[{id:0,idView:require("/src/assets/anquan1.png")},
        {id:1,idView:require("/src/assets/anquan2.jpg")},
        {id:2,idView:require("/src/assets/anquan3.jpg")}
  ]
    }
  }
}

</script>

<style>
.demonstration{
  color: black;
  font-size: 30px;
}


</style>
