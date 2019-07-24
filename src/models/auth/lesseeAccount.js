

import { getLesseesAccount, addLesseeAccount, updateLesseeAccount, deleteById, getLesseeById, getAccount } from '../../services/auth/lesseeAccount';
import Constants from '../../../config/Constants.config';
import { message } from "antd";
const R = require('ramda');

export default {
    namespace: 'lesseeAccount',
    state: {
        page: {
            page: 1,
            size: 10,
            totalRow: 0,
            totalPage: 0
        },

        list: [],
        dataSource: {},
        status: "1",
        accountList:[]
    },
    reducers: {

        //-----------------setList

        /**
         *
         * @param state
         * @param payload
         * @returns {{list: *, page: *, status: *}}
         */
        setLesseeAccountList(state, { payload }) {
            return { ...state, list: payload.list, page: payload.page, status: payload.status}
        },


        setAccountList(state, { payload }) {
            return { ...state, accountList: payload.list}
        },


        //--------------------setEntity

        /**
         * 设置账号信息
         * @param state
         * @param action
         * @returns {{dataSource: (*|string)}}
         */
        setDataSource(state, action) {
            let payload = action.payload;
            return {...state, dataSource: payload.dataSource,};
        },



    },
    effects: {


        //----------------------------开票人


        /**
         * 查询租户账号列表
         * @param payload
         * @param call
         * @param put
         * @param select
         */
        *getLesseesAccount({payload}, { call, put, select }) {
            let page = yield select(state => state.lesseeAccount.page);
            page = R.isNil(payload) || R.isNil(payload.page) ? page : payload.page;

            let status =  yield select(state => state.lesseeAccount.status);
            status =  R.isNil(payload) || R.isNil(payload.status) ? status : payload.status;


            const res = yield call(getLesseesAccount, {
                bankId: R.isNil(payload) || R.isNil(payload.bankId) ? "" : payload.bankId,
                bankCode: R.isNil(payload) || R.isNil(payload.bankCode) ? "" : payload.bankCode,
                tenantId: R.isNil(payload) || R.isNil(payload.tenantId) ? "" : payload.tenantId,
                currency: R.isNil(payload) || R.isNil(payload.currency) ? "" : payload.currency,
                status: status,
                page
            });

            if (res.data.resultCode === "ok") {
                let content = res.data.content;
                yield put({
                    type: 'setLesseeAccountList',
                    payload: {
                        list: R.isNil(content.list) ? [] : content.list,
                        page: R.isNil(content.page) ? Constants.DEFAULTPAGE : content.page,
                        status : status,
                    }
                });
            } else {
                message.error(res.data.errMessage);
            }
        },


        /**
         * 查询租户账号列表
         * @param payload
         * @param call
         * @param put
         * @param select
         */
        *getAccount({payload}, { call, put, select }) {
            const res = yield call(getAccount, {});
            if (res.data.resultCode === "ok") {
                let content = res.data.content;
                yield put({
                    type: 'setAccountList',
                    payload: {
                        list: R.isNil(content) ? [] : content,
                    }
                });
            } else {
                message.error(res.data.errMessage);
            }
        },



        /**
         * 根据id查询开票人
         * @param payload
         * @param call
         * @param put
         * @param select
         */
            *getLesseeById({payload}, {call, put, select}) {
            const res = yield call(getLesseeById, {id: payload.id});
            if (res.data.resultCode === "ok") {
                let data = res.data.content;
                yield put({
                    type: "setDataSource",
                    payload: {
                        dataSource: data,
                    }
                });

            }
        },

        /**
         * 删除开票人
         * @param payload
         * @param call
         * @param put
         * @param select
         */
        *deleteById({ payload }, { call, put, select }) {
            const res = yield call(deleteById, {id: payload.id});
            if (res.data.resultCode === "ok") {
                let content = res.data.content;
                message.info("删除租户账号成功");
                if(payload.onSuccess())payload.onSuccess();

            } else {
                message.error(res.data.errMessage);
            }
        },

        /**
         * 增加开票人
         * @param payload
         * @param call
         * @param put
         * @param select
         */
        *addLesseeAccount({payload}, { call, put, select }) {
            const res = yield call(addLesseeAccount, payload);

            if (res.data.resultCode === "ok") {
                let content = res.data.content;
                message.info("增加租户账号成功");
                if(payload.onSuccess())payload.onSuccess();

            } else {
                message.error(res.data.errMessage);
            }
        },

        /**
         * 更新开票人
         * @param payload
         * @param call
         * @param put
         * @param select
         */
        *updateLesseeAccount({payload}, { call, put, select }) {

            const res = yield call(updateLesseeAccount, payload);

            if (res.data.resultCode === "ok") {
                let content = res.data.content;
                message.info("修改租户账号成功");
                if(payload.onSuccess())payload.onSuccess();

            } else {
                message.error(res.data.errMessage);
            }
        },


    },
    subscriptions: {
        setup({ history, dispatch }) {
        }
    }
};
