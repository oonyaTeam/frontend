<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="month-block margin-32">
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
                class="first-block flower-img"
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
import { IonContent, IonPage, IonSlides, IonSlide, IonIcon, onIonViewDidEnter } from '@ionic/vue';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import { defineComponent, reactive, ref, computed } from 'vue';
import { useStore } from 'vuex';

import MainBlock  from '@/components/MainBlock.vue'
import WordList from '@/components/WordList.vue'
import {Item} from "@/types";

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonPage,
    IonSlides,
    IonSlide,
    IonIcon,
    MainBlock,
    WordList
  },
  async setup(){
    const store = useStore();

    const state = reactive({
      itemLength: 0,
      slideIndex: 0,
      time: Date.now(),
    });

    const slideOpts = {
      initialSlide: 0,
      speed: 1400
    }

    const mySlides = ref<any>(null);

    const formatedMonth = (date: string) => {
      const d = date.split('-');
      return `${d[0]}年${d[1]}月`;
    };

    const slideTo = async (index: number): Promise<void> => {
      const s = await mySlides?.value?.$el.getSwiper();
      return s.slideTo(index);
    }
  
    const nextSlide = async () => {
      const s = await mySlides?.value?.$el.getSwiper();
      await s.slideNext();
    };

    const prevSlide = async () => {
      const s = await mySlides?.value?.$el.getSwiper();
      await s.slidePrev();
    };


    const throttle = (func: Function, waitTime: number) => {
      if((state.time + waitTime - Date.now()) < 0){
        func();
        state.time = Date.now();
      }
    }

    const getSlideIndex = async (): Promise<number> => {
      const s = await mySlides?.value?.$el.getSwiper();
      return s.activeIndex
    };

    const changeSlide = () => {
      getSlideIndex().then(activeIndex => {
        state.slideIndex = activeIndex
      })
    };

    const items = computed(() => store.getters.items);

    const monthlywords = computed(() => store.getters.monthlyWords);

    onIonViewDidEnter(() => {
      slideTo(store.getters.items.findIndex((item: Item) => formatedMonth(item.month) === formatedMonth(store.getters.date)));
    })

    await store.dispatch("initState");
    state.itemLength = store.getters.itemsCount

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
      changeSlide,
      throttle,
      formatedMonth,
      slideTo
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
.flower-img {
  background-image: url("../../public/assets/flower-3.png");
  background-size: cover;
}


.margin-32{
  margin-top: 32px;
}

</style>
