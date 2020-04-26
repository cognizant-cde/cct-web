import { ITeamList, TeamAction, TeamActions } from '../model';

export function setTeamList(teamList: ITeamList): TeamAction {
  return {
    type: TeamActions.SET_TEAMLIST,
    payload: teamList,
  };
}
