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
        this.weather = "";
        this.pastweather = "";
        this.heightlowest = "";
        this.visibility = "";
        this.visibilityEncoded = "";
        this.seatemp = "";
        this.cloud = "";
        this.cloudLayers = [];
        this.lowestCloudHeight = 50000;
        this.lowestCloudHeightEncoded = "";
        this.swelldir = "";
        this.windwavehei = "";
        this.windwaveper = "";
        this.swellgroup1 = "";
        this.swellgroup2 = "";
        this.lowest = {"low":{"index":999999, "type":""},"medium":{"index":999999, "type":""},"high":{"index":999999, "type":""}};
    }
    // all of the "sets" to follow are encoding the raw data put into the fields of the observation template
    setDatetime(date) {
        // need to add one to the hour  
        date = date.toString();
        var day = date.substr(8, 2);
        var hour = date.substr(11, 2);
        var dateEncoded = day + hour + 4 + " ";
        this.date = dateEncoded;
    }
    setLatitude(latitude) {
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
    }
    setQuadrant(quadrant) {
        this.quadrant = quadrant;
    }
    setLongitude(longitude) {
        this.longitude = longitude;
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
    }
    setHeightLowest(heightlowest) {
        this.heightlowest = "4" + "1" + heightlowest;
    }
    setWdirection(wdirection) {
        this.wdirection = wdirection / 10;
    }
    setWspeed(wspeed) {
        this.wspeed = wspeed;
    }
    setDs(ds) {
        this.ds = ds;
    }
    setVs(vs) {
        this.vs = vs;
    }
    setDbulb(dbulb) {
        var sign = "0";
        var dbulb10 = "";
        var dbulbString = dbulb.toString();
        if (dbulbString.charAt(0) == "-") {
            sign = "1";
            dbulbString = dbulbString.substr(1);
            dbulb = parseInt(dbulbString);
            dbulb10 = dbulb * 10;
        } else {
            dbulb = parseInt(dbulbString);
            dbulb10 = dbulb * 10;
        }
        
        this.dbulb = dbulb10;
    }
    setDpoint(dpoint) {
        this.dpoint = dpoint;
    }
    setPressure(pressure) {
        this.pressure = pressure;
    }
    setTendency(tendency) {
        this.tendency = tendency;
    }
    setPressureChange(pressurechange) {
        this.pressurechange = pressurechange;
    }
    setWeather(weather) {
        this.weather = weather;
    }
    setPastweather(pastweather) {
        this.pastweather = pastweather;
    }
    setVisibility(visibility, distanceMetric) {
        this.visibility = this.encodeVisibility(visibility, distanceMetric);
    }
    setSeatemp(seatemp) {
        this.seatemp = seatemp;
    }
    setWindWavePer(windwaveper) {
        this.windwaveper = windwaveper;
    }
    setWindWaveHei(windwavehei) {
        this.windwavehei = windwavehei;
    }
    setSwellDir(swelldir) {
        this.swelldir = swelldir;
    }
    setSwellGroup1(swellgroup1) {
        this.swellgroup1 = swellgroup1;
    }
    setSwellGroup2(swellgroup2) {
        this.swellgroup2 = swellgroup2;
    }
    setCloudTotal(cloudTotal) {
        this.cloudTotal = cloudTotal;
    }
    setLowCloudTotal(lowCloudTotal) {
        this.lowCloudTotal = lowCloudTotal;
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
        for(const layerIndex in this.cloudLayers) {
            var cloudHeight = this.cloudLayers[layerIndex].height
            if (cloudHeight < parseInt(this.lowestCloudHeight)) {
                this.lowestCloudHeight = cloudHeight;
                this.lowestCloudHeightEncoded = this.getHeightCode(this.lowestCloudHeight);
            }
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
        this.encoded = this.encoded + "41" + this.lowestCloudHeightEncoded + this.visibility + " ";
        this.encoded = this.encoded + this.cloudTotal + this.wdirection + this.wspeed + " ";
        this.encoded = this.encoded + "1" + this.dbulb + " ";
        this.encoded = this.encoded + "8" + this.lowCloudTotal + this.cloud;

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
        return this.visibilityEncoded;
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
}

class CloudLayer {
    constructor(type, height, oktas, lowest) {
        this.type = type;
        this.height = height;
        this.oktas = oktas;
        this.cloudCodeDict = {};
        this.hshsDict = {};
        this.lowest = lowest
        this.cloudImportance = this.getCloudImportance();
    };

    cloudCodeDict = {
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

    getCloudDictionary() {
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
        cloudTypeHigh.importanceArray = [['CI1'], ['CI2'], ['AC7c'], ['AC6'], ['AC5'], ['AC4'], ['AC7c'], ['AC7b', 'AC3'], ['AS2'], ['AS1']];
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
    getFormatted() {
        var formatted = `type: ${this.type}, height: ${this.height}, oktas: ${this.oktas}`;
        return formatted;
    };
}