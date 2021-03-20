<template>
  <ion-page>
    <ion-content>
      <h1>analytics</h1>
      <canvas id="graph"></canvas>
      <div class="ranking">
        <div class="ion-padding-top">
          <p class="normally-text">話した回数が多い言葉ベスト3</p>
        </div>
        <div class="ion-padding-top ion-padding-bottom">
          <div v-for="n in 3" :key="n">
            <RankingItem :top="true" class="item"/>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import { IonContent, IonPage } from '@ionic/vue';
import Chart from 'chart.js';
import RankingItem from '@/components/RankingItem'

export default defineComponent({
  name: "Analytics",
  components:{
    IonContent,
    IonPage,
    RankingItem
  },
  setup(){
    const fill = 'start';
    const createChart = (ctx) => {
      new Chart(ctx,{
        type: 'line',
        data: {
          labels: ['2021/01', '2021/02', '2021/03'],
          datasets: [
            {
              fill: fill,
              label: '話した言葉の総数',
              data: [6, 15, 9],
              type: 'line',
              borderColor: "rgba(251,0,255,0.34)",
              backgroundColor: "rgba(0,0,0,0)",
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
      createChart,
      fill
    }
  }
})
</script>

<style scoped>

.ranking{
  width: 80%;
  margin: 16px auto;
  background-color: var(--gray-50);
  border-radius: 24px;
}

.normally-text{
  font-size: 16px;
  margin: 0;
  text-align: center;
}


.item{
  margin: 8px 16px;
  background-color: #fefefe;
}
</style>
