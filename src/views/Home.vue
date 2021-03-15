<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <Header />
      <MainBlock />
      <Graph />
      <WordList />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage } from '@ionic/vue';
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
    Header,
    MainBlock,
    Graph,
    WordList
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
