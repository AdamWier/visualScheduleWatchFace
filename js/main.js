import { fork, parallel, resolve } from 'fluture';
import { compose, converge, curry, over, lensProp, map, prop, identity, assoc, values, objOf, mergeAll } from 'ramda';
import { time, toEither, toMaybe2, getEnd } from './utils';
import Maybe from 'sanctuary-maybe';
import getItemFromApi from './calendar/getItemFromApi';
import setUpAlarms from './calendar/alarms';
import processItem from './calendar/processItem';
import setProgressPercent from './ProgressBar/setProgressPercent';

export let timeout = 0;

const isNotInPast = curry((testTime) => new Date().getTime() < testTime);

const isExpiredItem = compose(isNotInPast, getEnd);

const onSuccess = compose(over(lensProp('alarms'), compose(resolve, objOf('alarms'))), over(lensProp('progressBar'), Maybe.Just), over(lensProp('item'), toMaybe2(isExpiredItem)), assoc('time', time), mergeAll);

const getItemValueFuture = over(lensProp('item'), compose(resolve, prop('value')));

const execute = compose(fork(() => {document.getElementById('event').innerText = 'ERROR'})(onSuccess), parallel(5), values);

const handleProgressBar = converge(assoc('progressBar'), [setProgressPercent, identity])

const checkItem = toEither(prop('isJust'), getItemValueFuture, identity);
// handleProgressBar
const main = compose(setProgressPercent, prop('value'), map(setUpAlarms), map(processItem), map(getItemFromApi), checkItem);

export default main; 
