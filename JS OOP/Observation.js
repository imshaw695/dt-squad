class Observation {
    constructor() {
        console.log("Observation has been instantiated.")
        this.encoded = "";
        this.date = "";
        this.latitude = "";
        this.quadrant = "";
        this.longitude = "";
        this.cloudTotal = "";
        this.lowCloudTotal = "";
        this.wspeed = "";
        this.wdirection = "";
        this.ds = "";
        this.vs = "";
        this.dbulb = "";
        this.dpoint = "";
        this.pressure = "";
        this.tendency = "";
        this.pressurechange = "";
        this.weather = "";
        this.pastweather = "";
        this.heightlowest = "";
        this.visibility = "";
        this.visibilityEncoded = "";
        this.seatemp = "";
        this.method = "";
        this.seatempEncoded = "";
        this.cloud = "";
        this.cloudLayers = [];
        this.layersEncoded = "";
        this.lowestCloudHeight = 50000;
        this.lowestCloudHeightEncoded = "";
        this.seaheight = "";
        this.seaperiod = "";
        this.swelldir1 = "";
        this.swelldir2 = "";
        this.swellperiod1 = "";
        this.swellperiod2 = "";
        this.swellheight1 = "";
        this.swellheight2 = "";
        this.lowest = { "low": { "index": 999999, "type": "" }, "medium": { "index": 999999, "type": "" }, "high": { "index": 999999, "type": "" } };
        this.cloudCodeDict = {
            "CI": 0,
            "CC": 1,
            "CS": 2,
            "AC": 3,
            "AS": 4,
            "NS": 5,
            "SC": 6,
            "ST": 7,
            "CU": 8,
            "CB": 9
        };
        this.hshsDict = {
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
    }
    // all of the "sets" to follow are encoding the raw data put into the fields of the observation template
    setDatetime(date) {
        // need to add one to the hour  
        var valid = true;
        date = date.toString();
        var day = date.substr(8, 2);
        var hour = date.substr(11, 2);
        var dateEncoded = day + hour + 4 + " ";
        this.date = dateEncoded;
    }
    setLatitude(latitude) {
        var valid = true;
        if (latitude > 90 || latitude < 0 || isNaN(latitude) || latitude == "") {
            valid = false;
        }
        var latitude10 = latitude * 10;
        var latitudeEncoded = "";
        if (latitude10.toString().length == 1) {
            latitudeEncoded = "9900" + latitude10;
        }
        if (latitude10.toString().length == 2) {
            latitudeEncoded = "990" + latitude10;
        }
        if (latitude10.toString().length == 3) {
            latitudeEncoded = "99" + latitude10;
        }
        console.log(latitudeEncoded);
        this.latitude = latitudeEncoded;
        console.log("leaving setLatitude")

        return valid;
    }
    setQuadrant(quadrant) {
        var valid = true;
        if (quadrant != 1 && quadrant != 3 && quadrant != 5 && quadrant != 7) {
            valid = false;
        }
        this.quadrant = quadrant;

        return valid;
    }
    setLongitude(longitude) {
        var valid = true;
        if (longitude < 0 || longitude > 180 || isNaN(longitude) || longitude == "") {
            valid = false;
        }
        var longitude10 = longitude * 10;
        var longitudeEncoded = "";
        if (longitude10.toString().length == 1) {
            longitudeEncoded = "000" + longitude10;
        }
        if (longitude10.toString().length == 2) {
            longitudeEncoded = "00" + longitude10;
        }
        if (longitude10.toString().length == 3) {
            longitudeEncoded = "0" + longitude10;
        }
        console.log(longitudeEncoded);
        this.longitude = longitudeEncoded;
        console.log("leaving setLongitude")
        return valid
    }
    setWdirection(wdirection) {
        var valid = true;
        if (isNaN(wdirection) || wdirection < 1 || wdirection > 360 || wdirection == "" || this.isFloat(wdirection/10)) {
            valid = false;
        }
        wdirection = wdirection / 10;
        if (wdirection.toString().length == 1) {
            this.wdirection = "0" + wdirection;
        } else {
            this.wdirection = wdirection;
        }
        return valid;
    }
    setWspeed(wspeed) {
        var valid = true;
        wspeed = parseInt(wspeed);
        if (isNaN(wspeed) || wspeed >= 100 || wspeed < 0 || this.isFloat(wspeed)) {
            valid = false;
        }
        if (wspeed.toString().length == 1) {
            this.wspeed = "0" + wspeed;
        } else {
            this.wspeed = wspeed;
        }
        return valid;
    }
    setDs(ds) {
        var valid = true;
        ds = parseInt(ds);
        if (ds < 1 || ds > 8 || isNaN(ds)) {
            valid = false;
        }
        this.ds = "222" + ds;
        return valid;
    }
    setVs(vs) {
        var valid = true;
        vs = parseInt(vs);
        if (vs < 0 || vs > 9 || isNaN(vs)) {
            valid = false;
        }
        this.vs = vs;
        return valid;
    }
    setDbulb(dbulb) {
        var valid = true;
        if (isNaN(dbulb) || dbulb > 99) {
            valid = false;
        }
        var sign = "0";
        var dbulb10 = "";
        var dbulbString = dbulb.toString();
        if (dbulbString.charAt(0) == "-") {
            sign = "1";
            dbulbString = dbulbString.substr(1);
            dbulb = parseFloat(dbulbString);
            dbulb10 = dbulb * 10;
        } else {
            dbulb = parseFloat(dbulbString);
            dbulb10 = dbulb * 10;
        }
        if (dbulb10.toString().length == 1) {
            dbulb10 = "00" + dbulb10;
        }
        if (dbulb10.toString().length == 2) {
            dbulb10 = "0" + dbulb10;
        }
        this.dbulb = "1" + sign + dbulb10;
        return valid;
    }
    setDpoint(dpoint) {
        var valid = true;
        if (isNaN(dpoint) || dpoint > 99) {
            valid = false;
        }
        var sign = "0";
        var dpoint10 = "";
        var dpointstring = dpoint.toString();
        if (dpointstring.charAt(0) == "-") {
            sign = "1";
            dpointstring = dpointstring.substr(1);
            dpoint = parseFloat(dpointstring);
            dpoint10 = dpoint * 10;
        } else {
            dpoint = parseFloat(dpointstring);
            dpoint10 = dpoint * 10;
        }
        if (dpoint10.toString().length == 1) {
            dpoint10 = "00" + dpoint10;
        }
        if (dpoint10.toString().length == 2) {
            dpoint10 = "0" + dpoint10;
        }
        this.dpoint = "2" + sign + dpoint10;
        return valid;
    }
    setPressure(pressure) {
        var valid = true;
        if (isNaN(pressure) || pressure > 1050 || pressure < 900) {
            valid = false;
        }
        var pressure10 = pressure * 10;
        pressure10 = parseInt(pressure10);
        if (pressure10.toString().length === 5) {
            pressure10 = pressure10.toString().substr(1);
        }
        this.pressure = "4" + pressure10;
        return valid;
    }
    setTendency(tendency) {
        // need to change to a dropdown with values for each one eg. rising then falling, etc
        var valid = true;
        this.tendency = "5" + tendency;
        return valid;
    }
    setPressureChange(pressurechange) {
        var valid = true; 
        if (pressurechange < 0 && parseInt(this.tendency) < 54) {
            valid = false;
        }
        if (pressurechange >= 0 && parseInt(this.tendency) > 54) {
            valid = false;
        }
        if (isNaN(pressurechange) || pressurechange >= 10 || pressurechange <= -10) {
            valid = false;
        }
        var pressure10 = pressurechange * 10;
        if (pressure10.toString().length == 1) {
            pressure10 = "00" + pressure10;
        }
        if (pressure10.toString().length == 2) {
            pressure10 = "0" + pressure10;
        }
        this.pressurechange = pressure10;
        return valid;
    }
    setWeather(weather) {
        var valid = true;
        if (isNaN(weather) || weather < 0 || weather > 99) {
            valid = false;
        }
        if (weather.toString().length == 1) {
            weather = "0" + weather;
        }
        this.weather = "7" + weather;
        return valid;
    }
    setPastweather(pastweather) {
        var valid = true;
        if (isNaN(pastweather) || pastweather < 0 || pastweather > 99) {
            valid = false;
        }
        if (pastweather.toString().length == 1) {
            pastweather = pastweather + "0";
        }
        this.pastweather = pastweather;
        return valid;
    }
    setVisibility(visibility, distanceMetric) {
        var visibilityEncoded = this.encodeVisibility(visibility, distanceMetric);
        this.visibility = visibilityEncoded[0];
        var valid = visibilityEncoded[1];
        return valid;
    }
    setSeatemp(seatemp, method) {
        console.log("I am in setSeatemp",seatemp, method)
        var seatempEncoded = this.encodeSeatemp(seatemp, method);
        this.seatemp = seatempEncoded[0];
        var valid = seatempEncoded[1];
        return valid;
    }
    setSeaperiod(seaperiod) {
        var valid = true;
        if (isNaN(seaperiod) || seaperiod < 0 || seaperiod >= 100 || this.isFloat(seaperiod)) {
            valid = false;
        }
        if (seaperiod.toString().length == 1) {
            this.seaperiod = "0" + seaperiod;
        } else {
            this.seaperiod = seaperiod;
        }
        return valid;
    }
    setSeaheight(seaheight) {
        var valid = true;
        if (isNaN(seaheight) || seaheight < 0 || seaheight >= 50) {
            valid = false;
        }
        seaheight = parseFloat(seaheight);
        seaheight = seaheight / 0.5;
        if (this.isFloat(seaheight)) {
            valid = false;
        }
        if (seaheight.toString().length == 1) {
            this.seaheight = "0" + seaheight;
        } else {
            this.seaheight = seaheight;
        }
        return valid;
    }
    setSwelldir1(swelldir1) {
        var valid = true;
        if (isNaN(swelldir1) || swelldir1 < 1 || swelldir1 > 360) {
            valid = false;
        }
        swelldir1 = swelldir1 / 10;
        if (this.isFloat(swelldir1)) {
            valid = false;
        }
        if (swelldir1.toString().length == 1) {
            this.swelldir1 = "3" + "0" + swelldir1;
        } else {
            this.swelldir1 = "3" + swelldir1;
        }
        return valid;
    }
    setSwelldir2(swelldir2) {
        var valid = true;
        if (isNaN(swelldir2) || swelldir2 < 1 || swelldir2 > 360) {
            valid = false;
        }
        swelldir2 = swelldir2 / 10;
        if (this.isFloat(swelldir2)) {
            valid = false;
        }
        if (swelldir2.toString().length == 1) {
            this.swelldir2 = "0" + swelldir2;
        } else {
            this.swelldir2 = swelldir2;
        }
        return valid;
    }
    setSwellperiod1(swellperiod1) {
        var valid = true;
        if (isNaN(swellperiod1) || swellperiod1 < 0 || swellperiod1 >= 100 || this.isFloat(swellperiod1)) {
            valid = false;
        }
        if (swellperiod1.toString().length == 1) {
            this.swellperiod1 = "4" + "0" + swellperiod1;
        } else {
            this.swellperiod1 = "4" + swellperiod1;
        }
        return valid;
    }
    setSwellperiod2(swellperiod2) {
        var valid = true;
        if (isNaN(swellperiod2) || swellperiod2 < 0 || swellperiod2 >= 100 || this.isFloat(swellperiod2)) {
            valid = false;
        }
        if (swellperiod2.toString().length == 1) {
            this.swellperiod2 = "5" + "0" + swellperiod2;
        } else {
            this.swellperiod2 = "5" + swellperiod2;
        }
        return valid;
    }
    setSwellheight1(swellheight1) {
        var valid = true;
        if (isNaN(swellheight1) || swellheight1 < 0 || swellheight1 >= 50) {
            valid = false;
        }
        swellheight1 = parseFloat(swellheight1);
        swellheight1 = swellheight1 / 0.5;
        if (this.isFloat(swellheight1)) {
            valid = false;
        }
        if (swellheight1.toString().length == 1) {
            this.swellheight1 = "0" + swellheight1;
        } else {
            this.swellheight1 = swellheight1;
        }
        return valid;
    }
    setSwellheight2(swellheight2) {
        var valid = true;
        if (isNaN(swellheight2) || swellheight2 < 0 || swellheight2 >= 50) {
            valid = false;
        }
        swellheight2 = parseFloat(swellheight2);
        swellheight2 = swellheight2 / 0.5;
        if (this.isFloat(swellheight2)) {
            valid = false;
        }
        if (swellheight2.toString().length == 1) {
            this.swellheight2 = "0" + swellheight2;
        } else {
            this.swellheight2 = swellheight2;
        }
        return valid;
    }
    setCloudTotal(cloudTotal) {
        var valid = true;
        cloudTotal = parseFloat(cloudTotal);
        if (isNaN(cloudTotal) || cloudTotal < 0 || cloudTotal > 9 || this.isFloat(cloudTotal)) {
            valid = false;
        }
        this.cloudTotal = cloudTotal;
        return valid;
    }
    setLowCloudTotal(lowCloudTotal) {
        var valid = true;
        lowCloudTotal = parseFloat(lowCloudTotal);
        if (isNaN(lowCloudTotal) || lowCloudTotal < 0 || lowCloudTotal > 9 || this.isFloat(lowCloudTotal)) {
            valid = false;
        }
        this.lowCloudTotal = "8" + lowCloudTotal;
        return valid;
    }
    setCloud(lowest) {
        this.lowest = lowest;
        console.log(this.lowest)
        const lowCode = this.lowest["low"]["type"];
        const lowEncoded = lowCode.charAt(2);

        const mediumCode = this.lowest["medium"]["type"];
        const mediumEncoded = mediumCode.charAt(2);

        const highCode = this.lowest["high"]["type"];
        const highEncoded = highCode.charAt(2);

        this.cloud = lowEncoded + mediumEncoded + highEncoded;
    }
    setLowestCloudHeight() {
        for (const layerIndex in this.cloudLayers) {
            var cloudHeight = this.cloudLayers[layerIndex].height
            if (cloudHeight < parseInt(this.lowestCloudHeight)) {
                this.lowestCloudHeight = cloudHeight;
                this.lowestCloudHeightEncoded = this.getHeightCode(this.lowestCloudHeight);
                this.lowestCloudHeightEncoded = "41" + this.lowestCloudHeightEncoded;
            }
        }
    }
    setCloudlayers() {
        const cloudArray = [];
        this.cloudArray = cloudArray;
        var firstLayer = "";
        var secondLayer = "";
        var thirdLayer = "";
        var fourthLayer = "";
        for (const layerIndex in this.cloudLayers) {
            if (firstLayer == "" || this.cloudLayers[layerIndex].height < firstLayer.height) {
                firstLayer = this.cloudLayers[layerIndex];
                cloudArray.push(firstLayer);
            } else {
                if (this.cloudLayers[layerIndex].oktas >= 3 && (secondLayer == "" || this.cloudLayers[layerIndex].height < secondLayer.height)) {
                    secondLayer = this.cloudLayers[layerIndex];
                    cloudArray.push(secondLayer);
                } else {
                    if (this.cloudLayers[layerIndex].oktas >= 5 && (thirdLayer == "" || this.cloudLayers[layerIndex].height < thirdLayer.height)) {
                        thirdLayer = this.cloudLayers[layerIndex];
                        cloudArray.push(thirdLayer);
                    } else {
                        if (this.cloudLayers[layerIndex].type == "CB3" || this.cloudLayers[layerIndex].type == "CB9") {
                            fourthLayer = this.cloudLayers[layerIndex];
                            cloudArray.push(thirdLayer);
                        }
                    }
                }
            }
        }
        console.log(firstLayer, secondLayer, thirdLayer, fourthLayer);
        this.layersEncoded = "";
        for (const index in this.cloudArray) {
            const layer = this.cloudArray[index];
            console.log("====")
            console.log(layer)
            const okta = layer.oktas;
            const cloudCode = this.cloudCodeDict[layer.type.slice(0,2)];
            const heightCode = this.hshsDict[layer.height];
            var layerEncoded = "8" + okta + cloudCode + heightCode;
            this.layersEncoded = this.layersEncoded + layerEncoded + " " 
        }
        
    }
    encodeData() {
        // Creates the coded up observation
        this.encoded = "";
        this.encoded = this.encoded + "BBXX SHIP ";
        this.encoded = this.encoded + this.date + " ";
        this.encoded = this.encoded + this.latitude + " ";
        this.encoded = this.encoded + this.quadrant;
        this.encoded = this.encoded + this.longitude + " ";
        this.encoded = this.encoded + this.lowestCloudHeightEncoded + this.visibility + " ";
        this.encoded = this.encoded + this.cloudTotal + this.wdirection + this.wspeed + " ";
        this.encoded = this.encoded + this.dbulb + " ";
        this.encoded = this.encoded + this.dpoint + " ";
        this.encoded = this.encoded + this.pressure + " ";
        this.encoded = this.encoded + this.tendency + this.pressurechange + " ";
        this.encoded = this.encoded + this.weather + this.pastweather + " ";
        this.encoded = this.encoded + this.lowCloudTotal + this.cloud + " "; // CLOUD UNFINISHED
        this.encoded = this.encoded + this.ds + this.vs + " ";
        this.encoded = this.encoded + this.seatemp + " ";
        this.encoded = this.encoded + "2" + this.seaperiod + this.seaheight + " ";
        this.encoded = this.encoded + this.swelldir1 + this.swelldir2 + " ";
        this.encoded = this.encoded + this.swellperiod1 + this.swellheight1 + " ";
        this.encoded = this.encoded + this.swellperiod2 + this.swellheight2 + " ";
        this.encoded = this.encoded + this.layersEncoded;

        return this.encoded;
    }

    getHeightCode(lowestCloudHeight) {
        // A function to find the code for lowest cloud height, "h"
        var heightCode = "";
        if (lowestCloudHeight >= 0 && lowestCloudHeight < 100) {
            heightCode = 0;
        }
        if (lowestCloudHeight >= 100 && lowestCloudHeight < 300) {
            heightCode = 1;
        }
        if (lowestCloudHeight >= 300 && lowestCloudHeight < 600) {
            heightCode = 2;
        }
        if (lowestCloudHeight >= 600 && lowestCloudHeight < 900) {
            heightCode = 3;
        }
        if (lowestCloudHeight >= 900 && lowestCloudHeight < 1900) {
            heightCode = 4;
        }
        if (lowestCloudHeight >= 1900 && lowestCloudHeight < 3200) {
            heightCode = 5;
        }
        if (lowestCloudHeight >= 3200 && lowestCloudHeight < 4900) {
            heightCode = 6;
        }
        if (lowestCloudHeight >= 4900 && lowestCloudHeight < 6500) {
            heightCode = 7;
        }
        if (lowestCloudHeight >= 6500 && lowestCloudHeight < 8000) {
            heightCode = 8;
        }
        if (lowestCloudHeight >= 8000) {
            heightCode = 9
        }
        return heightCode;
    };

    encodeVisibility(visibility, distanceMetric) {
        var valid = true;
        this.visibility = 0;
        if (isNaN(visibility) || visibility < 0) {
            valid = false;
        }
        if (distanceMetric == "km") {
            visibility = visibility * 1000;
        }
        if (visibility < 50) {
            this.visibilityEncoded = 90;
        }
        if (visibility >= 50 && visibility < 200) {
            this.visibilityEncoded = 91;
        }
        if (visibility >= 200 && visibility < 500) {
            this.visibilityEncoded = 92;
        }
        if (visibility >= 500 && visibility < 1000) {
            this.visibilityEncoded = 93;
        }
        if (visibility >= 1000 && visibility < 2000) {
            this.visibilityEncoded = 94;
        }
        if (visibility >= 2000 && visibility < 4000) {
            this.visibilityEncoded = 95;
        }
        if (visibility >= 4000 && visibility < 10000) {
            this.visibilityEncoded = 96;
        }
        if (visibility >= 10000 && visibility < 20000) {
            this.visibilityEncoded = 97;
        }
        if (visibility >= 20000 && visibility < 50000) {
            this.visibilityEncoded = 98;
        }
        if (visibility > 50000) {
            this.visibilityEncoded = 99;
        }
        return [this.visibilityEncoded, valid];
    }
    encodeSeatemp(seatemp, method) {
        var valid = true;
        if (isNaN(seatemp) || seatemp >= 100 || seatemp <= -100 || seatemp == "") {
            valid = false;
        }
        var sign = 0;
        var seatempString = seatemp.toString();

        if (seatempString.charAt(0) == "-") {
            sign = 1;
            seatempString = seatempString.substr(1);
            seatemp = parseFloat(seatempString);
            var seatemp10 = seatemp * 10;
        } else {
            seatemp = parseFloat(seatempString);
            var seatemp10 = seatemp * 10;
        }
        if (seatemp10.toString().length == 1) {
            seatemp10 = "00" + seatemp10;
        }
        if (seatemp10.toString().length == 2) {
            seatemp10 = "0" + seatemp10;
        }
        if (method == "intake" && sign == 0) {
            this.method = "0";
        }
        if (method == "intake" && sign == 1) {
            this.method = "1";
        }
        if (method == "seabucket" && sign == 0) {
            this.method = "2";
        }
        if (method == "seabucket" && sign == 1) {
            this.method = "3";
        }
        if (method == "sonar2013" && sign == 0) {
            this.method = "4";
        }
        if (method == "sonar2013" && sign == 1) {
            this.method = "5";
        }
        if (method == "other" && sign == 0) {
            this.method = "6";
        }
        if (method == "other" && sign == 1) {
            this.method = "7";
        }

        this.seatempEncoded = "0" + this.method + seatemp10;
        return [this.seatempEncoded, valid];
    }

    getValidHeights(height) {
        var validHeights = [];
        if (isNaN(height)) {
            validHeights.push("Enter a valid height.")
        } else {
            height = parseInt(height);
        }
        for (const [heightValue, heightCode] of Object.entries(this.hshsDict)) {
            var debug = heightValue.toString().substr(0,height.toString().length);
            if (height == heightValue.toString().substr(0,height.toString().length)) {
                validHeights.push(heightValue);
            }
        }
        return validHeights;
    }

    addCloudLayer(type, height, oktas) {
        // Adds a cloud layer to the array with all of the cloud layers
        console.log(type);
        console.log(this.lowest)
        const cloudLayer = new CloudLayer(type, height, oktas, this.lowest);
        console.log(this.lowest)
        this.cloudLayers.push(cloudLayer);
        console.log(this.cloudLayers)
    }
    deleteCloudLayer(cloudLayerIndex) {
        // Deletes a selected cloud layer from the cloud layer array
        this.cloudLayers.splice(cloudLayerIndex, 1);
    }
    checkCloudLayers() {
        // need to getCloudDictionary method, do I need it in the CloudLayer class?
        // where is the best place to do this? here or CloudLayer class?
        var valid = true;
        const cloudDictionary = this.getCloudDictionary() // not sure how to do this
        for (const cloudLayerIndex in this.cloudLayers) {
            var cloudType = this.cloudLayers[cloudLayerIndex].type;
            var cloudHeight = this.cloudLayers[cloudLayerIndex].height
            var cloudOktas = this.cloudLayers[cloudLayerIndex].oktas
            console.log(cloudDictionary[cloudType])
            if (!(cloudType in cloudDictionary)) {
                valid = false;
                alert(`Invalid cloud layer! Cloud type ${cloudType} does not exist.`)
                this.cloudLayers.splice(cloudLayerIndex, 1);
            } else {
                if (!(cloudHeight <= cloudDictionary[cloudType].heightHighest && cloudHeight >= cloudDictionary[cloudType].heightLowest)) {
                    valid = false;
                    alert('Invalid height for this specified cloud type, please check again.');
                    this.cloudLayers.splice(cloudLayerIndex, 1);
                } else {
                    if (!(cloudOktas > 0 && cloudOktas < 9)) {
                        valid = false;
                        alert('Invalid oktas, please check again.');
                        this.cloudLayers.splice(cloudLayerIndex, 1);
                    }
                }
            }
            //if (this.cloudLayers[cloudLayer].height )
        }
        console.log("=====")
        console.log(valid)
        return valid;
    }
    isFloat(n){
        return Number(n) === n && n % 1 !== 0;
    }
    getCloudDictionary() {
        //calling this function will make an object containing all low, medium, and high cloud groups
        let cloudDictionary = {};
        let cloud = {};
        cloud.name = "CU1";
        cloud.code = 1;
        cloud.type = "low";
        cloud.importance = this.getCloudImportance(cloud.type, cloud.code);
        cloud.heightLowest = 1500;
        cloud.heightHighest = 6500;
        cloudDictionary[cloud.name] = cloud;

        cloud = {};
        cloud.name = "CU2";
        cloud.code = 2;
        cloud.type = "low";
        cloud.importance = this.getCloudImportance(cloud.type, cloud.code);
        cloud.heightLowest = 1500;
        cloud.heightHighest = 6500;
        cloudDictionary[cloud.name] = cloud;

        cloud = {};
        cloud.name = "CB3";
        cloud.code = 3;
        cloud.type = "low";
        cloud.importance = this.getCloudImportance(cloud.type, cloud.code);
        cloud.heightLowest = 1500;
        cloud.heightHighest = 6500;
        cloudDictionary[cloud.name] = cloud;

        cloud = {};
        cloud.name = "SC4";
        cloud.code = 4;
        cloud.type = "low";
        cloud.importance = this.getCloudImportance(cloud.type, cloud.code);
        cloud.heightLowest = 1500;
        cloud.heightHighest = 6500;
        cloudDictionary[cloud.name] = cloud;

        cloud = {};
        cloud.name = "SC5";
        cloud.code = 5;
        cloud.type = "low";
        cloud.importance = this.getCloudImportance(cloud.type, cloud.code);
        cloud.heightLowest = 1500;
        cloud.heightHighest = 6500;
        cloudDictionary[cloud.name] = cloud;

        cloud = {};
        cloud.name = "ST6";
        cloud.code = 6;
        cloud.type = "low";
        cloud.importance = this.getCloudImportance(cloud.type, cloud.code);
        cloud.heightLowest = 0;
        cloud.heightHighest = 1499;
        cloudDictionary[cloud.name] = cloud;

        cloud = {};
        cloud.name = "ST7";
        cloud.code = 7;
        cloud.type = "low";
        cloud.importance = this.getCloudImportance(cloud.type, cloud.code);
        cloud.heightLowest = 0;
        cloud.heightHighest = 1499;
        cloudDictionary[cloud.name] = cloud;

        cloud = {};
        cloud.name = "SC8";
        cloud.code = 8;
        cloud.type = "low";
        cloud.importance = this.getCloudImportance(cloud.type, cloud.code);
        cloud.heightLowest = 1500;
        cloud.heightHighest = 6500;
        cloudDictionary[cloud.name] = cloud;

        cloud = {};
        cloud.name = "CB9";
        cloud.code = 9;
        cloud.type = "low";
        cloud.importance = this.getCloudImportance(cloud.type, cloud.code);
        cloud.heightLowest = 1500;
        cloud.heightHighest = 6500;
        cloudDictionary[cloud.name] = cloud;

        cloud = {};
        cloud.name = "AS1";
        cloud.code = 1;
        cloud.type = "medium";
        cloud.importance = this.getCloudImportance(cloud.type, cloud.code);
        cloud.heightLowest = 6500;
        cloud.heightHighest = 16500;
        cloudDictionary[cloud.name] = cloud;

        cloud = {};
        cloud.name = "AS2";
        cloud.code = 2;
        cloud.type = "medium";
        cloud.importance = this.getCloudImportance(cloud.type, cloud.code);
        cloud.heightLowest = 6500;
        cloud.heightHighest = 16500;
        cloudDictionary[cloud.name] = cloud;

        cloud = {};
        cloud.name = "AC3";
        cloud.code = 3;
        cloud.type = "medium";
        cloud.importance = this.getCloudImportance(cloud.type, cloud.code);
        cloud.heightLowest = 6500;
        cloud.heightHighest = 16500;
        cloudDictionary[cloud.name] = cloud;

        cloud = {};
        cloud.name = "AC4";
        cloud.code = 4;
        cloud.type = "medium";
        cloud.importance = this.getCloudImportance(cloud.type, cloud.code);
        cloud.heightLowest = 6500;
        cloud.heightHighest = 16500;
        cloudDictionary[cloud.name] = cloud;

        cloud = {};
        cloud.name = "AC5";
        cloud.code = 5;
        cloud.type = "medium";
        cloud.importance = this.getCloudImportance(cloud.type, cloud.code);
        cloud.heightLowest = 6500;
        cloud.heightHighest = 16500;
        cloudDictionary[cloud.name] = cloud;

        cloud = {};
        cloud.name = "AC6";
        cloud.code = 6;
        cloud.type = "medium";
        cloud.importance = this.getCloudImportance(cloud.type, cloud.code);
        cloud.heightLowest = 6500;
        cloud.heightHighest = 16500;
        cloudDictionary[cloud.name] = cloud;

        cloud = {};
        cloud.name = "AC7";
        cloud.code = 7;
        cloud.type = "medium";
        cloud.importance = this.getCloudImportance(cloud.type, cloud.code);
        cloud.heightLowest = 6500;
        cloud.heightHighest = 16500;
        cloudDictionary[cloud.name] = cloud;

        cloud = {};
        cloud.name = "AC8";
        cloud.code = 8;
        cloud.type = "medium";
        cloud.importance = this.getCloudImportance(cloud.type, cloud.code);
        cloud.heightLowest = 6500;
        cloud.heightHighest = 16500;
        cloudDictionary[cloud.name] = cloud;

        cloud = {};
        cloud.name = "AC9";
        cloud.code = 9;
        cloud.type = "medium";
        cloud.importance = this.getCloudImportance(cloud.type, cloud.code);
        cloud.heightLowest = 6500;
        cloud.heightHighest = 16500;

        cloud = {};
        cloud.name = "CI1";
        cloud.code = 1;
        cloud.type = "high";
        cloud.importance = this.getCloudImportance(cloud.type, cloud.code);
        cloud.heightLowest = 16500;
        cloud.heightHighest = 100000;
        cloudDictionary[cloud.name] = cloud;


        cloud = {};
        cloud.name = "CI2";
        cloud.code = 2;
        cloud.type = "high";
        cloud.importance = this.getCloudImportance(cloud.type, cloud.code);
        cloud.heightLowest = 16500;
        cloud.heightHighest = 100000;
        cloudDictionary[cloud.name] = cloud;

        cloud = {};
        cloud.name = "CI3";
        cloud.code = 3;
        cloud.type = "high";
        cloud.importance = this.getCloudImportance(cloud.type, cloud.code);
        cloud.heightLowest = 16500;
        cloud.heightHighest = 100000;
        cloudDictionary[cloud.name] = cloud;

        cloud = {};
        cloud.name = "CI4";
        cloud.code = 4;
        cloud.type = "high";
        cloud.importance = this.getCloudImportance(cloud.type, cloud.code);
        cloud.heightLowest = 16500;
        cloud.heightHighest = 100000;
        cloudDictionary[cloud.name] = cloud;

        cloud = {};
        cloud.name = "CI5";
        cloud.code = 5;
        cloud.type = "high";
        cloud.importance = this.getCloudImportance(cloud.type, cloud.code);
        cloud.heightLowest = 16500;
        cloud.heightHighest = 100000;
        cloudDictionary[cloud.name] = cloud;

        cloud = {};
        cloud.name = "CI6";
        cloud.code = 6;
        cloud.type = "high";
        cloud.importance = this.getCloudImportance(cloud.type, cloud.code);
        cloud.heightLowest = 16500;
        cloud.heightHighest = 100000;
        cloudDictionary[cloud.name] = cloud;

        cloud = {};
        cloud.name = "CS7";
        cloud.code = 7;
        cloud.type = "high";
        cloud.importance = this.getCloudImportance(cloud.type, cloud.code);
        cloud.heightLowest = 16500;
        cloud.heightHighest = 100000;
        cloudDictionary[cloud.name] = cloud;

        cloud = {};
        cloud.name = "CS8";
        cloud.code = 8;
        cloud.type = "high";
        cloud.importance = this.getCloudImportance(cloud.type, cloud.code);
        cloud.heightLowest = 16500;
        cloud.heightHighest = 100000;
        cloudDictionary[cloud.name] = cloud;

        cloud = {};
        cloud.name = "CC9";
        cloud.code = 9;
        cloud.type = "high";
        cloud.importance = this.getCloudImportance(cloud.type, cloud.code);
        cloud.heightLowest = 16500;
        cloud.heightHighest = 100000;
        cloudDictionary[cloud.name] = cloud;

        return cloudDictionary;
    };
    getCloudImportanceDictionary() {
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
        cloudTypeHigh.importanceArray = [['CC9'], ['CS7'], ['CS8'], ['CI6'], ['CI5'], ['CI4'], ['CI3'], ['CI2'], ['CI1']];
        cloudImportanceDictionary[cloudTypeHigh.name] = cloudTypeHigh;
        return cloudImportanceDictionary;
    };
    getCloudImportance() {
        //cloud importance index, starting at 0 as most important and working down
        const cloudImportanceDictionary = this.getCloudImportanceDictionary();
        const cloudHeightGroups = Object.entries(cloudImportanceDictionary);
        for (const [height, cloud] of cloudHeightGroups) {
            for (const cloudTypes of cloud.importanceArray) {
                for (const cloudType of cloudTypes) {
                    if (this.type == cloudType) {
                        const cloudImportanceIndex = cloud.importanceArray.indexOf(cloudTypes);
                        if (cloudImportanceIndex < this.lowest[height].index) {
                            this.lowest[height].index = cloudImportanceIndex;
                            this.lowest[height].type = cloudType;
                        }
                        console.log(`${this.type} and ${cloudImportanceIndex}`);
                        return cloudImportanceIndex;
                    }
                }
            }
        }
    };  

}

class CloudLayer {
    constructor(type, height, oktas, lowest) {
        this.type = type;
        this.height = height;
        this.oktas = oktas;
        this.lowest = lowest
        this.cloudImportance = this.getCloudImportance();
    };


    getCloudDictionary() {
        //calling this function will make an object containing all low, medium, and high cloud groups
        let cloudDictionary = {};
        let cloud = {};
        cloud.name = "CU1";
        cloud.code = 1;
        cloud.type = "low";
        cloud.importance = getCloudImportance(cloud.type, cloud.code);
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
    };

    getCloudImportanceDictionary() {
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
        cloudTypeHigh.importanceArray = [['CC9'], ['CS7'], ['CS8'], ['CI6'], ['CI5'], ['CI4'], ['CI3'], ['CI2'], ['CI1']];
        cloudImportanceDictionary[cloudTypeHigh.name] = cloudTypeHigh;
        return cloudImportanceDictionary;
    };

    getCloudImportance() {
        //cloud importance index, starting at 0 as most important and working down
        const cloudImportanceDictionary = this.getCloudImportanceDictionary();
        const cloudHeightGroups = Object.entries(cloudImportanceDictionary);
        for (const [height, cloud] of cloudHeightGroups) {
            for (const cloudTypes of cloud.importanceArray) {
                for (const cloudType of cloudTypes) {
                    if (this.type == cloudType) {
                        const cloudImportanceIndex = cloud.importanceArray.indexOf(cloudTypes);
                        if (cloudImportanceIndex < this.lowest[height].index) {
                            this.lowest[height].index = cloudImportanceIndex;
                            this.lowest[height].type = cloudType;
                        }
                        console.log(`${this.type} and ${cloudImportanceIndex}`);
                        return cloudImportanceIndex;
                    }
                }
            }
        }
    };

    getFormatted() {
        var formatted = `type: ${this.type}, height: ${this.height}, oktas: ${this.oktas}`;
        return formatted;
    };
}