export interface IAssociateDetails {
  associateId: string;
  firstName: string;
  lastName: string;
  managerId: string;
  department: string;
  accountName: string;
  role: string;
  accessType: string;
  countryCode: string;
  address: string;
}

export enum AssociateDetailsActions {
  SET_ASSOCIATE_DETAILS = 'SET_ASSOCIATE_DETAILS',
}

interface AssociateDetailsActionType<T, P> {
  type: T;
  payload: P;
}

export type AssociateDetailsAction = AssociateDetailsActionType<
  typeof AssociateDetailsActions.SET_ASSOCIATE_DETAILS,
  IAssociateDetails
>;
