(function(){
	console.log('hello');
	var calendarPermission = "http://tizen.org/privilege/calendar.read";
	var accountsPermission = "http://tizen.org/privilege/account.read";
	tizen.ppm.requestPermission(accountsPermission, askCalendarPermission, logError);
	
	function askCalendarPermission(){
		console.log('here')
		tizen.ppm.requestPermission(calendarPermission, allPermissionsSuccess);
		function getAccountsSuccess(accounts) {
		    for (var i = 0; i < accounts.length; i++) {
		        console.log(accounts[i])
		    }
		}
		function getAccountsError(error) {
		    console.log('Error: ' + error.message);
		}
		tizen.account.getAccounts(getAccountsSuccess, getAccountsError);
	}

	function allPermissionsSuccess(){
		tizen.calendar.getCalendars("EVENT", getAccountsSuccess);
		var calendar = tizen.calendar.getDefaultCalendar('EVENT')
		console.log(calendar)
		calendar.find(getAccountsSuccess);
	}
	
	
	function getAccountsSuccess(accounts) {
		console.log('go')
		console.log(accounts)
	    for (var i = 0; i < accounts.length; i++) {
	        console.log(accounts[i])
	    }
	}
	function getAccountsError(error) {
	    console.log('Error: ' + error.message);
	}
	
	function logError(error){
		console.log(error)
	}
})();