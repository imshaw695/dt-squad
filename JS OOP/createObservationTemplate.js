function createFormItem(labelText, name, element) {
    // to create the elements on the observation templates
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    var capitalised = capitalizeFirstLetter(name);
    var label = document.createElement("label");
    label.setAttribute("class", "form-label")
    label.setAttribute("for", `${name}`);
    label.innerHTML = labelText;

    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("onchange", `observation.set${capitalised}(this.value);console.log("running onchange");updateEncoded();console.log("finished  onchange")`);
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

function updateEncoded() {
    // updates the orange box with the encoded observation
    const encoded = observation.encodeData();
    document.getElementById("encodedObservation").innerHTML = encoded;
}

function createCloudFormItem(labelText, name) {
    // creates elements for cloud data
    var label = document.createElement("label");
    label.setAttribute("class", "form-label col mx-0 text-end")
    label.setAttribute("for", `${name}`);
    label.innerHTML = labelText;

    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("class", "form-control col");
    input.setAttribute("id", `${name}`);
    input.setAttribute("name", `${name}`);

    return [label, input];
}

function createCloudRow(element) {
    // creates each row of cloud, a bit redundant now that a cloud array has been added
    var name = `type`;
    var labelText = "type";
    var [labelCloud, inputCloud] = createCloudFormItem(labelText, name);
    // inputCloud.setAttribute("onchange", `cloudChanged(this)`)

    var cloudRow = document.createElement("div");
    cloudRow.setAttribute("class", "row my-2")
    cloudRow.appendChild(labelCloud);
    cloudRow.appendChild(inputCloud);
    element.appendChild(cloudRow);

    name = `height`;
    labelText = "height";
    var [labelHeight, inputHeight] = createCloudFormItem(labelText, name);
    // inputHeight.setAttribute("onchange", `heightChanged(this)`)

    cloudRow.appendChild(labelHeight);
    cloudRow.appendChild(inputHeight);
    element.appendChild(cloudRow);

    name = `oktas`;
    labelText = "oktas";
    var [labelOkta, inputOkta] = createCloudFormItem(labelText, name);
    // inputOkta.setAttribute("onchange", `oktaChanged(this)`)

    var cloudButton = document.createElement("button");
    cloudButton.setAttribute("type", "button");
    cloudButton.setAttribute("onclick", "addCloud();observation.setCloud(observation.lowest);observation.setLowestCloudHeight();updateEncoded();displayCloudLayers()");
    cloudButton.innerHTML = "Save cloud layer"

    cloudRow.appendChild(labelOkta);
    cloudRow.appendChild(inputOkta);
    cloudRow.appendChild(cloudButton);
    element.appendChild(cloudRow);

    return;

}

    function addCloud() {
        const type = document.getElementById("type").value;
        const height = document.getElementById("height").value;
        const oktas = document.getElementById("oktas").value;
        console.log(type, height, oktas)
        observation.addCloudLayer(type, height, oktas);
        displayCloudLayers();
    }

    function displayCloudLayers() {
        // displays each item in the cloud layer array with the option to delete each row
        document.getElementById("cloudLayers").innerHTML = "";
        const cloudLayers = document.getElementById("cloudLayers")
        var ul = document.createElement("ul");
        cloudLayers.appendChild(ul);
    for (let cloudLayerIndex = 0; cloudLayerIndex < observation.cloudLayers.length; cloudLayerIndex++) {
        const cloudLayer = observation.cloudLayers[cloudLayerIndex];
        const li = document.createElement("li");
        const button = document.createElement("button");
        button.innerHTML = "Delete";
        button.type = "button";
        button.addEventListener('click', function () {
            observation.deleteCloudLayer(cloudLayerIndex);
            displayCloudLayers();
        })

        // observation.deleteCloudLayer(${cloudLayerIndex});
        li.innerHTML = cloudLayer.getFormatted();
        li.appendChild(button);
        ul.appendChild(li);

    }
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

    createFormItem("Wind direction", "wdirection", dataBlock);

    createFormItem("Wind speed", "wspeed", dataBlock);
    
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

    var distanceMetric = document.createElement("select");
    distanceMetric.setAttribute("id","distanceMetric");
    var option1 = document.createElement("option");
    var option2 = document.createElement("option");
    option1.text = "KM";
    option1.setAttribute("value", "km")
    distanceMetric.appendChild(option1);
    option2.text = "M";
    option2.setAttribute("value", "m")
    distanceMetric.appendChild(option2);
    dataBlock.appendChild(distanceMetric);
    
    createFormItem("Visibility", "visibility", dataBlock);
    dataField = document.getElementById("visibility");
    dataField.setAttribute("onchange", `observation.setVisibility(this.value, document.getElementById("distanceMetric").value);console.log("running onchange");updateEncoded();console.log("finished  onchange")`);

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
    createCloudRow(form1);

    // create a submit button
    var submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("value", "Submit");

    form1.appendChild(submitButton);

    document.getElementsByTagName("body")[0]
        .appendChild(form1);
}