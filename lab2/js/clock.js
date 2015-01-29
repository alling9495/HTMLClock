function getTime() {
   var date = new Date()
   time = date.toLocaleTimeString();
   document.getElementById("clock").innerHTML = time
   setTimeout(function() {getTime()}, 1000)
}

function success(data, success, xhr) {
   console.log(data)
   console.log(data.daily.summary)
   $("#forecastLabel").html("<h3>" + data.daily.summary + "</h3>")
   $("#forecastIcon").attr("src", "img/" + data.daily.icon + ".png")
   tempMax = data.daily.data[0].temperatureMax
   console.log(data.daily.data[0].temperatureMax)
   

   if (tempMax >= 90) {
      $("body").attr("class", "hot")
   }
   else if (tempMax >= 80) {
      $("body").attr("class", "warm")
   }
   else if (tempMax >= 70) {
      $("body").attr("class", "nice")
   }
   else if (tempMax >= 60) {
      $("body").attr("class", "chilly")
   }
   else {
      $("body").attr("class", "cold")
   }
}

function getTemp() {
	var url = "https://api.forecast.io/forecast/798e623498aadf23aa27de6a253e716d/35.300399,-120.662362?callback=?";
   $.getJSON(url, success);
}

getTime()
getTemp()