import { ITeamList, TeamAction, TeamActions } from '../model';
import createReducer from './createReducer';

export const teamList = createReducer<ITeamList[]>([], {
  [TeamActions.SET_TEAMLIST](state: ITeamList[], actions: TeamAction) {
    return actions.payload;
  },
});
