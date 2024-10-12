import React from 'react';
import { Flex, Radio, Tag } from 'antd';
import intl from 'react-intl-universal';
import { AssetRow, MONITORING_POINT, MonitoringPointRow } from '../../../asset-common';
import { TabsCard } from '../../../../components/tabsCard';
import {
  convertAlarmLevelToState,
  getAlarmLevelColor,
  getAlarmStateText
} from '../../../../types/alarm';
import { ReadonlyPointsTable } from './readonlyPointsTable';
import { Update } from './update';
import { ActionBar } from '../../components';
import { PointsTable } from './pointsTable';

export const Index = (props: {
  asset: AssetRow;
  onSuccess: () => void;
  onUpdate: (m: MonitoringPointRow) => void;
}) => {
  const { asset, onSuccess } = props;
  const { alertLevel, name } = asset;
  const [type, setType] = React.useState('basic');

  return (
    <TabsCard
      items={[
        {
          key: 'monitoringPointList',
          label: intl.get('MONITORING_POINT_LIST'),
          children: <ReadonlyPointsTable asset={asset} />
        },
        {
          key: 'settings',
          label: intl.get('SETTINGS'),
          children: (
            <>
              <Radio.Group
                style={{ marginBottom: 16 }}
                options={[
                  { label: intl.get('BASIC_INFORMATION'), value: 'basic' },
                  { label: intl.get(MONITORING_POINT), value: 'monitoringPoints' }
                ]}
                onChange={(e) => setType(e.target.value)}
                value={type}
                optionType='button'
                buttonStyle='solid'
              />
              {type === 'basic' && <Update asset={asset} onSuccess={onSuccess} key={asset.id} />}
              {type === 'monitoringPoints' && (
                <>
                  <Flex justify='flex-end' style={{ marginBottom: 10 }}>
                    <ActionBar {...props} />
                  </Flex>
                  <PointsTable {...props} />
                </>
              )}
            </>
          )
        }
      ]}
      tabBarExtraContent={{
        left: (
          <div
            style={{
              marginRight: 30
            }}
          >
            <Tag color={getAlarmLevelColor(convertAlarmLevelToState(alertLevel || 0))}>
              {intl.get(getAlarmStateText(convertAlarmLevelToState(alertLevel || 0)))}
            </Tag>
            {name}
          </div>
        )
      }}
      tabsRighted={true}
    />
  );
};
