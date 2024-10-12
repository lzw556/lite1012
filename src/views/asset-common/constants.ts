import { getProject } from '../../utils/session';

export const ASSET_PATHNAME = 'assets';

export const VIRTUAL_ROOT_ASSET = {
  id: 0,
  type: 0,
  name: getProject().name
};

export const HomePathId = `${VIRTUAL_ROOT_ASSET.id}-${VIRTUAL_ROOT_ASSET.type}`;
