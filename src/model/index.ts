import { AssociateDetailsAction } from './AssociateDetails';
import { CountryAction } from './Country';
import { DailyUpdatesAction } from './DailyUpdates';
import { FilterAction } from './filter';
import { PrivacyPolicyAction } from './PrivacyPolicy';
import { SearchResultAction } from './searchBar';
import { TeamAction } from './team';

export * from './AssociateDetails';
export * from './Country';
export * from './DailyUpdates';
export * from './filter';
export * from './PrivacyPolicy';
export * from './searchBar';
export * from './team';

export type Action =
  | SearchResultAction
  | TeamAction
  | FilterAction
  | DailyUpdatesAction
  | AssociateDetailsAction
  | CountryAction
  | PrivacyPolicyAction;
