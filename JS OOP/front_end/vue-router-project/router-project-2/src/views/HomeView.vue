<script setup>
</script>

<template>
  <main>
    <p>Welcome to the observation web application prototype, please process to the "Create Observation" page in order to start compiling your observation.</p>
    <input type="text" v-model="this.test_dict.test_item">
    <p>{{ this.test_dict }}</p>
  </main>
</template>

<script>
export default {
  data() {
    return {
      test_dict: {}
    }
  }
}
</script>