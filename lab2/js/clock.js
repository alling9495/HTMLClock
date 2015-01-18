function getTime() {
   var date = new Date()
   time = date.toLocaleTimeString();
   document.getElementById("clock").innerHTML = time
   setTimeout(function() {getTime()}, 1000)
}

getTime()