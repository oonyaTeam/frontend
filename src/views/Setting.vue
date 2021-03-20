<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="wrapper">
        <h1 class="center">設定</h1>
        <div class="ion-padding">
          <ion-item>
            <ion-label position="floating">
              deviceID
            </ion-label>
            <ion-input
                name="deviceId"
                type="text"
                required="true"
                v-model="state.deviceId"
            ></ion-input>
          </ion-item>
        </div>
        <ion-button
            expand="full"
            shape="round"
            type="submit"
            @click="setDeviceId()"
            class="button-color"
        >
          設定
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>


<script>
import { defineComponent, reactive } from 'vue';
import { IonContent, IonPage, IonItem, IonInput, IonButton, IonLabel } from '@ionic/vue';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

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
      deviceId : "",
    });
    const database = firebase.database();
    
    const setDeviceId = () => {
      const uid = firebase.auth().currentUser.uid;
      database.ref(`users/${uid}`).set({
        deviceId: state.deviceId,
      });
      console.log('set deviceid!')
    };

    return {
      state,
      setDeviceId,
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
