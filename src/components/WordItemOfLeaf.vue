<template>
  <div v-if="index%2 === 0" class="wrapper wrapper-left">
    <div class="item-left">
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
    </div>
  </div>
  <div v-else class="wrapper wrapper-right">
    <div class="item-right">
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
    </div>
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
    index: Number
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

/*.wrapper{
  margin: -50px 0;
}*/

.wrapper-left{
  background-image: url("../../public/assets/vine-left.png");
  background-size: contain;
  background-position: center;
}

.wrapper-right{
  background-image: url("../../public/assets/vine-right.png");
  background-size: contain;
  background-position: center;
}



.item-left{
  background-image: url("../../public/assets/leaf-left.png");
  width: 60%;
  height: 60vmin;
  background-size: cover;
}

.item-right{
  background-image: url("../../public/assets/leaf-right.png");
  width: 60%;
  height: 60vmin;
  background-size: cover;
  margin-left: auto;
}


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
