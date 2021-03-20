<template>
  <ion-page>
    <ion-content>
      <h1>analytics</h1>
      <canvas id="graph"></canvas>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import { IonContent, IonPage } from '@ionic/vue';
import Chart from 'chart.js';

export default defineComponent({
  name: "Analytics",
  components:{
    IonContent,
    IonPage
  },
  setup(){
    const createChart = (ctx) => {
      new Chart(ctx,{
        type: 'line',
        data: {
          labels: ['2021/01', '2021/02', '2021/03'],
          datasets: [
            {
              label: '話した言葉の総数',
              data: [6, 15, 37],
              borderColor: "rgba(255,0,0,1)",
              backgroundColor: "rgba(0,0,0,0)"
            }
          ],
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                suggestedMax: 40,
                suggestedMin: 0,
                stepSize: 10,
                callback: function(value, index, values){
                  return  value +  '語'
                }
              }
            }]
          },
        }})
    };
    onMounted(() => {
      const ctx = document.getElementById('graph');
      createChart(ctx);
    })

    return {
      createChart
    }
  }
})
</script>

<style scoped>

</style>
