import React from 'react';
import { Col, Empty, Row } from 'antd';
import intl from 'react-intl-universal';
import {
  AssetRow,
  MONITORING_POINT_LIST,
  MonitoringPointRow,
  StatisticBar
} from '../../asset-common';
import { generateColProps } from '../../../utils/grid';
import { Update } from './update';
import { TabsCard } from '../../../components/tabsCard';
import { ActionBar, OverviewCard, PointsTable } from '../components';

export const Index = (props: {
  asset: AssetRow;
  onSuccess: () => void;
  onUpdate: (m: MonitoringPointRow) => void;
}) => {
  const { asset, onSuccess, onUpdate } = props;
  const [activeKey, setActiveKey] = React.useState('monitor');

  const renderAssetList = (content: React.ReactNode) => {
    return (asset.children?.length ?? 0) > 0 ? (
      content
    ) : (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    );
  };

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
            label: intl.get('MONITOR'),
            key: 'monitor',
            children: renderAssetList(
              <Row gutter={[10, 10]}>
                {asset.children?.map((a) => (
                  <Col key={a.id} {...generateColProps({ md: 12, lg: 12, xl: 12, xxl: 8 })}>
                    <OverviewCard asset={a} />
                  </Col>
                ))}
              </Row>
            )
          },
          {
            label: intl.get(MONITORING_POINT_LIST),
            key: 'monitoringPointList',
            children: renderAssetList(
              asset.children?.map((a) => (
                <PointsTable asset={a} onDeleteSuccess={onSuccess} onUpdate={onUpdate} key={a.id} />
              ))
            )
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
