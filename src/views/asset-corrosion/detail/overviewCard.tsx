import React from 'react';
import { NameValueGroups } from '../../../components/name-values';
import { ASSET_PATHNAME, AssetRow, Introduction } from '../../asset-common';
import { Icon } from '../icon';
import { convertAlarmLevelToState } from '../../../types/alarm';

export const OverviewCard = ({ asset }: { asset: AssetRow }) => {
  const { alertLevel, id, monitoringPoints, name, type } = asset;
  const alarmState = convertAlarmLevelToState(alertLevel);
  return (
    <Introduction
      {...{
        className: 'shadow',
        title: {
          name: name,
          path: `/${ASSET_PATHNAME}/${id}-${type}`,
          state: [`${id}-${type}`]
        },
        alarmState,
        icon: {
          svg: <Icon asset={asset} style={{ fill: '#fff' }} />,
          small: true
        },
        count:
          monitoringPoints && monitoringPoints.length > 0 ? (
            <NameValueGroups
              col={{ span: 18 }}
              items={monitoringPoints.map((m) => ({ name: m.name, value: 1 }))}
            />
          ) : (
            <></>
          ),
        horizontal: true
      }}
    />
  );
};
