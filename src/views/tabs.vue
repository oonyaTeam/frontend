<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="AllWord" href="/allword">
          <ion-icon :icon="leafOutline"></ion-icon>
          <ion-label>一覧</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="Analytics" href="/analytics">
          <ion-icon :icon="analyticsOutline"></ion-icon>
          <ion-label>分析</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="Setting" href="/setting">
          <ion-icon :icon="settingsOutline"></ion-icon>
          <ion-label>設定</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/vue';
import { leafOutline, analyticsOutline, settingsOutline } from 'ionicons/icons';

export default defineComponent({
  name: "tabs",
  components:{
    IonPage,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel
  },
  setup(){
    return {
      leafOutline,
      analyticsOutline,
      settingsOutline
    }
  },
})
</script>

<style scoped>

</style>
