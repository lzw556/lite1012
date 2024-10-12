import React from 'react';
import { Badge, Button, Popconfirm, Spin, Tree, TreeDataNode } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import intl from 'react-intl-universal';
import { useNavigate } from 'react-router-dom';
import { Device } from '../../types/device';
import { useContext, VIRTUAL_ROOT_DEVICE } from '.';
import { DeleteDeviceRequest } from '../../apis/device';
import { DeviceNS } from './util';

type DeviceWithChildren = Device & { title: string; key: string; children: DeviceWithChildren[] };

export const DeviceTree = ({
  selectedKeys,
  height
}: {
  selectedKeys?: string[];
  height: number;
}) => {
  const navigate = useNavigate();
  const { devices, devicesLoading, refresh } = useContext();
  const [selectedKey, setSelectedKey] = React.useState<string | undefined>(
    selectedKeys && selectedKeys.length > 0 ? selectedKeys[0] : undefined
  );
  const devs: Device[] = [VIRTUAL_ROOT_DEVICE as Device];
  if (devices.length > 0) {
    devs.push(
      ...devices.map((d) => {
        if (DeviceNS.Assert.isRoot(d)) {
          return { ...d, parent: VIRTUAL_ROOT_DEVICE.macAddress };
        } else {
          return d;
        }
      })
    );
  }
  return (
    <Spin spinning={devicesLoading}>
      {!devicesLoading && (
        <Tree
          defaultExpandAll={true}
          selectedKeys={selectedKeys}
          showIcon={true}
          treeData={buildDeviceTreeData(devs)}
          titleRender={(node) => {
            const device = devs.find((d) => `${d.id}` === node.key);
            return node.key !== VIRTUAL_ROOT_DEVICE.id.toString() ? (
              <>
                <Badge
                  status={device && device.state && device.state.isOnline ? 'success' : 'default'}
                  text={node.title}
                />
                {selectedKey && selectedKey === node.key && (
                  <Popconfirm
                    title={intl.get('DELETE_SOMETHING_PROMPT', { something: node.title })}
                    onConfirm={() =>
                      DeleteDeviceRequest(Number(node.key as string)).then(() => {
                        refresh(true);
                        navigate(`/devices/0`);
                      })
                    }
                  >
                    <Button type='text' danger={true} size='small'>
                      <DeleteOutlined />
                    </Button>
                  </Popconfirm>
                )}
              </>
            ) : (
              node.title
            );
          }}
          height={height}
          onSelect={(keys, e: any) => {
            const id = `${e.node.key}`;
            setSelectedKey(id);
            navigate(`/devices/${id}`);
          }}
        />
      )}
    </Spin>
  );
};

function buildDeviceTreeData(devices: Device[]): TreeDataNode[] {
  const nodes: TreeDataNode[] = [];
  devices.forEach((dev) => {
    if (dev.macAddress === VIRTUAL_ROOT_DEVICE.macAddress) {
      const { name, id, children } = getDeviceWithChildren(dev, devices);
      nodes.push({
        title: name,
        key: `${id}`,
        children
      });
    }
  });
  return nodes;
}

function getDeviceWithChildren(dev: Device, devices: Device[]): DeviceWithChildren {
  const children = devices.filter((d) => d.parent === dev.macAddress);
  return {
    ...dev,
    title: dev.name,
    key: `${dev.id}`,
    children: children.map((d) => getDeviceWithChildren(d, devices))
  };
}
