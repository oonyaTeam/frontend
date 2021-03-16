<template>
  <ion-page>
    <ion-content v-if="isLoading" :fullscreen="true"></ion-content>
    <ion-content v-else>
      <div class="top-text">
        <p class="normally-text title">今までに話した言葉</p>
      </div>
      <div class="wrapper" v-for="word in words" :key="word.text">
        <img src="../../public/assets/kusa.png" alt="kusa">
        <!-- 下のバインディングしているidはとりあえずでおいてるだけなので
         データが入るようになれば消す-->
        <word-item class="item" :word="word"/>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonContent, loadingController } from '@ionic/vue';
import WordItem from '@/components/WordItem';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: "AllWord",
  components: {
    WordItem,
    IonPage,
    IonContent
  },
  data() {
    return {
      isLoading: true,
    }
  },
  computed: {
    ...mapGetters({
      words: 'allWords',
    }),
  },
  async created() {
    const loading = await loadingController.create({
      message: 'Loading...',
      duration: 5000,
    });

    await loading.present();
    await this.$store.dispatch("getWords");
    await loading.dismiss();
    this.isLoading = false;
  }
});
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
