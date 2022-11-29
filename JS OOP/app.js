const app = Vue.createApp({
    data() {
        return {
            // I can pull encoded observation out of Observation.js, then loop over it using v-for
            encodedObservations: observations.observations
        }
    },
    methods: {
        setObservations() {
            const observationsAsJson = JSON.stringify(this.encodedObservations);
            let cookieName = "observations";
            const expiryDate = new Date();
            expiryDate.setTime(expiryDate.getTime() + (10000 * 24 * 60 * 60 * 1000));
            let expires = "expires=" + expiryDate.toUTCString();
            document.cookie = cookieName + "=" + observationsAsJson + ";" + expires + ";path=/";
        },
        deleteObservation(observationIndex) {
            this.encodedObservations.splice(observationIndex, 1);
            this.setObservations(this.encodedObservations);
        }
    }
})

app.mount("#app")