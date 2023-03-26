import { 
	compose, 
	always,
 } from 'ramda';
import { fetchJson } from '../../utils';
import { ADDRESS } from '../../env';

export default compose(fetchJson, always(ADDRESS));