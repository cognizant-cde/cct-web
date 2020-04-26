import {
  ISearchCountry,
  ISearchInput,
  ISearchResult,
  SearchResultAction,
  SearchResultActions,
} from '../model';

export function setSearchResult(
  searchResult: ISearchResult[]
): SearchResultAction {
  return {
    type: SearchResultActions.SET_SEARCH_RESULT,
    payload: searchResult,
  };
}

export function setSearchInput(
  searchInput: ISearchInput[]
): SearchResultAction {
  return {
    type: SearchResultActions.SET_SEARCH_INPUT,
    payload: searchInput,
  };
}

export function setSearchCountry(
  searchCountry: ISearchCountry[]
): SearchResultAction {
  return {
    type: SearchResultActions.SET_SEARCH_COUNTRY,
    payload: searchCountry,
  };
}
