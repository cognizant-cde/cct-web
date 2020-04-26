export interface IPrivacyPolicy {}

export enum PrivacyPolicyActions {
  SET_POLICY_AGREEMENT = "SET_POLICY_AGREEMENT",
}

interface PrivacyPolicyActionType<T, P> {
  type: T;
  payload: P;
}

export type PrivacyPolicyAction = PrivacyPolicyActionType<
  typeof PrivacyPolicyActions.SET_POLICY_AGREEMENT,
  IPrivacyPolicy
>;
