import {
  AssociateDetailsAction,
  AssociateDetailsActions,
  IAssociateDetails,
} from '../model';
import createReducer from './createReducer';

export const associateDetails = createReducer<IAssociateDetails[]>([], {
  [AssociateDetailsActions.SET_ASSOCIATE_DETAILS](
    state: IAssociateDetails,
    action: AssociateDetailsAction
  ) {
    return action.payload;
  },
});
