var temperatureSetpoint = 19;
var hysteresis = 1;
var temperatureControl = "wb-msw-v4_112/Temperature";

defineRule("boiler-room_temperature", {
    whenChanged: [temperatureControl],
    then: function(newValue, devName, cellName) {
      if(newValue < temperatureSetpoint - hysteresis/2)
      {
        dev["wb-mr6cu_180"]["K1"] = true;
        dev["wb-mr6cu_180"]["K2"] = true;
      }
      if(newValue > temperatureSetpoint + hysteresis/2)
      {
        dev["wb-mr6cu_180"]["K1"] = false;
        dev["wb-mr6cu_180"]["K2"] = false;
      }
    }
});
