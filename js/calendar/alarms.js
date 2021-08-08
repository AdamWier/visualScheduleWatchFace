import { prop, map, curry, compose, converge, __, zipWith, filter } from 'ramda';
import { log, getStart, getEnd, convertToDateTime } from '../utils';

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

const createAlarm = curry(x => new tizen.AlarmAbsolute(x))

// const disable = curry(x=> attempt(() => {tizen.alarm.remove(x)}));

// const disableAlarms = compose(disable, prop('id'));

const isFuture = x => x > new Date();

const getTimesByPercentage = map(__, [.5, .75, .9]);

const calculateTime = curry((end, start, percent) => (percent * (end - start)) + start)

const getAlarmTimes = compose(getTimesByPercentage, converge(calculateTime, [getEnd, getStart]));

export default compose(map(zipWith(addNotificationToAlarm, notifications)), map(map(createAlarm)), map(log('filtered')), map(filter(isFuture)), map(map(convertToDateTime)), map(getAlarmTimes), prop('item'));