import { CountryAction, CountryActions, ICountry } from '../model';
import createReducer from './createReducer';

export const country = createReducer<ICountry[]>([], {
  [CountryActions.SET_COUNTRY](state: ICountry, action: CountryAction) {
    return action.payload;
  },
});
