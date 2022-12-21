<template>
  <h1>Inside ObservationTest.vue</h1>
  <p>{{ observation.cloudCodeDict }}</p>
  <div id="form1">
    <!-- <button @click="observationTemplate.createObservationTemplate()">
      Build template
    </button> -->
    <div id="formAuto"></div>
    <div id="cloudLayers"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    //   observationTemplate: observationTemplate,
    };
  },
  props: ['observation']
};
</script>