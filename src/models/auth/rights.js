import { queryRightsList, getRights, addRights, updateRights, deleteRights, queryAllRights, queryRoleRights, updataRightStatus } from '../../services/auth/rights';
const R = require('ramda');
import { message } from 'antd';
export default {
    namespace: 'rights',
    state: {
        page: {},
        list: [],
        allRights: [],
        roleRights: [],
        dataSource: {}
    },
    reducers: {
        /**
         * 刷新state
         *
         */
        refreshState(state, { payload }) {
            return { ...state, ...payload };
        }
    },
    effects: {
        /**
         * 删除权限
         *
         * @param payload
         * @param call
         * @param put
         * @param select
         */
        *deleteRights({ payload }, { call, put, select }) {
            const res = yield call(deleteRights, { rightsId: payload.rightsId });
            if (res.data.resultCode === "ok") {
                message.info("删除成功！");
                if(payload.onSuccess) payload.onSuccess();
            } else {
                message.error(res.data.errMessage);
            }
        },
        /**
         * 添加权限
         *
         * @param call
         * @param put
         * @param select
         */
        *addRights({ payload }, { call, put, select }) {
            const res = yield call(addRights, { ...payload });
            if (res.data.resultCode === "ok") {
                message.info("创建成功！");
                if (payload.onSuccess) payload.onSuccess();                
            } else {
                message.error(res.data.errMessage);
            }
        },
        /**
         * 修改权限
         *
         * @param payload
         * @param call
         * @param put
         * @param select
         */
        *updateRights({ payload }, { call, put, select }) {
            const res = yield call(updateRights, { ...payload });
            if (res.data.resultCode === "ok") {
                message.info("修改成功！");
                if (payload.onSuccess) payload.onSuccess();                
            } else {
                message.error(res.data.errMessage);
            }
        },

        /**
         * 更新权限状态
         * 
         * @param payload
         * @param call
         * @param put
         * @param select
         */
        *updataRightStatus({ payload },{call, put, select}){
            const res = yield call(updataRightStatus, { rightsId: payload.rightsId, status: payload.status});
            if(res.data.resultCode === "ok"){
                message.info("修改成功！");
                if(payload.onSuccess) payload.onSuccess();
                // yield put({
                //     type: 'queryRightsList'
                // });
            } else {
                message.error(res.data.errMessage);
            }
        },



        /**
         * 分页查询权限集合
         *
         * @param call
         * @param put
         * @param select
         */
        *queryRightsList({ payload }, { call, put, select }) {
            const res = yield call(queryRightsList, { ...payload });
            if (res.data.resultCode === "ok") {
                let content = res.data.content;
                yield put({
                    type: 'refreshState',
                    payload: {
                        list: content.list,
                        page: content.page
                    }
                });
            } else {
                message.error(res.data.errMessage);
            }
        },
        /**
         * 获取权限
         *
         * @param payload
         * @param call
         * @param put
         */
        *getRights({ payload }, { call, put }) {
            const res = yield call(getRights, { rightsId: payload.rightsId });
            if (res.data.resultCode === "ok") {
                let content = res.data.content;
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
        /**
         * 查询所有权限集合
         *
         * @param call
         * @param put
         * @param select
         */
        *queryAllRights({ payload }, { call, put, select }) {
            const res = yield call(queryAllRights, { appCode: payload.appCode });
            if (res.data.resultCode === "ok") {
                yield put({
                    type: 'refreshState',
                    payload: { 
                        allRights: res.data.content 
                    }
                });
            } else {
                message.error(res.data.errMessage);
            }
        },

        /**
         * 查询角色权限集合
         *
         * @param call
         * @param put
         * @param select
         */
        *queryRoleRights({ payload }, { call, put, select }) {
            const res = yield call(queryRoleRights, { id: payload.id });
            if (res.data.resultCode === "ok") {
                let content = res.data.content;
                let roleRights = [];
                content.map((item) => roleRights.push(item.rightsId))
                yield put({
                    type: 'refreshState',
                    payload: { roleRights }
                });
                if (payload.onSuccess) payload.onSuccess(roleRights);
            } else {
                message.error(res.data.errMessage);
            }
        }
    },
};
