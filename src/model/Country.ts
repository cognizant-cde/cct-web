export interface ICountry {
  code: string;
  name: string;
}

export enum CountryActions {
  SET_COUNTRY = 'SET_COUNTRY',
}

interface CountryActionType<T, P> {
  type: T;
  payload: P;
}

export type CountryAction = CountryActionType<
  typeof CountryActions.SET_COUNTRY,
  ICountry[]
>;
