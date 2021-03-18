<template>
  <div class="item-wrapper">
    <div>
      <p class="normally-text">{{ word.date }}</p>
      <p class="speech-text">{{ word.text }}</p>
    </div>
    <ion-icon
      class="icon"
      size="large"
      :icon="trashOutline"
      @click="showDeleteAlert"
    ></ion-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useStore } from 'vuex';
import { trashOutline } from 'ionicons/icons';
import { IonIcon, alertController } from '@ionic/vue';
import { Word } from '@/types';

export default defineComponent({
  name: "WordItem",
  components: {
    IonIcon
  },
  props: {
    word: {
      type: Object as PropType<Word>,
      required: true,
    },
  },
  setup(props){
    const store = useStore();

    const deleteWord = () => {
      store.dispatch('deleteWord', props.word.text);
    }

    const showDeleteAlert = async () => {
      const alert = await alertController.create({
        header: '削除',
        message: '元に戻すことはできません。<br>それでも削除しますか？',
        buttons: [
          {
            text: 'いいえ',
            role: 'cancel'
          },
          {
            text: 'はい',
            handler: (): void => {
              deleteWord();
            }
          }
        ],
      });
      await alert.present();
    }

    return {
      trashOutline,
      deleteWord,
      showDeleteAlert
    }
  },
});
</script>

<style scoped>
.item-wrapper{
  padding-top: 30%;
  text-align: center;
}

.normally-text{
  font-size: 16px;
  margin: 0;
}

.speech-text{
  font-size: 24px;
  margin: 0;
}

.icon{
  margin-left: auto;
}
</style>
