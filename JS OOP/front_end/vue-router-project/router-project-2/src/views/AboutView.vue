<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1>{{ length }}</h1>
    <h1>{{ test }}</h1>
    <ul>
      <li v-for="observation in observations.observations" :key="observation.date">
        {{ observation.date }} - {{ observation.encodedObservation }}
        <button v-on:click="this.delete(this.observations.observations.indexOf(observation));this.getObservations()">Delete Observation</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default { 
  data() {
    return {
      test: "",
    }
  },
  props: ["observations"],
  methods: {
    delete(observationIndex) {
      this.observations.deleteObservation(observationIndex)
    },
    getObservations() {
      this.test = this.observations.getObservations();
    }
  },
  computed: {
    length: function() {
      return this.observations.observations.length
    },
  }
}
</script>>
