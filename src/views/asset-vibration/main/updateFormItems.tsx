import React from 'react';
import intl from 'react-intl-universal';
import { FormInputItem } from '../../../components/formInputItem';
import { Form, Input, Select } from 'antd';
import { Settings } from './settings';
import { AssetRow, useContext } from '../../asset-common';
import { area, motor } from '../constants';
import { isAssetVibrationRelatedParent } from '../utils';

export const UpdateFormItems = ({ asset }: { asset: AssetRow }) => {
  const { type } = asset;
  const label = intl.get('ASSET');
  const { assets } = useContext();
  const parents: AssetRow[] = [];
  assets
    .filter((a) => a.type === area.type)
    .forEach((a) => {
      if (isAssetVibrationRelatedParent(a)) {
        parents.push(a);
      }
      if (a.children && a.children.length > 0) {
        parents.push(...a.children.filter(isAssetVibrationRelatedParent));
      }
    });

  return (
    <>
      <fieldset>
        <legend>{intl.get('BASIC_INFORMATION')}</legend>
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
            {parents.map(({ id, name }) => (
              <Select.Option key={id} value={id}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={intl.get('TYPE')}
          name='type'
          rules={[
            {
              required: true,
              message: intl.get('PLEASE_SELECT_SOMETHING', { something: intl.get('TYPE') })
            }
          ]}
        >
          <Select
            disabled={true}
            placeholder={intl.get('PLEASE_SELECT_SOMETHING', { something: intl.get('TYPE') })}
          >
            {[motor].map(({ label, type }) => (
              <Select.Option key={type} value={type}>
                {intl.get(label)}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </fieldset>
      {type && <Settings key={type} type={type} />}
    </>
  );
};
