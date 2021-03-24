<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>設定</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">設定</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-list>
        <ion-item @click="showLogoutAlert">
          <ion-label color="danger">ログアウト</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { IonContent, IonPage, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, alertController, IonList } from '@ionic/vue';
import firebase from 'firebase/app';
import 'firebase/auth';
import { clearStorage } from '@/modules/storage';

export default defineComponent({
  name: "Signup",
  components: {
    IonContent,
    IonPage,
    IonItem,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonList
  },
  setup() {
    const router = useRouter()

    const logout = () => {
      firebase.auth().signOut()
        .then(() => {
          clearStorage();
          router.push('/login');
        })
        .catch(err => console.log(err));
    };

    const showLogoutAlert = async () => {
      const alert = await alertController.create({
        header: 'ログアウト',
        message: 'ログアウトしますか？',
        buttons: [
          {
            text: 'キャンセル',
            role: 'cancel'
          },
          {
            text: 'ログアウトする',
            handler: (): void => {
              logout();
            }
          }
        ]
      });
      await alert.present();
    }

    return {
      showLogoutAlert,
    }
  }
});
</script>

<style scoped>

</style>
