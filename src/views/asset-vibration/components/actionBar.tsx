import React from 'react';
import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import intl from 'react-intl-universal';
import * as Area from '../create';
import { area, motor } from '../constants';
import * as Main from '../main';
import { Asset, AssetRow, MONITORING_POINT } from '../../asset-common';
import { ModalFormProps } from '../../../types/common';
import * as MonitoringPoint from '../point';
import { isAssetAreaParent, isAssetVibrationRelatedParent } from '../utils';

export const ActionBar = ({
  asset,
  onSuccess,
  short = false
}: {
  asset?: AssetRow;
  onSuccess: () => void;
  short?: boolean;
}) => {
  const [open, setOpen] = React.useState(false);

  //only used to open difference modal
  const [type, setType] = React.useState<number | undefined>();

  const commonProps: ModalFormProps = {
    onSuccess: () => {
      onSuccess();
      reset();
    },
    open,
    onCancel: () => {
      reset();
    }
  };

  const reset = () => {
    setOpen(false);
    setType(undefined);
  };

  const renderAreaCreationBtn = () => {
    const { label, type } = area;
    if (!asset || isAssetAreaParent(asset)) {
      return (
        <Button
          key={type}
          onClick={() => {
            setOpen(true);
            setType(type);
          }}
          type='primary'
        >
          {intl.get('CREATE_SOMETHING', { something: intl.get(label) })}
          <PlusOutlined />
        </Button>
      );
    }
  };

  const renderVibrationRelatedCreationBtn = () => {
    const { type } = motor;
    if (!asset || isAssetVibrationRelatedParent(asset)) {
      return (
        <Button
          key={type}
          onClick={() => {
            setOpen(true);
            setType(type);
          }}
          type='primary'
        >
          {intl.get('CREATE_SOMETHING', { something: intl.get('ASSET') })}
          <PlusOutlined />
        </Button>
      );
    }
  };

  const renderMonitoringPointCreationBtn = () => {
    return (
      <Button
        key={9999}
        onClick={() => {
          setOpen(true);
          setType(9999);
        }}
        type='primary'
      >
        {intl.get('CREATE_SOMETHING', { something: intl.get(MONITORING_POINT) })}
        <PlusOutlined />
      </Button>
    );
  };

  return (
    <Space>
      {renderAreaCreationBtn()}
      {!short && (
        <>
          {renderVibrationRelatedCreationBtn()}
          {renderMonitoringPointCreationBtn()}
        </>
      )}
      {type === area.type && <Area.Create {...commonProps} parentId={asset?.id} />}
      {type && Asset.Assert.isVibrationRelated(type) && (
        <Main.Create {...commonProps} parentId={asset?.id} />
      )}
      {type === 9999 && <MonitoringPoint.Create {...commonProps} asset={asset} />}
    </Space>
  );
};
