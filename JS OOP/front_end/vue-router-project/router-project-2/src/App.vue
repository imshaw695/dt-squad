<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="container">
    <nav class="navbar navbar-expand bg-light">
      <ul class="navbar-nav">
        <li class="nav-item">
          <RouterLink to="/" class="nav-link px-2">Home</RouterLink>
        </li>
        <li class="nav-item">  
          <RouterLink to="/viewobservations" class="nav-link px-2">View Observations</RouterLink>
        </li>
        <li class="nav-item"> 
          <RouterLink to="/createobservation" class="nav-link px-2">Create Observation</RouterLink>
        </li>
        <li class="nav-item"> 
          <RouterLink to="/data" class="nav-link px-2">View Data</RouterLink>
        </li>
      </ul>
    </nav>
    <RouterView :observation="observation" :observations="observations" :temperature_chart_data="temperature_chart_data" :temperature_data="temperature_data" />
  </div>
</template>

<script>
import { reactive } from "vue";
import { Observation } from "../Observation.js";
import { Observations } from "../Observations.js";
import temperature_chart_data from "../chart_data";
import { Temperature_data } from "../chart_data";
import ObservationTest from "./components/ObservationTest.vue";
const observation = reactive(new Observation());
const observations = reactive(new Observations());
const temperature_data = reactive(new Temperature_data(observations));
export default {
  data() {
    return {
      observation: observation,
      observations: observations,
      temperature_chart_data: temperature_chart_data,
      temperature_data: temperature_data,
    };
  },
  components: {
    ObservationTest,
  },
};
</script>

<style>

</style>
