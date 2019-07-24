import JsonP from 'jsonp';
import axios from 'axios';
import { Modal, message } from 'antd';
import { domain, apiPath, mockiMitateData } from '../../config/web.domain.config';
import Constants from '../../config/Constants.config';

const ERR_RETURN_DURATION = 3;  //错误提示间隔时间


export default class Axios {

  static jsonp({ url }) {
    return new Promise((resolve, reject) => {
      JsonP(url, { param: 'callback' }, function(err, res) {
        if (res.status !== 'success') return reject(res.messsage);
        return resolve(res);
      });
    });
  }


  static ajax(options) {
    let loading;
    if (options.data && options.data.isShowLoading !== false) {
      loading = document.getElementById('ajaxLoading');
      loading.style.display = 'block';
    }
    let baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
    return new Promise((resolve, reject) => {
      axios({
        url: options.url,
        method: 'get',
        baseURL: baseApi,
        timeout: 5000,
        params: (options.data && options.data.params) || '',
        headers: { [Constants.ACJSESSIONID]: sessionStorage.getItem(Constants.ACJSESSIONID) },
      }).then(response => {
        if (options.data && options.data.isShowLoading !== false) {
          loading = document.getElementById('ajaxLoading');
          loading.style.display = 'none';
        }
        if (response.status == '200') {
          let res = response.data;
          if (res.code == '0') {
            resolve(res);
          } else {
            Modal.info({
              title: '提示',
              content: res.msg,
            });
          }
        } else {
          reject(response.data);
        }
      });
    });
  }

  static get(url, param) {
    return new Promise((resolve, reject) => {
      axios.get(url, param).then(res => {
        console.log(url, res);
        if (res && res.status !== 200) {
          message.error('请求的状态码不是200');
          return reject(res);
        }
        resolve(res);
        if (res.data.resultCode === 'SESSION_ERROR') {
          message.error('错误提示:SESSION_ERROR 正在跳转登陆页...', ERR_RETURN_DURATION);
          setTimeout(() =>
              document.location.href = '/user/login'
            , 2000);
          return;
        }
        if (res.data.resultCode !== 'ok') return message.warning(res.data.errMessage);


      }).catch(err => {
        // err.abort();  //终止请求
        console.log(err);
        message.error('服务器连接失败');
      });
    });
  }

  static post(url, param) {
    console.log(url);
    return new Promise((resolve, reject) => {
      axios.post(url, param).then(res => {
        if (res.status === 200) {
          message.info(res.data.msg);
          return resolve(res);
        }
        reject(res.data);
        return message.error('请求的状态码不是200');
      }).catch(err => {
        // err.abort();  //终止请求
        message.error('服务器连接失败');
      });
    });
  }
}


//----------------------        怎么样请求    --------------------------------

// async getDemoList() {
//   try {
//     let { status, data } = await axios.get('/table/list');
//     this.setState({
//       dynamicDataSource: data.result.map((item, index) => {
//         return {
//           key: index,
//           name: item.cname,
//           age: item.age,
//           address: item.address,
//           email: item.email,
//           image: item.image,
//           currentTime: item.currentTime,
//         };
//       }),
//     });
//   } catch (e) {
//     console.error(e);
//   }
// }


// 也可以 //     axios.get('/table/list').then().catch();
