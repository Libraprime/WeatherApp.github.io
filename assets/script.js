const apiKey = "82a85753aed48826e89e4d43e6b62244";

const weatherDataEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input");


const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
});

const getWeatherData = async (cityValue) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);
        
        if(!response.ok) {
            throw new Error("network response was not ok")
        }  
        
        const data = await response.json();

        // console.log(data);
        
        const temperature = Math.round(data.main.temp);
        
        const description = data.weather[0].description; 
        
        const icon = data.weather[0].icon;
        
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed} m/s`,
        ]
        
        weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather icon" width="100px" height="100px">`;
        
        weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`;
        
        weatherDataEl.querySelector(".description").textContent = description;
        
        weatherDataEl.querySelector(".details").innerHTML = details.map((detail) => `<div>${detail}</div>`).join("");
        } catch (error) {
        weatherDataEl.querySelector(".icon").innerHTML = "";
        
        weatherDataEl.querySelector(".temperature").textContent = "";
        
        weatherDataEl.querySelector(".description").textContent = "An error occured, Confirm if the location exists and try again later.";
        
        weatherDataEl.querySelector(".details").innerHTML = "";
    }
}