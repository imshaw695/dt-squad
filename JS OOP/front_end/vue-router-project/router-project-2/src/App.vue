<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <nav style="">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/createobservation">Create Observation</RouterLink>
  </nav>

  <div class="container">
    <RouterView :observation="observation" :observations="observations" />
  </div>
</template>

<script>
import { Observation } from "../Observation.js";
import { Observations } from "../Observations.js";
import ObservationTest from "./components/ObservationTest.vue";
const observation = new Observation();
const observations = new Observations();

export default {
  data() {
    return {
      observation: observation,
      observations: observations,
    };
  },
  components: {
    ObservationTest,
  },
  methods: {
    clickTest() {
      console.log(observation.generatehshsDict());
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
