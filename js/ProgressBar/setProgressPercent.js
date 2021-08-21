import { curry, converge, map, compose, objOf } from 'ramda';
import { ap, resolve } from 'fluture';
import createProgressBar from './createProgressBar';
import calculatePercentage from './calculatePercentage';
import { log } from '../utils';

const setPercentage = (progressBar) => percent => {progressBar.value(percent); return progressBar};

const applyFutures = curry((functionToApply, percentage, progressBar) => (ap (percentage) (ap (progressBar) (resolve(functionToApply)))));

export default compose(map(objOf('progressBar')), converge(applyFutures(setPercentage), [calculatePercentage, createProgressBar]));
