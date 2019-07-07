import {combineReducers} from 'redux';

import notes from './notes';
import categories from './categories';

const appReducer = combineReducers({
    notes,
    categories
});

export default appReducer;