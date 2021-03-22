<template>
  <div class="item-wrapper" style="padding: 8px 16px">
    <ion-icon
      v-if="index === 0"
      size="large"
      :icon="ribbon"
      color="gold-medal"
    ></ion-icon>
    <ion-icon
      v-else-if="index === 1"
      size="large"
      :icon="medal"
      color="silver-medal"
    ></ion-icon>
    <ion-icon
      v-else
      size="large"
      :icon="medal"
      color="copper-medal"
    ></ion-icon>
    <div>
      <p class="normally-text">{{ word.word }}</p>
    </div>
    <div class="count">
      <p>{{ word.num }}語</p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { IonIcon } from '@ionic/vue';
import { RankingWord } from '@/types';
import { medal, ribbon } from 'ionicons/icons';

export default defineComponent({
  name: "RankingItem",
  components:{
    IonIcon
  },
  props:{
    index: Number,
    word: RankingWord
  },
  setup(){
    return{
      medal,
      ribbon
    }
  }
})
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
  margin: 0 0 0 8px;
}

.count{
  margin-left: auto;
}
</style>
