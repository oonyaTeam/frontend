<template>
  <div class="wrapper">
    <div class="ion-padding">
      <p class="normally-text">今までに話した言葉が</p>
      <p class="normally-text">
        <span class="strong-text">{{ sum }}</span>語に
      </p>
      <p class="normally-text">なりました。</p>
    </div>

    <div class="ion-padding">
      <p class="normally-text">先月からは{{ diff }}語、</p>
      <p class="normally-text">新しく話せる言葉が増えました。</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "MainBlock",
  props: {
    sum: Number,
    diff: Number,
  }
});
</script>

<style scoped>
.wrapper{
  width: 100%;
  margin: 16px auto;
  background-color: rgba(238, 238, 238, 0.5);
  border-radius: 24px;
}

.normally-text{
  font-size: 16px;
  margin: 0;
}

.strong-text{
  font-size: 72px;
}



</style>
