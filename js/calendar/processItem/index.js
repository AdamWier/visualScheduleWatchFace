import { 
	compose, 
	curry, 
	__,
 } from 'ramda';
import { attempt } from 'fluture';
import getInsertElements from './getItemData/getInsertElements';

const insertEventHtml = curry((x) => attempt(() => document.getElementById('event').innerHTML = x));

const insertInTemplate = curry(inserts => `
	<div id="emoji">${inserts.emoji.isNothing ? '' : inserts.emoji.value}</div>
	<div class="small-text" id="event-name">${inserts.description}</div>
	<div class="small-text" id="end-time">Finishes @ ${inserts.end}</div>
`);

const insertEventInfo = compose(insertEventHtml, insertInTemplate);

export default compose(insertEventInfo, getInsertElements);