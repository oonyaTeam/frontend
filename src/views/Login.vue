<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="wrapper">
        <h1 class="center">Liveraryにログイン</h1>
        <div class="ion-padding">
          <ion-item>
            <ion-label position="floating">
              email
            </ion-label>
            <ion-input
                name="email"
                type="email"
                v-model="state.email"
                required="true"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">
              password
            </ion-label>
            <ion-input
                class="main-color"
                name="password"
                type="password"
                v-model="state.password"
                required="true"
            ></ion-input>
          </ion-item>
        </div>
        <ion-button
          expand="full"
          shape="round"
          @click="signin()"
          type="submit"
          class="button-color"
        >
          ログイン
        </ion-button>
        <div class="ion-padding">
          <p class="normally-text">え？まだアカウントを持っていない？</p>
          <p class="normally-text">そんなときは<a href="/signup">コチラ</a>から新規登録してね！</p>
        </div>
      </div>
      <ion-item>
        <ion-button
          type="submit"
          expand="block"
          @click="googleLogin()"
        >
          Login with Google
        </ion-button>
        <ion-button
          type="submit"
          expand="block"
          @click="githubLogin()"
        >
          Login with Github
        </ion-button>
        <ion-button
          type="submit"
          expand="block"
          @click="twitterLogin()"
        >
          Login with Twitter
        </ion-button>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { IonContent, IonPage, IonInput, IonButton, IonItem, IonLabel } from '@ionic/vue';
import { useRouter } from 'vue-router';
import firebase from 'firebase';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

export default defineComponent({
  name: "Login",
  components: {
    IonContent,
    IonPage,
    IonInput,
    IonButton,
    IonItem,
    IonLabel
  },
  setup() {
    const state = reactive({
      email : "",
      password: "",
    });
    const router = useRouter();

    const setToken = (resp) => {
      resp.user.getIdToken()
        .then(async (idToken) => {
          await Storage.set({
            key: 'jwt',
            value: idToken,
          });
          router.push('/home')
        })
    };

    const providerLogin = (provider) => {
      firebase.auth().signInWithPopup(provider)
        .then(resp => {
          setToken(resp);
        })
        .catch(err => {
          console.log(err);
        });
    }

    const login = () => {
      firebase.auth().signInWithEmailAndPassword(state.email, state.password)
        .then(resp => {
          setToken(resp);
        })
        .catch(err => {
          console.log(err);
        });
    };

    const googleLogin = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      providerLogin(provider);
    };

    const githubLogin = () => {
      const provider = new firebase.auth.GithubAuthProvider();
      providerLogin(provider);
    };

    const twitterLogin = () => {
      const provider = new firebase.auth.TwitterAuthProvider();
      providerLogin(provider);
    }

    return {
      state,
      login,
      googleLogin,
      githubLogin,
      twitterLogin,
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
  /* css変数のPRがマージされたら --background: var(--main-color)追加する */
  margin: 16px;
}



.normally-text{
  font-size: 14px;
  margin: 0;
  text-align: center;
}
</style>
