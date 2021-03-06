<template>
  <div :class="isLeft ? 'wrapper-left' : 'wrapper-right' ">
    <div :class="isLeft ? 'item-left' : 'item-right'">
      <div class="absolute-center back">
        <div>
          <p class="normally-text">{{ formatedDate(leaf.date) }}</p>
          <p class="speech-text">{{ leaf.text }}</p>
        </div>
        <!--<ion-icon
            class="icon"
            size="large"
            :icon="trashOutline"
            @click="showDeleteAlert"
        ></ion-icon>-->
      </div>
    </div>
    <div v-if="leaf.isBoundary" :class="isLeft ? 'detail-right' : 'detail-left'">
      <div class="absolute-center" @click="toMonthlyPage(leaf.date)">
        <p class="normally-text font-14">{{ formatedMonth(leaf.date) }}</p>
        <p class="normally-text font-14">詳細をみる</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { trashOutline } from 'ionicons/icons';
import { alertController } from '@ionic/vue';
import { Leaf } from '@/types';

export default defineComponent({
  name: "WordItem",
  components: {
    // IonIcon
  },
  props: {
    leaf: {
      type: Object as PropType<Leaf>,
      required: true,
    },
    showDetail: Boolean,
    isLeft: Boolean
  },
  setup(props){
    const router = useRouter()
    const store = useStore();

    const deleteWord = () => store.dispatch('deleteWord', props.leaf.text);

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

    const toMonthlyPage = (date: string) => {
      store.dispatch('setDate', date);
      router.push({name: 'Home'})
    }

    const formatedDate = (date: string) => {
      const d = date.split('-');
      return `${ d[0] }年${ d[1] }月${ d[2] }日`;
    }

    const formatedMonth = (date: string) => {
      const d = date.split('-');
      return `${d[0]}年${d[1]}月`;
    };

    return {
      trashOutline,
      deleteWord,
      showDeleteAlert,
      toMonthlyPage,
      formatedDate,
      formatedMonth,
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
  position: relative;
}

.item-right{
  background-image: url("../../public/assets/leaf-right.png");
  width: 60%;
  height: 60vmin;
  background-size: cover;
  margin-left: auto;
  position: relative;
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

.absolute-center{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.font-14{
  font-size: 14px;
  text-decoration: underline;
}

.back{
  text-align: center;
  width: 60%;
  background-color: var(--gray-25);
  border-radius: 10px;
  padding: 8px;
}
</style>
