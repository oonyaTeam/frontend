<template>
  <ion-page>
    <ion-content>
      <div class="top-text">
        <div @click="deleteJwt()">delete</div>
        <p class="normally-text title">今までに話した言葉</p>
        <p class="normally-text">
          <span class="strong-text">{{ leafs.length }}</span>語
        </p>
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

    const deleteJwt = () => {store.dispatch('deleteJwt'); console.log('delete')};

    return {
      leafs,
      deleteJwt
    }
  },
});
</script>

<style scoped>

.normally-text{
  font-size: 16px;
  margin: 0;
  text-align: center;
}



.top-text{
  height: 60vmin;
  width: 60%;
  background-image: url("../../public/assets/asagao.png");
  background-size: cover;
  margin: 0 auto;
}

.title{
  padding: 16px;
  text-align: center;
}

.strong-text{
  font-size: 72px;
}


</style>
