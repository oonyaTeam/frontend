<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-item>
        <ion-input
          name="email"
          type="text"
          placeholder="E-Mail"
          required
          v-model="state.email"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-input
          name="password"
          type="text"
          placeholder="Password"
          required
          v-model="state.password"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-button
          type="submit"
          expand="block"
          @click="signin()"
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
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import firebase from 'firebase';

export default defineComponent({
  name: "Login",
  components: {
    IonContent,
    IonPage,
    IonItem,
    IonInput,
    IonButton,
  },
  setup() {
    const state = reactive({
      email : "",
      password: "",
    });
    const store = useStore();
    const router = useRouter();

    const signin = () => {
      console.log(state.email + state.passWord);
      firebase.auth().signInWithEmailAndPassword(state.email, state.password)
        .then(resp => {
          console.log(resp);
          router.push('/');
        })
        .catch(err => {
          console.log(err);
        })
    };

    return {
      state,
      signin,
    }
  }
});
</script>

<style scoped>

</style>
