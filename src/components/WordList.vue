<template>
  <div class="wrapper">
    <div class="ion-padding">
      <p class="normally-text">今月はじめて話した言葉</p>
    </div>
    <div v-for="word in words" :key="word.text">
      <word-item class="item" :word="word"/>
    </div>
    <div class="ion-padding" >
      <ion-button
        expand="full"
        shape="round"
        @click="goAllwords"
      >
        もっとみる
      </ion-button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import WordItem from '@/components/WordItem';
import { IonButton } from '@ionic/vue';

export default defineComponent({
  name: "WordList",
  components: {
    WordItem,
    IonButton
  },
  props: ['words'],
  setup() {
    const router = useRouter();

    const goAllwords = () => {
      router.push('/allword');
    }

    return {
      goAllwords,
    }
  },
});
</script>

<style scoped>
.wrapper{
  width: 80%;
  margin: 16px auto;
  background-color: rgba(238, 238, 238, 0.5);
  border-radius: 24px;
}

.normally-text{
  font-size: 16px;
  margin: 0;
}

.item{
  margin: 8px 16px;
  background-color: white;
}

</style>
