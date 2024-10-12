import React from 'react';
import { PointsLineChart } from '../detail/pointsLineChart';
import { AssetRow, HistoryData } from '../../../asset-common';

export const RightConentInMonitorTab = ({
  asset,
  historyDatas
}: {
  asset: AssetRow;
  historyDatas: { name: string; data: HistoryData }[] | undefined;
}) => {
  return <PointsLineChart flange={asset} historyDatas={historyDatas} />;
};
