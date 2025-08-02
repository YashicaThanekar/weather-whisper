const apiKey = "997fb135a47a50ec128696e87fc8272e";


function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const { name, sys, main, weather, wind, coord } = data;

                // Main city weather
                document.getElementById("result").innerHTML = `
                    <h2>${name}, ${sys.country}</h2>
                    <p>Temperature: ${main.temp}°C</p>
                    <p>Weather: ${weather[0].main}</p>
                    <p>Humidity: ${main.humidity}%</p>
                    <p>Wind Speed: ${wind.speed} m/s</p>
                `;

                // Fetch nearby cities using lat/lon
                getNearbyCities(coord.lat, coord.lon);
            } else {
                document.getElementById("result").innerHTML = `<p>City not found.</p>`;
                document.getElementById("nearby").innerHTML = ``;
            }
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            document.getElementById("result").innerHTML = `<p>Error fetching data</p>`;
        });
}

function getNearbyCities(lat, lon) {
    const nearbyUrl = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=5&appid=${apiKey}&units=metric`;

    fetch(nearbyUrl)
        .then(res => res.json())
        .then(data => {
            let output = "<h3>Nearby Cities:</h3><ul>";
            data.list.forEach(city => {
                if (city.name.toLowerCase() !== document.getElementById("city").value.toLowerCase()) {

                    output += `<li>${city.name}: ${city.main.temp}°C</li>`;
                }
            });
            output += "</ul>";
            document.getElementById("nearby").innerHTML = output;
        })
        .catch(err => {
            console.error("Error fetching nearby cities:", err);
            document.getElementById("nearby").innerHTML = `<p>Unable to fetch nearby cities.</p>`;
        });
}
