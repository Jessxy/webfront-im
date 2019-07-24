import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import { message } from 'antd';
import Constants from '../../config/Constants.config';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, { appCode: 'lms', ...payload });
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });

      //todo kim-stamp Login successfully 登录失败
      if (response.content.sessionId == null) {
        return message.error('密码或者账号错误');
        reloadAuthorized(); //todo 重新授权
      }
      if (response.content.sessionId !== null) {
        localStorage[Constants.ACJSESSIONID] = response.content.sessionId;
        localStorage[Constants.USERNAME] = response.content.userName; //todo kim-stamp 登录成功 ==> 设置session信息
        yield put({
          type: 'changeLoginStatus',
          payload: { ...response, status: 'ok' },
        });

        reloadAuthorized(); //todo 重新授权
        const urlParams = new URL(window.location.href); //URL的使用方法
        let { redirect } = getPageQuery();
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            redirect = null;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized(); //todo 重新授权
      window.localStorage.setItem(Constants.ACJSESSIONID, null); //todo kim-stamp 登出清除sessionStorage信息
      window.localStorage.setItem(Constants.USERNAME, null); //todo kim-stamp 登出清除sessionStorage信息
      // redirect
      if (window.location.pathname !== '/user/login') {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          })
        );
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      // setAuthority(payload.currentAuthority);
      //todo kim-stamp 根据用户配置不同菜单(根据后台不同菜单配置)
      let list = [
        'user',
        '/companyManage',
        '/workbench',
        '/companyManage',
        '/supplierManage',
        '/costMaintenance',
        '/profit',
        '/quotation',
        '/logisticsOrder',
        '/finance',
        '/quotationSupport',
        '/profitReport',
        '/auth',
      ];

      let third = [];
      let demolist = [];

      payload.content.menus.map(item => {
        return third.push(item.url);
      });

      list.map(item => {
        third.some(i => {
          if (item === `/${i.match(/[^/]*\b/)[0]}`) {
            demolist.push(item);
            return true;
          }
        });
      });
      setAuthority(demolist.concat(third));

      return {
        ...state,
        status: payload.status,
        type: payload.type,
        zbtUserLoginInfo: payload, //todo kim-stamp 因为后台返回的目录结构不同，所以把payload负载信息整个写一遍
      };
    },
  },
};
