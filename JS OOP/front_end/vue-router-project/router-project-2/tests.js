import { Observation } from "./Observation.js";
import { Observations } from "./Observations.js";

const observation = new Observation();
const observations = new Observations();

var observations_success_count = 0;
var observations_failure_count = 0;

var observation_success_count = 0;
var observation_failure_count = 0;

observations.observations = [1, 2, 3]
const test_observations = [1, 2, 3]

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

// ==========TESTS FOR OBSERVATIONS BELOW=========

function test_set_observations() {
    let element = document.getElementById("test_set_observations")
    let result = observations.setObservations();
    if (result == "observations=[1,2,3]") {
        element.innerHTML = "[ SUCCESS: test_set_observations ]";
        observations_success_count++;
    } else {
        element.innerHTML = "[ FAILURE: test_set_observations ]";
        observations_failure_count++;
    }
    console.log(result)
}

// this test is dependent on set_observations working correctly
function test_get_observations() {
    let element = document.getElementById("test_get_observations")
    let result = observations.getObservations();
    if (arraysEqual(result, test_observations)) {
        element.innerHTML = "[ SUCCESS: test_get_observations ]";
        observations_success_count++;
    } else {
        element.innerHTML = "[ FAILURE: test_get_observations ]";
        observations_failure_count++;
    }
    console.log(result)
}

function test_delete_observation() {
    let element = document.getElementById("test_delete_observation")
    let result = observations.deleteObservation(2);
    let expected_outcome = [1, 2];
    if (arraysEqual(result, expected_outcome)) {
        element.innerHTML = "[ SUCCESS: test_delete_observation ]";
        observations_success_count++;
    } else {
        element.innerHTML = "[ FAILURE: test_delete_observation ]";
        observations_failure_count++;
    }
    console.log(result)

}

function test_add_observation() {
    let element = document.getElementById("test_add_observation")
    let result = observations.addObservation(3);

    if (arraysEqual(result, test_observations)) {
        element.innerHTML = "[ SUCCESS: test_add_observation ]";
        observations_success_count++;
    } else {
        element.innerHTML = "[ FAILURE: test_add_observation ]";
        observations_failure_count++;
    }
    console.log(result)

}
function observations_report() {
    let element = document.getElementById("observations_report")
    element.innerHTML = "Successes: " + observations_success_count + "  Failures: " + observations_failure_count;
}

// ==========TESTS FOR OBSERVATIONS BELOW=========

function observation_report() {
    let element = document.getElementById("observation_report")
    element.innerHTML = ("Successes: " + observation_success_count + "  Failures: " + observation_failure_count);
}

test_set_observations();
test_get_observations();
test_delete_observation();
test_add_observation();
observations_report();

observation_report();
