// this first dictionary below is purely as a test!

export const temperature_chart_data = {
    type: "line",
    data: {
        labels: ["0600 Jan 04", "0700 Jan 04", "0800 Jan 04", "0900 Jan 04", "1000 Jan 04", "1100 Jan 04", "1200 Jan 04"],
        datasets: [
            {
                label: "Air Temperature",
                data: [12, 13, 14, 15, 16, 17, 18],
                backgroundColor: "rgba(54,73,93,.5)",
                borderColor: "#36495d",
                borderWidth: 3
            }
        ]
    },
    options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
}

export default temperature_chart_data;

export class Temperature_data {
    constructor(observations) {
        this.observations = observations;
        this.test = "";
        this.type = "line";
        this.data_type = "";
        this.labels = [];
        this.label = "";
        this.backgroundColor = "rgba(54,73,93,.5)";
        this.borderColor = "#36495d";
        this.borderWidth = 3;
        this.datasets_data = []
        this.datasets = [{
            label: this.label,
            data: this.datasets_data,
        }];
        this.data = {
            labels: this.labels,
            datasets: this.datasets
        };
        this.options = {
            scales: {
                y: {
                  beginAtZero: true
                }
              }
        };
        this.data_structure = {};
        console.log('temperature_data instantiated');
        // this.create_data_structure();
        // this.set_dynamic_params();
    }


    //this method just takes this.data_type and sets the label with it.
    set_label() {
        switch(this.data_type) {
            case "wspeed":
                this.label = "Wind Speed"
                break;
            case "dbulb":
                this.label = "Dry Bulb Temperature"
                break;
            case "dpoint":
                this.label = "Dew point temperature"
                break;
            case "pressure":
                this.label = "Pressure"
                break;
            case "pressurechange":
                this.label = "Pressure Change"
                break;
            case "visibility":
                this.label = "Visibility (M)"
                break;
            case "seatemp":
                this.label = "Sea Surface Temperature"
                break;
            case "seaperiod":
                this.label = "Sea Period"
                break;
            case "seaheight":
                this.label = "Sea Height"
                break;
            case "swellheight1":
                this.label = "Swell Height 1" 
                break;
            case "swellheight2":
                this.label = "Swell Height 2" 
                break;
            case "swellperiod1":
                this.label = "Swell Period 1" 
                break;
            case "swellperiod2":
                this.label = "Swell Period 2" 
                break;
            case "cloudTotal":
                this.label = "Total Cloud" 
                break;
            case "lowCloudTotal":
                this.label = "Total Low Cloud" 
                break;
        }

        return this.label;
    }

    // this function takes the data_type selected from the drop down and gathers data from observations.
    // set_datasets_data() {
    //     this.datasets_data = [];
        

    // }

    // this method will set the parameters that change depending on data in observations, ie. labels and data
    set_dynamic_params() {
        // Here I will need a function that returns the dates from individual observations by looping
        // over this.observations.observations.
        this.datasets_data = []
        this.labels = []
        let key = `${this.data_type}`
        for (const [index, observation] of Object.entries(this.observations.observations)) {
            this.labels.push(observation.date);
            this.datasets_data.push(observation[key])

        }
        return [this.datasets_data, this.labels]
    }

    create_data_structure() {
        console.log("inside create_data_structure")
        this.set_label();
        this.datasets = [{
            label: this.label,
            data: this.datasets_data,
        }];
        this.data = {
            labels: this.labels,
            datasets: this.datasets
        };
        this.data_structure.type = this.type,
        this.data_structure.data = this.data,
        this.data_structure.options = this.options
    }
}