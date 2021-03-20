<template>
  <div class="item-wrapper" style="padding: 8px 16px">
    <ion-icon v-if="top" size="large" :icon="ribbonOutline"></ion-icon>
    <ion-icon v-else size="large" :icon="medalOutline"></ion-icon>
    <div>
      <p class="normally-text">ぱぱ</p>
    </div>
    <div class="count">
      <p>30回</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IonIcon } from '@ionic/vue';
import { RankingWord } from '@/types';
import { ribbonOutline, medalOutline } from 'ionicons/icons';

export default defineComponent({
  name: "RankingItem",
  component:{
    IonIcon
  },
  props:{
    top: Boolean
  },
  setup(){
    return{
      ribbonOutline,
      medalOutline
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
