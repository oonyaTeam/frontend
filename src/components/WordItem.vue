<template>
  <div class="item-wrapper">
    <p>ぶーぶー</p>
    <p>2021/02/03</p>
    <ion-icon :icon="trashOutline"></ion-icon>
  </div>
</template>

<script>
import { trashOutline } from 'ionicons/icons';

export default {
  name: "WordItem",
  setup(){
    return {
      trashOutline
    }
  }
}
</script>

<style scoped>
.item-wrapper{
  background-color: white;
  border-radius: 24px;
  margin: 16px 8px;
}
</style>
