<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <Header />
      <ion-slides>
        <ion-slide v-for="item in items" :key="item.month" style="width: 100%">
          <div style="width: 100%">
            <h1>{{item.month}}</h1>
            <MainBlock v-if="mainBlock" :sum="item.sum"/>
            <Graph v-if="!mainBlock" />
            <WordList />
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
  }
});
</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
