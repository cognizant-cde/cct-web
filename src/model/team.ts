export interface ITeamList {
  employeeId: string;
  fullName: string;
  latestDate: string;
  MISDepartment: string;
  workLocation: string;
  personalStatus: string;
  travelStatus: string;
  accountName: string;
}

export interface ICloseContactPersonal {
  associateId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export enum TeamActions {
  SET_TEAMLIST = 'SET_TEAMLIST',
}

interface TeamActionType<T, P> {
  type: T;
  payload: P;
}

export type TeamAction = TeamActionType<
  typeof TeamActions.SET_TEAMLIST,
  ITeamList
>;
