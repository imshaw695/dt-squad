export class Observation {
    constructor(user) {
        console.log("Observation has been instantiated.")
        this.user = user;
        this.encoded = "";
        this.date = "";
        this.dateEncoded = "";
        this.latitude = "";
        this.latitudeEncoded="";
        this.quadrant = "";
        this.longitude = "";
        this.longitudeEncoded = "";
        this.cloudTotal = "";
        this.cloudTotalEncoded = "";
        this.lowCloudTotal = "";
        this.lowCloudTotalEncoded = "";
        this.wspeed = "";
        this.wspeedEncoded = "";
        this.wdirection = "";
        this.wdirectionEncoded = "";
        this.ds = "";
        this.dsEncoded = "";
        this.vs = "";
        this.vsEncoded = "";
        this.dbulb = "";
        this.dbulbEncoded = "";
        this.dpoint = "";
        this.dpointEncoded = "";
        this.pressure = "";
        this.pressureEncoded = "";
        this.tendency = "";
        this.tendencyEncoded = "";
        this.pressurechange = "";
        this.pressurechangeEncoded = "";
        this.weather = "";
        this.weatherEncoded = "";
        this.pastweather = "";
        this.pastweatherEncoded = "";
        this.heightlowest = "";
        this.visibility = "";
        this.distanceMetric = "";
        this.visibilityEncoded = "";
        this.seatemp = "";
        this.method = "";
        this.methodEncoded = "",
        this.seatempEncoded = "";
        this.cloud = "";
        this.cloudLayers = [];
        this.layersEncoded = "";
        this.lowestCloudHeight = 50000;
        this.lowestCloudHeightEncoded = "";
        this.seaheight = "";
        this.seaheightEncoded = "";
        this.seaperiod = "";
        this.seaperiodEncoded = "";
        this.swelldir1 = "";
        this.swelldir1Encoded = "";
        this.swelldir2 = "";
        this.swelldir2Encoded = "";
        this.swellperiod1 = "";
        this.swellperiod1Encoded = "";
        this.swellperiod2 = "";
        this.swellperiod2Encoded = "";
        this.swellheight1 = "";
        this.swellheight1Encoded = "";
        this.swellheight2 = "";
        this.swellheight2Encoded = "";
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
        this.cloudTypeArray = [
            "CU1",
            "CU2",
            "CB3",
            "SC4",
            "SC5",
            "ST6",
            "ST7",
            "SC8",
            "CB9",
            "AS1",
            "AS2",
            "AC3",
            "AC4",
            "AC5",
            "AC6",
            "AC7",
            "AC8",
            "AC9",
            "CI1",
            "CI2",
            "CI3",
            "CI4",
            "CS5",
            "CS6",
            "CS7",
            "CS8",
            "CC9",
        ]
        this.hshsDict = this.generatehshsDict();
        this.persistable_fields = ["date","latitude","quadrant","longitude",]
    }
    // all of the "sets" to follow are encoding the raw data put into the fields of the observation template
    setDatetime() {
        console.log("executing setDateTime")
        // need to add one to the hour  
        var date = this.date.toString();
        var day = date.substr(8, 2);
        var hour = date.substr(11, 2);
        this.dateEncoded = day + hour + 4 + " ";
        this.encodeData();
    }
    setLatitude() {
        var valid = true;
        if (this.latitude > 90 || this.latitude < 0 || isNaN(this.latitude) || this.latitude == "") {
            valid = false;
        }
        var latitude10 = this.latitude * 10;
        this.latitudeEncoded = "";
        if (latitude10.toString().length == 1) {
            this.latitudeEncoded = "9900" + latitude10;
        }
        if (latitude10.toString().length == 2) {
            this.latitudeEncoded = "990" + latitude10;
        }
        if (latitude10.toString().length == 3) {
            this.latitudeEncoded = "99" + latitude10;
        }
        this.encodeData();
        return valid;
    }
    setQuadrant() {
        var valid = true;
        if (this.quadrant != 1 && this.quadrant != 3 && this.quadrant != 5 && this.quadrant != 7) {
            valid = false;
        }
        this.encodeData();
        return valid;
    }
    setLongitude() {
        var valid = true;
        if (this.longitude < 0 || this.longitude > 180 || isNaN(this.longitude) || this.longitude == "") {
            valid = false;
        }
        var longitude10 = this.longitude * 10;
        if (longitude10.toString().length == 1) {
            this.longitudeEncoded = "000" + longitude10;
        }
        if (longitude10.toString().length == 2) {
            this.longitudeEncoded = "00" + longitude10;
        }
        if (longitude10.toString().length == 3) {
            this.longitudeEncoded = "0" + longitude10;
        }
        this.encodeData();
        return valid
    }
    setWdirection() {
        var valid = true;
        if (isNaN(this.wdirection) || this.wdirection < 1 || this.wdirection > 360 || this.wdirection == "" || this.isFloat(this.wdirection/10)) {
            valid = false;
        }
        var wdirection = this.wdirection / 10;
        if (wdirection.toString().length == 1) {
            this.wdirectionEncoded = "0" + wdirection;
        } else {
            this.wdirectionEncoded = wdirection;
        }
        this.encodeData();
        return valid;
    }
    setWspeed() {
        var valid = true;
        var wspeed = parseInt(this.wspeed);
        if (isNaN(wspeed) || wspeed >= 100 || wspeed < 0 || this.isFloat(wspeed)) {
            valid = false;
        }
        if (wspeed.toString().length == 1) {
            this.wspeedEncoded = "0" + wspeed;
        } else {
            this.wspeedEncoded = wspeed;
        }
        this.encodeData();
        return valid;
    }
    setDs() {
        var valid = true;
        var ds = parseInt(this.ds);
        if (ds < 1 || ds > 8 || isNaN(ds)) {
            valid = false;
        }
        this.dsEncoded = "222" + ds;
        this.encodeData();
        return valid;
    }
    setVs() {
        var valid = true;
        var vs = parseInt(this.vs);
        if (vs < 0 || vs > 9 || isNaN(vs)) {
            valid = false;
        }
        this.vsEncoded = vs;
        this.encodeData();
        return valid;
    }
    setDbulb() {
        var valid = true;
        var dbulb = this.dbulb;
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
        this.dbulbEncoded = "1" + sign + dbulb10;
        this.encodeData();
        return valid;
    }
    setDpoint() {
        var valid = true;
        var dpoint = this.dpoint;
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
        this.dpointEncoded = "2" + sign + dpoint10;
        this.encodeData();
        return valid;
    }
    setPressure() {
        var valid = true;
        if (isNaN(this.pressure) || this.pressure > 1050 || this.pressure < 900) {
            valid = false;
        }
        var pressure10 = this.pressure * 10;
        pressure10 = parseInt(pressure10);
        if (pressure10.toString().length === 5) {
            pressure10 = pressure10.toString().substr(1);
        }
        this.pressureEncoded = "4" + pressure10;
        this.encodeData();
        return valid;
    }
    setTendency() {
        // need to change to a dropdown with values for each one eg. rising then falling, etc
        var valid = true;
        this.tendencyEncoded = "5" + this.tendency;
        this.encodeData();
        return valid;
    }
    setPressureChange() {
        var valid = true; 
        if (this.pressurechange < 0 && parseInt(this.tendency) < 54) {
            valid = false;
        }
        if (this.pressurechange >= 0 && parseInt(this.tendency) > 54) {
            valid = false;
        }
        if (isNaN(this.pressurechange) || this.pressurechange >= 10 || this.pressurechange <= -10) {
            valid = false;
        }
        if (this.pressurechange > 0) {
            var pressure10 = this.pressurechange * 10;
        } else {
            var pressure10 = this.pressurechange * (-10);
        }
        if (pressure10.toString().length == 1) {
            pressure10 = "00" + pressure10;
        }
        if (pressure10.toString().length == 2) {
            pressure10 = "0" + pressure10;
        }
        this.pressurechangeEncoded = pressure10;
        this.encodeData();
        return valid;
    }
    setWeather() {
        var valid = true;
        var weather = this.weather;
        if (isNaN(this.weather) || this.weather < 0 || this.weather > 99) {
            valid = false;
        }
        if (this.weather.toString().length == 1) {
            weather = "0" + weather;
        }
        this.weatherEncoded = "7" + weather;
        this.encodeData();
        return valid;
    }
    setPastweather() {
        var valid = true;
        var pastweather = this.pastweather;
        if (isNaN(pastweather) || pastweather < 0 || pastweather > 99) {
            valid = false;
        }
        if (pastweather.toString().length == 1) {
            pastweather = pastweather + "0";
        }
        this.pastweatherEncoded = pastweather;
        this.encodeData();
        return valid;
    }
    setVisibility() {
        var valid = this.encodeVisibility();
        this.encodeData();
        return valid;
    }
    setSeatemp() {
        var valid = this.encodeSeatemp();
        this.encodeData();
        return valid;
    }
    setSeaperiod() {
        var valid = true;
        var seaperiod = this.seaperiod;
        if (isNaN(seaperiod) || seaperiod < 0 || seaperiod >= 100 || this.isFloat(seaperiod)) {
            valid = false;
        }
        if (seaperiod.toString().length == 1) {
            this.seaperiodEncoded = "0" + seaperiod;
        } else {
            this.seaperiodEncoded = seaperiod;
        }
        this.encodeData();
        return valid;
    }
    setSeaheight() {
        var valid = true;
        var seaheight = this.seaheight;
        if (isNaN(seaheight) || seaheight < 0 || seaheight >= 50) {
            valid = false;
        }
        seaheight = parseFloat(seaheight);
        seaheight = seaheight / 0.5;
        if (this.isFloat(seaheight)) {
            valid = false;
        }
        if (seaheight.toString().length == 1) {
            this.seaheightEncoded = "0" + seaheight;
        } else {
            this.seaheightEncoded = seaheight;
        }
        this.encodeData();
        return valid;
    }
    setSwelldir1() {
        var valid = true;
        var swelldir1 = this.swelldir1;
        if (isNaN(swelldir1) || swelldir1 < 1 || swelldir1 > 360) {
            valid = false;
        }
        swelldir1 = swelldir1 / 10;
        if (this.isFloat(swelldir1)) {
            valid = false;
        }
        if (swelldir1.toString().length == 1) {
            this.swelldir1Encoded = "3" + "0" + swelldir1;
        } else {
            this.swelldir1Encoded = "3" + swelldir1;
        }
        this.encodeData();
        return valid;
    }
    setSwelldir2() {
        var valid = true;
        var swelldir2 = this.swelldir2;
        if (isNaN(swelldir2) || swelldir2 < 1 || swelldir2 > 360) {
            valid = false;
        }
        swelldir2 = swelldir2 / 10;
        if (this.isFloat(swelldir2)) {
            valid = false;
        }
        if (swelldir2.toString().length == 1) {
            this.swelldir2Encoded = "0" + swelldir2;
        } else {
            this.swelldir2Encoded = swelldir2;
        }
        this.encodeData();
        return valid;
    }
    setSwellperiod1() {
        var valid = true;
        var swellperiod1 = this.swellperiod1;
        if (isNaN(swellperiod1) || swellperiod1 < 0 || swellperiod1 >= 100 || this.isFloat(swellperiod1)) {
            valid = false;
        }
        if (swellperiod1.toString().length == 1) {
            this.swellperiod1Encoded = "4" + "0" + swellperiod1;
        } else {
            this.swellperiod1Encoded = "4" + swellperiod1;
        }
        this.encodeData();
        return valid;
    }
    setSwellperiod2() {
        var valid = true;
        var swellperiod2 = this.swellperiod2;
        if (isNaN(swellperiod2) || swellperiod2 < 0 || swellperiod2 >= 100 || this.isFloat(swellperiod2)) {
            valid = false;
        }
        if (swellperiod2.toString().length == 1) {
            this.swellperiod2Encoded = "5" + "0" + swellperiod2;
        } else {
            this.swellperiod2Encoded = "5" + swellperiod2;
        }
        this.encodeData();
        return valid;
    }
    setSwellheight1() {
        var valid = true;
        var swellheight1 = this.swellheight1;
        if (isNaN(swellheight1) || swellheight1 < 0 || swellheight1 >= 50) {
            valid = false;
        }
        swellheight1 = parseFloat(swellheight1);
        swellheight1 = swellheight1 / 0.5;
        if (this.isFloat(swellheight1)) {
            valid = false;
        }
        if (swellheight1.toString().length == 1) {
            this.swellheight1Encoded = "0" + swellheight1;
        } else {
            this.swellheight1Encoded = swellheight1;
        }
        this.encodeData();
        return valid;
    }
    setSwellheight2() {
        var valid = true;
        var swellheight2 = this.swellheight2;
        if (isNaN(swellheight2) || swellheight2 < 0 || swellheight2 >= 50) {
            valid = false;
        }
        swellheight2 = parseFloat(swellheight2);
        swellheight2 = swellheight2 / 0.5;
        if (this.isFloat(swellheight2)) {
            valid = false;
        }
        if (swellheight2.toString().length == 1) {
            this.swellheight2Encoded = "0" + swellheight2;
        } else {
            this.swellheight2Encoded = swellheight2;
        }
        this.encodeData();
        return valid;
    }
    setCloudTotal() {
        var valid = true;
        var cloudTotal = this.couldTotal
        cloudTotal = parseFloat(cloudTotal);
        if (isNaN(cloudTotal) || cloudTotal < 0 || cloudTotal > 9 || this.isFloat(cloudTotal)) {
            valid = false;
        }
        this.cloudTotalEncoded = cloudTotal;
        this.encodeData();
        return valid;
    }
    setLowCloudTotal() {
        var valid = true;
        var lowCloudTotal = this.lowCloudTotal;
        lowCloudTotal = parseFloat(lowCloudTotal);
        if (isNaN(lowCloudTotal) || lowCloudTotal < 0 || lowCloudTotal > 9 || this.isFloat(lowCloudTotal)) {
            valid = false;
        }
        this.lowCloudTotalEncoded = "8" + lowCloudTotal;
        this.encodeData();
        return valid;
    }
    setCloud(lowest) {
        this.lowest = lowest;

        var lowCode = this.lowest["low"]["type"];
        var lowEncoded = lowCode.charAt(2);
        if (lowCode == "") {
            lowEncoded = "/"
        }
        
        var mediumCode = this.lowest["medium"]["type"];
        var mediumEncoded = mediumCode.charAt(2);
        if (mediumCode == "") {
            mediumEncoded = "/"
        }
        
        var highCode = this.lowest["high"]["type"];
        var highEncoded = highCode.charAt(2);
        if (highCode == "") {
            highEncoded = "/"
        }
        
        this.cloud = lowEncoded + mediumEncoded + highEncoded;
        console.log(this.cloud)
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
        console.log("executing encodeData")
        // Creates the coded up observation
        this.encoded = "";
        this.encoded = this.encoded + "BBXX SHIP ";
        this.encoded = this.encoded + this.dateEncoded + " ";
        this.encoded = this.encoded + this.latitudeEncoded + " ";
        this.encoded = this.encoded + this.quadrant;
        this.encoded = this.encoded + this.longitudeEncoded + " ";
        this.encoded = this.encoded + this.lowestCloudHeightEncoded + this.visibilityEncoded + " ";
        this.encoded = this.encoded + this.cloudTotalEncoded + this.wdirectionEncoded + this.wspeedEncoded + " ";
        this.encoded = this.encoded + this.dbulbEncoded + " ";
        this.encoded = this.encoded + this.dpointEncoded + " ";
        this.encoded = this.encoded + this.pressureEncoded + " ";
        this.encoded = this.encoded + this.tendencyEncoded + this.pressurechangeEncoded + " ";
        this.encoded = this.encoded + this.weatherEncoded + this.pastweatherEncoded + " ";
        this.encoded = this.encoded + this.lowCloudTotalEncoded + this.cloud + " "; // CLOUD UNFINISHED
        this.encoded = this.encoded + this.dsEncoded + this.vsEncoded + " ";
        this.encoded = this.encoded + this.seatempEncoded + " ";
        this.encoded = this.encoded + "2" + this.seaperiodEncoded + this.seaheightEncoded + " ";
        this.encoded = this.encoded + this.swelldir1Encoded + this.swelldir2Encoded + " ";
        this.encoded = this.encoded + this.swellperiod1Encoded + this.swellheight1Encoded + " ";
        this.encoded = this.encoded + this.swellperiod2Encoded + this.swellheight2Encoded + " ";
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

    encodeVisibility() {
        var valid = true;
        var visibility = this.visibility
        if (isNaN(visibility) || visibility < 0) {
            valid = false;
        }
        if (this.distanceMetric == "km") {
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
        if (visibility >= 50000) {
            this.visibilityEncoded = 99;
        }
        return valid;
    }
    encodeSeatemp() {
        var valid = true;
        var seatemp = this.seatemp;
        var method = this.method;
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
            this.methodEncoded = "0";
        }
        if (method == "intake" && sign == 1) {
            this.methodEncoded = "1";
        }
        if (method == "seabucket" && sign == 0) {
            this.methodEncoded = "2";
        }
        if (method == "seabucket" && sign == 1) {
            this.methodEncoded = "3";
        }
        if (method == "sonar2013" && sign == 0) {
            this.methodEncoded = "4";
        }
        if (method == "sonar2013" && sign == 1) {
            this.methodEncoded = "5";
        }
        if (method == "other" && sign == 0) {
            this.methodEncoded = "6";
        }
        if (method == "other" && sign == 1) {
            this.methodEncoded = "7";
        }

        this.seatempEncoded = "0" + this.methodEncoded + seatemp10;
        return valid;
    }

    getValidHeights(height) {
        var validHeights = [];
        if (isNaN(height)) {
            validHeights.push("Enter a valid height.")
        } else {
            height = parseInt(height);
        }
        for (const [heightValue, heightCode] of Object.entries(this.hshsDict)) {
            if (height == heightValue.toString().substr(0,height.toString().length)) {
                validHeights.push(heightValue);
            }
        }
        return validHeights;
    }

    getValidClouds(cloud) {
        var validClouds = [];
        console.log(cloud)
        if (!(isNaN(cloud))) {
            validClouds.push("Enter a valid cloud.")
        }
        for (const cloudTypeIndex in this.cloudTypeArray) {
            const cloudType = this.cloudTypeArray[cloudTypeIndex];
            console.log(cloud)
            if (cloud == cloudType.substr(0,cloud.length)) {
                validClouds.push(cloudType);
            }
        }
        return validClouds;
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
        var specificMessage = "";
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
                specificMessage = "Cloud type entered does not exist, please enter valid cloud type."
                this.cloudLayers.splice(cloudLayerIndex, 1);
            } else {
                if (!(cloudHeight <= cloudDictionary[cloudType].heightHighest && cloudHeight >= cloudDictionary[cloudType].heightLowest)) {
                    valid = false;
                    specificMessage = 'Invalid height for this specified cloud type, please check again.';
                    this.cloudLayers.splice(cloudLayerIndex, 1);
                } else {
                    if (!(cloudOktas > 0 && cloudOktas < 9)) {
                        valid = false;
                        specificMessage = 'Invalid oktas, please check again.';
                        this.cloudLayers.splice(cloudLayerIndex, 1);
                    }
                }
            }
            //if (this.cloudLayers[cloudLayer].height )
        }
        return [valid,specificMessage];
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

    generatehshsDict() {
        var hshsDict = {
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
        return hshsDict;
    };
    create_data_dict() {
        this.data_dict = {}
        for(let i=0;i<this.persistable_fields.length;i++) {
          const key = this.persistable_fields[i];
          this.data_dict[key] = this[key]
        }
        return this.data_dict;
    };
    populate_data_from_dictionary(observation_data) {
        for(const [key, value] of Object.entries(observation_data)) {
          this[key] = value;
        }
      }
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