import { FilterAction, FilterActions, IFilterOptions } from '../model';
import createReducer from './createReducer';

export const filterOptions = createReducer<IFilterOptions[]>([], {
  [FilterActions.SET_FILTERS](state: IFilterOptions[], action: FilterAction) {
    return action.payload;
  },
});
