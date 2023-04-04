import { encase } from "fluture";
import { compose } from "ramda";

const insertEventHtml = encase((x) => document.getElementById('event').innerHTML = x);

const insertInTemplate = inserts => `
	<div id="emoji">${inserts.emoji.isNothing ? '' : inserts.emoji.value}</div>
	<div class="small-text" id="event-name">${inserts.description}</div>
	<div class="small-text" id="end-time">Finishes @ ${inserts.end}</div>
	<div class="small-text" id="end-time">${inserts.isCache ? '💾' : ''}</div>
`;

export default compose(insertEventHtml, insertInTemplate);