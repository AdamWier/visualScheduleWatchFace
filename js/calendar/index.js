import { 
	compose, 
	prop, 
	converge, 
	__,
	map,
	identity,
	assoc,
	path,
 } from 'ramda';
import getItemFromApi from './getItemFromApi';
import processItem from './processItem';
import { toEither } from '../utils';
import setUpAlarms from './alarms';

const addAlarms = converge(assoc('alarms'), [setUpAlarms, identity])

const addItem = converge(assoc('item'), [getItemFromApi, identity])

const passItem = compose(converge(assoc('item'), [path(['item', 'value']), identity]));

const hasItem = compose(prop('isJust'), prop('item'));

export const calendar = compose(processItem, prop('value'), map(addAlarms), map(addItem), toEither(hasItem, passItem, identity));