import { curry, converge } from 'ramda';
import { ap, resolve } from 'fluture';
import createProgressBar from './createProgressBar';
import calculatePercentage from './calculatePercentage';

const setPercentage = (progressBar) => percent => {progressBar.value(percent); return {progressBar}};

const applyFutures = curry((functionToApply, percentage, progressBar) => (ap (percentage) (ap (progressBar) (resolve(functionToApply)))));

export default converge(applyFutures(setPercentage), [calculatePercentage, createProgressBar]);
