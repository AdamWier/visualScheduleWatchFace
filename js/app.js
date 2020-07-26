window.onload = getCalendar;
var state;

function getCalendar() {
    /**
     * xmlHttp - XMLHttpRequest object for get information about weather
     */
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.overrideMimeType("application/json");
    var now = (new Date()).toISOString();
    xmlHttp.open("GET", "https://www.googleapis.com/calendar/v3/calendars/"+CALENDAR+"/events?timeMin="+now+"&orderBy=startTime&singleEvents=true&maxResults=1&key="+API_KEY, false);
    
    xmlHttp.onreadystatechange = function() {
        // Checks responseText isn't empty
       if (xmlHttp.responseText) {
            // Parses responseText to JSON
            var json = JSON.parse(xmlHttp.responseText);
            state = adaptCalendarResponse(json.items[0])
            displayEvent(state);
        }
        else {
            console.log('error')
        }
    };

    xmlHttp.send();
}

function adaptCalendarResponse(item){
	var endDateTime = new Date(item.end.dateTime);
	var startDateTime = new Date(item.start.dateTime);
	var range = endDateTime.getTime() - startDateTime.getTime();
	var diff = new Date() - startDateTime;
	var percentage = diff/range * 100;
	
	var endHours = endDateTime.getHours()
	var endMinutes = endDateTime.getMinutes();
	if (endMinutes < 10){
		endMinutes = 0 + endMinutes.toString();
	} else {
		endMinutes = endMinutes.toString();
	}
	
	var emojiRegex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
	var summary = item.summary;
	var emoji = summary.match(emojiRegex);
	var eventName;
	
	if(emoji){
		eventName = summary.substring(2, summary.length);
	} else {
		eventName = summary;
	}

	return {
		endDateTime: endDateTime,
		startDateTime: startDateTime,
		finish: endHours+":"+endMinutes,
		percentage: percentage,
		name: eventName,
		emoji: emoji
	}
}

function displayEvent(event){
	progressBarWidget.value(event.percentage);
	document.getElementById("event-name").innerHTML = event.name;
	document.getElementById("finish").innerHTML = event.finish;
	document.getElementById("emoji").innerHTML = event.emoji;
}

function calculateProgress(){
	var range = state.endDateTime.getTime() - state.startDateTime.getTime();
	var diff = new Date() - state.startDateTime;
	var percentage = diff/range * 100;
	progressBarWidget.value(percentage);
}