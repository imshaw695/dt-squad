<template>
  <nav>
    <router-link to="/">Home</router-link> 
    <router-link to="/about">About</router-link>
    <router-link to="/createobservation">Create Observation</router-link>
  </nav>
  <div class="container">
    <router-view :observation="observation"/>
  </div>
</template>

<script>
import {Observation} from '../Observation.js';
import ObservationTest from './components/ObservationTest.vue'
const observation = new Observation();

export default {
  data() {
    return {
      observation:observation
    }
  },
  components: {
    ObservationTest
  },
  methods: {
    clickTest() {
      console.log(observation.generatehshsDict())
    }
  }
}
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
