import { CountryAction, CountryActions, ICountry } from '../model';

export function setCountry(country: ICountry[]): CountryAction {
  return {
    type: CountryActions.SET_COUNTRY,
    payload: country,
  };
}
