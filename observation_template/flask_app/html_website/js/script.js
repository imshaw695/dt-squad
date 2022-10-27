function getCloudDictionary() {

    //calling this function will make an object containing all low, medium, and high cloud groups
    let cloudDictionary = {};
    let cloud = {};
    cloud.name = "CU1";
    cloud.code = 1;
    cloud.type = "low";
    cloud.importance = 0;
    cloud.heightLowest = 1500;
    cloud.heightHighest = 6500;
    cloudDictionary[cloud.name] = cloud;

    cloud = {};
    cloud.name = "CU2";
    cloud.code = 2;
    cloud.type = "low";
    cloud.importance = getCloudImportance(cloud.type, cloud.code);
    cloud.heightLowest = 1500;
    cloud.heightHighest = 6500;
    cloudDictionary[cloud.name] = cloud;

    cloud = {};
    cloud.name = "CB3";
    cloud.code = 3;
    cloud.type = "low";
    cloud.importance = getCloudImportance(cloud.type, cloud.code);
    cloud.heightLowest = 1500;
    cloud.heightHighest = 6500;
    cloudDictionary[cloud.name] = cloud;

    cloud = {};
    cloud.name = "SC4";
    cloud.code = 4;
    cloud.type = "low";
    cloud.importance = getCloudImportance(cloud.type, cloud.code);
    cloud.heightLowest = 1500;
    cloud.heightHighest = 6500;
    cloudDictionary[cloud.name] = cloud;

    cloud = {};
    cloud.name = "SC5";
    cloud.code = 5;
    cloud.type = "low";
    cloud.importance = getCloudImportance(cloud.type, cloud.code);
    cloud.heightLowest = 1500;
    cloud.heightHighest = 6500;
    cloudDictionary[cloud.name] = cloud;

    cloud = {};
    cloud.name = "ST6";
    cloud.code = 6;
    cloud.type = "low";
    cloud.importance = getCloudImportance(cloud.type, cloud.code);
    cloud.heightLowest = 0;
    cloud.heightHighest = 1499;
    cloudDictionary[cloud.name] = cloud;

    cloud = {};
    cloud.name = "ST7";
    cloud.code = 7;
    cloud.type = "low";
    cloud.importance = getCloudImportance(cloud.type, cloud.code);
    cloud.heightLowest = 0;
    cloud.heightHighest = 1499;
    cloudDictionary[cloud.name] = cloud;

    cloud = {};
    cloud.name = "SC8";
    cloud.code = 8;
    cloud.type = "low";
    cloud.importance = getCloudImportance(cloud.type, cloud.code);
    cloud.heightLowest = 1500;
    cloud.heightHighest = 6500;
    cloudDictionary[cloud.name] = cloud;

    cloud = {};
    cloud.name = "CB9";
    cloud.code = 9;
    cloud.type = "low";
    cloud.importance = getCloudImportance(cloud.type, cloud.code);
    cloud.heightLowest = 1500;
    cloud.heightHighest = 6500;
    cloudDictionary[cloud.name] = cloud;

    cloud = {};
    cloud.name = "AS1";
    cloud.code = 1;
    cloud.type = "medium";
    cloud.importance = getCloudImportance(cloud.type, cloud.code);
    cloud.heightLowest = 6500;
    cloud.heightHighest = 16500;
    cloudDictionary[cloud.name] = cloud;

    cloud = {};
    cloud.name = "AS2";
    cloud.code = 2;
    cloud.type = "medium";
    cloud.importance = getCloudImportance(cloud.type, cloud.code);
    cloud.heightLowest = 6500;
    cloud.heightHighest = 16500;
    cloudDictionary[cloud.name] = cloud;

    cloud = {};
    cloud.name = "AC3";
    cloud.code = 3;
    cloud.type = "medium";
    cloud.importance = getCloudImportance(cloud.type, cloud.code);
    cloud.heightLowest = 6500;
    cloud.heightHighest = 16500;
    cloudDictionary[cloud.name] = cloud;

    cloud = {};
    cloud.name = "AC4";
    cloud.code = 4;
    cloud.type = "medium";
    cloud.importance = getCloudImportance(cloud.type, cloud.code);
    cloud.heightLowest = 6500;
    cloud.heightHighest = 16500;
    cloudDictionary[cloud.name] = cloud;

    cloud = {};
    cloud.name = "AC5";
    cloud.code = 5;
    cloud.type = "medium";
    cloud.importance = getCloudImportance(cloud.type, cloud.code);
    cloud.heightLowest = 6500;
    cloud.heightHighest = 16500;
    cloudDictionary[cloud.name] = cloud;

    cloud = {};
    cloud.name = "AC6";
    cloud.code = 6;
    cloud.type = "medium";
    cloud.importance = getCloudImportance(cloud.type, cloud.code);
    cloud.heightLowest = 6500;
    cloud.heightHighest = 16500;
    cloudDictionary[cloud.name] = cloud;

    cloud = {};
    cloud.name = "AC7";
    cloud.code = 7;
    cloud.type = "medium";
    cloud.importance = getCloudImportance(cloud.type, cloud.code);
    cloud.heightLowest = 6500;
    cloud.heightHighest = 16500;
    cloudDictionary[cloud.name] = cloud;

    cloud = {};
    cloud.name = "AC8";
    cloud.code = 8;
    cloud.type = "medium";
    cloud.importance = getCloudImportance(cloud.type, cloud.code);
    cloud.heightLowest = 6500;
    cloud.heightHighest = 16500;
    cloudDictionary[cloud.name] = cloud;

    cloud = {};
    cloud.name = "AC9";
    cloud.code = 9;
    cloud.type = "medium";
    cloud.importance = getCloudImportance(cloud.type, cloud.code);
    cloud.heightLowest = 6500;
    cloud.heightHighest = 16500;

    cloud = {};
    cloud.name = "CI1";
    cloud.code = 1;
    cloud.type = "high";
    cloud.importance = getCloudImportance(cloud.type, cloud.code);
    cloud.heightLowest = 16500;
    cloud.heightHighest = 100000;
    cloudDictionary[cloud.name] = cloud;
    

    cloud = {};
    cloud.name = "CI2";
    cloud.code = 2;
    cloud.type = "high";
    cloud.importance = getCloudImportance(cloud.type, cloud.code);
    cloud.heightLowest = 16500;
    cloud.heightHighest = 100000;
    cloudDictionary[cloud.name] = cloud;

    cloud = {};
    cloud.name = "CI3";
    cloud.code = 3;
    cloud.type = "high";
    cloud.importance = getCloudImportance(cloud.type, cloud.code);
    cloud.heightLowest = 16500;
    cloud.heightHighest = 100000;
    cloudDictionary[cloud.name] = cloud;

    cloud = {};
    cloud.name = "CI4";
    cloud.code = 4;
    cloud.type = "high";
    cloud.importance = getCloudImportance(cloud.type, cloud.code);
    cloud.heightLowest = 16500;
    cloud.heightHighest = 100000;
    cloudDictionary[cloud.name] = cloud;

    cloud = {};
    cloud.name = "CI5";
    cloud.code = 5;
    cloud.type = "high";
    cloud.importance = getCloudImportance(cloud.type, cloud.code);
    cloud.heightLowest = 16500;
    cloud.heightHighest = 100000;
    cloudDictionary[cloud.name] = cloud;

    cloud = {};
    cloud.name = "CI6";
    cloud.code = 6;
    cloud.type = "high";
    cloud.importance = getCloudImportance(cloud.type, cloud.code);
    cloud.heightLowest = 16500;
    cloud.heightHighest = 100000;
    cloudDictionary[cloud.name] = cloud;

    cloud = {};
    cloud.name = "CS7";
    cloud.code = 7;
    cloud.type = "high";
    cloud.importance = getCloudImportance(cloud.type, cloud.code);
    cloud.heightLowest = 16500;
    cloud.heightHighest = 100000;
    cloudDictionary[cloud.name] = cloud;

    cloud = {};
    cloud.name = "CS8";
    cloud.code = 8;
    cloud.type = "high";
    cloud.importance = getCloudImportance(cloud.type, cloud.code);
    cloud.heightLowest = 16500;
    cloud.heightHighest = 100000;
    cloudDictionary[cloud.name] = cloud;

    cloud = {};
    cloud.name = "CC9";
    cloud.code = 9;
    cloud.type = "high";
    cloud.importance = getCloudImportance(cloud.type, cloud.code);
    cloud.heightLowest = 16500;
    cloud.heightHighest = 100000;
    cloudDictionary[cloud.name] = cloud;

    return cloudDictionary;
}
function getCloudImportanceDictionary() {
    //this function creates an object with arrays containing cloud importance in the correct order
    let cloudImportanceDictionary = {};
    let cloudTypeLow = {};
    let cloudTypeMedium = {};
    let cloudTypeHigh = {};

    cloudTypeLow.name = "low";
    cloudTypeLow.importanceArray = [['CB9'], ['CB3'], ['SC4'], ['SC8'], ['CU2'], ['CU1', 'SC5', 'ST6', 'ST7']];
    cloudImportanceDictionary[cloudTypeLow.name] = cloudTypeLow;

    cloudTypeMedium.name = "medium";
    cloudTypeMedium.importanceArray = [['AC9'], ['AC8'], ['AC7'], ['AC6'], ['AC5'], ['AC4'], ['AC3'], ['AS2'], ['AS1']];
    cloudImportanceDictionary[cloudTypeMedium.name] = cloudTypeMedium;
    
    cloudTypeHigh.name = "high";
    cloudTypeHigh.importanceArray = [['AC9'], ['AC8'], ['AC7c'], ['AC6'], ['AC5'], ['AC4'], ['AC7c'], ['AC7b', 'AC3'], ['AS2'], ['AS1']];
    cloudImportanceDictionary[cloudTypeHigh.name] = cloudTypeHigh;
    return cloudImportanceDictionary;
}

