import React from 'react';
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { Asset, AssetRow, MonitoringPointRow } from '../asset-common';
import * as Vibration from '../asset-vibration/icon';
import * as Corrosion from '../asset-corrosion/icon';
import * as Wind from '../asset-wind-turbine/icon';
import * as MonitoringPoint from '../asset-common/monitoring-point';

export const Icon = (
  props: Partial<CustomIconComponentProps> & {
    node: AssetRow | MonitoringPointRow | undefined;
  }
) => {
  const { node, ...rest } = props;
  if (node) {
    if (Asset.Assert.isVibrationLike(node.type)) {
      return <Vibration.Icon asset={node as AssetRow} {...rest} />;
    } else if (Asset.Assert.isCorrosionLike(node.type)) {
      return <Corrosion.Icon asset={node as AssetRow} {...rest} />;
    } else if (Asset.Assert.isWindLike(node.type)) {
      return <Wind.Icon asset={node as AssetRow} {...rest} />;
    } else if (Asset.Assert.isMonitoringPoint(node.type)) {
      return <MonitoringPoint.Icon monitoringPoint={node as MonitoringPointRow} {...rest} />;
    } else {
      return null;
    }
  } else {
    return null;
  }
};
