import React from 'react';
import { Form } from 'antd';
import intl from 'react-intl-universal';
import { ModalWrapper } from '../../../components/modalWrapper';
import { ModalFormProps } from '../../../types/common';
import { AssetModel, AssetRow, updateAsset } from '../../asset-common';
import { UpdateFormItems } from './updateFormItems';

export const UpdateModal = (props: ModalFormProps & { asset: AssetRow }) => {
  const { asset, onSuccess, ...rest } = props;
  const { id, name, parentId, type } = asset;
  const [form] = Form.useForm<AssetModel>();
  const label = intl.get('ASSET');

  return (
    <ModalWrapper
      {...{
        afterClose: () => form.resetFields(),
        title: intl.get('EDIT_SOMETHING', { something: label }),
        okText: intl.get('SAVE'),
        ...rest,
        onOk: () => {
          form.validateFields().then((values) => {
            try {
              updateAsset(id, { ...values, type }).then(() => {
                onSuccess();
              });
            } catch (error) {
              console.log(error);
            }
          });
        }
      }}
    >
      <Form form={form} labelCol={{ span: 7 }} initialValues={{ name, parent_id: parentId, type }}>
        <UpdateFormItems />
      </Form>
    </ModalWrapper>
  );
};
