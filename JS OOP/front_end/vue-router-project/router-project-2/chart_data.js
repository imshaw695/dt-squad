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
        this.type = "line";
        this.labels = [];
        this.label = "Dry Temperature";
        this.backgroundColor = "rgba(54,73,93,.5)";
        this.borderColor = "#36495d";
        this.borderWidth = 3;
        this.datasets = [];
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
        console.log('temperature_data instantiated');
    }

    // this method will set the parameters that change depending on data in observations, ie. labels and data
    set_dynamic_params() {
        // Here I will need a function that returns the dates from individual observations by looping
        // over this.observations.observations.
        console.log('inside set_labels');
        for (const [index, observation] of Object.entries(this.observations.observations)) {
            for (const test in this.observations.observations.observation) {
                console.log(test)
            //     if (label == "data") {
            //         for (const [data_type, data2] of Object.entries(this.observations.observations.observation.data)) {
            //             console.log(this.observations.observation.label.data.date)
            //         }
            //     }
            }
        }
        return "work in progress"
    }

}