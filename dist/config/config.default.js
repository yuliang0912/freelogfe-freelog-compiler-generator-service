"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (appInfo) => {
    const config = {};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2NvbmZpZy5kZWZhdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsa0JBQWUsQ0FBQyxPQUFtQixFQUFFLEVBQUU7SUFDbkMsTUFBTSxNQUFNLEdBQUcsRUFBbUIsQ0FBQztJQUVuQyx1RUFBdUU7SUFDdkUsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO0lBRTNCLE1BQU0sQ0FBQyxPQUFPLEdBQUc7UUFDYixNQUFNLEVBQUU7WUFDSixJQUFJLEVBQUUsSUFBSTtTQUNiO0tBQ0osQ0FBQztJQUVGLHVCQUF1QjtJQUN2QixNQUFNLENBQUMsVUFBVSxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFckMsTUFBTSxDQUFDLFFBQVEsR0FBRztRQUNkLE1BQU0sRUFBRTtZQUNKLE1BQU0sRUFBRSxLQUFLO1NBQ2hCO1FBQ0QsSUFBSSxFQUFFO1lBQ0YsTUFBTSxFQUFFLEtBQUs7U0FDaEI7S0FDSixDQUFDO0lBRUYsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQyxDQUFDIn0=