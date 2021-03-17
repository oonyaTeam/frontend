<template>
  <ion-page>
    <ion-content v-if="state.isLoading" :fullscreen="true"></ion-content>
    <ion-content v-else :fullscreen="true">
      <Header/>
      <div class="month-block">
        <button :disabled="state.slideIndex === 0" class="slide-button" @click="prevSlide">
          <ion-icon :icon="chevronBackOutline"></ion-icon>
        </button>
        <p class="month-text">{{items[state.slideIndex].month}}</p>
        <button @click="nextSlide" class="slide-button" :disabled="state.slideIndex === state.itemLength - 1">
          <ion-icon :icon="chevronForwardOutline"></ion-icon>
        </button>
      </div>
      <ion-slides ref="mySlides" :option="slideOpts" @ionSlideDidChange="changeSlide()">
        <ion-slide v-for="item in items" :key="item.month" style="width: 100%">
          <div style="width: 100%">
            <div class="first-block-wrapper">
              <main-block :sum="item.sum" @change-view="changeView()" :class="[state.mainBlock ? 'surface' : 'surface_', 'first-block', 'flower-img-one']"/>
              <graph :id="item.month" @change-view="changeView()" :class="[state.mainBlock ? 'reverse' : 'reverse_' , 'first-block']"/>
            </div>
            <word-list :words="monthlywords(item.month)"/>
          </div>
        </ion-slide>
      </ion-slides>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonSlides, IonSlide, IonIcon, loadingController } from '@ionic/vue';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import { defineComponent, reactive, ref, computed } from 'vue';
import { useStore } from 'vuex';

import MainBlock  from '@/components/MainBlock.vue'
import Graph from '@/components/Graph.vue'
import Header from '@/components/Header.vue';
import WordList from '@/components/WordList.vue'

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonPage,
    IonSlides,
    IonSlide,
    IonIcon,
    Header,
    MainBlock,
    Graph,
    WordList
  },
  setup(){
    const store = useStore();
    const state = reactive({
      mainBlock: true,
      isLoading: true,
      itemLength: 0,
      slideIndex: 0
    });

    const slideOpts = {
      initialSlide: 0,
      speed: 1400
    }

    const mySlides = ref<any>(null);

    const nextSlide = async () => {
      const s = await mySlides?.value?.$el.getSwiper();
      await s.slideNext();
    };

    const prevSlide = async () => {
      const s = await mySlides?.value?.$el.getSwiper();
      await s.slidePrev();
    };

    const getSlideIndex = async (): Promise<number> => {
      const s = await mySlides?.value?.$el.getSwiper();
      return s.activeIndex
    };

    const nextPage = () => {
      nextSlide();
      state.slideIndex++;
    };

    const prevPage = () => {
      prevSlide();
      state.slideIndex--;
    };

    const changeSlide = () => {
      getSlideIndex().then(activeIndex => {
        if(activeIndex < state.slideIndex) state.slideIndex--
        else state.slideIndex++
      })
    };

    const items = computed(() => store.getters.items);

    const monthlywords = computed(() => store.getters.monthlyWords);

    const changeView = () => {
      state.mainBlock = !state.mainBlock;
    };

    return{
      chevronForwardOutline,
      chevronBackOutline,
      slideOpts,
      nextSlide,
      prevSlide,
      getSlideIndex,
      mySlides,
      state,
      items,
      monthlywords,
      changeView,
      nextPage,
      prevPage,
      changeSlide,
    }
  },
  async created() {
    const loading = await loadingController.create({
      message: 'Loading...',
      duration: 5000,
    });

    await loading.present();
    await this.$store.dispatch("initState");
    await loading.dismiss();
    this.state.isLoading = false;
    this.state.itemLength = this.$store.getters.itemsCount
  }
});
</script>

<style scoped>
.first-block-wrapper{
  position: relative;
  width: 80%;
  margin: auto;
}


.month-block{
  text-align: center;
  height: 32px;
}


.month-text{
  font-size: 20px;
  display: inline;
  margin: 0 10px;
}

.normally-text{
  font-size: 16px;
  margin: 0;
}

.slide-button{
  width: 32px;
  height: 32px;
  border-radius: 50%;
  outline: none;
}

/* 言葉の数で、以下3つの画像クラスを分ける */
.flower-img-one {
  background-image: url("../../public/assets/Liver-leaf-23.png");
  background-size: cover;
}




/* 表面の表示 */
.surface {
  opacity: 1;
  transform: rotateY(0deg);
  transition:
      opacity 100ms 150ms,
      transform 300ms 150ms;
}
.reverse {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transform: rotateY(90deg);
  transition:
      opacity 50ms 200ms,
      transform 300ms;
}

/* 裏面の表示 */
.surface_ {
  opacity: 0;
  transform:rotateY(90deg);
  transition:
      opacity 50ms 200ms,
      transform 300ms;
}
.reverse_ {
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  opacity: 1;
  transform:rotateY(0deg);
  transition:
      opacity 100ms 150ms,
      transform 300ms 150ms;
}

</style>
