<template>
  <div class="wrapper">
    <p>Graph works</p>
    <div class="ion-padding">
      <ion-button expand="full" shape="round" @click="emitChangeView">もどす</ion-button>
    </div>
  </div>
</template>

<script>
import { IonButton } from '@ionic/vue';

export default {
  name: "Graph",
  components: {
    IonButton,
  },
  methods: {
    emitChangeView() {
      this.$emit("change-view");
    }
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
</style>
