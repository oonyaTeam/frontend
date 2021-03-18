<template>
  <div class="wrapper">
    <div class="ion-padding">
      <canvas :id="id"></canvas>
      <ion-button
        expand="full"
        shape="round"
        @click="emitChangeView"
      >
        もどす
      </ion-button>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import { IonButton } from '@ionic/vue';
import Chart from 'chart.js';

export default defineComponent({
  name: "Graph",
  props: {
    id: {
      type: String,
      required: true,
    }
  },
  components: {
    IonButton,
  },
  setup(props, context) {

    const emitChangeView = () => {
      context.emit("change-view");
    };

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
      const ctx = document.getElementById(props.id);
      createChart(ctx);
    })

    return {
      emitChangeView,
      createChart,
    };
  },
});
</script>

<style scoped>
.wrapper{
  width: 100%;
  /* mainBlockとのサイズ調整 */
  height: 100%;
  margin: auto;
  background-color: rgba(238, 238, 238, 0.5);
  border-radius: 24px;
}
</style>
