import {
  IPrivacyPolicy,
  PrivacyPolicyAction,
  PrivacyPolicyActions,
} from '../model';
import createReducer from './createReducer';

export const privacyPolicy = createReducer<IPrivacyPolicy[]>([], {
  [PrivacyPolicyActions.SET_POLICY_AGREEMENT](
    state: IPrivacyPolicy,
    action: PrivacyPolicyAction
  ) {
    return action.payload;
  },
});
