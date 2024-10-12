import React from 'react';
import { motor } from '../constants';
import * as Motor from '../motor/settings';

export const Settings = ({ type }: { type: number }) => {
  if (type === motor.type) {
    return <Motor.Settings />;
  } else {
    return null;
  }
};
