<template>
  <ion-page>
    <ion-content>
      <div class="top-text">
        <p class="normally-text title">今までに話した言葉</p>
      </div>
      <div v-for="(leaf, index) in leafs" :key="leaf.text">
        <word-item-of-leaf :leaf="leaf" :isLeft="index%2===0"/>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { IonPage, IonContent } from '@ionic/vue';
import WordItemOfLeaf from '@/components/WordItemOfLeaf';

export default defineComponent({
  name: "AllWord",
  components: {
    WordItemOfLeaf,
    IonPage,
    IonContent
  },
  async setup() {
    const store = useStore();

    const leafs = computed(() => store.getters.leafs);

    await store.dispatch("getWords");

    return {
      leafs
    }
  },
});
</script>

<style scoped>

.normally-text{
  font-size: 16px;
  margin: 0;
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
