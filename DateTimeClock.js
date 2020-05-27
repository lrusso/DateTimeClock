class DateTimeClock
	{
	constructor(myTimeStamp, myLabel)
		{
		// SETTING THE TIMESTAMP
		this.myTimeStamp = myTimeStamp;

		// SETTING THE DOM
		this.myLabel = myLabel;

		// SETTING THE MUSTUPDATE STATUS TO FALSE
		this.mustUpdate = false;

		// GETTING THE DEVICE TIMESTAMP FOR LATER USE WHEN THE WINDOWS IS BLUR/FOCUS
		this.myTimeStampChecker = Date.now();

		// SETTING THE VARIABLE FOR THE CLOCK INTERVAL
		this.myTimer = null;

		// SETTING THE DAYS AND MONTHS VALUES
		this.days = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
		this.months = new Array("jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec");

		// INITIALIZING THE DATETIMECLOCK
		this.init();
		}

	updateClock(thisDateTimeClock)
		{
		try
			{
			// CHECKING IF THE WINDOW/TAB IS VISIBLE/ACTIVE
			if (!document.hidden)
				{
				// GETTING THE CURRENT DATE AND TIME
				var today = new Date(thisDateTimeClock.myTimeStamp);

				// GETTING THE CURRENT TIME (HOURS)
				var hours = today.getHours();
				hours = ("0" + hours).slice(-2);

				// GETTING THE CURRENT TIME (MINUTES)
				var minutes = today.getMinutes();
				minutes = ("0" + minutes).slice(-2);

				// UPDATING THE BARTIME WITH THE CURRENT DATE AND TIME
				thisDateTimeClock.myLabel.innerHTML = this.days[today.getDay()] + " " + today.getDate() + " " + this.months[today.getMonth()] + ".&nbsp;&nbsp;" + hours + ":" + minutes;

				// UPDATING THE TIMESTAMP VALUE
				thisDateTimeClock.myTimeStamp = thisDateTimeClock.myTimeStamp + 1000;

				// UPDATING THE TIMESTAMP CHECKER VALUE (THE ONE USING THE DEVICE TIMESTAMP) FOR LATER USE
				thisDateTimeClock.myTimeStampChecker = thisDateTimeClock.myTimeStampChecker + 1000;
				}
			}
			catch(err)
			{
			}
		}

	init()
		{
		try
			{
			// SETTING THE CURRENT INSTANCE FOR LATER USE
			var thisDateTimeClock = this;

			// UPDATING THE CLOCK
			thisDateTimeClock.updateClock(thisDateTimeClock);

			// SETTING THE CLOCK INTERVAL
			thisDateTimeClock.myTimer = setInterval(function(){thisDateTimeClock.updateClock(thisDateTimeClock)},1000);

			// SETTING THE INTERVAL FOR CHECKING THE IDLE COUNTER
			window.addEventListener("blur", function()
				{
				// WHEN THE WINDOW IS BLUR, THE MUSTUPDATE VALUE MUST BE TRUE
				thisDateTimeClock.mustUpdate = true;

				// CLEARING THE CLOCK INTERVAL
				clearInterval(thisDateTimeClock.myTimer);
				});

			// SETTING THE INTERVAL FOR CHECKING THE IDLE COUNTER
			window.addEventListener("focus", function()
				{
				// CHECKING IF THE CLOCK VALUE MUST BE UPDATED
				if (thisDateTimeClock.mustUpdate==true)
					{
					// GETTING THE NEW DEVICE TIMESTAMP
					var newTime = Date.now();

					// ADDING ALL THE MILLISECONDS THAT PASSED SINCE THE LAST TIME THE WINDOWS WAS FOCUSED
					thisDateTimeClock.myTimeStamp = thisDateTimeClock.myTimeStamp + (newTime - thisDateTimeClock.myTimeStampChecker);

					// UPDATING THE TIMESTAMP CHECKER
					thisDateTimeClock.myTimeStampChecker = newTime;

					// UPDATING THE CLOCK
					thisDateTimeClock.updateClock(thisDateTimeClock);

					// SETTING THE CLOCK INTERVAL
					thisDateTimeClock.myTimer = setInterval(function(){thisDateTimeClock.updateClock(thisDateTimeClock)},1000);

					// WHEN THE WINDOW IS FOCUSED, THE MUSTUPDATE VALUE MUST BE FALSE
					thisDateTimeClock.mustUpdate = false;
					}
				});
			}
			catch(err)
			{
			}
		}
	}