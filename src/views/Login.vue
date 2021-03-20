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
          @click="login()"
          type="submit"
          class="button-color"
        >
          ログイン
        </ion-button>
        <p class="normally-text gray">または</p>
        <div class="ion-padding">
          <ion-button
              class="provider-login-button-color"
              type="submit"
              expand="full"
              shape="round"
              @click="googleLogin()"
          >
            <ion-icon slot="start" :icon="logoGoogle"></ion-icon>
            Googleで続行
          </ion-button>
          <ion-button
              class="provider-login-button-color"
              type="submit"
              expand="full"
              shape="round"
              @click="githubLogin()"
          >
            <ion-icon slot="start" :icon="logoGithub"></ion-icon>
            GitHubで続行
          </ion-button>
          <ion-button
              class="provider-login-button-color"
              type="submit"
              expand="full"
              shape="round"
              @click="twitterLogin()"
          >
            <ion-icon slot="start" :icon="logoTwitter"></ion-icon>
            Twitterで続行
          </ion-button>
        </div>
        <div class="ion-padding">
          <p class="normally-text">え？まだアカウントを持っていない？</p>
          <p class="normally-text">そんなときは<a href="/signup">コチラ</a>から新規登録してね！</p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { IonContent, IonPage, IonInput, IonButton, IonItem, IonLabel, IonIcon } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { logoGoogle, logoGithub, logoTwitter } from 'ionicons/icons';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import setJwtAndRefreshToken from '@/modules/setJwtAndRefreshToken';
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
    IonLabel,
    IonIcon
  },
  setup() {
    const state = reactive({
      email : "",
      password: "",
    });
    const router = useRouter();

    const database = firebase.database();

    const setToken = (resp) => {
      resp.user.getIdToken()
        .then((idToken) => setJwtAndRefreshToken(idToken.toString(), resp.user.refreshToken.toString()))
        .catch((err) => console.log(err));
    };

    const providerLogin = (provider) => {
      firebase.auth().signInWithPopup(provider)
        .then(async resp => {
          setToken(resp);
          const uid = firebase.auth().currentUser.uid;
          database.ref(`users/${uid}`).once('value', snapshot => {
            if (snapshot.exists()) {
              router.push('/allword');
            } else {
              router.push('/device');
            }
          });
          
        })
        .catch(err => {
          console.log(err);
        });
    }


    const login = () => {
      firebase.auth().signInWithEmailAndPassword(state.email, state.password)
        .then(resp => {
          setToken(resp);
          router.push('/allword');
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
      logoGoogle,
      logoGithub,
      logoTwitter
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

.gray{
  color: rgb(138, 138, 138);
}

.provider-login-button-color{
  color: #42526e;
  --background: white;
  text-transform: none;
}

.normally-text{
  font-size: 14px;
  margin: 0;
  text-align: center;
}
</style>
