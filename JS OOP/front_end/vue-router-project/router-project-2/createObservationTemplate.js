export class ObservationTemplate {

    constructor() {
        console.log("inside ObservationTemplate class")
    }
    createFormItem(labelText, name, element) {
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
        input.setAttribute("onchange", `const status = observation.set${capitalised}(this.value);updateEncoded(status);checkIsvalid(status,'${name}')`);
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

    updateEncoded(valid, specificMessage = "") {
        // updates the orange box with the encoded observation
        var encoded = "";
        console.log(valid)
        if (valid) {
            encoded = observation.encodeData();
        } else {
            encoded = "Please fix input errors. " + specificMessage
        }
        document.getElementById("encodedObservation").innerHTML = encoded;
    }
    checkIsvalid(valid, elementId) {
        console.log("inside validity check")
        var element = document.getElementById(elementId);
        console.log(valid);
        if (valid) {
            element.style.backgroundColor = "#99b88c";
        } else {
            element.style.backgroundColor = "#db9874";
            alert(`Invalid entry, please input valid ${elementId}.`)
        }
    }

    createCloudFormItem(labelText, name) {
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

    createCloudRow(element) {
        // creates each row of cloud, a bit redundant now that a cloud array has been added
        var name = `type`;
        var labelText = "type";
        var [labelCloud, inputCloud] = this.createCloudFormItem(labelText, name);
        inputCloud.setAttribute("onkeyup", "cloudTypeEntered()");
        // inputCloud.setAttribute("onchange", `cloudChanged(this)`)
        name = `height`;
        labelText = "height";
        var [labelHeight, inputHeight] = this.createCloudFormItem(labelText, name);
        inputHeight.setAttribute("onkeyup", "cloudHeightEntered()");
        // inputHeight.setAttribute("onchange", `heightChanged(this)`)
        name = `oktas`;
        labelText = "oktas";
        var [labelOkta, inputOkta] = this.createCloudFormItem(labelText, name);
        // inputOkta.setAttribute("onchange", `oktaChanged(this)`)

        var cloudButton = document.createElement("button");
        cloudButton.setAttribute("type", "button");
        cloudButton.setAttribute("onclick", "addCloud();observation.setCloud(observation.lowest);observation.setLowestCloudHeight();observation.setCloudlayers();[valid,specificMessage]=observation.checkCloudLayers();updateEncoded(valid,specificMessage);displayCloudLayers()");
        cloudButton.innerHTML = "Save cloud layer"

        var cloudRow1 = document.createElement("div");
        var r1cloudColumn1 = document.createElement("div");
        var r1cloudColumn2 = document.createElement("div");
        var r1cloudColumn3 = document.createElement("div");
        var r1cloudColumn4 = document.createElement("div");
        r1cloudColumn1.setAttribute("class", "col-3")
        r1cloudColumn2.setAttribute("class", "col-3")
        r1cloudColumn3.setAttribute("class", "col-3")
        r1cloudColumn4.setAttribute("class", "col-3")
        cloudRow1.setAttribute("class", "row my-2")
        cloudRow1.appendChild(r1cloudColumn1);
        cloudRow1.appendChild(r1cloudColumn2);
        cloudRow1.appendChild(r1cloudColumn3);
        cloudRow1.appendChild(r1cloudColumn4);
        r1cloudColumn1.appendChild(labelCloud)
        r1cloudColumn2.appendChild(labelHeight);
        r1cloudColumn3.appendChild(labelOkta);

        var cloudRow2 = document.createElement("div");
        var r2cloudColumn1 = document.createElement("div");
        var r2cloudColumn2 = document.createElement("div");
        var r2cloudColumn3 = document.createElement("div");
        var r2cloudColumn4 = document.createElement("div");
        r2cloudColumn1.setAttribute("class", "col-3")
        r2cloudColumn2.setAttribute("class", "col-3")
        r2cloudColumn3.setAttribute("class", "col-3")
        r2cloudColumn4.setAttribute("class", "col-3")
        cloudRow2.setAttribute("class", "row my-2")
        cloudRow2.appendChild(r2cloudColumn1);
        cloudRow2.appendChild(r2cloudColumn2);
        cloudRow2.appendChild(r2cloudColumn3);
        cloudRow2.appendChild(r2cloudColumn4);
        r2cloudColumn1.appendChild(inputCloud);
        r2cloudColumn2.appendChild(inputHeight);
        r2cloudColumn3.appendChild(inputOkta);
        r2cloudColumn4.appendChild(cloudButton);

        var cloudRow3 = document.createElement("div");
        var r3cloudColumn1 = document.createElement("div");
        var r3cloudColumn2 = document.createElement("div");
        var r3cloudColumn3 = document.createElement("div");
        var r3cloudColumn4 = document.createElement("div");
        r3cloudColumn1.setAttribute("class", "col-3")
        r3cloudColumn2.setAttribute("class", "col-3")
        r3cloudColumn3.setAttribute("class", "col-3")
        r3cloudColumn4.setAttribute("class", "col-3")
        cloudRow3.setAttribute("class", "row my-2")
        cloudRow3.appendChild(r3cloudColumn1);
        cloudRow3.appendChild(r3cloudColumn2);
        cloudRow3.appendChild(r3cloudColumn3);
        cloudRow3.appendChild(r3cloudColumn4);
        // <div id="validHeights">text</div>
        var heightList = document.createElement("div")
        heightList.setAttribute("id", "validHeights")
        r3cloudColumn2.appendChild(heightList);

        var cloudList = document.createElement("div");
        cloudList.setAttribute("id", "validClouds");
        r3cloudColumn1.appendChild(cloudList);

        element.appendChild(cloudRow1);
        element.appendChild(cloudRow2);
        element.appendChild(cloudRow3);

        return;
    }

    changeHeightValue(newValue) {
        document.getElementById("height").value = newValue;
    }

    changeCloudValue(newValue) {
        document.getElementById("type").value = newValue;
    }

    cloudHeightEntered() {
        console.log("in cloud height entered")
        const cloudHeight = document.getElementById("height");
        var validHeights = observation.getValidHeights(cloudHeight.value);
        console.log(validHeights)
        if (!(validHeights.length)) {
            console.log("no valid heights")
            const cloudHeightString = cloudHeight.value.toString();
            console.log("====")
            console.log(cloudHeightString.substr(0, cloudHeightString.length - 1))
            cloudHeight.value = cloudHeightString.substr(0, cloudHeightString.length - 1);
            validHeights = observation.getValidHeights(cloudHeight.value);
            updateEncoded(false, "No valid heights with that input.")
        }
        var ul = document.createElement("ul");
        ul.setAttribute("class", "list-group")
        ul.setAttribute("id", "cloudHeightUL")
        for (const heightIndex in validHeights) {
            var li = document.createElement("li");
            li.setAttribute("class", "list-group-item")
            li.innerHTML = validHeights[heightIndex];
            var newValue = validHeights[heightIndex]
            li.setAttribute("onclick", `changeHeightValue(${newValue});document.getElementById("cloudHeightUL").innerText=""`);
            ul.appendChild(li);
        }
        document.getElementById("validHeights").innerHTML = "";
        document.getElementById("validHeights").appendChild(ul);
    }
    cloudTypeEntered() {
        console.log("in cloud type entered");
        var cloudType = document.getElementById("type").value;
        var validClouds = observation.getValidClouds(cloudType);
        if (!(validClouds.length)) {
            console.log("no valid clouds");
            cloudType = cloudType.substr(0, cloudType.length - 1);
            document.getElementById("type").value = cloudType;
            validClouds = observation.getValidClouds(cloudType);
            updateEncoded(false, "No matching cloud types with that input.")
        }
        var ul = document.createElement("ul");
        ul.setAttribute("class", "list-group");
        ul.setAttribute("id", "cloudTypeUL")
        for (const cloudIndex in validClouds) {
            console.log("in cloud loop")
            var li = document.createElement("li");
            li.setAttribute("class", "list-group-item")
            li.innerHTML = validClouds[cloudIndex];
            var newValue = validClouds[cloudIndex];
            li.setAttribute("onclick", `changeCloudValue('${newValue}');document.getElementById("cloudTypeUL").innerHTML=""`)
            ul.appendChild(li);
        }
        console.log(ul)
        document.getElementById("validClouds").innerHTML = "";
        document.getElementById("validClouds").appendChild(ul);
    }
    addCloud() {
        const type = document.getElementById("type").value;
        const height = parseInt(document.getElementById("height").value);
        const oktas = parseInt(document.getElementById("oktas").value);
        console.log(type, height, oktas)
        observation.addCloudLayer(type, height, oktas);
        displayCloudLayers();
    }

    displayCloudLayers() {
        // displays each item in the cloud layer array with the option to delete each row
        document.getElementById("cloudLayers").innerHTML = "";
        const cloudLayers = document.getElementById("cloudLayers")
        var ul = document.createElement("ul");
        cloudLayers.appendChild(ul);
        for (let cloudLayerIndex = 0; cloudLayerIndex < observation.cloudLayers.length; cloudLayerIndex++) {
            var valid = true;
            const cloudLayer = observation.cloudLayers[cloudLayerIndex];
            const li = document.createElement("li");
            const button = document.createElement("button");
            button.innerHTML = "Delete";
            button.type = "button";
            button.addEventListener('click', function () {
                observation.deleteCloudLayer(cloudLayerIndex);
                displayCloudLayers();
                observation.setCloudlayers();
                updateEncoded(valid)
            })
            li.innerHTML = cloudLayer.getFormatted();
            li.appendChild(button);
            ul.appendChild(li);

        }
    }

    createObservationTemplate() {
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

        this.createFormItem("Date", "datetime", dataBlock);
        var dateField = document.getElementById("datetime");
        dateField.setAttribute("type", "datetime-local");

        this.createFormItem("Latitude", "latitude", dataBlock);
        var dataField = document.getElementById("latitude");
        dataField.setAttribute("placeholder", "Degrees/minutes decimalised, eg. 50.4");

        this.createFormItem("Quadrant", "quadrant", dataBlock);
        dataField = document.getElementById("quadrant");
        dataField.setAttribute("placeholder", "1, 3, 5, or 7");

        this.createFormItem("Longitude", "longitude", dataBlock);
        dataField = document.getElementById("longitude");
        dataField.setAttribute("placeholder", "Degrees/minutes decimalised, eg. 004.6");

        this.createFormItem("Wind direction", "wdirection", dataBlock);

        this.createFormItem("Wind speed", "wspeed", dataBlock);

        this.createFormItem("Ds", "ds", dataBlock);
        dataField = document.getElementById("ds");
        dataField.setAttribute("placeholder", "1-8");

        this.createFormItem("Vs", "vs", dataBlock);
        dataField = document.getElementById("vs");
        dataField.setAttribute("placeholder", "0-9");

        this.createFormItem("Drybulb Temperature", "dbulb", dataBlock);
        dataField = document.getElementById("dbulb");

        this.createFormItem("Dewpoint Temperature", "dpoint", dataBlock);
        dataField = document.getElementById("dpoint");

        this.createFormItem("Pressure", "pressure", dataBlock);

        var tendency = document.createElement("select");
        tendency.setAttribute("id", "tendency");
        tendency.setAttribute("onchange", "const status = observation.setTendency(this.value);updateEncoded(status);checkIsvalid(status,'tendency')");

        var t0 = document.createElement("option");
        var t1 = document.createElement("option");
        var t2 = document.createElement("option");
        var t3 = document.createElement("option");
        var t4 = document.createElement("option");
        var t5 = document.createElement("option");
        var t6 = document.createElement("option");
        var t7 = document.createElement("option");
        var t8 = document.createElement("option");

        t0.text = "0 - Rising then falling, same or higher";
        t0.setAttribute("value", 0)
        tendency.appendChild(t0);

        t1.text = "1 - Rising then steady, higher";
        t1.setAttribute("value", 1)
        tendency.appendChild(t1);

        t2.text = "2 - Increasing steadily, higher";
        t2.setAttribute("value", 2)
        tendency.appendChild(t2);

        t3.text = "3 - Falling or steady, then rising, higher";
        t3.setAttribute("value", 3)
        tendency.appendChild(t3);

        t4.text = "4 - Steady, same";
        t4.setAttribute("value", 4)
        tendency.appendChild(t4);

        t5.text = "5 - Falling then rising, lower";
        t5.setAttribute("value", 5)
        tendency.appendChild(t5);

        t6.text = "6 - Falling then steady, lower";
        t6.setAttribute("value", 6)
        tendency.appendChild(t6);

        t7.text = "7 - Falling steadily, lower";
        t7.setAttribute("value", 7)
        tendency.appendChild(t7);

        t8.text = "8 - Rising or steady, then falling, lower";
        t8.setAttribute("value", 8)
        tendency.appendChild(t8);
        dataBlock.appendChild(tendency);

        // createFormItem("Tendency", "tendency", dataBlock);

        this.createFormItem("Pressure change", "pressureChange", dataBlock);
        this.createFormItem("Weather (0-99)", "weather", dataBlock);
        this.createFormItem("Past Weather", "pastweather", dataBlock);

        var distanceMetric = document.createElement("select");
        distanceMetric.setAttribute("id", "distanceMetric");
        var option1 = document.createElement("option");
        var option2 = document.createElement("option");
        option1.text = "KM";
        option1.setAttribute("value", "km")
        distanceMetric.appendChild(option1);
        option2.text = "M";
        option2.setAttribute("value", "m")
        distanceMetric.appendChild(option2);

        this.createFormItem("Visibility", "visibility", dataBlock);
        dataBlock.appendChild(distanceMetric);
        dataField = document.getElementById("visibility");
        dataField.setAttribute("onchange", `const status = observation.setVisibility(this.value, document.getElementById("distanceMetric").value);console.log("running onchange");updateEncoded(status);checkIsvalid(status,'visibility');console.log("finished  onchange")`);

        var method = document.createElement("select");
        method.setAttribute("id", "method");
        method.setAttribute("onchange", "const status = observation.setSeatemp(document.getElementById('seatemp').value, this.value); updateEncoded(status);checkIsvalid(status,'seatemp')");
        var method1 = document.createElement("option");
        var method2 = document.createElement("option");
        var method3 = document.createElement("option");
        var method4 = document.createElement("option");
        method1.text = "Intake";
        method1.setAttribute("value", "intake")
        method.appendChild(method1);
        method2.text = "Sea bucket";
        method2.setAttribute("value", "seabucket")
        method.appendChild(method2);
        method3.text = "Sonar 2013";
        method3.setAttribute("value", "sonar2013")
        method.appendChild(method3);
        method4.text = "Other";
        method4.setAttribute("value", "other")
        method.appendChild(method4);

        this.createFormItem("Sea Surface Temperature", "seatemp", dataBlock);
        dataField = document.getElementById("seatemp");
        dataField.setAttribute("onchange", `const status = observation.setSeatemp(this.value, document.getElementById("method").value);console.log("running onchange");updateEncoded(status);checkIsvalid(status,'seatemp');console.log("finished  onchange")`);
        dataBlock.appendChild(method);

        this.createFormItem("Sea period", "seaperiod", dataBlock);
        this.createFormItem("Sea height", "seaheight", dataBlock);
        dataField = document.getElementById("seaheight");
        dataField.setAttribute("placeholder", "In 0.5m increments");

        this.createFormItem("1st Swell Direction", "swelldir1", dataBlock);
        this.createFormItem("1st Swell Period", "swellperiod1", dataBlock);
        this.createFormItem("1st Swell Height", "swellheight1", dataBlock);
        this.createFormItem("2nd Swell Direction", "swelldir2", dataBlock);
        this.createFormItem("2nd Swell Period", "swellperiod2", dataBlock);
        this.createFormItem("2nd Swell Height", "swellheight2", dataBlock);

        this.createFormItem("Total Cloud", "cloudTotal", dataBlock);
        this.createFormItem("Total Low Cloud", "lowCloudTotal", dataBlock);

        // create cloud rows
        this.createCloudRow(form1);

        // create a submit button
        var submitButton = document.createElement("button");
        submitButton.innerText = " observation";
        submitButton.setAttribute("onclick", "saveObservation(event)");

        form1.appendChild(submitButton);
        document.getElementById("formAuto").appendChild(form1);

    }

    saveObservation(event) {
        event.preventDefault();
        const date = document.getElementById("datetime").value;
        const encodedObservation = document.getElementById("encodedObservation").innerHTML
        console.log(encodedObservation)
        const observation = { date: date, encodedObservation: encodedObservation };
        console.log(observation);

        observations.addObservation(observation);
        console.log(observations.observations);
    }
}