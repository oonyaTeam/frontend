<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="wrapper">
        <h1 class="center">Liveraryにログイン</h1>
        <div class="ion-padding">
          <ion-item>
            <ion-label position="floating" color="sakura">
              email
            </ion-label>
            <ion-input
                color="sakura"
                name="email"
                type="email"
                v-model="state.email"
                required="true"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating" color="sakura">
              password
            </ion-label>
            <ion-input
                color="sakura"
                name="password"
                type="password"
                v-model="state.password"
                required="true"
            ></ion-input>
          </ion-item>
        </div>
        <ion-button
            color="sakura"
            class="ion-margin"
          expand="full"
          shape="round"
          @click="login()"
          type="submit"
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
            <ion-icon slot="start" color="google" :icon="logoGoogle"></ion-icon>
            Googleで続行
          </ion-button>
          <ion-button
              class="provider-login-button-color"
              type="submit"
              expand="full"
              shape="round"
              @click="githubLogin()"
          >
            <ion-icon slot="start" color="github" :icon="logoGithub"></ion-icon>
            GitHubで続行
          </ion-button>
          <ion-button
              class="provider-login-button-color"
              type="submit"
              expand="full"
              shape="round"
              @click="twitterLogin()"
          >
            <ion-icon slot="start" color="twitter" :icon="logoTwitter"></ion-icon>
            Twitterで続行
          </ion-button>
        </div>
        <div class="ion-padding">
          <p class="normally-text">え？まだアカウントを持っていない？</p>
          <p class="normally-text">そんなときは<router-link to="/signup">コチラ</router-link>から新規登録してね！</p>
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
