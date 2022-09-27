import { 
	compose, 
	prop, 
	curry, 
	__,
	map,
 } from 'ramda';
import { attempt, resolve } from 'fluture';
import { toMaybe, log } from '../utils';

export default curry(x => x.isNothing ? attempt(() => new tau.widget.CircleProgressBar(document.getElementById('circleprogress'), {size: 'full', thickness: 30})) : resolve(x.value));

// const createProgressBar = attempt(() => new tau.widget.CircleProgressBar(document.getElementById('circleprogress'), {size: 'full', thickness: 30}));

// const justifyProgressBar = compose(map(toMaybe), createProgressBar);

// export const version2 = compose(cond([[prop('isNothing'), log('here')], [prop('isJust'), resolve]]), log('start'));
