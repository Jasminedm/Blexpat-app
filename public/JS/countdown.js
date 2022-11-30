
var days, hours, minutes, seconds; // variables for time units

var countdown = document.getElementById("tiles"); // get tag element
let tripdata = countdown.dataset.trip
const trip = new Date(tripdata).getTime() + (1000*3600*48); // set the countdown date
getCountdown();
console.log(trip, tripdata)
setInterval(function () { getCountdown(); }, 1000);

function getCountdown(){

	// find the amount of "seconds" between now and trip
	var today = new Date().getTime();
	var difference = (trip - today) / 1000;

	days = pad(parseInt(difference / 86400));
	difference = difference % 86400;
		 
	hours = pad(parseInt(difference / 3600));
	difference = difference % 3600;
		  
	minutes = pad( parseInt(difference / 60) );
	seconds = pad( parseInt(difference % 60 ) );

	// format countdown string + set tag value
	countdown.innerHTML = "<span>" + days + "</span><span>" + hours + "</span><span>" + minutes + "</span><span>" + seconds + "</span>"; 
}

function pad(n) {
	return (n < 10 ? '0' : '') + n;
}