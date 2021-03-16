<template>
  <div class="wrapper">
    <div class="content padding">
      <img src="../../public/assets/image.png" alt="logo">
      <ion-icon class="icon" :icon="settingsOutline" size="large"></ion-icon>
    </div>
  </div>
</template>

<script>
import { settingsOutline } from 'ionicons/icons';
export default {
  name: "Header",
  setup(){
    return {
      settingsOutline
    }
  }
}
</script>

<style scoped>
.wrapper{
  margin-top: 16px;
  margin-bottom: 24px;
}

.content{
  width: 80%;
  margin: auto;
  display: flex;
  align-items: center;
  background-color: rgba(238,238,238, 0.5);
  border-radius: 24px;
}

img{
  height: 40px;
  display: inline-block;
}

.icon{
  margin-left: auto;
}

.padding{
  padding: 4px 16px;
}
</style>
