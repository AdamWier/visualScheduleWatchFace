import { 
	compose, 
	converge, 
	curry, 
	__,
	chain,
 } from 'ramda';
import { attempt, parallel } from 'fluture';
import getItemData from './getItemData';

const setPercentage = curry((x) => attempt(() => {x.progressBar.value(x.percentage); return x}));

const insertEventHtml = curry((x) => attempt(() => document.getElementById('event').innerHTML = x));

const insertInTemplate = curry(inserts => `
	<div id="emoji">${inserts.emoji.isNothing ? '' : inserts.emoji.value}</div>
	<div class="small-text" id="event-name">${inserts.description}</div>
	<div class="small-text" id="end-time">Finishes @ ${inserts.end}</div>
`);

const insertEventInfo = compose(insertEventHtml, insertInTemplate);

export default compose(parallel(2), converge(Array.of, [chain(setPercentage), chain(insertEventInfo)]), getItemData);