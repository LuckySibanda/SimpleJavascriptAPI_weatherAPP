
const apiKey = "5b0916ebabb71e57e40c90593c01754f";
// add api key

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    // add url without the api key, without city name

const searchBox = document.querySelector('.search-input');

const searchBtn = document.querySelector('.search-btn');


async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    let data = await response.json();

    
    console.log(data);

    if (data.weather[0].description.toLowerCase() == "scattered clouds") {
        document.querySelector('.weather-image').src = "../conditions/fog.png";
    }

    else if (data.weather[0].description.toLowerCase() == "fog") {
        document.querySelector('.weather-image').src = "../conditions/foggy.svg";
    }

    else if (data.weather[0].description.toLowerCase() == "clear sky") {
        document.querySelector('.weather-image').src = "../conditions/moon-light.svg";
    }

    else if (data.weather[0].description.toLowerCase() == "broken clouds") {
        document.querySelector('.weather-image').src = "../conditions/SVG/combined_weather/cloudy.svg";
    }

    else if (data.weather[0].description.toLowerCase() == "snow") {
        document.querySelector('.weather-image').src = "../conditions/snow.svg";
    }


    document.querySelector('.city').innerHTML = data.name; 
    //data is the array with objects in the json file returned by api, so data.name is an object key-value pair

    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + `<span>°C</span>`;

    document.querySelector('.wind-speed').innerHTML = data.wind.speed + " km/h";

    document.querySelector('.feels-like').innerHTML = Math.round(data.main.feels_like) + "°C";

    document.querySelector('.description').innerHTML = data.weather[0].description;

    // document.querySelector('.card').style = "display: block;"

}


searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
    dataLoad();
});

searchBox.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
        dataLoad();
    }
});
/*
    get the searchbox.value, use when the page roloads to put in the weather function
*/



function saveData() {
    const inputValue = searchBox.value;

    // console.log(inputValue);
    if (inputValue) {
        localStorage.setItem("data", inputValue);
    }
}

function dataLoad() {
    saveData();
    const savedData = localStorage.getItem("data");

    if (savedData) {
        checkWeather(savedData);
    }
};



window.addEventListener('load', () => {
    dataLoad();
});


/*
initialize github repo, upload images to github with their openweathermap corresponding names,
use name codes or icons to complete the the url that will point to the specific image int the images folder on github.

if the image is not on github then display another thing


so first part is the url that points to the repo with the images, the second part is from the openweathermap icon code that'll complete the image name then add .png at the end

for example, https/github/images/${09n}.png but everything is a variable to make it easier to read
*/