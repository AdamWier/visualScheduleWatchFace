import { converge, map, compose, objOf } from 'ramda';
import createProgressBar from './createProgressBar';
import calculatePercentage from './calculatePercentage';
import { applyFutures } from '../utils';

export const setPercentage = (percent) => progressBar => {console.log(progressBar, percent); progressBar.value(percent); return progressBar};

export default compose(map(objOf('progressBar')), converge(applyFutures(setPercentage), [calculatePercentage, createProgressBar]));
