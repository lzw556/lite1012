import { motor } from '../constants';
import * as Motor from '../motor/settings';

export function getDefaultSettings(type: number) {
  switch (type) {
    case motor.type:
      return Motor.defaultSettings;
    default:
      break;
  }
}
