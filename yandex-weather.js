var lat = "";
var lon = "";
var api_key = "";

var virtualDevice = "yandex-weather";

var vd = defineVirtualDevice(virtualDevice, {
     title: "Yandex Weather",
     cells: {
          obs_time: {
               title: "Update time",
               type: "text",
               value: null,
               readonly: true,
               order: 0
          },
          temp: {
               title: "Temp",
               type: "temperature",
               value: null,
               readonly: true,
               order: 1
          },
          feels_like: {
               title: "Feels like",
               type: "temperature",
               value: null,
               readonly: true,
               order: 2
          },
          humidity: {
               title: "Humidity",
               type: "rel_humidity",
               value: null,
               readonly: true,
               order: 3
          },
          pressure_pa: {
               title: "Pressure",
               type: "atmospheric_pressure",
               value: null,
               readonly: true,
               order: 4
          },
          condition: {
               title: "Condition",
               type: "text",
               value: null,
               readonly: true,
               order: 5
          }
     }
});

defineRule({
     when: cron("@every 30m"),
     then: _updateWeather.bind(this, lat, lon, api_key)
});

_updateWeather(lat, lon, api_key);

function _updateWeather(lat, lon, apiKey) {
     runShellCommand("curl --header 'X-Yandex-API-Key: " + apiKey + "' 'https://api.weather.yandex.ru/v2/informers?lat=" + lat + "&lon=" + lon + "' --silent", {
          captureOutput: true,
          exitCallback: function (exitCode, capturedOutput) {
               if (exitCode == 0) {
                    var weather = JSON.parse(capturedOutput);
                    dev[virtualDevice]["obs_time"] = new Date(weather.fact.obs_time * 1000).toLocaleString("ru-RU");
                    dev[virtualDevice]["temp"] = weather.fact.temp;
                    dev[virtualDevice]["feels_like"] = weather.fact.feels_like;
                    dev[virtualDevice]["humidity"] = weather.fact.humidity;
                    dev[virtualDevice]["pressure_pa"] = weather.fact.pressure_pa;
                    dev[virtualDevice]["condition"] = weather.fact.condition;
               }
          }
     });
};