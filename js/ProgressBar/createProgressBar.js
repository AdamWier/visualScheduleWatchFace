import { 
	compose, 
	prop, 
	curry, 
	__,
 } from 'ramda';
import { attempt, resolve } from 'fluture';

const initializeProgressBar = curry(x => x.isNothing ? attempt(() => new tau.widget.CircleProgressBar(document.getElementById('circleprogress'), {size: 'full', thickness: 30})) : resolve(x.value));

export default compose(initializeProgressBar, prop('progressBar'))
