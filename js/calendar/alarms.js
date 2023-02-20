import { prop, map, curry, compose, converge, __, zipWith, filter, chain, sequence, objOf } from 'ramda';
import { getStart, getEnd, convertToDateTime, applyFutures } from '../utils';
import { attempt, resolve } from 'fluture'

const addNotificationToAlarm = curry((alarm, notification) => {tizen.alarm.addAlarmNotification(alarm, notification); return alarm})

const notifications = resolve([
	new tizen.UserNotification('SIMPLE', '100%', 
		{
			content: 'All done!',
			actions: {
				vibration: true,
			},
		}
	),
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
]);

const createAlarm = curry(x => attempt(() => new tizen.AlarmAbsolute(x)));

const isFuture = x => x > new Date();

const getTimesByPercentage = map(__, [1, .9, .75, .5]);

const calculateTime = curry((end, start, percent) => (percent * (end - start)) + start)

const getAlarmTimes = compose(getTimesByPercentage, converge(calculateTime, [getEnd, getStart]));

const createAlarms = compose(applyFutures(zipWith(addNotificationToAlarm))(notifications), sequence(resolve), map(createAlarm), filter(isFuture), map(convertToDateTime), getAlarmTimes)

export default compose(map(objOf('alarms')), chain(createAlarms));
