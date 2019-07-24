import { queryLessees, addLessee, updateLessee, deleteLessee, updateStatus, getLessee, queryAllLesseeIndividual, getLesseeResourceById } from '../../services/auth/lessee';
import { message } from 'antd';

export default {
    namespace: 'lessee',
    state: {
        page: {},
        list: [],
        individualList: [],
        dataSource: {},
        lesseeResourse: {}
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
         * 查询租户集合
         *
         * @param call
         * @param put
         * @param select
         */
        *queryLessees({ payload }, { call, put, select }) {
            const res = yield call(queryLessees, { ...payload });
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
         * 新增租户
         *
         * @param call
         * @param put
         * @param select
         */
        *addLessee({ payload }, { call, put, select }) {
            const res = yield call(addLessee, { ...payload });
            if (res.data.resultCode === "ok") {
                message.info("创建成功！");
                if(payload.onSuccess) payload.onSuccess();
            } else {
                message.error(res.data.errMessage);
            }
        },
        /**
         * 修改租户
         *
         * @param call
         * @param put
         * @param select
         */
        *updateLessee({ payload }, { call, put, select }) {
            const res = yield call(updateLessee, payload);
            if (res.data.resultCode === "ok") {
                message.info("修改成功！");
                if (payload.onSuccess) payload.onSuccess();
            } else {
                message.error(res.data.errMessage);
            }
        },
        /**
         * 删除租户
         *
         * @param payload
         * @param call
         * @param put
         * @param select
         */
        *deleteLessee({ payload }, { call, put, select }) {
            const res = yield call(deleteLessee, { lesseeId: payload.lesseeId });
            if (res.data.resultCode === "ok") {
                message.info("删除成功！");

            } else {
                message.error(res.data.errMessage);
            }
        },
        /**
         * 更新状态
         *
         * @param payload
         * @param call
         * @param put
         * @param select
         */
        *updateStatus({ payload }, { call, put, select }) {
            const res = yield call(updateStatus, { lesseeId: payload.lesseeId, status: payload.status });
            if (res.data.resultCode === "ok") {
                message.info("修改成功！");
                if (payload.onSuccess) payload.onSuccess();
            } else {
                message.error(res.data.errMessage);
            }
        },
        /**
         * 获取租户信息
         *
         * @param payload
         * @param call
         * @param put
         * @param select
         */
        *getLessee({ payload }, { call, put, select }) {
            const res = yield call(getLessee, { lesseeId: payload.lesseeId });
            if (res.data.resultCode === "ok") {
                let content = res.data.content;
                let lessee = content.data.lessee;
                yield put({
                    type: 'refreshState',
                    payload: {
                        dataSource: lessee    
                    }
                });
            } else {
                message.error(res.data.errMessage);
            }
        },
        /**
         * 非分页查询市场采购资源-个体工商
         *
         * @param payload
         * @param call
         * @param put
         * @param select
         */
        *queryAllLesseeIndividual({}, { call, put, select }) {
            const res = yield call(queryAllLesseeIndividual, {});
            if (res.data.resultCode === "ok") {
                let content = res.data.content;
                yield put({
                    type: 'refreshState',
                    payload: {
                        individualList: content.data
                    }
                });
            } else {
                message.error(res.data.errMessage);
            }
        },
        /**
         * 获取单个租户市场采购资源-个体工商
         *
         * @param payload
         * @param call
         * @param put
         * @param select
         */
        *getLesseeResourceById({ payload }, { call, put, select }) {
            const res = yield call(getLesseeResourceById, { id: payload.id });
            if (res.data.resultCode === "ok") {
                yield put({
                    type: 'refreshState',
                    payload: {
                        lesseeResourse: res.data.content.data
                    }
                });
            } else {
                message.error(res.data.errMessage);
            }
        },

    },
};
