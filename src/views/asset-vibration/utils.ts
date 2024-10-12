import { Asset, AssetRow } from '../asset-common';
import { area } from './constants';

export function isAssetAreaParent(asset: AssetRow) {
  return asset.type === area.type && isAreaTop(asset) && !hasVibrationRelatedChildren(asset);
}

function isAreaTop(asset: AssetRow) {
  return asset.parentId === 0;
}

function hasVibrationRelatedChildren(asset: AssetRow) {
  return asset.children
    ? asset.children.some((c) => Asset.Assert.isVibrationRelated(c.type))
    : false;
}

export function isAssetVibrationRelatedParent(asset: AssetRow) {
  return asset.type === area.type && !hasAreaChildren(asset);
}

function hasAreaChildren(asset: AssetRow) {
  return asset.children ? asset.children.some((c) => c.type === area.type) : false;
}
