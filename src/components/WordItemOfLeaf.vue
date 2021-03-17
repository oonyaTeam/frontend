<template>
  <div class="item-wrapper">
    <div>
      <p class="normally-text">{{ word.date }}</p>
      <p class="speech-text">{{ word.text }}</p>
    </div>
    <ion-icon class="icon" size="large" :icon="trashOutline" @click="deleteWord"></ion-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { trashOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/vue';
import { Word } from '@/types';

export default defineComponent({
  name: "WordItem",
  components: {
    IonIcon
  },
  props: {
    word: {
      type: Object as PropType<Word>,
      required: true,
    },
  },
  setup(){
    return {
      trashOutline
    }
  },
  methods: {
    deleteWord() {
      this.$store.dispatch('deleteWord', this.word.text);
    }
  }
});
</script>

<style scoped>
.item-wrapper{
  padding-top: 30%;
  text-align: center;
}

.normally-text{
  font-size: 16px;
  margin: 0;
}

.speech-text{
  font-size: 24px;
  margin: 0;
}

.icon{
  margin-left: auto;
}
</style>
