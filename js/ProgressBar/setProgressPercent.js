import { curry } from 'ramda';

export default curry((progressBar, percent) => {progressBar.value(percent); return percent});
