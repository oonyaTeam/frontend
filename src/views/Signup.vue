<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-item>
        <ion-input
          name="mail"
          type="text"
          placeholder="Name"
          required
          v-model="state.mail"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-input
          name="password"
          type="text"
          placeholder="PassWord"
          required
          v-model="state.passWord"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-button
          type="submit"
          expand="block"
          @click="onSubmit()"
        >
          Login
        </ion-button>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { IonContent, IonPage, IonItem, IonInput, IonButton } from '@ionic/vue';
import axios from 'axios';
import { useStore } from 'vuex';

export default defineComponent({
  name: "Signup",
  components: {
    IonContent,
    IonPage,
    IonItem,
    IonInput,
    IonButton,
  },
  setup() {
    const state = reactive({
      mail : "",
      passWord: "",
    });
    const store = useStore();

    const onSubmit = async () => {
      console.log(state.mail + state.passWord);
    };

    return {
      state,
      onSubmit,
    }
  }
});
</script>

<style scoped>

</style>
