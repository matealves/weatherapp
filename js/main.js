//Cidade padrão ao carregar a página
let cityInput = "São Paulo";
fetchWeatherData();
app.style.opacity = "1";

cities.forEach((city) => {
  city.addEventListener("click", (e) => {
    cityInput = e.target.innerHTML;
    fetchWeatherData();
    app.style.opacity = "0";
  });
});

form.addEventListener("submit", (e) => {
  if (search.value.length == 0) {
    alert("Por favor, digite o nome de uma cidade.");
  } else {
    cityInput = search.value;
    fetchWeatherData();
    search.value = "";
    app.style.opacity = "0";
  }

  e.preventDefault();
});

const weekday = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

async function fetchWeatherData() {
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      cityInput
    )}&appid=5a4f64918a64060f148f5f475ae8e09c&units=metric&lang=pt_br`
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      temp.innerHTML = data.main.temp.toFixed(0) + "&#176;";
      conditionOutput.innerHTML = `${data.weather[0].description[0].toUpperCase()}${data.weather[0].description.substring(
        1
      )}`;

      let dateFull = new Date(data.dt * 1000);
      let dateDay = dateFull.getDay();
      let dateHour = dateFull.getHours();
      let dateMin = dateFull.getMinutes();

      if (dateHour < 10) {
        dateHour = "0" + dateHour;
      }
      if (dateMin < 10) {
        dateMin = "0" + dateMin;
      }

      if (data.sys.country !== "BR") {
        nameOutput.innerHTML = `${data.name}, ${data.sys.country}`;
      } else {
        nameOutput.innerHTML = `${data.name}`;
      }

      // timeOutput.innerHTML = `${dateHour}:${dateMin}`;
      dateOutput.innerHTML = `${
        weekday[dateDay]
      } ${dateFull.toLocaleDateString()}`;

      maxOutput.innerHTML = `Máx. ${data.main.temp_max.toFixed(0) + "&#176;C"}`;
      minOutput.innerHTML = `Mín. ${data.main.temp_min.toFixed(0) + "&#176;C"}`;

      const iconId = data.weather[0].icon;
      icon.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${iconId}@2x.png`
      );

      cloudOutput.innerHTML = data.clouds.all + "%";
      humidityOutput.innerHTML = data.main.humidity + "%";
      windOutput.innerHTML = data.wind.speed.toFixed(1) + "km/h";

      let timeOfDay = "day";
      const letterIcon = data.weather[0].icon.substring(2);

      const weatherId = data.weather[0].id;

      if (letterIcon == "n") {
        timeOfDay = "night";
      }

      if (weatherId == 800) {
        app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
        btn.style.background = "#ec6e4c";
        img.style.filter = "none";
        if (timeOfDay == "night") {
          btn.style.background = "#181e27";
        }
      } else if (
        weatherId == 801 ||
        weatherId == 802 ||
        weatherId == 803 ||
        weatherId == 804
      ) {
        app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
        btn.style.background = "#999";
        img.style.filter = "none";
        if (timeOfDay == "night") {
          btn.style.background = "#181e27";
        }
      } else if (
        weatherId == 200 ||
        weatherId == 201 ||
        weatherId == 202 ||
        weatherId == 210 ||
        weatherId == 211 ||
        weatherId == 212 ||
        weatherId == 221 ||
        weatherId == 522 ||
        weatherId == 230 ||
        weatherId == 231 ||
        weatherId == 232 ||
        weatherId == 300 ||
        weatherId == 301 ||
        weatherId == 302 ||
        weatherId == 310 ||
        weatherId == 311 ||
        weatherId == 312 ||
        weatherId == 313 ||
        weatherId == 314 ||
        weatherId == 321 ||
        weatherId == 500 ||
        weatherId == 501 ||
        weatherId == 502 ||
        weatherId == 503 ||
        weatherId == 504 ||
        weatherId == 511 ||
        weatherId == 520 ||
        weatherId == 521 ||
        weatherId == 522 ||
        weatherId == 531
      ) {
        app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
        btn.style.background = "#647d75";
        img.style.filter = "drop-shadow(0 0 1rem #fff)";
        if (timeOfDay == "night") {
          btn.style.background = "#325c80";
        }
      } else {
        app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
        btn.style.background = "#4d72aa";
        img.style.filter = "none";
        if (timeOfDay == "night") {
          btn.style.background = "#1b1b1b";
        }
      }

      app.style.opacity = "1";
    })

    .catch(() => {
      alert("Localização não encontrada, tente novamente.");
      app.style.opacity = "1";
    });
}
