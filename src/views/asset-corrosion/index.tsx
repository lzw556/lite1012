import React from 'react';
import { Spin } from 'antd';
import * as Area from './detail/index';
import * as Main from './main/detail';
import * as Point from './point';
import { area } from './constants';
import { Asset, AssetRow, ContextProps, MonitoringPointRow } from '../asset-common';
import { UpdateModal as AssetUpdateModal } from './detail/updateModal';
import { UpdateModal as MainAssetUpdateModal } from './main/updateModal';
import { UpdateModal } from './point/updateModal';

export const Index = ({ loading, selectedNode, refresh }: ContextProps) => {
  const [open, setOpen] = React.useState(false);
  const [asset, setAsset] = React.useState<AssetRow | undefined>();
  const [mointoringPoint, setMonitoringPoint] = React.useState<MonitoringPointRow | undefined>();
  const props = {
    asset: selectedNode as AssetRow,
    onSuccess: refresh,
    onUpdate: (m: MonitoringPointRow) => {
      setOpen(true);
      setMonitoringPoint(m);
    }
  };
  let ele = null;
  if (selectedNode) {
    if (selectedNode.type === area.type) {
      ele = (
        <Area.Index
          {...{
            ...props,
            onUpdateAsset: (a: AssetRow) => {
              setOpen(true);
              setAsset(a);
            }
          }}
        />
      );
    } else if (Asset.Assert.isCorrosionRelated(selectedNode.type)) {
      ele = <Main.Index {...props} />;
    } else {
      ele = (
        <Point.Index
          {...{ monitoringPoint: selectedNode as MonitoringPointRow, onSuccess: refresh }}
        />
      );
    }
  }

  const reset = () => {
    setOpen(false);
    setAsset(undefined);
    setMonitoringPoint(undefined);
  };

  return (
    <Spin spinning={loading}>
      {ele}
      {mointoringPoint && (
        <UpdateModal
          key={mointoringPoint.id}
          monitoringPoint={mointoringPoint}
          open={open}
          onCancel={reset}
          onSuccess={() => {
            refresh();
            reset();
          }}
        />
      )}
      {asset && asset.type === area.type && (
        <AssetUpdateModal
          key={asset.id}
          asset={asset}
          open={open}
          onCancel={reset}
          onSuccess={() => {
            refresh();
            reset();
          }}
        />
      )}
      {asset && Asset.Assert.isCorrosionRelated(asset.type) && (
        <MainAssetUpdateModal
          key={asset.id}
          asset={asset}
          open={open}
          onCancel={reset}
          onSuccess={() => {
            refresh();
            reset();
          }}
        />
      )}
    </Spin>
  );
};
