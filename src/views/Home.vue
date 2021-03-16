<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <Header />
      <ion-slides>
        <ion-slide v-for="item in items" :key="item.month" style="width: 100%">
          <div style="width: 100%">
            <h1>{{item.month}}</h1>
            <div class="first-block-wrapper">
              <main-block :sum="item.sum" @change-view="chageView()" :class="[mainBlock ? 'surface' : 'surface_', 'first-block']"/>
              <graph :id="item.month" @change-view="chageView()" :class="[mainBlock ? 'reverse' : 'reverse_' , 'first-block']"/>
            </div>
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
import { mapGetters } from 'vuex';

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
      mainBlock: true
    }
  },
  computed: {
    ...mapGetters({
      items: 'items',
      words: 'monthlyWords',
    }),
  },
  methods: {
    chageView() {
      this.mainBlock = !this.mainBlock;
    },
  },
  created() {
    this.$store.dispatch("initState");
  }
});
</script>

<style scoped>
.first-block-wrapper{
  position: relative;
  width: 80%;
  margin: auto;
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
