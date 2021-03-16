<template>
  <div class="item-wrapper" style="padding: 8px 16px">
    <div>
      <p class="normally-text">{{ word.text }}</p>
      <p class="normally-text">{{ word.date }}</p>
    </div>
    <ion-icon class="icon" :icon="trashOutline"></ion-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { trashOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/vue';
import { Word } from '@/types';

export default defineComponent({
  name: "WordItem",
  components: {
    IonIcon
  },
  props: ['word'],
  setup(){
    return {
      trashOutline
    }
  }
});
</script>

<style scoped>
.item-wrapper{
  background-color: white;
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
