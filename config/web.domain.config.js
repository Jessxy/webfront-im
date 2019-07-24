const domain = {
  host: 'http://localhost:8000' || process.env.host,
  port: process.env.port,
};

//开发环境
//数据接口数据
const  apiPath={
  authcenter: 'http://localhost:8080',
  mc: 'http://localhost:8093',
  basedata: 'http://localhost:8082'
}

const loginPath = 'http://localhost:8080';                                                         //洲博通登录的接口域名前缀
//const loginPath = 'https://www.easy-mock.com/mock/5d049e135ba86f54cb1d4799/shared-bicycle'; //洲博通登录的接口域名前缀
const mockiMitateData = '';

// const loginPath = '';                                                                              //登录的接口域名
// const mockiMitateData = 'https://www.easy-mock.com/mock/5d049e135ba86f54cb1d4799/shared-bicycle';    //mock数据测试域名

//生产环境
// const apiPath = '';
// const loginPath = 'http://localhost:8080';
// const mockiMitateData = 'https://www.easy-mock.com/mock/5d049e135ba86f54cb1d4799/shared-bicycle';

export default apiPath;
export { domain, apiPath, mockiMitateData, loginPath };
