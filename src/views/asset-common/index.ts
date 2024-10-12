import { resolveStatistics } from './utils/statistics';
import {
  isMonitoringPoint,
  isVibrationLike,
  isVibrationRelated,
  isWindLike,
  isCorrosionLike,
  isCorrosionRelated
} from './utils/assert';
import { AssetModel, AssetRow } from './types';

export * from './components';
export * from './monitoring-point';
export * from './constants';
export * from './services';
export * from './types';
export { generateProjectAlarmStatis } from './utils/statistics';
export const Asset = {
  resolveStatistics,
  Assert: {
    isWindLike,
    isMonitoringPoint,
    isVibrationLike,
    isVibrationRelated,
    isCorrosionLike,
    isCorrosionRelated
  },
  convert: (values?: AssetRow): AssetModel | null => {
    if (!values) return null;
    return {
      id: values.id,
      name: values.name,
      parent_id: values.parentId,
      type: values.type,
      attributes: values.attributes
    };
  }
};
