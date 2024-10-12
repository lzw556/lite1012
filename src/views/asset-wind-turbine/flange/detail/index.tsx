import React from 'react';
import { Col, Row, TabsProps } from 'antd';
import intl from 'react-intl-universal';
import {
  StatisticBar,
  AssetRow,
  MONITORING_POINT_LIST,
  MonitoringPointRow
} from '../../../asset-common';
import { PointsScatterChart } from './pointsScatterChart';
import { generateColProps } from '../../../../utils/grid';
import { TabsCard } from '../../../../components/tabsCard';
import { useHistoryDatas } from '../../utils';
import { oneWeekNumberRange } from '../../../../components/rangeDatePicker';
import { History } from './history';
import { ActionBar, PointsTable } from '../../components';
import { Update } from './update';
import * as Plain from '../plain';
import * as PreloadCalculation from '../preloadCalculation';
import { isFlangePreloadCalculation } from '../common';

export const Index = (props: {
  asset: AssetRow;
  onSuccess: () => void;
  onUpdate: (m: MonitoringPointRow) => void;
}) => {
  const { asset, onSuccess, onUpdate } = props;
  const [activeKey, setActiveKey] = React.useState('monitor');
  const range = React.useRef<[number, number]>(oneWeekNumberRange);
  const historyDatas = useHistoryDatas(asset, range.current);
  const items: TabsProps['items'] = [
    {
      label: intl.get('MONITOR'),
      key: 'monitor',
      children: (
        <Row gutter={[10, 10]}>
          <Col {...generateColProps({ xl: 12, xxl: 9 })}>
            <PointsScatterChart
              asset={asset}
              title={intl.get('BOLT_DIAGRAM')}
              big={true}
              style={{ height: 550 }}
            />
          </Col>
          <Col {...generateColProps({ xl: 12, xxl: 15 })}>
            {isFlangePreloadCalculation(asset) ? (
              <PreloadCalculation.RightConentInMonitorTab asset={asset} />
            ) : (
              <Plain.RightConentInMonitorTab asset={asset} historyDatas={historyDatas} />
            )}
          </Col>
        </Row>
      )
    },
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
      children: <History flange={asset} historyDatas={historyDatas} />
    }
  ];
  if (isFlangePreloadCalculation(asset)) {
    items.push({
      label: intl.get('FLANGE_STATUS'),
      key: 'status',
      children: <PreloadCalculation.Status {...asset} />
    });
  }
  items.push({
    label: intl.get('SETTINGS'),
    key: 'settings',
    children: <Update asset={asset} onSuccess={onSuccess} />
  });

  return (
    <>
      <StatisticBar asset={asset} />
      <TabsCard
        activeKey={activeKey}
        cardProps={{ style: { marginTop: 10 } }}
        tabBarExtraContent={{
          right: activeKey === 'monitoringPointList' && <ActionBar {...props} />
        }}
        items={items}
        onChange={setActiveKey}
      />
    </>
  );
};
