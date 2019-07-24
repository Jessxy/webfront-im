import request from '@/utils/request';
import { message } from 'antd';
import Constants from '../../config/Constants.config';
// import { apiPath, mockiMitateData } from '../../config/web.domain.config';


const ERR_RETURN_DURATION = 2;  //错误提示间隔时间
export default class Request {

  static get(url, param) {
    return new Promise((resolve, reject) => {
      request.get(url, {
        headers: { [Constants.ACJSESSIONID]: sessionStorage.getItem(Constants.ACJSESSIONID) },
        ...param,
      }).then(res => {
        if (res.resultCode === 'SESSION_ERROR') {
          message.error(`${res.errMessage},正在返回登陆页面...` || '错误提示:SESSION_ERROR 正在跳转登陆页...', ERR_RETURN_DURATION);
          setTimeout(() =>
              document.location.href = '/user/login'
            , 2000);
          return;
        }
        // if (res.resultCode !== 'ok') return message.warning(res.errMessage);
        resolve(res);

      }).catch(err => {
        console.log(err);
        message.error('服务器连接失败');
        window.location.href="/user/login"
      });
    });
  }

  static post(url, param) {
    return new Promise((resolve, reject) => {
      request.post(url, {
        headers: { [Constants.ACJSESSIONID]: sessionStorage.getItem(Constants.ACJSESSIONID) },
        ...param,
      }).then(res => {
        if (res.resultCode === 'SESSION_ERROR') {
          message.error(`${res.errMessage},正在返回登陆页面...` || '错误提示:SESSION_ERROR 正在跳转登陆页...', ERR_RETURN_DURATION);
          setTimeout(() =>
              document.location.href = '/user/login'
            , 2000);
          return;
        }
        // if (res.resultCode !== 'ok') return message.warning(res.errMessage);
        resolve(res);

      }).catch(err => {
        message.error('服务器连接失败');
        window.location.href="/user/login"
      });
    });
  }
}

export { request };
