import { 
	compose, 
	__,
	always,
    map,
    mergeDeepRight,
	find,
	propSatisfies,
 } from 'ramda';
import { fetchJson, log, toMaybe } from './utils';
import { ADDRESS2 } from './env';
import { fork } from 'fluture';
import main from './main'
import DEFAULT_STATE from './DEFAULT_STATE';

const onUpdate = compose(main, always(DEFAULT_STATE)); 

export default compose(fork(() => {document.getElementById('event').innerText = 'ERROR'})(onUpdate), fetchJson, always(ADDRESS2))