var lowest = {"low":{"index":999999, "cloudCode":""},"medium":{"index":999999, "cloudCode":""},"high":{"index":999999, "cloudCode":""}};

function getCloudImportance(cloudCode) {
    //cloud importance index, starting at 0 as most important and working down
    cloudImportanceDictionary = getCloudImportanceDictionary();
    var entries = Object.entries(cloudImportanceDictionary);
    for([key,value] of entries) {
        for(item of value.importanceArray) {
            for(cloudType1 of item){
                if(cloudCode == cloudType1) {
                    cloudImportanceIndex = value.importanceArray.indexOf(item);
                    if(cloudImportanceIndex < lowest[key].index) {
                        lowest[key].index = cloudImportanceIndex;
                        lowest[key].cloudCode = cloudType1;
                    }
                    console.log(`${cloudCode} and ${cloudImportanceIndex}`);
                    return cloudImportanceIndex;
                }
            }
        }
    }
    
}

cloudCodeDict = { "CI": 0, "CC": 1, "CS": 2, "AC": 3, "AS": 4, "NS": 5, "SC": 6, "ST": 7, "CU": 8, "CB": 9 };

function getHeightCode(lowestCloudHeight) {
    var heightCode = "";
    if(lowestCloudHeight >= 0 && lowestCloudHeight < 100){
        heightCode = 0;
    }
    if(lowestCloudHeight >= 100 && lowestCloudHeight < 300){
        heightCode = 1;
    }
    if(lowestCloudHeight >= 300 && lowestCloudHeight < 600){
        heightCode = 2;
    }
    if(lowestCloudHeight >= 600 && lowestCloudHeight < 900){
        heightCode = 3;
    }
    if(lowestCloudHeight >= 900 && lowestCloudHeight < 1900){
        heightCode = 4;
    }
    if(lowestCloudHeight >= 1900 && lowestCloudHeight < 3200){
        heightCode = 5;
    }
    if(lowestCloudHeight >= 3200 && lowestCloudHeight < 4900){
        heightCode = 6;
    }
    if(lowestCloudHeight >= 4900 && lowestCloudHeight < 6500){
        heightCode = 7;
    }
    if(lowestCloudHeight >= 6500 && lowestCloudHeight < 8000){
        heightCode = 8;
    }
    if(lowestCloudHeight >= 8000){
        heightCode = 9
    }
    return heightCode;
};

