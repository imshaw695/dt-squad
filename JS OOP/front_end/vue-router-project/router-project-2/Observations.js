export class Observations {
    constructor() {
        console.log("Observations has been instantiated.")
        this.observations = [];
        this.getObservations();
        console.log(this.observations)
    }
    setObservations() {
        const observationsAsJson = JSON.stringify(this.observations);
        let cookieName = "observations";
        const expiryDate = new Date();
        expiryDate.setTime(expiryDate.getTime() + (10000 * 24 * 60 * 60 * 1000));
        let expires = "expires=" + expiryDate.toUTCString();
        document.cookie = cookieName + "=" + observationsAsJson + ";" + expires + ";path=/";
    }
    getObservations() {
        let name = "observations=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let cookieArray = decodedCookie.split(';');
        console.log(cookieArray)
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) == 0) {
                let observationsAsJson = cookie.substring(name.length, cookie.length);
                let observations = JSON.parse(observationsAsJson)
                this.observations = observations;
            }
            // what if there is no cookies to use?
        } 
    }
    
    deleteObservation(observationIndex) {
        this.observations.splice(observationIndex, 1);
        this.setObservations(this.observations);
    }
    addObservation(observation) {
        this.observations.push(observation);
        this.observations.sort(function(a,b) {
            return b.date - a.date
        });
        this.setObservations(this.observations);
    }
}
