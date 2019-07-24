import { login } from '../../services/common/common';
import { message } from 'antd';
import { browserHistory } from 'dva/router';
import Constants from '../../../config/Constants.config';
const R = require('ramda');

export default {
    namespace: 'authLogin',
    state: {
        type: 'default', // default: 缺省登录, custom: 个性化登录
        isNeedVerifyCode: false, // 是否需要图形验证码
        keepLogin: false, // 一周内免登陆
    },

    reducers: {
        /**
         * 设置登录模式
         *
         * @param state
         * @param action
         * @returns {{type}}
         */
        setType(state, action) {
            return { ...state, type: action.payload.type };
        },
        /**
         * 设置是否需验证码
         *
         * @param state
         * @param action
         */
        setIsNeedVerifyCode(state, { payload }) {
            return { ...state, isNeedVerifyCode: payload.isNeedVerifyCode }
        },
    },
    effects: {
        *login({ payload }, { call, put, select }) {
            const res = yield call(login, { loginId: payload.loginId, password: payload.password, verifyCode: payload.verifyCode, token: payload.token });
            if (res.data.resultCode === "ok") {
                if (R.isNil(res.data.content.sessionId) && res.data.content.needVerifyCode) {//首次输入用户名密码错误
                    yield put({
                        type: 'setIsNeedVerifyCode',
                        payload: {
                            isNeedVerifyCode: true
                        }
                    });
                    message.error("用户名或者密码错误");
                } else {
                    if (!R.isNil(res.data.content.sessionId)) {
                        sessionStorage.setItem('ACJSESSIONID', res.data.content.sessionId);
                        sessionStorage.setItem('userRights', res.data.content.rightValues);
                        sessionStorage.setItem('userName', res.data.content.userName);
                        browserHistory.push(R.isNil(res.data.content.defaultMenu) || R.isEmpty(res.data.content.defaultMenu) ? Constants.DEFAULT_MENU : res.data.content.defaultMenu);
                    }
                }
            } else {
                message.error(res.data.errMessage);
            }
        }
    },
    subscriptions: {
    }
};
