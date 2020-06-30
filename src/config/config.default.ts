import {EggAppConfig, EggAppInfo, PowerPartial} from 'midway';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
    const config = {} as DefaultConfig;

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name;

    config.cluster = {
        listen: {
            port: 7007
        }
    };

    // add your config here
    config.middleware = ['errorHandler'];

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
