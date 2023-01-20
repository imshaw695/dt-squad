<template>
  <h1>Data View</h1>
  <p>
    This page will collate data from previous observations saved to the cookies
    and display them in charts using charts.js
  </p>
  <canvas id="temperature_chart"></canvas>
  <div>
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import Chart from "chart.js/auto";
export default {
    props: ['observations','observation','temperature_chart_data', 'temperature_data'],
    mounted() {
        const canvas = document.getElementById("temperature_chart");
        const temperature_chart = new Chart(canvas, this.temperature_chart_data)
    },
    created() {
      this.temperature_data.set_dynamic_params();
    }
}
</script>