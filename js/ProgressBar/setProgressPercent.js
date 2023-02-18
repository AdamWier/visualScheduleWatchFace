import { converge, map, compose, objOf } from 'ramda';
import createProgressBar from './createProgressBar';
import calculatePercentage from './calculatePercentage';
import { applyFutures, log } from '../utils';

export const setPercentage = (progressBar) => percent => {progressBar.value(percent); return progressBar};

export default item => compose(map(objOf('progressBar')), map(calculatePercentage))(item);
// converge(applyFutures(setPercentage), [calculatePercentage, createProgressBar]),