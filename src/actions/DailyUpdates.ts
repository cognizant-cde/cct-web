import {
  DailyUpdatesAction,
  DailyUpdatesActions,
  IDailyUpdatesData,
} from '../model';

// posting data to back-end through redux thunk
export function submitDailyUpdatesData(
  submitPayLoad: IDailyUpdatesData,
  employeeId: number
): DailyUpdatesAction {
  fetch(
    `${process.env.REACT_APP_API_URL}/api/associates/${employeeId}/daily-updates`,
    {
      method: 'post',
      headers: new Headers({
        'x-api-key': 'VpGpMvlvBN5KjnaL6ZPm44LR5vsNq4CiaCQRNPNF',
      }),
      body: JSON.stringify(submitPayLoad),
    }
  )
    .then((response: any) => response.json())
    .then((json: any) => json.resources)
    .catch((err) => {
      console.log(err);
    });

  return {
    type: DailyUpdatesActions.SUBMIT_DAILY_UPDATE_DATA,
    payload: submitPayLoad,
  };
}

export function resetDailyUpdateData(
  submitPayLoad: IDailyUpdatesData
): DailyUpdatesAction {
  return {
    type: DailyUpdatesActions.SUBMIT_DAILY_UPDATE_DATA,
    payload: submitPayLoad,
  };
}
