<template>
  <ion-app>
    <div v-if="error">{{ error }}</div>
    <Suspense>
      <template #default>
        <ion-router-outlet />
      </template>
      <template #fallback>
        <ion-loading
          :is-open="state.isOpen"
          message="Loading ..."
        >
        </ion-loading>
      </template>
    </Suspense>
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent, onErrorCaptured, reactive, ref, Ref } from 'vue';
import { IonLoading } from '@ionic/vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    IonLoading
  },
  setup() {
    const error: Ref<any> = ref(null);

    const state = reactive({
      isOpen: true,
    });

    onErrorCaptured(e => {
      error.value = e;
      state.isOpen = false;
      return true;
    });

    return {
      error,
      state,
    }
  }
});
</script>

<style>
:root{
  --main-color: rgba(251, 0, 255, 0.34);
  --gray-25: rgba(238,238,238,0.25);
  --gray-50: rgba(238,238,238,0.5);
  --gray-75: rgba(238,238,238,0.75);
  --gray-100: rgb(238,238,238);
}

/* https://ionicframework.com/jp/docs/theming/colors#new-color-creator */

.ion-color-twitter {
  --ion-color-base: #00aced;
  --ion-color-base-rgb: 0, 172, 237;
  --ion-color-contrast: #ffffff;
  --ion-color-contrast-rgb: 255, 255, 255;
  --ion-color-shade: #0097d1;
  --ion-color-tint: #1ab4ef;
}

.ion-color-github {
  --ion-color-base: #171515;
  --ion-color-base-rgb: 23,21,21;
  --ion-color-contrast: #ffffff;
  --ion-color-contrast-rgb: 255,255,255;
  --ion-color-shade: #141212;
  --ion-color-tint: #2e2c2c;
}

.ion-color-google {
  --ion-color-base: #dd5144;
  --ion-color-base-rgb: 221,81,68;
  --ion-color-contrast: #ffffff;
  --ion-color-contrast-rgb: 255,255,255;
  --ion-color-shade: #c2473c;
  --ion-color-tint: #e06257;
}


.ion-color-sakura {
  --ion-color-base: rgba(251,0,255,0.34);
  --ion-color-base-rgb: 251,0,255;
  --ion-color-contrast: #ffffff;
  --ion-color-contrast-rgb: 255,255,255;
  --ion-color-shade: #dd00e0;
  --ion-color-tint: #fb1aff;
}


/* 分析画面のアイコンで使用 */

.ion-color-gold-medal {
  --ion-color-base: #FFD700;
  --ion-color-base-rgb: 255,215,0;
  --ion-color-contrast: #000000;
  --ion-color-contrast-rgb: 0,0,0;
  --ion-color-shade: #e0bd00;
  --ion-color-tint: #ffdb1a;
}

.ion-color-silver-medal {
  --ion-color-base: #c0c0c0;
  --ion-color-base-rgb: 192,192,192;
  --ion-color-contrast: #000000;
  --ion-color-contrast-rgb: 0,0,0;
  --ion-color-shade: #a9a9a9;
  --ion-color-tint: #c6c6c6;
}

.ion-color-copper-medal {
  --ion-color-base: #976B2F;
  --ion-color-base-rgb: 151,107,47;
  --ion-color-contrast: #ffffff;
  --ion-color-contrast-rgb: 255,255,255;
  --ion-color-shade: #855e29;
  --ion-color-tint: #a17a44;
}



</style>
