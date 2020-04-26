export interface IDailyUpdatesData {
  date?: string;
  travelStatus: string;
  countryCode: string;
  personalStatus: string;
  address: string;
  wfh: string;
  onLeave: string;
}

export enum DailyUpdatesActions {
  SUBMIT_DAILY_UPDATE_DATA = 'SUBMIT_DAILY_UPDATE_DATA',
}

interface dailyUpdatesActionType<T, P> {
  type: T;
  payload: P;
}

export type DailyUpdatesAction = dailyUpdatesActionType<
  typeof DailyUpdatesActions.SUBMIT_DAILY_UPDATE_DATA,
  IDailyUpdatesData
>;
