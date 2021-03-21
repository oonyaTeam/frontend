<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-item>
        <ion-button
          type="submit"
          expand="block"
          @click="logout()"
        >
          Logout
        </ion-button>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { IonContent, IonPage, IonItem, IonButton } from '@ionic/vue';
import { useRouter } from 'vue-router';
import firebase from 'firebase/app';
import 'firebase/auth';

import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

export default defineComponent({
  name: "Logout",
  components: {
    IonContent,
    IonPage,
    IonItem,
    IonButton,
  },
  setup() {
    const router = useRouter();

    const state = reactive({
      email : "",
      password: "",
    });

    const logout = () => {
      firebase.auth().signOut()
        .then(() => {
          Storage.clear();
          router.push('/login');
        })
        .catch(err => console.log(err));
    };

    return {
      state,
      logout,
    }
  }
});
</script>

<style scoped>

</style>
