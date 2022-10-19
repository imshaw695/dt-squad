class Observation {
    constructor() {
        console.log("Observation has been instantiated.")
        this.encoded = "";
        this.cloudLayers = []
    }

    setDate(date) {
        this.date = date;
        console.log(`The date has just been update to: ${this.date}`);
        this.encodeData();
    }
    setLatitude(latitude) {
        this.latitude = latitude;
    }
    setQuadrant(quadrant) {
        this.quadrant = quadrant;
    }
    setLongitude(longitude) {
        this.longitude = longitude;
    }
    encodeData() {
        this.encoded = "";
        this.encoded = this.encoded + "date: " + this.date;
    }
    addCloudLayer(type, height, oktas) {
        console.log(type);
        const cloudLayer = new CloudLayer(type, height, oktas);
        this.cloudLayers.push(cloudLayer);
        console.log(this.cloudLayers)
    }
    deleteCloudLayer(cloudLayerIndex) {
        this.cloudLayers.splice(cloudLayerIndex, 1);
    }
}

class CloudLayer {
    constructor(type, height, oktas) {
        this.type = type;
        this.height = height;
        this.oktas = oktas;
    }
    getFormatted() {
        var formatted = `type: ${this.type}, height: ${this.height}, oktas: ${this.oktas}`;
        return formatted;
    }
}