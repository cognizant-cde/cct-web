export interface IFilterOptions {
  personalStatus: string;
  travelStatus: string;
  MISDepartment: string;
  workLocation: string;
}

export enum FilterActions {
  SET_FILTERS = 'SET_FILTERS',
}

interface filterActionType<T, P> {
  type: T;
  payload: P;
}

export type FilterAction = filterActionType<
  typeof FilterActions.SET_FILTERS,
  IFilterOptions
>;
