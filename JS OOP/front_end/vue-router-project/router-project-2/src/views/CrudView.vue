<template>
  <div class="card mt-0">
    <h1 class="py-2" style="text-align:center">Observations</h1>
    <ul class="list-group">
      <li v-for="observation in observations.observations" :key="observation.date" class="list-group-item text-center">
        {{ observation.date }} - {{ observation.encodedObservation }} - {{ observation.data }}
        <button v-on:click="this.delete(this.observations.observations.indexOf(observation));this.getObservations()" class="btn btn-danger">Delete</button>
        <button @click="this.set_index(this.observations.observations.indexOf(observation))" class="btn btn-primary">Edit</button>
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
    },
    set_index(index) {
      this.observations.edit_observation_index = index;
      // console.log(this.observations.edit_observation_index)
      this.$router.push({ name: 'editobservation' });
    }
  },
  computed: {
    length: function() {
      return this.observations.observations.length
    },
  }
}
</script>>