hshsDict = {
    100: "01",
    200: "02",
    300: "03",
    400: "04",
    500: "05",
    600: "06",
    700: "07",
    800: "08",
    900: "09",
    1000: "10",
    1100: "11",
    1200: "12",
    1300: "13",
    1400: "14",
    1500: "15",
    1600: "16",
    1700: "17",
    1800: "18",
    1900: "19",
    2000: "20",
    2100: "21",
    2200: "22",
    2300: "23",
    2400: "24",
    2500: "25",
    2600: "26",
    2700: "27",
    2800: "28",
    2900: "29",
    3000: "30",
    3100: "31",
    3200: "32",
    3300: "33",
    3400: "34",
    3500: "35",
    3600: "36",
    3700: "37",
    3800: "38",
    3900: "39",
    4000: "40",
    4100: "41",
    4200: "42",
    4300: "43",
    4400: "44",
    4500: "45",
    4600: "46",
    4700: "47",
    4800: "48",
    4900: "49",
    5000: "50",
    6000: "56",
    7000: "57",
    8000: "58",
    9000: "59",
    10000: "60",
    11000: "61",
    12000: "62",
    13000: "63",
    14000: "64",
    15000: "65",
    16000: "66",
    17000: "67",
    18000: "68",
    19000: "69",
    20000: "70",
    21000: "71",
    22000: "72",
    23000: "73",
    24000: "74",
    25000: "75",
    26000: "76",
    27000: "77",
    28000: "78",
    29000: "79",
    30000: "80",
    31000: "81",
    32000: "82",
    33000: "83",
    34000: "84",
    35000: "85",
    36000: "86",
    37000: "87",
    38000: "88"
};

