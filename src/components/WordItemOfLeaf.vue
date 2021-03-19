<template>
  <div :class="isLeft ? 'wrapper-left' : 'wrapper-right' ">
    <div :class="isLeft ? 'item-left' : 'item-right'">
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
    <div v-if="showDetail" :class="isLeft ? 'detail-right' : 'detail-left'">
      <div class="wrapper-text" @click="toMonthlyPage()">
        <p class="normally-text">2020年1月</p>
        <p class="normally-text">詳細をみる</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useRouter } from 'vue-router';
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
    showDetail: Boolean,
    isLeft: Boolean
  },
  setup(props){
    const router = useRouter()
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

    const toMonthlyPage = () => {
      router.push('/home')
    }

    return {
      trashOutline,
      deleteWord,
      showDeleteAlert,
      toMonthlyPage
    }
  },
});
</script>

<style scoped>
.wrapper-left{
  background-image: url("../../public/assets/vine-left.png");
  background-size: contain;
  background-position: center;
  position: relative;
}

.wrapper-right{
  background-image: url("../../public/assets/vine-right.png");
  background-size: contain;
  background-position: center;
  position: relative;
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

.detail-left{
  position: absolute;
  top: 0;
  left: 0;
  width: 40%;
  height: 40vmin;
  background-image: url("../../public/assets/leaf-left.png");
  background-size: cover;
}

.detail-right{
  position: absolute;
  top: 0;
  right: 0;
  width: 40%;
  height: 40vmin;
  background-image: url("../../public/assets/leaf-right.png");
  background-size: cover;
}

.wrapper-text{
  padding: 40px;
}
</style>
