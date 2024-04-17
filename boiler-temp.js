defineRule("boiler_temperature", {
    whenChanged: "yandex-weather/temp",
    then: function(newValue, devName, cellName) {
      dev["wbe2-i-opentherm_11"]["Outdoor Temperature"] = newValue;
    }
});
