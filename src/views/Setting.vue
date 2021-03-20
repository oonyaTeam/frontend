<template>
  <ion-page>
    <ion-content>
      <p>setting works</p>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonContent, IonPage } from '@ionic/vue';

export default defineComponent({
  name: "Setting",
  components:{
    IonContent,
    IonPage
  }
});
</script>

<style scoped>

</style>
