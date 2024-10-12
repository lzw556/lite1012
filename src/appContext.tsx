import React from 'react';
import { Spin } from 'antd';
import request from './utils/request';

export type AppType =
  | 'windTurbine'
  | 'general'
  | 'hydroTurbine'
  | 'corrosion'
  | 'corrosionWirelessHART'
  | 'windTurbinePro'
  | 'vibration';

export type AppConfig = { type: AppType; analysisEnabled?: boolean };

const AppConfigContext = React.createContext<AppConfig>({ type: 'windTurbine' });

const useAppConfigContext = () => React.useContext(AppConfigContext);

export function AppConfigProvider({ children }: { children?: JSX.Element }) {
  const [loading, setLoading] = React.useState(true);
  const [config, setConfig] = React.useState<AppConfig>();
  React.useEffect(() => {
    request
      .get<AppConfig>('webConfig')
      .then((res) => {
        if (res.data.code === 200) {
          setConfig(res.data.data);
          // setConfig({type:'vibration'});
        } else {
          throw Error(`API: webConfig occur errors`);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Spin spinning={loading}>
      {config && <AppConfigContext.Provider value={config}>{children}</AppConfigContext.Provider>}
    </Spin>
  );
}

export function useAppType() {
  return useAppConfigContext().type;
}

export function useAppVibrationEnabled() {
  return !!useAppConfigContext().analysisEnabled;
}
