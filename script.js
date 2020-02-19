
//This is our API key
var APIKey = "9ac526052b4c1d3800701ee3a4c35a8e";

//Building the url to query to the database 
//var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=London" + "" + APIKey;

var btn = $("<button>");
//<button></button>
btn.attr("class", "btn btn-outline-success my-2 my-sm-0");
//<button class="btn btn-outline-success my-2 my-sm-0" type="submit">search</button>
btn.text("search");


// div.append(form);
// div.append(btn);


$(document).ready(function () {
    $("#citySearchButton").on("click", function () {

        var city = $("#city").val();
        var key = "9ac526052b4c1d3800701ee3a4c35a8e";

        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather",
            method: "GET",
            data: { q: city, appid: key, units: "metric" },
        })
        .then(function (response) {

                console.log(response);

                $(".city").html("<h1>" + response.name +"</h1>");
                $(".temp").text("Temperature (C) " + response.main.temp);
                $(".humidity").text("Humidity: " + response.main.humidity);
                $(".wind").text("Wind Speed:" + response.wind.speed);
                $(".uv").text("UV Index:" + response.main.uvIndex);

                console.log("Temperature(F): " + response.main.temp);

            })

        })
    })