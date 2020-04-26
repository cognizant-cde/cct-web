import { History } from 'history';
import { combineReducers } from 'redux';
import {
  IAssociateDetails,
  ICountry,
  IDailyUpdatesData,
  IFilterOptions,
  IPrivacyPolicy,
  ISearchCountry,
  ISearchInput,
  ISearchResult,
  ITeamList,
} from '../model';
import * as associateDetailsReducer from './AssociateDetailsReducer';
import * as countryReducer from './Country';
import * as dailyUpdatesReducer from './DailyUpdatesReducer';
import * as filterReducer from './filter';
import * as privacyPolicyReducer from './PrivacyPolicyReducer';
import * as searchResultReducer from './searchBar';
import * as teamReducer from './team';

export interface RootState {
  searchResult: ISearchResult[];
  searchInput: ISearchInput[];
  searchCountry: ISearchCountry[];
  teamList: ITeamList[];
  filterOptions: IFilterOptions[];
  dailyUpdatesData: IDailyUpdatesData;
  associateDetails: IAssociateDetails;
  privacyPolicy: IPrivacyPolicy;
  country: ICountry[];
}

export default (history: History) =>
  combineReducers({
    ...searchResultReducer,
    ...teamReducer,
    ...filterReducer,
    ...dailyUpdatesReducer,
    ...associateDetailsReducer,
    ...privacyPolicyReducer,
    ...countryReducer,
  });
