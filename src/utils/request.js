import { extend } from 'umi-request';
import { notification } from 'antd';
import router from 'umi/router';
import Constants from '../../config/Constants.config';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const TIMEOUT = 3000;

/**
 * 异常处理程序
 */
const errorHandler = error => {
  const { response = {} } = error;
  const errortext = codeMessage[response.status] || response.statusText;
  const { status, url } = response;

  notification.error({
    message: `请求错误 ${status}: ${url}`,
    description: errortext,
  });

  if (status === 401) {
    notification.error({
      message: '未登录或登录已过期，请重新登录。',
    });
    // @HACK
    /* eslint-disable no-underscore-dangle */
    window.g_app._store.dispatch({
      type: 'login/logout',
    });
    return;
  }
  // environment should not be used
  if (status === 403) {
    router.push('/exception/403');
    return;
  }
  if (status <= 504 && status >= 500) {
    router.push('/exception/500');
    return;
  }
  if (status >= 404 && status < 422) {
    router.push('/exception/404');
  }
};

/**
 * 配置request请求时的默认参数
 */
// 参数   	说明	类型	可选值	默认值
// method	请求方式	string	get , post , put ...	get
// params	url请求参数	object	--	--
// charset	字符集	string	utf8 , gbk	utf8
// requestType	post请求时数据类型	string	json , form	json
// data	提交的数据	any	--	--
// responseType	如何解析返回的数据	string	json , text , blob , formData ...	json , text
// getResponse	是否获取源response, 返回结果将包裹一层	boolean	--	fasle
// timeout	超时时长, 默认毫秒, 写操作慎用	number	--	--
// useCache	是否使用缓存	boolean	--	false
// ttl	缓存时长, 0 为不过期	number	--	60000
// prefix	前缀, 一般用于覆盖统一设置的prefix	string	--	--
// suffix	后缀, 比如某些场景 api 需要统一加 .json	string	--	--
// errorHandler	异常处理, 或者覆盖统一的异常处理	function(error)	--
// headers	fetch 原有参数	object	--	{}
// credentials	fetch 请求包含 cookies 信息	object	--	credentials: 'include'

const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  params: { _channelType: 'ajax' },
  headers: { [Constants.ACJSESSIONID]: sessionStorage.getItem(Constants.ACJSESSIONID) },
  // prefix: apiPath,   //前缀
  // suffix: '.json', //    后缀, 比如某些场景 api 需要统一加 .json
  maxCache: 100, // 最大缓存个数, 超出后会自动清掉按时间最开始的一个
  timeout: TIMEOUT,
  requestType: 'form',
});
// console.log(sessionStorage.getItem(Constants.ACJSESSIONID))
export default request;




// import request, { extend } from 'umi-request';
// /**
//  * 这里介绍四种处理方式
//  */
// /**
//  * 1. 统一处理
//  * 常用于错误码较规范的项目中, 集中处理错误.
//  */
//
// const codeMap = {
//   '021': '发生错误啦',
//   '022': '发生大大大大错误啦',
//   ...
// };
//
// const errorHandler = (error) => {
//   const { response, data } = error;
//   message.error(codeMap[data.errorCode]);
//
//   throw error;   // 如果throw. 错误将继续抛出.
//   // return {some: 'data'}; 如果return, 将值作为返回. 不写则相当于return undefined, 在处理结果时判断response是否有值即可.
// }
//
// const extendRequest = extend({
//   prefix: server.url,
//   errorHandler
// });
//
// const response = await extendRequest('/some/api'); // 将自动处理错误, 不用catch. 如果throw了需要catch.
// if (response) {
//   // do something
// }
//
// /**
//  * 2. 单独特殊处理
//  * 如果配置了统一处理, 但某个api需要特殊处理. 则在请求时, 将errorHandler作为参数传入.
//  */
// const response = await extendRequest('/some/api', {
//   method: 'get',
//   errorHandler: (error) => {
//     // do something
//   }
// });
//
// /**
//  * 3. 不配置 errorHandler, 将reponse直接当promise处理, 自己catch.
//  */
// try {
//   const response = await request('/some/api');
// } catch (error) {
//   // do something
// }
//
// /**
//  * 4. 基于response interceptors
//  */
// request.interceptors.response.use((response) => {
//   const codeMaps = {
//     502: '网关错误。',
//     503: '服务不可用，服务器暂时过载或维护。',
//     504: '网关超时。',
//   };
//   message.error(codeMaps[response.status]);
//   return response;
// });
//
// /**
//  * 5. 对于状态码实际是 200 的错误
//  */
// request.interceptors.response.use(async (response) => {
//   const data = await response.clone().json();
//   if(data && data.NOT_LOGIN) {
//     location.href = '登录url';
//   }
//   return response;
// })
//
//


//---------------------      分割线      -------------------------------------


// import Constants from '../../config/Constants.config';
// import {message} from 'antd';
//
//
// import Ajax from 'robe-ajax';
// const timeout = 30000;//30秒
// const errCount = 0;
//
// export default function request(url, options) {
//   options.data = { ...options.data, _channelType: 'ajax' };
//   let res = {
//     url,
//     method: 'get',
//     timeout,
//     data: {},
//     dataType: 'JSON',
//     headers: { [Constants.ACJSESSIONID]: sessionStorage.getItem(Constants.ACJSESSIONID) },
//     traditional: true,
//     xhrFields: {
//       withCredentials: true
//     },
//     ...options
//   };
//   return Ajax.ajax(res).then(data => {
//     if (data.resultCode !== "ok") {
//       message.error(data.errMessage);
//       if (data.resultCode === 'SESSION_ERROR') {
//         setTimeout(() =>
//             document.location.href = "/login"
//           , 1000);
//       }
//     }
//     return { data };
//   }).catch(err => {
//     err.abort();//终止请求
//     message.error("服务器连接失败");
//   });
// }


// export function requestString(url, options) {
//     options.data[Constants.CHANNEL_TYPE] = Constants.AJAX;
//     let res = {
//         url,
//         method: 'get',
//         timeout,
//         data: "",
//         contentType: "application/json",
//         dataType: 'JSON',
//         headers: { [Constants.ACJSESSIONID]: sessionStorage.getItem(Constants.ACJSESSIONID) },
//         xhrFields: {
//             withCredentials: true
//         },
//         ...options
//     };
//     res.data = JSON.stringify(options.data);
//     return Ajax.ajax(res).then(data => {
//         if (data.resultCode !== "ok") {
//             message.error(data.errMessage);
//             if (data.resultCode === 'SESSION_ERROR') {
//                 setTimeout(() =>
//                     document.location.href = "/login"
//                 , 1000);
//             }
//         }
//         return { data };
//     }).catch(err => {
//         err.abort();//终止请求
//         message.error("服务器连接失败");
//     });
// }

