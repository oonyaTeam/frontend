<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <Header/>
      <div class="month-block">
        <button
          :class="['slide-button', state.slideIndex === 0 ? 'disabled' : '']"
          :disabled="state.slideIndex === 0"
          @click="throttle(prevSlide,1000)"
        >
          <ion-icon :icon="chevronBackOutline"></ion-icon>
        </button>
        <p class="month-text">
          {{ formatedMonth(items[state.slideIndex].month) }}
        </p>
        <button
          :class="['slide-button', state.slideIndex === state.itemLength - 1 ? 'disabled' : '']"
          :disabled="state.slideIndex === state.itemLength - 1"
          @click="throttle(nextSlide, 1000)"
        >
          <ion-icon :icon="chevronForwardOutline"></ion-icon>
        </button>
      </div>
      <ion-slides
        ref="mySlides"
        :option="slideOpts"
        @ionSlideDidChange="changeSlide()"
      >
        <ion-slide v-for="item in items" :key="item.month" style="width: 100%">
          <div style="width: 100%">
            <div class="first-block-wrapper">
              <main-block
                class="first-block flower-img-one"
                :count="item.sum"
              />
            </div>
            <word-list :words="monthlywords(item.month)"/>
          </div>
        </ion-slide>
      </ion-slides>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonSlides, IonSlide, IonIcon } from '@ionic/vue';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import { defineComponent, reactive, ref, computed } from 'vue';
import { useStore } from 'vuex';

import MainBlock  from '@/components/MainBlock.vue'
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
    WordList
  },
  async setup(){
    const store = useStore();
    const state = reactive({
      itemLength: 0,
      slideIndex: 0
    });

    const slideOpts = {
      initialSlide: 0,
      speed: 1400
    }

    const mySlides = ref<any>(null);

    await store.dispatch("initState");
    state.itemLength = store.getters.itemsCount

    const nextSlide = async () => {
      const s = await mySlides?.value?.$el.getSwiper();
      await s.slideNext();
    };

    const prevSlide = async () => {
      const s = await mySlides?.value?.$el.getSwiper();
      await s.slidePrev();
    };

    let time = Date.now();

    const throttle = (func: Function, waitTime: number) => {
      if((time + waitTime - Date.now()) < 0){
        func();
        time = Date.now();
      }
    }

    const getSlideIndex = async (): Promise<number> => {
      const s = await mySlides?.value?.$el.getSwiper();
      return s.activeIndex
    };

    const changeSlide = () => {
      getSlideIndex().then(activeIndex => {
        if(activeIndex < state.slideIndex) state.slideIndex--
        else state.slideIndex++
      })
    };

    const items = computed(() => store.getters.items);

    const monthlywords = computed(() => store.getters.monthlyWords);

    const formatedMonth = (date: string) => {
      const d = date.split('-');
      return `${d[0]}年${d[1]}月`;
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
      time,
      monthlywords,
      changeSlide,
      throttle,
      formatedMonth
    }
  },
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
  color: white;
  background-color: var(--main-color);
}

.disabled{
  color: white;
  background-color: var(--gray-50);
}

/* 言葉の数で、以下3つの画像クラスを分ける */
.flower-img-one {
  background-image: url("../../public/assets/Liver-leaf-23.png");
  background-size: cover;
}




</style>
