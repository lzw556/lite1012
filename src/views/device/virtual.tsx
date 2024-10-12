import React from 'react';
import { Badge, Button, Card, Col, Empty, Flex, Row, Space, Statistic } from 'antd';
import { ImportOutlined, PlusOutlined } from '@ant-design/icons';
import intl from 'react-intl-universal';
import { useContext, VIRTUAL_ROOT_DEVICE } from '.';
import HasPermission from '../../permission';
import { Permission } from '../../permission/permission';
import { SelfLink } from '../../components/selfLink';
import { DeviceNS } from './util';
import { generateColProps } from '../../utils/grid';
import { NameValueGroups } from '../../components/name-values';
import dayjs from '../../utils/dayjsUtils';

export const Virtual = () => {
  const { devices } = useContext();

  const renderBody = () => {
    if (devices.length === 0) {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    } else {
      return (
        <Row>
          {devices.filter(DeviceNS.Assert.isRoot).map((d) => {
            const { id, name, state } = d;
            const isOnline = state && state.isOnline;
            const connectedAt = state && state.connectedAt;

            return (
              <Col key={id} {...generateColProps({ md: 12, lg: 12, xl: 8, xxl: 6 })}>
                <Card size='small'>
                  <Flex justify='space-between'>
                    {name}
                    <Badge
                      status={isOnline ? 'success' : 'default'}
                      text={isOnline ? intl.get('ONLINE') : intl.get('OFFLINE')}
                    />
                  </Flex>
                  <Row justify='center' gutter={[50, 50]}>
                    <Col span={12}>
                      <Statistic value={10} title={intl.get('ONLINE')} />
                    </Col>
                    <Col span={12}>
                      <Statistic value={10} title={intl.get('OFFLINE')} />
                    </Col>
                  </Row>
                  <Card.Meta
                    description={
                      <Space>
                        {intl.get('LAST_CONNECTION_TIME')}
                        <span>
                          {connectedAt
                            ? dayjs.unix(state.connectedAt).local().format('YYYY-MM-DD HH:mm:ss')
                            : '-'}
                        </span>
                      </Space>
                    }
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      );
    }
  };

  return (
    <Card
      extra={
        <Space>
          <HasPermission value={Permission.NetworkAdd}>
            <SelfLink to='/devices/import'>
              <Button type='primary'>
                {intl.get('MENU_IMPORT_NETWORK')}
                <ImportOutlined />
              </Button>
            </SelfLink>
          </HasPermission>
          <SelfLink to='/devices/create'>
            <Button type='primary'>
              {intl.get('CREATE_SOMETHING', { something: intl.get('DEVICE') })}
              <PlusOutlined />
            </Button>
          </SelfLink>
        </Space>
      }
      title={VIRTUAL_ROOT_DEVICE.name}
    >
      {renderBody()}
    </Card>
  );
};