function getVisibilityCode(visibility) {
    visibilityCode = "";
    if(visibility < 0.05) {
        visibilityCode = 90;
    }
    if(visibility >= 0.05 && visibility < 0.2) {
        visibilityCode = 91;
    }
    if(visibility >= 0.2 && visibility < 0.5) {
        visibilityCode = 92;
    }
    if(visibility >= 0.5 && visibility < 1) {
        visibilityCode = 93;
    }
    if(visibility >= 1 && visibility < 2) {
        visibilityCode = 94;
    }
    if(visibility >= 2 && visibility < 4) {
        visibilityCode = 95;
    }
    if(visibility >= 4 && visibility < 10) {
        visibilityCode = 96;
    }
    if(visibility >= 4 && visibility < 10) {
        visibilityCode = 96;
    }
    if(visibility >= 10 && visibility < 20) {
        visibilityCode = 97;
    }
    if(visibility >= 20 && visibility < 50) {
        visibilityCode = 98;
    }
    if(visibility >= 50) {
        visibilityCode = 99;
    }
    
    return visibilityCode;
}

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

    createFormItem("Call sign", "callsign", dataBlock);

    createFormItem("Date", "datetime", dataBlock);
    dateField = document.getElementById("datetime");
    dateField.setAttribute("type", "datetime-local");
    
    createFormItem("Latitude", "latitude", dataBlock);
    dataField = document.getElementById("latitude");
    dataField.setAttribute("placeholder", "Degrees/minutes decimalised, eg. 50.4");

    createFormItem("Quadrant", "quadrant", dataBlock);
    dataField = document.getElementById("quadrant");
    dataField.setAttribute("placeholder", "1, 3, 5, or 7");
    
    createFormItem("Longitude", "longitude", dataBlock);
    dataField = document.getElementById("longitude");
    dataField.setAttribute("placeholder", "Degrees/minutes decimalised, eg. 004.6");
    
    createFormItem("Ds", "ds", dataBlock);
    dataField = document.getElementById("ds");
    dataField.setAttribute("placeholder", "1-8");

    createFormItem("Vs", "vs", dataBlock);
    dataField = document.getElementById("vs");
    dataField.setAttribute("placeholder", "0-9");
    
    createFormItem("Drybulb Temperature", "dbulb", dataBlock);
    dataField = document.getElementById("dbulb");
    dataField.setAttribute("placeholder", "Include the decimal, even if 0, eg. 21.0");
    
    createFormItem("Dewpoint Temperature", "dpoint", dataBlock);
    dataField = document.getElementById("dpoint");
    dataField.setAttribute("placeholder", "Include the decimal, even if 0, eg. 21.0");
    
    createFormItem("Pressure", "pressure", dataBlock);
    createFormItem("Tendency", "tendency", dataBlock);
    createFormItem("Weather (0-99)", "weather", dataBlock);
    createFormItem("Past Weather", "pastweather", dataBlock);
    
    createFormItem("Visibility", "visibility", dataBlock);
    dataField = document.getElementById("visibility");
    dataField.setAttribute("placeholder", "Write in KM, eg. 100 metres would be 0.1");

    createFormItem("Sea Surface Temperature", "seatemp", dataBlock);
    createFormItem("1st Swell Direction", "swelldir1", dataBlock);
    createFormItem("1st Swell Period", "swellper1", dataBlock);
    createFormItem("1st Swell Height", "swellhei1", dataBlock);
    createFormItem("2nd Swell Direction", "swelldir2", dataBlock);
    createFormItem("2nd Swell Period", "swellper2", dataBlock);
    createFormItem("2nd Swell Height", "swellhei2", dataBlock);

    createFormItem("Total Cloud", "cloudTotal", dataBlock);
    createFormItem("Total Low Cloud", "lowCloudTotal", dataBlock);
    
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
        .appendChild(form1);
}

