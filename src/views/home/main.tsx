import React from 'react';
import { Asset, Point, useContext } from '../asset-common';
import * as Vibration from '../asset-vibration';
import * as Corrosion from '../asset-corrosion';
import * as Wind from '../asset-wind-turbine';

export default function Main() {
  const contextProps = useContext();
  const { selectedNode } = contextProps;

  if (selectedNode) {
    const { type } = selectedNode;
    if (Asset.Assert.isVibrationLike(type) || Point.Assert.isVibrationRelated(type)) {
      return <Vibration.Index {...contextProps} />;
    } else if (Asset.Assert.isCorrosionLike(type) || Point.Assert.isCorrosionRelated(type)) {
      return <Corrosion.Index {...contextProps} />;
    } else if (Asset.Assert.isWindLike(type) || Point.Assert.isWindRelated(type)) {
      return <Wind.Index {...contextProps} />;
    } else {
      return null;
    }
  } else {
    return null;
  }
}
