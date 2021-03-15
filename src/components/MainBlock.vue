<template>
  <div class="wrapper">
    <p class="normally-text">今までに話した言葉が</p>
    <p class="normally-text">
      <span class="strong-text">{{sum}}</span>語に
    </p>
    <p class="normally-text">なりました。</p>

    <p class="normally-text">先月からは6語、</p>
    <p class="normally-text">新しく話せる言葉が増えました。</p>
    <ion-button class="full-button" expand="full" shape="round">グラフにしてみる</ion-button>
  </div>
</template>

<script>
export default {
  name: "MainBlock",
  props: ['sum']
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
  margin: 0px;
}

.strong-text{
  font-size: 72px;
}

.full-button{
  margin: 16px;
}
</style>
