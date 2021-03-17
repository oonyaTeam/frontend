<template>
  <ion-page>
    <ion-content v-if="state.isLoading" :fullscreen="true"></ion-content>
    <ion-content v-else>
      <div class="top-text">
        <p class="normally-text title">今までに話した言葉</p>
      </div>
      <div v-for="(word, index) in words" :key="word.text">
        <div v-if="index%2 === 0" class="wrapper wrapper-left">
          <div class="item-left">
            <word-item-of-leaf :word="word"/>
          </div>
        </div>
        <div v-else class="wrapper wrapper-right">
          <div class="item-right">
            <word-item-of-leaf :word="word"/>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { computed, defineComponent, reactive } from 'vue';
import { useStore } from 'vuex';
import { IonPage, IonContent, loadingController } from '@ionic/vue';
import WordItemOfLeaf from '@/components/WordItemOfLeaf';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: "AllWord",
  components: {
    WordItemOfLeaf,
    IonPage,
    IonContent
  },
  setup() {
    const store = useStore();
    const state = reactive({
      isLoading: true,
    });

    const allWords = computed(() => store.getters.allWords);

    return {
      state,
      allWords
    }
  },
  async created() {
    const loading = await loadingController.create({
      message: 'Loading...',
      duration: 5000,
    });

    await loading.present();
    await this.$store.dispatch("getWords");
    await loading.dismiss();
    this.state.isLoading = false;
  }
});
</script>

<style scoped>

/*.wrapper{
  margin: -50px 0;
}*/

.wrapper-left{
  background-image: url("../../public/assets/vine-left.png");
  background-size: contain;
  background-position: center;
}

.wrapper-right{
  background-image: url("../../public/assets/vine-right.png");
  background-size: contain;
  background-position: center;
}


.normally-text{
  font-size: 16px;
  margin: 0;
}


.item-left{
  background-image: url("../../public/assets/leaf-left.png");
  width: 60%;
  height: 60vmin;
  background-size: cover;
}

.item-right{
  background-image: url("../../public/assets/leaf-right.png");
  width: 60%;
  height: 60vmin;
  background-size: cover;
  margin-left: auto;
}



.top-text{
  height: 80px;
  margin-bottom: 100px;
}

.title{
  padding: 32px;
  text-align: center;
}
</style>
