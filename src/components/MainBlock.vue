<template>
  <div class="wrapper">
    <div class="ion-padding">
      <p class="normally-text">今月はじめて話した言葉が</p>
      <p class="normally-text">
        <span class="strong-text">{{ count }}</span>語
      </p>
      <p class="normally-text">あります！</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "MainBlock",
  props: {
    count: Number
  }
});
</script>

<style scoped>
.wrapper{
  width: 100%;
  margin: 16px auto;
  background-color: var(--gray-50);
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