var cloudDictionary = getCloudDictionary();
console.log(cloudDictionary)
var cloudImportanceDictionary = getCloudImportanceDictionary();
var encodedObservation = "";
var callsign = "";
var dateEncoded = "";
var latitudeEncoded = "";
var quadrantEncoded = "";
var longitudeEncoded = "";
var lowestCloudEncoded = "";
var visibilityEncoded = "";
var drybulbEncoded = "";
var dewpointEncoded = "";
var directionEncoded = "";
var speedEncoded = "";
var cloudTotalEncoded = "";
var totalLowEncoded = "";
var dsEncoded = "";
var vsEncoded = "";
var cloudFields = {};

function buildEncodedObservation() {
    encodedObservation = callsign + " " + dateEncoded + latitudeEncoded + quadrantEncoded + longitudeEncoded + 41 + lowestCloudEncoded + visibilityEncoded + cloudTotalEncoded + directionEncoded + speedEncoded + " 10" + drybulbEncoded + " 20" + dewpointEncoded + " 222" + dsEncoded + vsEncoded;
    document.getElementById("encodedObservation").innerHTML = encodedObservation
}

function callsignChanged(event) {
    callsign = event.value.toUpperCase();
    if (callsign.length != 4) {
        alert("Call sign must be 4 letters long, please enter a correct call sign.")
        event.style.backgroundColor = "indianred";
    }
    else {
        event.style.backgroundColor = "lightgreen";
        buildEncodedObservation();
    }
}

