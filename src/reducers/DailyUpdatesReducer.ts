import {
  DailyUpdatesAction,
  DailyUpdatesActions,
  IDailyUpdatesData,
} from '../model';
import createReducer from './createReducer';

export const dailyUpdatesData = createReducer<IDailyUpdatesData>(
  {
    travelStatus: '',
    countryCode: '',
    personalStatus: '',
    address: '',
    wfh: '',
    onLeave: '',
  },
  {
    [DailyUpdatesActions.SUBMIT_DAILY_UPDATE_DATA](
      state: IDailyUpdatesData,
      action: DailyUpdatesAction
    ) {
      return action.payload;
    },
  }
);
