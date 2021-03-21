import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { store } from './store';

import { IonicVue } from '@ionic/vue';

import firebase from 'firebase/app';

import '@/plugins/axios';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

const firebaseConfig = {
  apiKey: "AIzaSyCHhAssGCGUBhG0OaTGRTW_jkZmB25eZvg",
  authDomain: "liverary-c4f5d.firebaseapp.com",
  projectId: "liverary-c4f5d",
  storageBucket: "liverary-c4f5d.appspot.com",
  messagingSenderId: "320387739512",
  appId: "1:320387739512:web:064a116e4d6cd1249be28d",
  measurementId: "G-ETR7YRD13N"
};

firebase.initializeApp(firebaseConfig);

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(store);
  
router.isReady().then(() => {
  app.mount('#app');
});