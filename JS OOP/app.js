const app = Vue.createApp({
    data() {
        return {
            // I can pull encoded observation out of Observation.js, then loop over it using v-for
            encodedObservation: {
                "May 1":111111,
                "May 2":222222,
                "May 3":333333,
                "May 4":444444
            },
            encodedObservations: observations.observations
        }
    },
})

app.mount("#app")