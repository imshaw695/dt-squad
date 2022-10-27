function setObservations(observations) {
    const observationsAsJson = JSON.stringify(observations)
    let cookieName = "observations"
    const d = new Date();
    d.setTime(d.getTime() + (10000 * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cookieName + "=" + observationsAsJson + ";" + expires + ";path=/";
}
function getObservations() {
    let name = "observations" + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    console.log(ca)
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            let observationsAsJson = c.substring(name.length, c.length);
            let observations = JSON.parse(observationsAsJson)
            return observations;
        }
    }
    return [];
}

function deleteObservation(observationIndex) {
    let observations = getObservations();
    observations.splice(observationIndex, 1);
    setObservations(observations);
}

function createFormItem(labelText, name, element) {

    var label = document.createElement("label");
    label.setAttribute("class", "form-label")
    label.setAttribute("for", `${name}`);
    label.innerHTML = labelText;

    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("onchange", `${name}Changed(this)`);
    input.setAttribute("class", "form-control");
    input.setAttribute("id", `${name}`);
    input.setAttribute("name", `${name}`);

    var div = document.createElement("div");
    div.setAttribute("class", "mb-3");
    div.appendChild(label);
    div.appendChild(input);
    element.appendChild(div);

    return;
}

function createCloudFormItem(labelText, name) {

    var label = document.createElement("label");
    label.setAttribute("class", "form-label col mx-0 text-end")
    label.setAttribute("for", `${name}`);
    label.innerHTML = labelText;

    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("onchange", `${name}Changed(this)`);
    input.setAttribute("class", "form-control col");
    input.setAttribute("id", `${name}`);
    input.setAttribute("name", `${name}`);

    return [label, input];
}

function createCloudRow(rowNumber, element) {
    var name = `cloud${rowNumber}`;
    var labelText = "Cloud Type:";
    var [labelCloud, inputCloud] = createCloudFormItem(labelText, name);
    inputCloud.setAttribute("onchange", `cloudChanged(this)`)

    var cloudRow = document.createElement("div");
    cloudRow.setAttribute("class", "row my-2")
    cloudRow.appendChild(labelCloud);
    cloudRow.appendChild(inputCloud);
    element.appendChild(cloudRow);

    name = `height${rowNumber}`;
    labelText = "Height:";
    var [labelHeight, inputHeight] = createCloudFormItem(labelText, name);
    inputHeight.setAttribute("onchange", `heightChanged(this)`)

    cloudRow.appendChild(labelHeight);
    cloudRow.appendChild(inputHeight);
    element.appendChild(cloudRow);

    name = `okta${rowNumber}`;
    labelText = "Oktas:";
    var [labelOkta, inputOkta] = createCloudFormItem(labelText, name);
    inputOkta.setAttribute("onchange", `oktaChanged(this)`)

    cloudRow.appendChild(labelOkta);
    cloudRow.appendChild(inputOkta);
    element.appendChild(cloudRow);

    return;

}

function createObservationTemplate() {
    var formBlock = document.getElementById("form1");
    // Create divs for the date, data, clouds, sea/swell, initials

    var dataBlock = document.createElement("div");
    dataBlock.setAttribute("id", "dataBlock");
    var cloudBlock = document.createElement("div");
    // cloudBlock.setAttribute("class", "row row-cols-2");

    // Create a form dynamically
    var form1 = document.createElement("form");
    form1.setAttribute("method", "post");
    form1.setAttribute("id", "form1");
    form1.setAttribute("action", "form");
    formBlock.appendChild(form1);
    form1.appendChild(dataBlock);
    form1.appendChild(cloudBlock);

    createFormItem("Date", "datetime", dataBlock)
    dateField = document.getElementById("datetime");
    dateField.setAttribute("type", "datetime-local")

    createFormItem("Drybulb Temperature", "dbulb", dataBlock);

    createFormItem("Wetbulb Temperature", "wbulb", dataBlock);

    // create cloud rows
    createCloudRow(1, form1);
    createCloudRow(2, form1);
    createCloudRow(3, form1);
    createCloudRow(4, form1);
    createCloudRow(5, form1);
    createCloudRow(6, form1);

    // create a submit button
    var submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("value", "Submit");

    form1.appendChild(submitButton);

    document.getElementsByTagName("body")[0]
        .appendChild(form);
}

var cloudDictionary = getCloudDictionary();
console.log(cloudDictionary)
var cloudImportanceDictionary = getCloudImportanceDictionary();
var encodedObservation = "";
var dateEncoded = "";
var drybulbEncoded = "";
var dewpointEncoded = "";
var directionEncoded = "";
var speedEncoded = "";
var cloudTotalEncoded = "";
var totalLowEncoded = "";
var cloudFields = {};

function buildEncodedObservation() {
    encodedObservation = dateEncoded + " " + cloudTotalEncoded + directionEncoded + speedEncoded + " 10" + drybulbEncoded + " 20" + dewpointEncoded;
    document.getElementById("encodedObservation").innerHTML = encodedObservation
}

function datetimeChanged(event) {
    dateRaw = event.value;
    day = dateRaw.substr(8, 2);
    hour = dateRaw.substr(11, 2);
    dateEncoded = day + hour + 4 + " ";
    buildEncodedObservation();
}
function dbulbChanged(event) {
    drybulbEncoded = event.value * 10.0;
    buildEncodedObservation();
}
function dewpointChanged(event) {
    dewpointEncoded = event.value * 10.0;
    buildEncodedObservation();
}
function directionChanged(event) {
    directionEncoded = event.value / 10;
    buildEncodedObservation();
}
function speedChanged(event) {
    speedEncoded = event.value;
    buildEncodedObservation();
}
function cloudTotalChanged(event) {
    cloudTotalEncoded = event.value;
    buildEncodedObservation();
}
function totalLowChanged(event) {
    totalLowEncoded = event.value;
    buildEncodedObservation();
}
function cloudChanged(field) {
    cloudEncoded = field.value;
    console.log(field.value)
    cloudIndex = field.name.charAt(field.name.length - 1)
    if (cloudEncoded in cloudDictionary) {
        field.style.backgroundColor = "lightgreen";
        // populate the global variable 
        cloudFields[cloudEncoded] = { "cloudType": cloudEncoded, "oktas": null, "height": null }

        buildEncodedObservation();
    } else {
        field.style.backgroundColor = "indianred";
    }
}
function heightChanged(field) {
    console.log(field.value)
    // Find out which cloud field we are talking about
    cloudIndex = field.name.charAt(field.name.length - 1)
    cloudName = "cloud" + cloudIndex
    cloudType = document.getElementById(cloudName).value
    cloudEntry = cloudDictionary[cloudType]
    console.log(cloudEntry.heightLowest)
    console.log(cloudEntry.heightHighest)
    if (field.value >= cloudEntry.heightLowest && field.value < cloudEntry.heightHighest) {
        field.style.backgroundColor = "lightgreen";
        cloudFields[cloudEncoded].height = field.value
        buildEncodedObservation();
    } else {
        field.style.backgroundColor = "indianred";
    }
}
function submitObservation() {
    drybulbEncoded = document.getElementById("dbulb").value
    dateEncoded = document.getElementById("datetime").value;
    observations = getObservations();
    observation = { "date": dateEncoded, "temperature": drybulbEncoded };
    observations.push(observation);
    setObservations(observations);
    console.log(document.cookie);
    observations = getObservations();
    console.log(observations);
    var cookies = document.cookie.split(';');
    alert("Observation added to cookies")
}