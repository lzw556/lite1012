import React from 'react';
import { Input } from 'antd';
import intl from 'react-intl-universal';
import { FormInputItem } from '../../../components/formInputItem';

export const UpdateFormItems = () => {
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
    </>
  );
};
