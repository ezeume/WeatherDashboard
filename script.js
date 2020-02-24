var date = (moment().format("L"))
console.log(date);
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Creating a storeage with an open array
var cityHistory = [];



$(document).ready(function () {
    var saveHistory = JSON.parse(localStorage.getItem("cityHistory"));
    console.log(saveHistory);
    if (saveHistory != null) {
        cityHistory = saveHistory;
        console.log(cityHistory);
    }
    function loadSearchHistory() {
        $("#searchHistory").empty();

        for (var i = 0; i < cityHistory.length; i++) {
            var cityItem = $("<li>");
            console.log(cityItem);
            cityItem.text(cityHistory[i]);
            cityItem.addClass("list-group-item");
            $("#searchHistory").prepend(cityItem);
        }
    }
    loadSearchHistory()

    $("#citySearchButton").on("click", function () {

        var city = $("#city").val();
        cityHistory.includes(city);
        loadSearchHistory()
        console.log(cityHistory);
        localStorage.setItem("cityHistory", JSON.stringify(cityHistory));
        var key = "9ac526052b4c1d3800701ee3a4c35a8e";

        ///////////////////
        //api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}

        console.log("api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + key)

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + key,
            method: "GET"

        }).then(function (fiveday) {
            console.log(fiveday);
            // console.log("this is the five");

            $("#fiveday").empty()
            for (var i = 0; i < fiveday.list.length; i = i + 8) {
                console.log(fiveday.list[i]);
                // $("#day"+ (i/8+1))
                  // var k = response.main.temp;
                // var f = ((k - 273.15) * 9) / 5 + 32;
                // var currentDay = moment.unix(response.dt).format("MM/DD/YYYY");
                var newFiveDayDiv = $("<div id='fiveday'>")
                var fiveDayDivTemp = $("<div>").text("Temp: " + fiveday.list[i].main.temp);
                var fiveDayDivHum = $("<div>").text("Humidity: " + fiveday.list[i].main.humidity);

                newFiveDayDiv.append(fiveDayDivTemp, fiveDayDivHum);
                $("#fiveday").append(newFiveDayDiv);
            }

        })

        /////////////


        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather",
            method: "GET",
            data: { q: city, appid: key, units: "metric" },
        })
            .then(function(response) {

                console.log(response);

                var icon = "<img scr='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt=Icon depicting current weather.'>";


                $(".city").html("<h3>" + response.name + " " + date + icon + "</h3>");
                $(".temp").text("Temperature: " + response.main.temp + "°C");
                $(".humidity").text("Humidity: " + response.main.humidity + "%");
                $(".wind").text("Wind Speed: " + response.wind.speed + "Mph");

                //Adding the UV index.
                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                var lon = response.coord.lon;
                var lat = response.coord.lat;
                console.log("https://api.openweathermap.org/data/2.5/uvi?appid=" + key + "&lat=" + lat + "&lon=" + lon)
                //http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}

                $.ajax({
                    url: "https://api.openweathermap.org/data/2.5/uvi?appid=" + key + "&lat=" + lat + "&lon=" + lon,
                    method: "GET"

                })
                    .then(function (ajaxrequest2) {
                        //uv vis data
                        console.log(ajaxrequest2.value)
                        $(".uv").text("UV Index: " + ajaxrequest2.value);
                    })
                //console.log("Temperature(F): " + response.main.temp);

            })

    })
})

//dynamically create and append five day forecast 

// var numOfdays = ["day1", "day2", "day3", "day4", "day5"];

// for (var i = 0; i < numOfdays.length; i++) {
//     var div = $("<div>");
//     div.attr("class", "col-2");
// }