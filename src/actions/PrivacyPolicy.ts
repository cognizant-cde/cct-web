import {
  IPrivacyPolicy,
  PrivacyPolicyAction,
  PrivacyPolicyActions,
} from '../model';

export function setPrivacyPolicy(
  privacyPolicy: IPrivacyPolicy
): PrivacyPolicyAction {
  return {
    type: PrivacyPolicyActions.SET_POLICY_AGREEMENT,
    payload: privacyPolicy,
  };
}
