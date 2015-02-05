function showAlarmPopup() {
   $("#mask").removeClass("hide")
   $("#popup").removeClass("hide")
}

function hideAlarmPopup() {
   $("#mask").addClass("hide")
   $("#popup").addClass("hide")
}

function insertAlarm(hours, mins, ampm, alarmName) {
   var newDiv = $("<div></div>").addClass("flexable")
   newDiv.append($("<div></div>").addClass("name").html(alarmName))
   newDiv.append($("<div></div>").addClass("time").html(hours + ":" + mins + " " + ampm))
   $("#alarms").append(newDiv)
}

function addAlarm() {
   var hours = $("#hours option:selected").text()
   var mins = $("#mins option:selected").text()
   var ampm = $("#ampm option:selected").text()
   var alarmName = $("#alarmName").val()
   insertAlarm(hours, mins, ampm, alarmName)
   hideAlarmPopup();

}

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

function initializeOption() {
   var hourStr, minStr;
   for (hour = 1; hour < 13; hour++) {
      if (hour >= 1 && hour <= 9) {
         hourStr = "0" + hour
      }
      else {
         hourStr = hour
      }
     $("#hours").append("<option>" + hourStr + "</option>")
   }

   for (min = 0; min < 60; min++) {
      if (min >= 0 && min <= 9) {
         minStr = "0" + min
      }
      else {
         minStr = min
      }
     $("#mins").append("<option>" + minStr + "</option>")
   }
}

initializeOption()
getTime()
getTemp()