import React from 'react';
import AntIcon from '@ant-design/icons';
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { Asset, AssetRow } from '../asset-common';
import { ReactComponent as SVG } from './corrosion.svg';
import { convertAlarmLevelToState } from '../../types/alarm';

export const Icon = (props: Partial<CustomIconComponentProps> & { asset: AssetRow }) => {
  const { asset, ...rest } = props;
  const alarmState = convertAlarmLevelToState(asset.alertLevel);
  const className = `alarm-${alarmState}-fill`;
  const commonProps = { ...rest, className };
  if (Asset.Assert.isCorrosionLike(asset.type)) {
    return <AntIcon component={() => <SVG {...commonProps} />} />;
  } else {
    return null;
  }
};
