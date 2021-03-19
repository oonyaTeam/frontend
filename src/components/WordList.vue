<template>
  <div class="wrapper">
    <div class="ion-padding-top">
      <p class="normally-text">今月はじめて話した言葉</p>
    </div>
    <div class="ion-padding-top ion-padding-bottom">
      <div v-for="word in showWords" :key="word.text">
        <word-item class="item" :word="word"/>
      </div>
    </div>
    <div class="ion-padding-bottom ion-padding-start ion-padding-end" v-if="words.length > 3">
      <ion-button
        v-if="!state.isShowAllWords"
        expand="full"
        shape="round"
        @click="changeWordsState()"
      >
        もっとみる
      </ion-button>
      <ion-button
        v-else
        expand="full"
        shape="round"
        color="light"
        @click="changeWordsState"
      >
        <ion-icon :icon="chevronUpOutline"></ion-icon>
        とじる
      </ion-button>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, reactive } from 'vue';
import WordItem from '@/components/WordItem';
import { IonButton, IonIcon } from '@ionic/vue';
import { chevronUpOutline } from 'ionicons/icons'

export default defineComponent({
  name: "WordList",
  components: {
    WordItem,
    IonButton,
    IonIcon
  },
  props: ['words'],
  setup(props) {
    const state = reactive({
      isShowAllWords: false
    });
    const showWords = computed(() => {
      if(state.isShowAllWords) return props.words
      else return props.words.slice(0,3)
    })


    const changeWordsState = () => {
      state.isShowAllWords = !state.isShowAllWords
    }

    return {
      showWords,
      state,
      changeWordsState,
      chevronUpOutline
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
