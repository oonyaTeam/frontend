<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <Header />
      <ion-slides>
        <ion-slide v-for="item in items" :key="item.month" style="width: 100%">
          <div style="width: 100%">
            <h1>{{item.month}}</h1>
            <transition name="fade" mode="out-in">
              <main-block v-if="mainBlock" :sum="item.sum" @change-view="chageView()"/>
              <graph v-else @change-view="chageView()" />
            </transition>
            <word-list />
          </div>
        </ion-slide>
      </ion-slides>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonSlides, IonSlide } from '@ionic/vue';
import { defineComponent } from 'vue';

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
    Header,
    MainBlock,
    Graph,
    WordList
  },
  data(){
    return {
      items: [
        {month: '2021/01', sum: 6},
        {month: '2021/02', sum: 23},
        {month: '2021/03', sum: 50}
      ],
      mainBlock: true
    }
  },
  methods: {
    chageView() {
      this.mainBlock = !this.mainBlock;
    }
  }
});
</script>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}


.fade-enter-to, .fade-leave {
  opacity: 1;
}

</style>
