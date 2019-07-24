import { queryRoleList, getRole, addRole, configRoleMenu, configRoleRights, updateRole, deleteRole, queryAllRoleList, queryRoleMenus, queryRoleMenuTree } from '../../services/auth/role';

import { message } from 'antd';
import Constants from '../../../config/Constants.config';
const R = require('ramda');

function convertMenu(menu) {
    if (menu.children && menu.children.length > 0) {
        return menu.children.map(menu => {
            return { title: menu.menuName, key: menu.menuId + "", children: convertMenu(menu) };
        })
    }
    return [];
}

export default {
    namespace: 'role',
    state: {
        page: {},
        list: [],
        dataSource: {},
        roleMenuTree: [],
        allRoles: []
    },
    reducers: {
        /**
         * 刷新state
         *
         */
        refreshState(state, { payload }) {
            return { ...state, ...payload };
        },

        /**
         * 设置所有角色数据列表
         *
         * @param state
         * @param action
         */
        setAllRoleList(state, { payload }) {
            return {...state, allRoles: payload.allRoles}
        }
    },
    effects: {
        /**
         * 删除角色
         *
         * @param payload
         * @param call
         * @param put
         * @param select
         */
        *deleteRole({ payload }, { call, put, select }) {
            const res = yield call(deleteRole, { ...payload });
            if (res.data.resultCode === "ok") {
                message.info("删除成功！");
                if (payload.onSuccess) payload.onSuccess();
            } else {
                message.error(res.data.errMessage);
            }
        },
        /**
         * 添加角色
         *
         * @param call
         * @param put
         * @param select
         */
        *addRole({ payload }, { call, put, select }) {
            const res = yield call(addRole, { ...payload });
            if (res.data.resultCode === "ok") {
                message.info("角色新增成功！");
                if (payload.onSuccess) payload.onSuccess();
            } else {
                message.error(res.data.errMessage);
            }
        },
        /**
         * 配置角色与菜单的对应关系
         *
         * @param call
         * @param put
         * @param select
         */
        *configRoleMenu({ payload }, { call, put, select }) {
            const res = yield call(configRoleMenu, { roleId: payload.roleId, menuIds: payload.menuIds });
            if (res.data.resultCode === "ok") {
                message.info("角色配置菜单成功！");
                if (payload.onSuccess) payload.onSuccess();
            } else {
                message.error(res.data.errMessage);
            }
        },
        /**
         * 配置角色与权限的对应关系
         *
         * @param call
         * @param put
         * @param select
         */
        *configRoleRights({ payload }, { call, put, select }) {
            //let rightsIds = payload.rightsIds.map((item) => parseInt(item));
            const res = yield call(configRoleRights, { ...payload });
            if (res.data.resultCode === "ok") {
                message.info("角色配置权限成功！");
                if (payload.onSuccess) payload.onSuccess();
            } else {
                message.error(res.data.errMessage);
            }
        },
        /**
         * 修改角色
         *
         * @param payload
         * @param call
         * @param put
         * @param select
         */
        *updateRole({ payload }, { call, put, select }) {
            const res = yield call(updateRole, { ...payload });
            if (res.data.resultCode === "ok") {
                message.info("角色更新成功！");
                if (payload.onSuccess) payload.onSuccess();
            } else {
                message.error(res.data.errMessage);
            }
        },
        /**
         * 分页查询角色集合
         *
         * @param call
         * @param put
         * @param select
         */
        *queryRoleList({ payload }, { call, put, select }) {
            const res = yield call(queryRoleList, { ...payload });
            if (res.data.resultCode === "ok") {
                yield put({
                    type: 'refreshState',
                    payload: {
                        ...res.data.content
                    }
                });
            } else {
                message.error(res.data.errMessage);
            }
        },

        /**
         * 获取角色
         *
         */
        *getRole({ payload }, { call, put }) {
            if (payload.roleId) {
                const res = yield call(getRole, { ...payload });
                if (res.data.resultCode === "ok") {
                    yield put({
                        type: 'refreshState',
                        payload: {
                            dataSource: res.data.content
                        }
                    });
                } else {
                    message.error(res.data.errMessage);
                }
            } else {
                yield put({
                    type: 'refreshState',
                    payload: {
                        dataSource: {}
                    }
                });
            }
        },
        /**
         * 查询所有角色集合
         *
         * @param call
         * @param put
         * @param select
         */
        *queryAllRoleList({}, { call, put, select }) {
            const res = yield call(queryAllRoleList);
            if (res.data.resultCode === "ok") {
                let content = res.data.content;
                yield put({
                    type: 'setAllRoleList',
                    payload: {
                        allRoles: R.isNil(content) ? [] : content,
                    }
                });
            }
        },
        /**
         * 查询角色菜单集合
         *
         * @param call
         * @param put
         * @param select
         */
        *queryRoleMenus({ payload }, { call, put, select }) {
            const res = yield call(queryRoleMenus, { ...payload, appCode: Constants.APP_CODE });
            if (res.data.resultCode === "ok") {
                let content = res.data.content;
                let roleMenus = [];
                content.map((item) => roleMenus.push(item.menuId + ""))
                if (payload.onSuccess) payload.onSuccess(roleMenus);
            } else {
                message.error(res.data.errMessage);
            }
        },
        /**
         * 查询角色配置权限时已选的菜单树
         *
         * @param call
         * @param put
         * @param select
         */
        *queryRoleMenuTree({ payload }, { call, put, select }) {
            const res = yield call(queryRoleMenuTree, { ...payload });
            if (res.data.resultCode === "ok") {
                let content = res.data.content;
                yield put({
                    type: 'refreshState',
                    payload: {
                        roleMenuTree: content.map(menu => {
                            return { title: menu.menuName, key: menu.menuId + "", children: convertMenu(menu) };
                        })
                    }
                });
            } else {
                message.error(res.data.errMessage);
            }
        },
    }
};
