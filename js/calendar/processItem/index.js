import { 
	compose, 
 } from 'ramda';
import getInsertElements from './getInsertElements';
import insertEventInfo from './insertEventInfo';

export default compose(insertEventInfo, getInsertElements);