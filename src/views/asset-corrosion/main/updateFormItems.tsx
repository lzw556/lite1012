import React from 'react';
import intl from 'react-intl-universal';
import { FormInputItem } from '../../../components/formInputItem';
import { Form, Input, Select } from 'antd';
import { useContext } from '../../asset-common';
import { area } from '../constants';

export const UpdateFormItems = () => {
  const label = intl.get('ASSET');
  const { assets } = useContext();

  return (
    <>
      <FormInputItem
        label={intl.get('NAME')}
        name='name'
        requiredMessage={intl.get('PLEASE_ENTER_NAME')}
        lengthLimit={{ min: 4, max: 50, label: intl.get('NAME').toLowerCase() }}
      >
        <Input placeholder={intl.get('PLEASE_ENTER_NAME')} />
      </FormInputItem>
      <Form.Item
        label={label}
        name='parent_id'
        rules={[
          {
            required: true,
            message: intl.get('PLEASE_SELECT_SOMETHING', { something: label })
          }
        ]}
      >
        <Select placeholder={intl.get('PLEASE_SELECT_SOMETHING', { something: label })}>
          {assets
            .filter((a) => a.type === area.type)
            .map(({ id, name }) => (
              <Select.Option key={id} value={id}>
                {name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
    </>
  );
};
