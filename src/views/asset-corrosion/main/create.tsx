import React from 'react';
import { Form, Input, Radio, Select } from 'antd';
import intl from 'react-intl-universal';
import { ModalFormProps } from '../../../types/common';
import { ModalWrapper } from '../../../components/modalWrapper';
import { FormInputItem } from '../../../components/formInputItem';
import { addAsset, AssetModel, AssetRow, useContext } from '../../asset-common';
import { area, pipe, tank } from '../constants';

export const Create = (props: ModalFormProps & { parentId?: number }) => {
  const { onSuccess, parentId } = props;
  const [form] = Form.useForm<AssetModel>();
  const label = intl.get('ASSET');
  const { assets } = useContext();
  const parents: AssetRow[] = [];
  if (parentId === undefined) {
    parents.push(...assets.filter((a) => a.type === area.type));
  }

  const renderParent = () => {
    if (parentId) {
      return (
        <Form.Item name='parent_id' hidden={true} initialValue={parentId}>
          <Input />
        </Form.Item>
      );
    } else if (parents.length >= 0) {
      return (
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
      );
    }
  };

  return (
    <ModalWrapper
      {...{
        afterClose: () => form.resetFields(),
        title: intl.get('CREATE_SOMETHING', { something: label }),
        okText: intl.get('CREATE'),
        ...props,
        onOk: () => {
          form.validateFields().then((values) => {
            try {
              addAsset(values).then(() => {
                onSuccess();
              });
            } catch (error) {
              console.log(error);
            }
          });
        }
      }}
    >
      <Form form={form} labelCol={{ span: 7 }}>
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
          <Radio.Group>
            {[pipe, tank].map((t) => (
              <Radio key={t.type} value={t.type}>
                {intl.get(t.label)}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        <FormInputItem
          label={intl.get('NAME')}
          name='name'
          requiredMessage={intl.get('PLEASE_ENTER_NAME')}
          lengthLimit={{ min: 4, max: 50, label: intl.get('NAME').toLowerCase() }}
        >
          <Input placeholder={intl.get('PLEASE_ENTER_NAME')} />
        </FormInputItem>
        {renderParent()}
      </Form>
    </ModalWrapper>
  );
};
