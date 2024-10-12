import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { AssetTree, ContextProvider, HomePathId } from '../asset-common';
import { PageWithSideBar } from '../../components/pageWithSideBar';
import { VirtualAssetDetail } from './virtualAssetDetail';

export default function Index() {
  const { id: pathId = HomePathId } = useParams();

  const renderContent = () => {
    if (pathId === HomePathId) {
      return <VirtualAssetDetail />;
    } else {
      return <Outlet />;
    }
  };

  return (
    <ContextProvider>
      <PageWithSideBar
        content={renderContent()}
        sideBar={{
          body: (height) => <AssetTree height={height} selectedKeys={[pathId]} />
        }}
      />
    </ContextProvider>
  );
}
