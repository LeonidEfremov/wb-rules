var virualDevice = "wb-msw-v4_112";

defineRule("wb-msw4-aqi", {
    whenChanged: ["wb-msw-v4_112/Air Quality Index"],
    then: function(newValue, devName, cellName) {
        var aqi_good = newValue < 3;
        var aqi_middle = newValue == 3;
        var aqi_bad = newValue > 3;
        if (aqi_good) {
            dev[devName]["Green LED"] = true;
            dev[devName]["Red LED"] = false;
            dev[devName]["LED Period (s)"] = 10;
        }
        if (aqi_middle) {
            dev[devName]["Green LED"] = true;
            dev[devName]["Red LED"] = true;
            dev[devName]["LED Period (s)"] = 5;
        }
        if (aqi_bad) {
            dev[devName]["Green LED"] = false;
            dev[devName]["Red LED"] = true;
            dev[devName]["LED Period (s)"] = 1;
        }
    }
});