function datetimeChanged(event) {
    event.style.backgroundColor = "lightgreen";
    dateRaw = event.value;
    day = dateRaw.substr(8, 2);
    hour = dateRaw.substr(11, 2);
    dateEncoded = day + hour + 4 + " ";
    buildEncodedObservation();
}
function latitudeChanged(event) {
    event.style.backgroundColor = "lightgreen";
    latitude = event.value;
    latitude10 = latitude * 10;

    if(latitude10.toString().length == 1) {
        latitudeEncoded = "9900" + latitude10 + " ";
    }
    if(latitude10.toString().length == 2) {
        latitudeEncoded = "990" + latitude10 + " ";
    }
    if(latitude10.toString().length == 3) {
        latitudeEncoded = "99" + latitude10 + " ";
    }
    buildEncodedObservation();
}
function quadrantChanged(event) {
    event.style.backgroundColor = "lightgreen";
    quadrant = event.value;
    quadrantEncoded = quadrant;
    buildEncodedObservation();
}
function longitudeChanged(event) {
    event.style.backgroundColor = "lightgreen";
    longitude = event.value;
    longitude10 = longitude * 10;
    if(longitude10.toString().length == 1) {
        longitudeEncoded = "000" + longitude10 + " ";
    }
    if(longitude10.toString().length == 2) {
        longitudeEncoded = "00" + longitude10 + " ";
    }
    if(longitude10.toString().length == 3) {
        longitudeEncoded = "0" + longitude10 + " ";
    }
    if(longitude10.toString().length == 4) {
        longitudeEncoded = longitude10 + " ";
    }
    buildEncodedObservation();
}
function dbulbChanged(event) {
    event.style.backgroundColor = "lightgreen";
    drybulbEncoded = event.value * 10;
    buildEncodedObservation();
}
function dpointChanged(event) {
    event.style.backgroundColor = "lightgreen";
    dewpointEncoded = event.value * 10.0;
    buildEncodedObservation();
}
function directionChanged(event) {
    event.style.backgroundColor = "lightgreen";
    directionEncoded = event.value / 10;
    buildEncodedObservation();
}
function speedChanged(event) {
    event.style.backgroundColor = "lightgreen";
    speedEncoded = event.value;
    buildEncodedObservation();
}
function cloudTotalChanged(event) {
    cloudTotalEncoded = event.value;
    if (cloudTotalEncoded < 0 || cloudTotalEncoded > 9) {
        alert("Must be between 0 and 8 oktas.");
        event.style.backgroundColor = "indianred";
    } else {
        event.style.backgroundColor = "lightgreen";
        cloudTotalEncoded = event.value;
        buildEncodedObservation();
    }
}
function totalLowChanged(event) {
    event.style.backgroundColor = "lightgreen";
    totalLowEncoded = event.value;
    buildEncodedObservation();
}
function cloudChanged(field) {
    cloudEncoded = field.value;
    cloudImportance = getCloudImportance(cloudEncoded);
    console.log(cloudImportance);
    cloudIndex = field.name.charAt(field.name.length - 1);
    if (cloudEncoded in cloudDictionary) {
        console.log(cloudDictionary);
        field.style.backgroundColor = "lightgreen";
        // populate the global variable 
        cloudFields[cloudEncoded] = { "cloudType": cloudEncoded, "oktas": null, "height": null };

        buildEncodedObservation();
    } else {
        field.style.backgroundColor = "indianred";
    }
}
var lowestCloudHeight = "";
function heightChanged(field) {
    // Find out which cloud field we are talking about
    cloudIndex = field.name.charAt(field.name.length - 1)
    cloudName = "cloud" + cloudIndex
    cloudType = document.getElementById(cloudName).value
    cloudEntry = cloudDictionary[cloudType]
    if (field.value >= cloudEntry.heightLowest && field.value < cloudEntry.heightHighest) {
        field.style.backgroundColor = "lightgreen";
        if(lowestCloudHeight > field.value || lowestCloudHeight == "") {
            lowestCloudHeight = field.value;
            console.log(lowestCloudHeight);
        }
        cloudFields[cloudEncoded].height = field.value;
        lowestCloudEncoded = getHeightCode(lowestCloudHeight);
        buildEncodedObservation();
    } else {
        field.style.backgroundColor = "indianred";
    }
}
function dsChanged(event) {
    event.style.backgroundColor = "lightgreen";
    dsEncoded = event.value;
    buildEncodedObservation();
}
function vsChanged(event) {
    event.style.backgroundColor = "lightgreen";
    vsEncoded = event.value;
    buildEncodedObservation();
}
function visibilityChanged(event) {
    event.style.backgroundColor = "lightgreen";
    visibilityRaw = event.value;
    if(visibilityRaw)
    visibilityEncoded = getVisibilityCode(visibilityRaw);
    buildEncodedObservation();
}
function seatempChanged(event) {
    seatempEncoded = event.value;
    buildEncodedObservation();
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
