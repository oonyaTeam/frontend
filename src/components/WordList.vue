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
    <div
      v-if="words.length > 3"
      class="ion-padding-bottom ion-padding-start ion-padding-end"
    >
      <ion-button
        v-if="!state.isShowAllWords"
        color="sakura"
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
        class="gray-100"
        @click="changeWordsState"
      >
        <span style="color: black">とじる</span>
      </ion-button>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, reactive } from 'vue';
import WordItem from '@/components/WordItem';
import { IonButton } from '@ionic/vue';

export default defineComponent({
  name: "WordList",
  components: {
    WordItem,
    IonButton
  },
  props: ['words'],
  setup(props) {
    const state = reactive({
      isShowAllWords: false
    });
    
    const changeWordsState = () => state.isShowAllWords = !state.isShowAllWords;

    const showWords = computed(() => {
      if(state.isShowAllWords) return props.words;
      else return props.words.slice(0,3);
    })

    return {
      showWords,
      state,
      changeWordsState
    }
  },
});
</script>

<style scoped>
.wrapper{
  width: 80%;
  margin: 16px auto;
  background-color: var(--gray-50);
  border-radius: 24px;
}

.normally-text{
  font-size: 16px;
  margin: 0;
}

.item{
  margin: 8px 16px;
  background-color: #fefefe;
}

.gray-100{
  --background: var(--gray-100);
}

</style>
