<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-item>
        <ion-input
          name="mail"
          type="text"
          placeholder="Mail"
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
          @click="signup()"
        >
          SignUp
        </ion-button>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { IonContent, IonPage, IonItem, IonInput, IonButton } from '@ionic/vue';
import { useRouter } from 'vue-router';
import firebase from 'firebase';

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
    const router = useRouter();
    
    const signup = () => {
      firebase.auth().createUserWithEmailAndPassword(state.mail, state.passWord)
        .then(resp => {
          console.log(resp);
          router.push('/login');
        })
        .catch(err => {
          console.log(err);
        })
    };

    return {
      state,
      signup,
    }
  }
});
</script>

<style scoped>

</style>
