export interface ISearchResult {
  associateId: string;
  first_name: string;
  last_name: string;
  department: string;
  travelStatus: string;
  personalStatus: string;
  wfh: string;
  latest_date: string;
}

export interface ISearchInput {
  searchInput: string;
}

export interface ISearchCountry {
  searchCountry: string;
}

export enum SearchResultActions {
  SET_SEARCH_RESULT = 'SET_SEARCH_RESULT',
  SET_SEARCH_INPUT = 'SET_SEARCH_INPUT',
  SET_SEARCH_COUNTRY = 'SET_SEARCH_COUNTRY',
}

interface SearchResultActionType<T, P> {
  type: T;
  payload: P;
}

export type SearchResultAction =
  | SearchResultActionType<
      typeof SearchResultActions.SET_SEARCH_RESULT,
      ISearchResult[]
    >
  | SearchResultActionType<
      typeof SearchResultActions.SET_SEARCH_INPUT,
      ISearchInput[]
    >
  | SearchResultActionType<
      typeof SearchResultActions.SET_SEARCH_COUNTRY,
      ISearchCountry[]
    >;
