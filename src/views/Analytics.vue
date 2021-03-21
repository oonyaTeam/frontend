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
          <div v-for="(word, index) in rankingWords" :key="word.text">
            <ranking-item :index="index" :word="word" class="item"/>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent, onMounted, computed, reactive } from 'vue';
import { IonContent, IonPage } from '@ionic/vue';
import { useStore } from 'vuex'
import Chart from 'chart.js';
import RankingItem from "@/components/RankingItem";

export default defineComponent({
  name: "Analytics",
  components:{
    RankingItem,
    IonContent,
    IonPage
  },
  async setup(){
    const store = useStore();

    const state = reactive({
      graphData: [],
      labels: [],
    })
    
    const createChart = (ctx) => {
      new Chart(ctx,{
        type: 'line',
        data: {
          labels: state.labels,
          datasets: [
            {
              fill: 'start',
              label: '話した言葉の総数',
              data: state.graphData,
              type: 'line',
              borderColor: "rgba(251,0,255,0.34)",
              backgroundColor: "rgba(251,0,255,0.34)",
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
      state.graphData = store.getters.items.map(item => item.sum);
      state.labels = store.getters.items.map(item => item.month);
      createChart(ctx);
    })

    await store.dispatch('getRanking');
    await store.dispatch('getItems');

    const rankingWords = computed(() => store.getters.rankingWords);
    
    return {
      createChart,
      rankingWords,
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
