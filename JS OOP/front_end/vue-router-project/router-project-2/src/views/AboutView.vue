<template>
  <div class="about">
    <h1>This is an about page</h1>
    <ul>
      <li v-for="observation in observations.observations">
        {{ observation.date }} - {{ observation.encodedObservation }}
        <button v-on:click="this.observations.deleteObservation(this.observations.observations.indexOf(observation))">Delete Observation</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["observations"],
}
</script>>
