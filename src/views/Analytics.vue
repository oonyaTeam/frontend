<template>
  <ion-page>
    <ion-content>
      <div class="ranking">
        <p class="normally-text ion-padding-top">話した言葉の総数</p>
        <canvas id="graph" class="ion-padding-bottom"></canvas>
      </div>
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
              label: '',
              data: state.graphData,
              type: 'line',
              borderColor: "rgba(251,0,255,0.34)",
              backgroundColor: "rgba(251,0,255,0.34)",
            }
          ],
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
              ticks: {
                suggestedMax: Math.max(...state.graphData),
                suggestedMin: 0,
                stepSize: Math.max(...state.graphData) / 4,
                callback: function(value){
                  return  value +  '語'
                }
              }
            }]
          },
        }})
    };

    const rankingWords = computed(() => store.getters.rankingWords);

    onMounted(() => {
      const ctx = document.getElementById('graph');
      state.graphData = store.getters.items.map((item, index, items) => {
        let sum = 0;
        for(let i = 0; i < index; i++) {
          sum += items[i].sum;
        }
        return sum;
      });
      state.labels = store.getters.items.map(item => item.month);
      createChart(ctx);
    })

    await store.dispatch('getRanking');
    await store.dispatch('getItems');

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
