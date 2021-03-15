<template>
  <div class="wrapper">
    <p class="normally-text">今月はじめて話した言葉</p>
    <word-item/>
    <ion-button class="full-button" expand="full" shape="round">もっとみる</ion-button>
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
  margin: auto;
  background-color: rgba(238, 238, 238, 0.5);
  border-radius: 24px;
}

.normally-text{
  font-size: 16px;
}

.full-button{
  margin: 16px;
}
</style>
