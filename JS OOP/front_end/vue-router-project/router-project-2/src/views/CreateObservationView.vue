<template>
  <div class="container">
    <h1 class="display-3" style="text-align: center">New Observation</h1>
    <div class="card" style="padding: 5px">
      <div class="card fixed fw-bold px-3 bg-dark text-light mt-2" id="encodedData">
        {{ this.encoded_observation }}
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-3 text-start">
            <label class="form-label mt-2" for="datetime">Date</label>
          </div>
          <div class="col-9">
            <input
              type="datetime-local"
              class="form-control"
              id="datetime"
              name="datetime"
              v-on:change="this.observation.setDatetime()"
              v-model="observation.date"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-3 text-start">
            <label class="form-label mt-2">Latitude</label>
          </div>
          <div class="col-9">
            <input
              type="text"
              class="form-control"
              :class="this.latitudeClass"
              v-on:change="setLatitude()"
              v-model="observation.latitude"
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col-3 text-start">
            <label class="form-label mt-2">Quadrant</label>
          </div>
          <div class="col-9">
            <input
              type="text"
              class="form-control"
              :class="this.quadrantClass"
              v-on:change="setQuadrant()"
              v-model="observation.quadrant"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-3 text-start">
            <label class="form-label mt-2">Longitude</label>
          </div>
          <div class="col-9">
            <input
              type="text"
              class="form-control"
              :class="this.longitudeClass"
              v-on:change="setLongitude()"
              v-model="observation.longitude"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-3 text-start">
            <label class="form-label mt-2">Wind Direction</label>
          </div>
          <div class="col-9">
            <input
              type="text"
              class="form-control"
              :class="this.wdirectionClass"
              v-on:change="setWdirection()"
              v-model="observation.wdirection"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-3 text-start">
            <label class="form-label mt-2">Wind Speed</label>
          </div>
          <div class="col-9">
            <input
              type="text"
              class="form-control"
              :class="this.wspeedClass"
              v-on:change="setWspeed()"
              v-model="observation.wspeed"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-3 text-start">
            <label class="form-label mt-2">Ds</label>
          </div>
          <div class="col-9">
            <input
              type="text"
              class="form-control"
              :class="this.dsClass"
              v-on:change="setDs()"
              v-model="observation.ds"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-3 text-start">
            <label class="form-label mt-2">Vs</label>
          </div>
          <div class="col-9">
            <input
              type="text"
              class="form-control"
              :class="this.vsClass"
              v-on:change="setVs()"
              v-model="observation.vs"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-3 text-start">
            <label class="form-label mt-2">Drybulb</label>
          </div>
          <div class="col-9">
            <input
              type="text"
              class="form-control"
              :class="this.dbulbClass"
              v-on:change="setDbulb()"
              v-model="observation.dbulb"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-3 text-start">
            <label class="form-label mt-2">Dewpoint</label>
          </div>
          <div class="col-9">
            <input
              type="text"
              class="form-control"
              :class="this.dpointClass"
              v-on:change="setDpoint()"
              v-model="observation.dpoint"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-3 text-start">
            <label class="form-label mt-2">Pressure</label>
          </div>
          <div class="col-9">
            <input
              type="text"
              class="form-control"
              :class="this.pressureClass"
              v-on:change="setPressure()"
              v-model="observation.pressure"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-3 text-start">
            <label class="form-label mt-2">Tendency</label>
          </div>
          <div class="col-9">
            <select
              class="form-control"
              :class="this.tendencyClass"
              v-on:change="setTendency()"
              v-model="observation.tendency"
            >
              <option value="0">0 - Rising then falling, same or higher</option>
              <option value="1">1 - Rising then steady, higher</option>
              <option value="2">2 - Increasing steadily, higher</option>
              <option value="3">
                3 - Falling or steady, then rising, higher
              </option>
              <option value="4">4 - Steady, same</option>
              <option value="5">5 - Falling then rising, lower</option>
              <option value="6">6 - Falling then steady, lower</option>
              <option value="7">7 - Falling steadily, lower</option>
              <option value="8">
                8 - Rising or steady, then falling, lower
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-3 text-start">
            <label class="form-label mt-2">Pressure Change</label>
          </div>
          <div class="col-9">
            <input
              type="text"
              class="form-control"
              :class="this.pressureChangeClass"
              v-on:change="setPressureChange()"
              v-model="observation.pressurechange"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-3 text-start">
            <label class="form-label mt-2">Weather</label>
          </div>
          <div class="col-9">
            <input
              type="text"
              class="form-control"
              :class="this.weatherClass"
              v-on:change="setWeather()"
              v-model="observation.weather"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-3 text-start">
            <label class="form-label mt-2">Past Weather</label>
          </div>
          <div class="col-9">
            <input
              type="text"
              class="form-control"
              :class="this.pastWeatherClass"
              v-on:change="setPastweather()"
              v-model="observation.pastweather"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-3 text-start">
            <label class="form-label mt-2">Visibility</label>
          </div>
          <div class="col-7">
            <input
              type="text"
              class="form-control"
              :class="this.visibilityClass"
              v-on:change="setVisibility()"
              v-model="observation.visibility"
            />
          </div>
          <div class="col-2">
            <select
              class="form-control"
              :class="this.distanceMetricClass"
              v-on:change="setVisibility()"
              v-model="observation.distanceMetric"
            >
              <option value="km">KM</option>
              <option value="m">M</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-3 text-start">
            <label class="form-label mt-2">SST</label>
          </div>
          <div class="col-7">
            <input
              type="text"
              class="form-control"
              :class="this.seatempClass"
              v-on:change="setSeatemp()"
              v-model="observation.seatemp"
            />
          </div>
          <div class="col-2">
            <select
              class="form-control"
              :class="this.methodClass"
              v-on:change="setSeatemp()"
              v-model="observation.method"
            >
              <option value="intake">Intake</option>
              <option value="seabucket">Sea bucket</option>
              <option value="sonar2013">Sonar 2013</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-3 text-start">
            <label class="form-label mt-2">Sea Period</label>
          </div>
          <div class="col-9">
            <input
              type="text"
              class="form-control"
              :class="this.seaperiodClass"
              v-on:change="setSeaperiod()"
              v-model="observation.seaperiod"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-3 text-start">
            <label class="form-label mt-2">Sea Height</label>
          </div>
          <div class="col-9">
            <input
              type="text"
              class="form-control"
              :class="this.seaheightClass"
              v-on:change="setSeaheight()"
              v-model="observation.seaheight"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-3 text-start">
            <label class="form-label mt-2">1st Swell Direction</label>
          </div>
          <div class="col-9">
            <input
              type="text"
              class="form-control"
              :class="this.swelldir1Class"
              v-on:change="setSwelldir1()"
              v-model="observation.swelldir1"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-3 text-start">
            <label class="form-label mt-2">1st Swell Period</label>
          </div>
          <div class="col-9">
            <input
              type="text"
              class="form-control"
              :class="this.swellperiod1Class"
              v-on:change="setSwellperiod1()"
              v-model="observation.swellperiod1"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-3 text-start">
            <label class="form-label mt-2">1st Swell Height</label>
          </div>
          <div class="col-9">
            <input
              type="text"
              class="form-control"
              :class="this.swellheight1Class"
              v-on:change="setSwellheight1()"
              v-model="observation.swellheight1"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-3 text-start">
            <label class="form-label mt-2">2nd Swell Direction</label>
          </div>
          <div class="col-9">
            <input
              type="text"
              class="form-control"
              :class="this.swelldir2Class"
              v-on:change="setSwelldir2()"
              v-model="observation.swelldir2"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-3 text-start">
            <label class="form-label mt-2">2nd Swell Period</label>
          </div>
          <div class="col-9">
            <input
              type="text"
              class="form-control"
              :class="this.swellperiod2Class"
              v-on:change="setSwellperiod2()"
              v-model="observation.swellperiod2"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-3 text-start">
            <label class="form-label mt-2">2nd Swell Height</label>
          </div>
          <div class="col-9">
            <input
              type="text"
              class="form-control"
              :class="this.swellheight2Class"
              v-on:change="setSwellheight2()"
              v-model="observation.swellheight2"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-3 text-start">
            <label class="form-label mt-2">Total Cloud</label>
          </div>
          <div class="col-9">
            <input
              type="text"
              class="form-control"
              :class="this.cloudTotalClass"
              v-on:change="setCloudTotal()"
              v-model="observation.cloudTotal"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-3 text-start">
            <label class="form-label mt-2">Total Low Cloud</label>
          </div>
          <div class="col-9">
            <input
              type="text"
              class="form-control"
              :class="this.lowCloudTotalClass"
              v-on:change="setLowCloudTotal()"
              v-model="observation.lowCloudTotal"
            />
          </div>
        </div>
        <div class="row mt-2 mb-0">
          <div class="col-3 text-start">
            <label class="form-label mt-2 mb-0">Type</label>
          </div>
          <div class="col-3 text-start">
            <label class="form-label mt-2 mb-0">Height</label>
          </div>
          <div class="col-3 text-start">
            <label class="form-label mt-2 mb-0">Oktas</label>
          </div>
        </div>
        <div class="row mt-0 mb-2">
          <div class="col-3">
            <input
              type="text"
              class="form-control"
              :class="this.cloudTypeClass"
              v-on:keyup="cloudTypeEntered()"
              v-model="type"
            />
          </div>
          <div class="col-3">
            <input
              type="text"
              class="form-control"
              :class="this.cloudHeightClass"
              v-on:keyup="cloudHeightEntered()"
              v-model="height"
            />
          </div>
          <div class="col-3">
            <input
              type="text"
              class="form-control"
              :class="this.cloudOktasClass"
              v-model="oktas"
            />
          </div>
          <div class="col-3">
            <button
              type="button"
              v-on:click="
                this.addCloud();
                this.observation.setCloud(this.observation.lowest);
                this.observation.setLowestCloudHeight();
                this.observation.setCloudlayers();
                this.observation.checkCloudLayers();
              "
              class="btn btn-primary"
            >
              Save cloud layer
            </button>
          </div>
        </div>
        <div class="row my-2">
          <div class="col-3">
            <ul class="list-group">
              <li
                class="list-group-item"
                v-for="validCloud in this.validClouds"
                v-on:click="
                  this.type = validCloud;
                  this.validClouds = '';
                "
              >
                {{ validCloud }}
              </li>
            </ul>
          </div>
          <div class="col-3">
            <ul class="list-group">
              <li
                class="list-group-item"
                v-for="validHeight in this.validHeights"
                v-on:click="
                  this.height = validHeight;
                  this.validHeights = '';
                "
              >
                {{ validHeight }}
              </li>
            </ul>
          </div>
        </div>
        <div class="row my-2">
          <ul class="list-group">
            <li
              class="list-group-item text-center"
              v-for="(cloudLayer, cloudLayerIndex) in this.observation
                .cloudLayers"
            >
              Cloud type:
              {{ this.observation.cloudLayers[cloudLayerIndex].type }} - Height:
              {{ this.observation.cloudLayers[cloudLayerIndex].height }}ft -
              Oktas: {{ this.observation.cloudLayers[cloudLayerIndex].oktas }}
              <button
                type="button"
                v-on:click="
                  this.observation.deleteCloudLayer(cloudLayerIndex);
                  this.observation.setCloudlayers();
                "
                class="btn btn-danger"
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="row px-4">
        <button v-on:click="this.saveObservation()" class="btn btn-primary">
          Submit Observation
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      latitudeClass: "",
      quadrantClass: "",
      longitudeClass: "",
      seaheightClass: "",
      swelldir1Class: "",
      swellperiod1Class: "",
      swellheight1Class: "",
      swelldir2Class: "",
      swellperiod2Class: "",
      swellheight2Class: "",
      cloudTypeClass: "",
      cloudHeightClass: "",
      cloudOktasClass: "",
      wdirectionClass: "",
      wspeedClass: "",
      dsClass: "",
      vsClass: "",
      dbulbClass: "",
      dpointClass: "",
      pressureClass: "",
      tendencyClass: "",
      pressureChangeClass: "",
      weatherClass: "",
      pastWeatherClass: "",
      visibilityClass: "",
      distanceMetricClass: "",
      seatempClass: "",
      methodClass: "",
      seaperiodClass: "",
      cloudTotalClass: "",
      lowCloudTotalClass: "",
      type: "",
      height: "",
      oktas: "",
      validHeights: "",
      validClouds: "",
      is_valid: true,
      data_dict: {},
    };
  },
  methods: {
    // manipulate date to encode it, but should this be under the computed property?
    setLatitude() {
      const valid = this.observation.setLatitude();
      if (!valid) {
        this.latitudeClass = "is-invalid";
        this.is_valid = false;
      } else {
        this.latitudeClass = "is-valid";
        this.is_valid = true;
      }
    },
    setQuadrant() {
      const valid = this.observation.setQuadrant();
      if (!valid) {
        this.quadrantClass = "is-invalid";
      } else {
        this.quadrantClass = "is-valid";
      }
    },
    setLongitude() {
      const valid = this.observation.setLongitude();
      if (!valid) {
        this.longitudeClass = "is-invalid";
      } else {
        this.longitudeClass = "is-valid";
      }
    },
    setWdirection() {
      const valid = this.observation.setWdirection();
      if (!valid) {
        this.wdirectionClass = "is-invalid";
      } else {
        this.wdirectionClass = "is-valid";
      }
    },
    setWspeed() {
      const valid = this.observation.setWspeed();
      if (!valid) {
        this.wspeedClass = "is-invalid";
      } else {
        this.wspeedClass = "is-valid";
      }
    },
    setDs() {
      const valid = this.observation.setDs();
      if (!valid) {
        this.dsClass = "is-invalid";
      } else {
        this.dsClass = "is-valid";
      }
    },
    setVs() {
      const valid = this.observation.setVs();
      if (!valid) {
        this.vsClass = "is-invalid";
      } else {
        this.vsClass = "is-valid";
      }
    },
    setDbulb() {
      const valid = this.observation.setDbulb();
      if (!valid) {
        this.dbulbClass = "is-invalid";
      } else {
        this.dbulbClass = "is-valid";
      }
    },
    setDpoint() {
      const valid = this.observation.setDpoint();
      if (!valid) {
        this.dpointClass = "is-invalid";
      } else {
        this.dpointClass = "is-valid";
      }
    },
    setPressure() {
      const valid = this.observation.setPressure();
      if (!valid) {
        this.pressureClass = "is-invalid";
      } else {
        this.pressureClass = "is-valid";
      }
    },
    setTendency() {
      const valid = this.observation.setTendency();
      if (!valid) {
        this.tendencyClass = "is-invalid";
      } else {
        this.tendencyClass = "is-valid";
      }
    },
    setPressureChange() {
      const valid = this.observation.setPressureChange();
      if (!valid) {
        this.pressureChangeClass = "is-invalid";
      } else {
        this.pressureChangeClass = "is-valid";
      }
    },
    setWeather() {
      const valid = this.observation.setWeather();
      if (!valid) {
        this.weatherClass = "is-invalid";
      } else {
        this.weatherClass = "is-valid";
      }
    },
    setPastweather() {
      const valid = this.observation.setPastweather();
      if (!valid) {
        this.pastWeatherClass = "is-invalid";
      } else {
        this.pastWeatherClass = "is-valid";
      }
    },
    setVisibility() {
      const valid = this.observation.setVisibility();
      if (!valid) {
        this.visibilityClass = "is-invalid";
        this.distanceMetricClass = "is-invalid";
      } else {
        this.visibilityClass = "is-valid";
        this.distanceMetricClass = "is-valid";
      }
    },
    setSeatemp() {
      const valid = this.observation.setSeatemp();
      if (!valid) {
        this.seatempClass = "is-invalid";
      } else {
        this.seatempClass = "is-valid";
      }
    },
    setSeaperiod() {
      const valid = this.observation.setSeaperiod();
      if (!valid) {
        this.seaperiodClass = "is-invalid";
      } else {
        this.seaperiodClass = "is-valid";
      }
    },
    setSeaheight() {
      const valid = this.observation.setSeaheight();
      if (!valid) {
        this.seaheightClass = "is-invalid";
      } else {
        this.seaheightClass = "is-valid";
      }
    },
    setSwelldir1() {
      const valid = this.observation.setSwelldir1();
      if (!valid) {
        this.swelldir1Class = "is-invalid";
      } else {
        this.swelldir1Class = "is-valid";
      }
    },
    setSwelldir2() {
      const valid = this.observation.setSwelldir2();
      if (!valid) {
        this.swelldir2Class = "is-invalid";
      } else {
        this.swelldir2Class = "is-valid";
      }
    },
    setSwellperiod1() {
      const valid = this.observation.setSwellperiod1();
      if (!valid) {
        this.swellperiod1Class = "is-invalid";
      } else {
        this.swellperiod1Class = "is-valid";
      }
    },
    setSwellperiod2() {
      const valid = this.observation.setSwellperiod2();
      if (!valid) {
        this.swellperiod2Class = "is-invalid";
      } else {
        this.swellperiod2Class = "is-valid";
      }
    },
    setSwellheight1() {
      const valid = this.observation.setSwellheight1();
      if (!valid) {
        this.swellheight1Class = "is-invalid";
      } else {
        this.swellheight1Class = "is-valid";
      }
    },
    setSwellheight2() {
      const valid = this.observation.setSwellheight2();
      if (!valid) {
        this.swellheight2Class = "is-invalid";
      } else {
        this.swellheight2Class = "is-valid";
      }
    },
    setCloudTotal() {
      const valid = this.observation.setCloudTotal();
      if (!valid) {
        this.cloudTotalClass = "is-invalid";
      } else {
        this.cloudTotalClass = "is-valid";
      }
    },
    setLowCloudTotal() {
      const valid = this.observation.setLowCloudTotal();
      if (!valid) {
        this.lowCloudTotalClass = "is-invalid";
      } else {
        this.lowCloudTotalClass = "is-valid";
      }
    },
    updateEncoded(valid, specificMessage = "") {
      // updates the orange box with the encoded observation
      var encoded = "";
      console.log(valid);
      if (valid) {
        encoded = observation.encodeData();
      } else {
        encoded = "Please fix input errors. " + specificMessage;
      }
      document.getElementById("encodedObservation").innerHTML = encoded;
    },
    cloudHeightEntered() {
      this.validHeights = this.observation.getValidHeights(this.height);
      if (!this.validHeights.length) {
        console.log("no valid heights");
        this.height = this.height
          .toString()
          .substr(0, this.height.toString().length - 1);
        this.validHeights = this.observation.getValidHeights(this.height);
      }
    },
    cloudTypeEntered() {
      this.validClouds = this.observation.getValidClouds(this.type);
      if (!this.validClouds.length) {
        console.log("no valid clouds");
        this.type = this.type.substr(0, this.type.length - 1);
        this.validClouds = this.observation.getValidClouds(this.type);
      }
    },
    addCloud() {
      this.observation.addCloudLayer(this.type, this.height, this.oktas);
      console.log("=====");
      console.log(this.observation.cloudLayers);
    },
    checkIsvalid(valid, elementId) {
      console.log("inside validity check");
      var element = document.getElementById(elementId);
      console.log(valid);
      if (valid) {
        element.style.backgroundColor = "#99b88c";
      } else {
        element.style.backgroundColor = "#db9874";
        alert(`Invalid entry, please input valid ${elementId}.`);
      }
    },
    create_data_dict() {
      this.data_dict = {};
      this.data_dict.encoded = this.observation.encoded;
      this.data_dict.date = this.observation.date;
      this.data_dict.latitude = this.observation.latitude;
      this.data_dict.quadrant = this.observation.quadrant;
      this.data_dict.longitude = this.observation.longitude;
      this.data_dict.wdirection = this.observation.wdirection;
      this.data_dict.wspeed = this.observation.wspeed;
      this.data_dict.ds = this.observation.ds;
      this.data_dict.vs = this.observation.vs;
      this.data_dict.dbulb = this.observation.dbulb;
      this.data_dict.dpoint = this.observation.dpoint;
      this.data_dict.pressure = this.observation.pressure;
      this.data_dict.tendency = this.observation.tendency;
      this.data_dict.pressurechange = this.observation.pressurechange;
      this.data_dict.weather = this.observation.weather;
      this.data_dict.pastweather = this.observation.pastweather;
      this.data_dict.visibility = this.observation.visibility;
      this.data_dict.seatemp = this.observation.seatemp;
      this.data_dict.seaperiod = this.observation.seaperiod;
      this.data_dict.seaheight = this.observation.seaheight;
      this.data_dict.swelldir1 = this.observation.swelldir1;
      this.data_dict.swellheight1 = this.observation.swellheight1;
      this.data_dict.swellperiod1 = this.observation.swellperiod1;
      this.data_dict.swelldir2 = this.observation.swelldir2;
      this.data_dict.swellheight2 = this.observation.swellheight2;
      this.data_dict.swellperiod2 = this.observation.swellperiod2;
      this.data_dict.cloudTotal = this.observation.cloudTotal;
      this.data_dict.lowCloudTotal = this.observation.lowCloudTotal;
      this.data_dict.cloudLayers = this.observation.cloudLayers;
    },
    saveObservation() {
      if (this.is_valid == true) {
        this.create_data_dict();
        const date = this.observation.date;
        const encodedObservation = this.observation.encoded;
        const data = this.data_dict;
        const observation = data;
        this.observations.addObservation(observation);
        console.log(this.observations.observations);
        alert(
          "Observation committed to cookies, please view on 'View Observations' page"
        );
      } else {
        alert("Please fix input errors before submitting observation.");
      }
    },
  },

  computed: {
    encodedObservation: function () {
      return this.dateEncoded;
    },
    encoded_observation: function () {
      if (this.is_valid == true) {
        return this.observation.encoded;
      } else {
        return "Incorrect input detected, please fix before progressing.";
      }
    },
  },
  props: ["user","observation", "observations"],
};
</script>

<style>
#encodedData {
  margin: auto;
  padding: 10px;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 100;
}
</style>