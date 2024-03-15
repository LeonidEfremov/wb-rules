var lat = "";
var lon = "";
var api_key = "";

var virtualDevice = "yandex-weather";

var weatherVirtualDevice = defineVirtualDevice(virtualDevice, {
     title: "Yandex Weather",
     cells: {
          obs_time: {
               title: "Update time",
               type: "text",
               value: "",
               readonly: true,
               order: 0
          },
          temp: {
               title: "Temp",
               type: "value",
               units: "deg C",
               value: null,
               readonly: true,
               order: 1
          },
          feels_like: {
               title: "Feels like",
               type: "value",
               units: "deg C",
               value: null,
               readonly: true,
               order: 2
          },
          humidity: {
               title: "Humidity",
               type: "value",
               units: "%, RH",
               value: null,
               readonly: true,
               order: 3
          },
          wind_speed: {
               title: "Wind speed",
               type: "value",
               units: "",
               value: null,
               readonly: true,
               order: 4
          },
          wind_dir: {
               title: "Wind dir",
               type: "text",
               value: null,
               order: 5
          },
          pressure_mm: {
               title: "Pressure",
               type: "value",
               units: "mm",
               value: null,
               readonly: true,
               order: 6
          },
          condition: {
               title: "Condition",
               type: "text",
               value: null,
               order: 8
          }
     }
});

defineRule({
     when: cron("@every 30m"),
     then: _updateWeather.bind(this, lat, lon, api_key)
});

_updateWeather(lat, lon, api_key);

function _updateWeather(lat, lon, apiKey) {

     var url = "https://api.weather.yandex.ru/v2/informers?lat=" + lat + "&lon=" + lon;
     var command = "curl --header 'X-Yandex-API-Key: " + apiKey + "' '" + url + "' --silent";

     runShellCommand(command, {
          captureOutput: true,
          exitCallback: function (exitCode, capturedOutput) {
               if (exitCode == 0) {

                    var fact = JSON.parse(capturedOutput).fact;

                    dev[virtualDevice]["obs_time"] = new Date(fact.obs_time * 1000).toLocaleString();
                    dev[virtualDevice]["temp"] = fact.temp;
                    dev[virtualDevice]["feels_like"] = fact.feels_like;
                    dev[virtualDevice]["humidity"] = fact.humidity;
                    dev[virtualDevice]["wind_speed"] = fact.wind_speed;
                    dev[virtualDevice]["wind_dir"] = fact.wind_dir;
                    dev[virtualDevice]["pressure_mm"] = fact.pressure_mm;
                    dev[virtualDevice]["condition"] = fact.condition;
               }
          }
     });
};