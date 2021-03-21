<template>
  <div class="item-wrapper" style="padding: 8px 16px">
    <div>
      <p class="normally-text">{{ word.text }}</p>
      <p class="normally-text">{{ formatedDate(word.date) }}</p>
    </div>
    <ion-icon
      class="icon"
      color="danger"
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
    };

    const showDeleteAlert = async () => {
      const alert = await alertController.create({
        header: '削除',
        message: '元に戻すことはできません。<br>それでも削除しますか？',
        buttons: [
          {
            text: 'キャンセル',
            role: 'cancel'
          },
          {
            text: '削除する',
            handler: (): void => {
              deleteWord();
            }
          }
        ],
      });
      await alert.present();
    }

    const formatedDate = (date: string) => {
      const d = date.split('-');
      return `${ d[0] }年${ d[1] }月${ d[2] }日`;
    }

    return {
      trashOutline,
      deleteWord,
      showDeleteAlert,
      formatedDate
    }
  },
});
</script>

<style scoped>
.item-wrapper{
  border-radius: 24px;
  display: flex;
  align-items: center;
  text-align: left;
}

.normally-text{
  font-size: 16px;
  margin: 0;
}

.icon{
  margin-left: auto;
}


</style>
