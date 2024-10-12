import React from 'react';
import { Card, Space } from 'antd';
import intl from 'react-intl-universal';
import { NameValueGroups } from '../../components/name-values';
import * as Vibration from '../asset-vibration/components/actionBar';
import * as Corrosion from '../asset-corrosion/components/actionBar';
import * as Wind from '../asset-wind-turbine/components/actionBar';
import {
  Asset,
  ASSET_PATHNAME,
  Introduction,
  INVALID_MONITORING_POINT,
  OverviewPage,
  useContext,
  VIRTUAL_ROOT_ASSET
} from '../asset-common';
import { generateColProps } from '../../utils/grid';
import { AlarmTrend } from './alarmTrend';
import { Icon } from './icon';
import { useProjectStatistics } from './useProjectStatistics';
import { useAppType } from '../../appContext';

export const VirtualAssetDetail = () => {
  const { assets, refresh } = useContext();
  const appType = useAppType();
  const renderActionBar = () => {
    const props = { onSuccess: refresh, short: true };
    if (appType === 'windTurbine' || appType === 'windTurbinePro' || appType === 'hydroTurbine') {
      return <Wind.ActionBar onSuccess={refresh} />;
    } else if (appType === 'vibration') {
      return <Vibration.ActionBar onSuccess={refresh} />;
    } else if (appType === 'corrosion' || appType === 'corrosionWirelessHART') {
      return <Corrosion.ActionBar onSuccess={refresh} />;
    } else {
      return (
        <>
          <Wind.ActionBar {...props} />
          <Vibration.ActionBar {...props} />
          <Corrosion.ActionBar {...props} />
        </>
      );
    }
  };

  return (
    <Card
      bodyStyle={{ paddingTop: 16 }}
      extra={<Space>{renderActionBar()}</Space>}
      title={VIRTUAL_ROOT_ASSET.name}
    >
      <OverviewPage
        {...{
          charts: [
            ...useProjectStatistics('d'),
            {
              colProps: generateColProps({ xl: 24, xxl: 9 }),
              render: <AlarmTrend title={intl.get('ALARM_TREND')} />
            }
          ],
          introductions: assets.map((item) => {
            const { alarmState, statistics } = Asset.resolveStatistics(
              item.statistics,
              ['monitoringPointNum', intl.get('MONITORING_POINT')],
              ['anomalous', intl.get(INVALID_MONITORING_POINT)],
              ['deviceNum', intl.get('DEVICE')],
              ['offlineDeviceNum', intl.get('OFFLINE_DEVICE')]
            );
            return (
              <Introduction
                {...{
                  className: 'shadow',
                  count: <NameValueGroups items={statistics} col={{ span: 18 }} />,
                  title: {
                    name: item.name,
                    path: `/${ASSET_PATHNAME}/${item.id}-${item.type}`,
                    state: [`${item.id}-${item.type}`]
                  },
                  alarmState,
                  icon: {
                    svg: <Icon node={item} style={{ fill: '#fff' }} />,
                    small: true
                  }
                }}
              />
            );
          })
        }}
      />
    </Card>
  );
};
