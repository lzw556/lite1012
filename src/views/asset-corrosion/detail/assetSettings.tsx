import React from 'react';
import { Button, Flex, Popconfirm, Space, Table, TableProps } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import intl from 'react-intl-universal';
import { ActionBar } from '../components';
import { AssetRow, deleteAsset } from '../../asset-common';
import HasPermission from '../../../permission';
import { Permission } from '../../../permission/permission';

type Column = NonNullable<TableProps<AssetRow>['columns']>[0];

export const AssetSettings = (props: {
  asset: AssetRow;
  onSuccess: () => void;
  onUpdate: (asset: AssetRow) => void;
}) => {
  const { asset, onSuccess, onUpdate } = props;
  const { children } = asset;
  const columns: Column[] = [{ title: intl.get('NAME'), dataIndex: 'name' }];
  const operationColumn: Column = {
    title: intl.get('OPERATION'),
    key: 'action',
    render: (row: AssetRow) => (
      <Space>
        <HasPermission value={Permission.AssetEdit}>
          <Button
            type='text'
            size='small'
            title={intl.get('EDIT_SOMETHING', { something: intl.get('ASSET') })}
          >
            <EditOutlined onClick={() => onUpdate(row)} />
          </Button>
        </HasPermission>
        <HasPermission value={Permission.AssetDelete}>
          <Popconfirm
            title={intl.get('DELETE_SOMETHING_PROMPT', { something: row.name })}
            onConfirm={() => {
              deleteAsset(row.id).then(onSuccess);
            }}
          >
            <Button
              type='text'
              danger={true}
              size='small'
              title={intl.get('DELETE_SOMETHING', {
                something: intl.get('ASSET')
              })}
            >
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </HasPermission>
      </Space>
    )
  };

  columns.push(operationColumn);

  return (
    <>
      <Flex justify='flex-end' style={{ marginBottom: 10 }}>
        <ActionBar {...props} />
      </Flex>
      <Table
        columns={columns}
        dataSource={children?.map((c) => {
          delete c.children;
          return c;
        })}
        pagination={false}
        size='small'
      />
    </>
  );
};
