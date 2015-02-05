function showAlarmPopup() {
   $("#mask").removeClass("hide")
   $("#popup").removeClass("hide")
}

function hideAlarmPopup() {
   $("#mask").addClass("hide")
   $("#popup").addClass("hide")
}

function insertAlarm(time, alarmName, objectId) {
   var newDiv = $("<div></div>").addClass("flexable").attr("id", objectId)
   newDiv.append($("<div></div>").addClass("name").html(alarmName))
   newDiv.append($("<div></div>").addClass("time").html(time))
   newDiv.append($("<input/>").attr("type", "button").attr("value", "Remove").attr("onclick", "destroyAlarm(\"" + objectId + "\")"))
   $("#alarms").append(newDiv)
}

function addAlarm() {
   Parse.initialize("RBDIQRH6qHvvm0XycI951Y2T1xgWND2kvxOmmH19", "rA2nOYi9Gc7iGstS9Rzp6fQ0t6OP6fD3Wtg95Mzk")
   var hours = $("#hours option:selected").text()
   var mins = $("#mins option:selected").text()
   var ampm = $("#ampm option:selected").text()
   var alarmName = $("#alarmName").val()
   var time = hours + ":" + mins + " " + ampm;
   var AlarmObject = Parse.Object.extend("Alarm");
   var alarmObject = new AlarmObject();
      alarmObject.save({"time": time,"alarmName": alarmName}, {
      success: function(object) {
        insertAlarm(time, alarmName, object.id)
        hideAlarmPopup();
      }
    });
}

function getAllAlarms() {
   Parse.initialize("RBDIQRH6qHvvm0XycI951Y2T1xgWND2kvxOmmH19", "rA2nOYi9Gc7iGstS9Rzp6fQ0t6OP6fD3Wtg95Mzk")
   var AlarmObject = Parse.Object.extend("Alarm");
   var query = new Parse.Query(AlarmObject);
   query.find({
      success: function(results) {
         for (var i = 0; i < results.length; i++) {
            console.log(results[i])
            insertAlarm(results[i].get("time"), results[i].get("alarmName"), results[i].id);
         }
      }
   });
}

function destroyAlarm(objectId) {
   console.log(objectId)
   Parse.initialize("RBDIQRH6qHvvm0XycI951Y2T1xgWND2kvxOmmH19", "rA2nOYi9Gc7iGstS9Rzp6fQ0t6OP6fD3Wtg95Mzk")
   var AlarmObject = Parse.Object.extend("Alarm");
   var query = new Parse.Query(AlarmObject);
   query.get(objectId, {
      success: function(object) {
         object.destroy({});
      }
   })
   $("#" + objectId).remove()
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

destroyAlarm("01:00 AM", "Ddfgfg")
initializeOption()
getAllAlarms()
getTime()
getTemp()