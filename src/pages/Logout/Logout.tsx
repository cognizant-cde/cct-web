import * as React from 'react';
import { history } from '../../configureStore';

export const Logout: React.FC = () => {
  React.useEffect(() => {
    history.push('/');
  });
  return <div></div>;
};
