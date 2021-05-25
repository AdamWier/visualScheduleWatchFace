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

const addItem = converge(assoc('item'), [getItemFromApi, identity])

const passItem = compose(converge(assoc('item'), [path(['item', 'value']), identity]));

const hasItem = compose(prop('isJust'), prop('item'));

export const calendar = compose(processItem, prop('value'), map(addItem), toEither(hasItem, passItem, identity));