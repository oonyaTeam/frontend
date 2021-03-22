<template>
  <ion-page>
    <ion-content>
      <div class="top">
        <p class="normally-text title font-size-20">今までに話した言葉</p>
        <p class="normally-text top-text">
          <span class="strong-text">{{ leafs.length }}</span>語
        </p>
      </div>
      <div class="leaf-block">
        <div v-for="(leaf, index) in leafs" :key="leaf.text">
          <word-item-of-leaf :leaf="leaf" :isLeft="index%2===0"/>
        </div>
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
      leafs,
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.top{
  position: relative;
  height: 80vmin;
  width: 80%;
  background-image: url("../../public/assets/asagao.png");
  background-size: cover;
  margin: 0 auto;
  z-index: 2;
}

.leaf-block{
  position: relative;
  margin-top: -20px;
  z-index: 1;
}

.title{
  padding-top: 32px;
  text-align: center;
}

.strong-text{
  font-size: 72px;
}

.font-size-20{
  font-size: 20px;
}

</style>
