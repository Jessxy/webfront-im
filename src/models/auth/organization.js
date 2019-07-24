import { queryLesseeOrganizations, addOrganization, updateOrganization, deleteOrganization } from '../../services/auth/organization';
import { message } from 'antd';

/**
 * 删除叶子节点children属性
 *
 * @param item
 */
function removeLeafChildren(item) {
    item.key = item.orgId;
    if (item.children.length === 0) {
        delete item.children;
    } else {
        item.children.map(temp => {
            removeLeafChildren(temp);
        });
    }
}

export default {
    namespace: 'organization',
    state: {
        page: {},
        list: []
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
         * 查询组织架构
         *
         * @param call
         * @param put
         * @param select
         */
        *queryOrganizations({ }, { call, put, select }) {
            const res = yield call(queryLesseeOrganizations);
            if (res.data.resultCode === "ok") {
                let list = res.data.content;

                list = list.map(item => {
                    removeLeafChildren(item);
                    return item;
                });

                yield put({
                    type: 'refreshState',
                    payload: { list }
                });
            }
        },
        /**
         * 添加组织
         *
         * @param call
         * @param put
         * @param select
         */
        *addOrganization({ payload }, { call, put, select }) {
            const res = yield call(addOrganization, { orgName: payload.orgName, orgDesc: payload.orgDesc, orgParentId: payload.orgParentId });
            if (res.data.resultCode === "ok") {
                message.info("组织机构创建成功！");
                if (payload.onSuccess) payload.onSuccess();
            } else {
                message.error(res.data.errMessage);
            }
        },
        /**
         * 修改组织
         *
         * @param call
         * @param put
         * @param select
         */
        *updateOrganization({ payload }, { call, put, select }) {
            const res = yield call(updateOrganization, { orgId: payload.orgId, orgName: payload.orgName, orgDesc: payload.orgDesc, orgParentId: payload.orgParentId });
            if (res.data.resultCode === "ok") {
                message.info("组织机构修改成功！");
                if (payload.onSuccess) payload.onSuccess();
            } else {
                message.error(res.data.errMessage);
            }
        },
        /**
         * 删除组织
         *
         * @param payload
         * @param call
         * @param put
         * @param select
         */
        *deleteOrganization({ payload }, { call, put, select }) {
            const res = yield call(deleteOrganization, { orgId: payload.orgId });
            if (res.data.resultCode === "ok") {
                message.info("组织机构删除成功！");
                if (payload.onSuccess) payload.onSuccess();
            } else {
                message.error(res.data.errMessage);
            }
        },
    }
};
