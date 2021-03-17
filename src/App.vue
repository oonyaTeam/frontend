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