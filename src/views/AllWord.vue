<template>
  <ion-page>
    <ion-content>
      <div class="top-text">
        <p class="normally-text title">今までに話した言葉</p>
      </div>
      <div class="wrapper" v-for="num in 15" :key="num">
        <img src="../../public/assets/kusa.png" alt="kusa">
        <!-- 下のバインディングしているidはとりあえずでおいてるだけなので
         データが入るようになれば消す-->
        <word-item class="item" :id="num"/>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent } from '@ionic/vue';
import WordItem from '@/components/WordItem';

export default {
  name: "AllWord",
  components: {
    WordItem,
    IonPage,
    IonContent
  }
}
</script>

<style scoped>
.wrapper{
  display: flex;
  align-items: center;
  margin-right: 16px;
}

img{
  width: 80px;
}

.normally-text{
  font-size: 16px;
  margin: 0;
}

.item{
  background-color: #2dd36f;
  width: 100%;
}

.top-text{
  height: 80px;
  background-image: url("../../public/assets/kusa.png");
  background-size: contain;
  background-repeat: no-repeat;
}

.title{
  padding: 32px;
  text-align: center;
}
</style>
