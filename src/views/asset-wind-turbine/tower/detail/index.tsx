import React from 'react';
import intl from 'react-intl-universal';
import {
  AssetRow,
  MONITORING_POINT_LIST,
  MonitoringPointRow,
  StatisticBar
} from '../../../asset-common';
import { TabsCard } from '../../../../components/tabsCard';
import { useHistoryDatas } from '../../utils';
import { oneWeekNumberRange } from '../../../../components/rangeDatePicker';
import { History } from './history';
import { ActionBar, PointsTable } from '../../components';
import { Update } from './update';

export const Index = (props: {
  asset: AssetRow;
  onSuccess: () => void;
  onUpdate: (m: MonitoringPointRow) => void;
}) => {
  const { asset, onSuccess, onUpdate } = props;
  const [activeKey, setActiveKey] = React.useState('monitoringPointList');
  const range = React.useRef<[number, number]>(oneWeekNumberRange);
  const historyDatas = useHistoryDatas(asset, range.current);
  return (
    <>
      <StatisticBar asset={asset} />
      <TabsCard
        activeKey={activeKey}
        cardProps={{ style: { marginTop: 10 } }}
        tabBarExtraContent={{
          right: activeKey === 'monitoringPointList' && <ActionBar {...props} />
        }}
        items={[
          {
            label: intl.get(MONITORING_POINT_LIST),
            key: 'monitoringPointList',
            children: (
              <PointsTable
                asset={asset}
                onDeleteSuccess={onSuccess}
                onUpdate={onUpdate}
                showTitle={false}
              />
            )
          },
          {
            label: intl.get('HISTORY_DATA'),
            key: 'history',
            children: <History asset={asset} historyDatas={historyDatas} />
          },
          {
            label: intl.get('SETTINGS'),
            key: 'settings',
            children: <Update asset={asset} onSuccess={onSuccess} />
          }
        ]}
        onChange={setActiveKey}
      />
    </>
  );
};
