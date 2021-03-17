<template>
  <ion-page>
    <ion-content v-if="isLoading" :fullscreen="true"></ion-content>
    <ion-content v-else>
      <div class="top-text">
        <p class="normally-text title">今までに話した言葉</p>
      </div>
      <div v-for="(word, index) in words" :key="word.text">
        <div v-if="index%2 === 0" class="wrapper">
          <img src="../../public/assets/kusa.png" alt="kusa">
          <word-item class="item" :word="word"/>
        </div>
        <div v-else class="wrapper">
          <img src="../../public/assets/kusa.png" alt="kusa">
          <word-item class="item item-right" :word="word"/>
        </div>
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
  width: 50%;
}

.item-left{

}

.item-right{
  margin-left: auto;
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
