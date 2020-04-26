import {
  ISearchCountry,
  ISearchInput,
  ISearchResult,
  SearchResultAction,
  SearchResultActions,
} from '../model';
import createReducer from './createReducer';

export const searchResult = createReducer<ISearchResult[]>([], {
  [SearchResultActions.SET_SEARCH_RESULT](
    state: ISearchResult,
    action: SearchResultAction
  ) {
    return action.payload;
  },
});

export const searchInput = createReducer<ISearchInput[]>([], {
  [SearchResultActions.SET_SEARCH_INPUT](
    state: ISearchInput,
    action: SearchResultAction
  ) {
    return action.payload;
  },
});

export const searchCountry = createReducer<ISearchCountry[]>([], {
  [SearchResultActions.SET_SEARCH_COUNTRY](
    state: ISearchCountry,
    action: SearchResultAction
  ) {
    return action.payload;
  },
});
