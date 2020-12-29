import {EggAppConfig, EggAppInfo, PowerPartial} from 'midway';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
    const config = {} as DefaultConfig;

    config.keys = appInfo.name;

    config.cluster = {
        listen: {
            port: 7007
        }
    };

    config.middleware = ['errorAutoSnapHandler', 'gatewayIdentityInfoHandler'];

    config.security = {
        xframe: {
            enable: false,
        },
        csrf: {
            enable: false,
        }
    };

    return config;
};
