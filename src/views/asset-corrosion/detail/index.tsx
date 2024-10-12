import React from 'react';
import { Col, Empty, Radio, Row, Tag } from 'antd';
import intl from 'react-intl-universal';
import { AssetRow, StatisticBar } from '../../asset-common';
import { generateColProps } from '../../../utils/grid';
import { Update } from './update';
import { TabsCard } from '../../../components/tabsCard';
import { OverviewCard } from './overviewCard';
import {
  convertAlarmLevelToState,
  getAlarmLevelColor,
  getAlarmStateText
} from '../../../types/alarm';
import { AssetSettings } from './assetSettings';

export const Index = (props: {
  asset: AssetRow;
  onSuccess: () => void;
  onUpdateAsset: (asset: AssetRow) => void;
}) => {
  const { asset, onSuccess, onUpdateAsset } = props;
  const [type, setType] = React.useState('basic');

  const renderAssetList = (content: React.ReactNode) => {
    return (asset.children?.length ?? 0) > 0 ? (
      content
    ) : (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    );
  };

  return (
    <>
      <TabsCard
        items={[
          {
            label: intl.get('ASSET'),
            key: 'asset',
            children: (
              <>
                <StatisticBar asset={asset} />
                {renderAssetList(
                  <Row gutter={[10, 10]} style={{ marginTop: 10 }}>
                    {asset.children?.map((a) => (
                      <Col key={a.id} {...generateColProps({ md: 12, lg: 12, xl: 8, xxl: 6 })}>
                        <OverviewCard asset={a} />
                      </Col>
                    ))}
                  </Row>
                )}
              </>
            )
          },
          {
            label: intl.get('SETTINGS'),
            key: 'settings',
            children: (
              <>
                <Radio.Group
                  style={{ marginBottom: 16 }}
                  options={[
                    { label: intl.get('BASIC_INFORMATION'), value: 'basic' },
                    { label: intl.get('ASSET'), value: 'asset' }
                  ]}
                  onChange={(e) => setType(e.target.value)}
                  value={type}
                  optionType='button'
                  buttonStyle='solid'
                />
                {type === 'basic' && <Update asset={asset} onSuccess={onSuccess} key={asset.id} />}
                {type === 'asset' && (
                  <AssetSettings
                    asset={asset}
                    onSuccess={onSuccess}
                    key={asset.id}
                    onUpdate={onUpdateAsset}
                  />
                )}
              </>
            )
          }
        ]}
        tabBarExtraContent={{
          left: (
            <div style={{ marginRight: 30 }}>
              <Tag color={getAlarmLevelColor(convertAlarmLevelToState(asset.alertLevel))}>
                {intl.get(getAlarmStateText(convertAlarmLevelToState(asset.alertLevel)))}
              </Tag>
              {asset.name}
            </div>
          )
        }}
        tabsRighted={true}
      />
    </>
  );
};
