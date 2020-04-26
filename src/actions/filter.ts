import { FilterAction, FilterActions, IFilterOptions } from '../model';

export function setFilter(filterOptions: IFilterOptions): FilterAction {
  return {
    type: FilterActions.SET_FILTERS,
    payload: filterOptions,
  };
}
