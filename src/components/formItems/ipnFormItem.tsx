import { Form, Input, Radio, Typography } from 'antd';
import { FC, useState } from 'react';
import { IpnSetting } from '../../types/ipn_setting';
import intl from 'react-intl-universal';

export const IPNSettingKeys = [
  'ip_mode',
  'ip_addr',
  'subnet_mask',
  'gateway_addr',
  'ntp_is_enabled',
  'ntp_addr'
];

export interface IpnFromItemProps {
  ipn?: IpnSetting;
}

const IpnFormItem: FC<IpnFromItemProps> = ({ ipn }) => {
  const [isDhcpEnabled, setIsDhcpEnabled] = useState<boolean>(
    ipn !== undefined && ipn.ip_mode === 0
  );
  const [isNtpEnabled, setIsNtpEnabled] = useState<boolean>(
    ipn !== undefined && ipn.ntp_is_enabled
  );

  const renderIPFormItem = () => {
    if (!isDhcpEnabled) {
      return (
        <div>
          <Form.Item
            label={intl.get('IP_ADDRESS')}
            name={['ipn', 'ip_addr']}
            initialValue={ipn?.ip_addr}
            rules={[{ required: true, message: intl.get('PLEASE_ENTER_IP_ADDRESS') }]}
          >
            <Input placeholder={intl.get('PLEASE_ENTER_GATEWAY_IP_ADDRESS')} />
          </Form.Item>
          <Form.Item
            label={intl.get('SUBNET_MASK')}
            name={['ipn', 'subnet_mask']}
            initialValue={ipn?.subnet_mask}
            rules={[{ required: true, message: intl.get('PLEASE_ENTER_GATEWAY_SUBNET_MASK') }]}
          >
            <Input placeholder={intl.get('PLEASE_ENTER_GATEWAY_SUBNET_MASK')} />
          </Form.Item>
          <Form.Item
            label={
              <Typography.Text ellipsis={true} title={intl.get('GATEWAY_ADDRESS')}>
                {intl.get('GATEWAY_ADDRESS')}
              </Typography.Text>
            }
            name={['ipn', 'gateway_addr']}
            initialValue={ipn?.gateway_addr}
            rules={[{ required: true, message: intl.get('PLEASE_ENTER_GATEWAY_ADDRESS') }]}
          >
            <Input placeholder={intl.get('PLEASE_ENTER_GATEWAY_ADDRESS')} />
          </Form.Item>
        </div>
      );
    }
  };

  const renderNTPFormItem = () => {
    if (isNtpEnabled) {
      return (
        <Form.Item
          label={intl.get('NTP_ADDRESS')}
          initialValue={ipn?.ntp_addr}
          name={['ipn', 'ntp_addr']}
          rules={[{ required: true, message: intl.get('PLEASE_ENTER_NTP_SERVER_ADDRESS') }]}
        >
          <Input placeholder={intl.get('PLEASE_ENTER_NTP_SERVER_ADDRESS')} />
        </Form.Item>
      );
    }
  };

  return (
    <div>
      <Form.Item
        label={intl.get('IP_MODE')}
        required
        name={['ipn', 'ip_mode']}
        initialValue={ipn?.ip_mode}
      >
        <Radio.Group
          buttonStyle={'solid'}
          onChange={(e) => {
            setIsDhcpEnabled(e.target.value === 0);
          }}
        >
          <Radio.Button key={0} value={0}>
            {intl.get('IP_MODE_DHCP')}
          </Radio.Button>
          <Radio.Button key={1} value={1}>
            {intl.get('IP_MODE_STATIC')}
          </Radio.Button>
        </Radio.Group>
      </Form.Item>
      {renderIPFormItem()}
      <Form.Item
        label={
          <Typography.Text ellipsis={true} title={intl.get('NTP_IS_ENABLED')}>
            {intl.get('NTP_IS_ENABLED')}
          </Typography.Text>
        }
        required
        name={['ipn', 'ntp_is_enabled']}
        initialValue={ipn?.ntp_is_enabled}
      >
        <Radio.Group
          buttonStyle={'solid'}
          onChange={(e) => {
            setIsNtpEnabled(e.target.value);
          }}
        >
          <Radio.Button key={0} value={false}>
            {intl.get('DISABLED')}
          </Radio.Button>
          <Radio.Button key={1} value={true}>
            {intl.get('ENABLED')}
          </Radio.Button>
        </Radio.Group>
      </Form.Item>
      {renderNTPFormItem()}
    </div>
  );
};

export default IpnFormItem;
