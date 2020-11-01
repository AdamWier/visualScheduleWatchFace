import { 
	compose, 
	prop, 
	find, 
	propSatisfies, 
	converge, 
	subtract, 
	curry, 
	divide, 
	multiply, 
	match, 
	cond, 
	equals, 
	always, 
	over,
	lensProp,
	objOf,
	merge,
	lensIndex,
	view,
	replace,
	__,
	join
 } from 'ramda';
import { TEST } from './env.js';
import Maybe from 'sanctuary-maybe';
import { formatHours, formatMinutes } from './mutual.js';

// window.onload = adaptCalendarResponse(TEST);
var state;

function getCalendar() {
    /**
     * xmlHttp - XMLHttpRequest object for get information about weather
     */
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.overrideMimeType("application/json");
    var now = (new Date()).toISOString();
    xmlHttp.open("GET", "https://www.googleapis.com/calendar/v3/calendars/"+CALENDAR+"/events?timeMin="+now+"&orderBy=startTime&singleEvents=true&maxResults=10&key="+API_KEY, false);
    
    xmlHttp.onreadystatechange = function() {
        // Checks responseText isn't empty
       if (xmlHttp.responseText) {
            // Parses responseText to JSON
            var items = JSON.parse(xmlHttp.responseText).items;
            var displayItem = items.find(function(item){return item.end.dateTime});
            state = adaptCalendarResponse(displayItem)
            displayEvent(state);
        }
        else {
            console.log('error')
        }
    };

    xmlHttp.send();
}

function adaptCalendarResponse(json){

	const insertInTemplate = curry(inserts => `
		<div id="emoji">${inserts.emoji.isNothing ? '' : inserts.emoji.value}</div>
		<div class="small-text" id="event-name">${inserts.description}</div>
		<div class="small-text" id="end-time">Finishes @ ${inserts.end}</div>
	`);

	const getTime = curry(x => x.getTime())
	
	const convertToDateTime = curry(x => new Date(x));
	
	const getEnd = compose(getTime, convertToDateTime, prop('dateTime'), prop('end'));

	const getStart = compose(getTime, convertToDateTime, prop('dateTime'), prop('start'));

	const calculateRange = compose(converge(subtract, [getEnd, getStart]));
	
	const calculateDifference = compose(subtract(new Date ()), getStart);

	const getFirstNotFullDayItem = find(propSatisfies(item => !!item.dateTime, 'end'));
	
	const calculatePercentage = compose(objOf('percentage'), multiply(100), converge(divide, [calculateDifference, calculateRange]));
	
	const emojiRegex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
	
	const remove = replace(__, '');
	
	const removeEmoji = over(lensProp('description'), remove(emojiRegex));
	
	const toMaybe = cond([
		[equals(undefined), () => Maybe.Nothing],
		[always(true), string => Maybe.Just(string)]
	]);
	
	const getEmoji = compose(objOf('emoji'), toMaybe, view(lensIndex(0)), match(emojiRegex));

	const processEmoji = compose(removeEmoji, converge(merge, [getEmoji, objOf('description')]), prop('summary'));

	const createMinuteProperty = compose(formatMinutes, convertToDateTime, prop('dateTime'), prop('end'));

	const createHourProperty = compose(formatHours, convertToDateTime, prop('dateTime'), prop('end'));

	const getEndString = compose(objOf('end'), join(''), converge(Array.of, [createHourProperty, () => ':', createMinuteProperty]));

	const calendar = compose(insertInTemplate, converge(merge, [getEndString, processEmoji, calculatePercentage]), getFirstNotFullDayItem, prop('items'));

	console.log(calendar(json));
}

function displayEvent(event){
	progressBarWidget.value(event.percentage);
	document.getElementById("event-name").innerHTML = event.name;
	document.getElementById("finish").innerHTML = event.finish;
	document.getElementById("emoji").innerHTML = event.emoji;
}