import { queryUserList, getUser, addUser, configUserRole,updateUser, deleteUser, resetPassword, queryAppRoles } from '../../services/auth/user';

import { message } from 'antd';
const R = require('ramda');

export default {
    namespace: 'authUser',
    state: {
        list: [],
        page: {},
        dataSource: {},
        appRoles: []
    },
    reducers: {
        /**
         * 刷新state
         *
         * @param state
         */
        refreshState(state, { payload }){
            return {...state, ...payload };
        }
    },
    effects: {
        /**
         * 删除用户
         *
         * @param payload
         * @param call
         * @param put
         * @param select
         */
        *deleteUser({ payload }, { call, put, select }) {
            const res = yield call(deleteUser, { userId: payload.userId });
            if (res.data.resultCode === "ok") {
                message.info("删除成功！");
                if(payload.onSuccess) payload.onSuccess();
            } else {
                message.error(res.data.errMessage);
            }
        },
        /**
         * 添加用户
         *
         * @param call
         * @param put
         * @param select
         */
        *addUser({ payload }, { call, put, select }) {
            const res = yield call(addUser, { ...payload });
            if (res.data.resultCode === "ok") {
                message.info("创建成功！");
                if (payload.onSuccess) payload.onSuccess();
            } else {
                message.error(res.data.errMessage);
            }
        },
        /**
         * 配置用户对应的角色
         *
         * @param call
         * @param put
         * @param select
         */
            *configUserRole({ payload }, { call, put, select }) {
            const res = yield call(configUserRole, { userId: payload.userId, roleIds: payload.roleIds});
            if (res.data.resultCode === "ok") {
                message.info("设置用户角色成功！");
            } else {
                message.error(res.data.errMessage);
            }
        },
        /**
         * 修改用户
         *
         * @param payload
         * @param call
         * @param put
         * @param select
         */
        *updateUser({ payload }, { call, put, select }) {
            const res = yield call(updateUser, { ...R.omit(['onSuccess', 'onFail'])(payload) });
            if (res && res.data.resultCode === "ok") {
                message.info("用户更新成功！");
                if(payload.onSuccess) payload.onSuccess();
            } else {
                message.error(res.data.errMessage);
            }
        },
        /**
         * 修改密码
         *
         * @param payload
         * @param call
         * @param put
         * @param select
         */
        *resetPassword({ payload }, { call, put, select }) {
            const res = yield call(resetPassword, { userId: payload.userId, loginPwd: payload.loginPwd });
            if (res.data.resultCode === "ok") {
                message.info("密码修改成功！");
                if(payload.onSuccess) payload.onSuccess();
            } else {
                message.error(res.data.errMessage);
            }
        },
        /**
         * 分页查询用户集合
         *
         * @param call
         * @param put
         * @param select
         */
        *queryUserList({ payload }, { call, put, select }) {
            const res = yield call(queryUserList, { ...payload });
            if (res.data.resultCode === "ok") {
                let content = res.data.content;
                yield put({
                    type: 'refreshState',
                    payload: {
                        list: content.list,
                        page: content.page
                    }
                });
            }
        },
        /**
         * 获取用户
         *
         * @param payload
         * @param call
         * @param put
         */
        *getUser({ payload }, {call, put}) {
            const res = yield call(getUser, { userId: payload.userId });
            if (res.data.resultCode === "ok") {
                let content = res.data.content;
                let roleIds = [];
                if(!R.isNil(content.roles)) content.roles.map((item)=>roleIds.push(item.roleId+""));
                content.roleIds = roleIds;
                yield put({
                    type: 'refreshState',
                    payload: {
                        dataSource: content
                    }
                });
            } else {
                message.error(res.data.errMessage);
            }
        },

        *queryAppRoles({ payload }, { call, put, select }) {
            const res = yield call(queryAppRoles, { ...payload });
            if (res && res.data.resultCode === "ok") {
                yield put({
                    type: 'refreshState',
                    payload: { appRoles: res.data.content ? res.data.content : [] }
                });
            }
        },

    },
};
