import { wind, flange, tower } from '../../asset-wind-turbine/constants';
import { area, motor } from '../../asset-vibration/constants';
import * as Corrosion from '../../asset-corrosion/constants';

export function isWindLike(type: number) {
  return type === wind.type || type === flange.type || type === tower.type;
}
export function isMonitoringPoint(type: number) {
  return type > 10000;
}
export function isVibrationLike(type: number) {
  return type === area.type || isVibrationRelated(type);
}
export function isVibrationRelated(type: number) {
  return type === motor.type;
}
export function isCorrosionLike(type: number) {
  return type === Corrosion.area.type || isCorrosionRelated(type);
}
export function isCorrosionRelated(type: number) {
  return type === Corrosion.pipe.type || type === Corrosion.tank.type;
}
