import { prop, map, curry, compose, converge, __, zipWith, filter, chain, sequence } from 'ramda';
import { getStart, getEnd, convertToDateTime } from '../utils';
import { attempt, resolve } from 'fluture'

const addNotificationToAlarm = curry((notification, alarm) => {tizen.alarm.addAlarmNotification(alarm, notification); return alarm})

const notifications = [
	new tizen.UserNotification('SIMPLE', '90%', 
		{
			content: 'Time to move on',
			actions: {
				vibration: true,
			},
		}
	),
	new tizen.UserNotification('SIMPLE', '75%', 
		{
			content: 'Start wrapping it up',
			actions: {
				vibration: true,
			},
		}
	),
	new tizen.UserNotification('SIMPLE', '50%', 
		{
			content: 'Halfway there!',
			actions: {
				vibration: true,
			},
		}
	),
]

const createAlarm = curry(x => attempt(() => new tizen.AlarmAbsolute(x)));

// const disable = curry(x=> attempt(() => {tizen.alarm.remove(x)}));

// const disableAlarms = compose(disable, prop('id'));

const isFuture = x => x > new Date();

const getTimesByPercentage = map(__, [.9, .75, .5]);

const calculateTime = curry((end, start, percent) => (percent * (end - start)) + start)

const getAlarmTimes = compose(getTimesByPercentage, converge(calculateTime, [getEnd, getStart]));

const createAlarms = compose(map(zipWith(addNotificationToAlarm, notifications)), sequence(resolve), map(createAlarm), filter(isFuture), map(convertToDateTime), getAlarmTimes)

export default compose(chain(createAlarms), prop('item'));
