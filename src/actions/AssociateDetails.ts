import {
  AssociateDetailsAction,
  AssociateDetailsActions,
  IAssociateDetails,
} from '../model';

export function setAssociateDetails(
  associateDetails: IAssociateDetails
): AssociateDetailsAction {
  return {
    type: AssociateDetailsActions.SET_ASSOCIATE_DETAILS,
    payload: associateDetails,
  };
}
