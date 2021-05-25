import { 
	compose, 
	prop, 
	curry, 
	objOf,
	__,
	map,
 } from 'ramda';
import { attempt, resolve } from 'fluture';

const initializeProgressBar = curry(x => x.isNothing ? attempt(() => new tau.widget.CircleProgressBar(document.getElementById('circleprogress'), {size: 'full', thickness: 30})) : resolve(x.value));

export default compose(map(objOf('progressBar')), initializeProgressBar, prop('progressBar'))
