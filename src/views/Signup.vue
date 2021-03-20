<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="wrapper">
        <h1 class="center">アカウントを作成</h1>
        <div class="ion-padding">
          <ion-item>
            <ion-label position="floating">
              email
            </ion-label>
            <ion-input
                name="email"
                type="email"
                required="true"
                v-model="state.email"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">
              password
            </ion-label>
            <ion-input
                name="password"
                type="password"
                required="true"
                v-model="state.password"
            ></ion-input>
          </ion-item>
        </div>
        <ion-button
            expand="full"
            shape="round"
            type="submit"
            @click="signup()"
            class="button-color"
        >
          新規作成
        </ion-button>
        <div class="ion-padding">
          <p class="normally-text">え？もうアカウントを持ってる？</p>
          <p class="normally-text">そんなときは<a href="/login">コチラ</a>からログインしてね！</p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { IonContent, IonPage, IonItem, IonInput, IonButton, IonLabel } from '@ionic/vue';
import { useRouter } from 'vue-router';
import firebase from 'firebase/app';
import 'firebase/auth';

export default defineComponent({
  name: "Signup",
  components: {
    IonContent,
    IonPage,
    IonItem,
    IonInput,
    IonButton,
    IonLabel
  },
  setup() {
    const state = reactive({
      email : "",
      password: "",
    });
    const router = useRouter();
    
    const signup = () => {
      firebase.auth().createUserWithEmailAndPassword(state.email, state.password)
        .then(() => {
          router.push('/device');
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
.wrapper{
  width: 80%;
  margin: auto;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.center{
  text-align: center;
}

.button-color{
  --background: var(--main-color);
  margin: 16px;
}



.normally-text{
  font-size: 14px;
  margin: 0;
  text-align: center;
}
</style>
