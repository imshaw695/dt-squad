<template>
  <div>
    <displayObservations />
  </div>
</template>

<script>
import displayObservations from "./components/displayObservations.vue";

export default {
  name: "App",
  components: {
    displayObservations
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
  margin-top: 60px;
}
</style>
