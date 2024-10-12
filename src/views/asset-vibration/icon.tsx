import React from 'react';
import AntIcon from '@ant-design/icons';
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { AssetRow } from '../asset-common';
import { area, motor } from './constants';
import { ReactComponent as SVG } from './general.svg';
import * as Motor from './motor/icon';
import { convertAlarmLevelToState } from '../../types/alarm';

export const Icon = (props: Partial<CustomIconComponentProps> & { asset: AssetRow }) => {
  const { asset, ...rest } = props;
  const alarmState = convertAlarmLevelToState(asset.alertLevel);
  const className = `alarm-${alarmState}-fill`;
  const commonProps = { ...rest, className };
  if (asset.type === area.type) {
    return <AntIcon component={() => <SVG {...commonProps} />} />;
  } else if (asset.type === motor.type) {
    return <Motor.Icon {...commonProps} />;
  } else {
    return null;
  }
};
