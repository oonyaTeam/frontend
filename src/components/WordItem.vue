<template>
  <div class="item-wrapper" style="padding: 8px 16px">
    <div>
      <p class="normally-text">ぶーぶー</p>
      <p class="normally-text">2021/02/03</p>
    </div>
    <ion-icon class="icon" :icon="trashOutline"></ion-icon>
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
  margin: 8px 16px;
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
