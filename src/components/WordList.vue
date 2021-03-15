<template>
  <div class="wrapper">
    <div class="ion-padding">
      <p class="normally-text">今月はじめて話した言葉</p>
    </div>
    <word-item/>
    <word-item/>
    <div class="ion-padding">
      <ion-button expand="full" shape="round">もっとみる</ion-button>
    </div>

  </div>
</template>

<script>
import WordItem from '@/components/WordItem';

export default {
  name: "WordList",
  components: {
    WordItem
  }
}
</script>

<style scoped>
.wrapper{
  width: 80%;
  margin: 16px auto;
  background-color: rgba(238, 238, 238, 0.5);
  border-radius: 24px;
}

.normally-text{
  font-size: 16px;
  margin: 0;
}

</style>
