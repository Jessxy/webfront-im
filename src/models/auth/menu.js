import { queryMenus, queryMenusTreeJSON, getMenu, addMenu, configMenuRights, updateMenu, updateMenuStatus, deleteMenu, queryMenuRights, queryFirstLevelMenus } from "../../services/auth/menu";

import { message } from "antd";
import Constants from '../../../config/Constants.config';
const R = require('ramda');

function convertMenu(menu) {
    if (menu.children.length > 0) {
        return menu.children.map(menu => {
            return { title: menu.menuName, key: menu.menuId + "", children: convertMenu(menu) };
        })
    }
    return [];
}

export default {
    namespace: 'authMenu',
    state: {
        page: {},
        list: [],
        pMenus: [],
        menuRightIds: [],
        menuRights: [],
        dataSource: {},
        menuTree: []
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
         * 分页查询菜单集合
         *
         * @param call
         * @param put
         * @param select
         */
        *queryMenuList({ payload }, { call, put, select }) {
            const res = yield call(queryMenus, { ...payload, appCode: Constants.APPCODE });
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
        *queryFirstLevelMenus({ }, { call, put, select }) {
            const res = yield call(queryFirstLevelMenus, { appCode: Constants.APPCODE });
            if (res.data.resultCode === "ok") {
                yield put({
                    type: 'refreshState',
                    payload: {
                        pMenus: res.data.content
                    }
                });
            } else {
                message.error(res.data.errMessage);
            }
        },
        /**
         * 角色配置菜单，菜单树资源
         *
         */
        *queryParentMenuList({ }, { call, put, select }) {
            const res = yield call(queryMenusTreeJSON, { resType: "treeJSON", appCode: Constants.APPCODE });
            if (res.data.resultCode === "ok") {
                let content = res.data.content;
                yield put({
                    type: 'refreshState',
                    payload: {
                        menuTree: content.map(menu => {
                            return { title: menu.menuName, key: menu.menuId + "", children: convertMenu(menu) };
                        })
                    }
                });
            } else {
                message.error(res.data.errMessage);
            }
        },
        /**
         * 添加菜单
         *
         * @param call
         * @param put
         * @param select
         */
        *addMenu({ payload }, { call, put, select }) {
            const res = yield call(addMenu, { appCode: Constants.APPCODE, menuName: payload.menuName, parentMenuId: payload.parentMenuId, icon: payload.icon, url: payload.url, weight: payload.weight, status: payload.status });
            if (res.data.resultCode === "ok") {
                message.info("创建成功！");
                if (payload.onSuccess) payload.onSuccess();
            } else {
                message.error(res.data.errMessage);
            }
        },
        /**
         * 配置菜单对应的权限
         *
         * @param call
         * @param put
         * @param select
         */
        *configMenuRights({ payload }, { call, put, select }) {
            const res = yield call(configMenuRights, { menuId: payload.menuId, rightsIds: payload.rightsIds });
            if (res.data.resultCode === "ok") {
                message.info("配置菜单权限成功！");
                if (payload.onSuccess) payload.onSuccess();
            } else {
                message.error(res.data.errMessage);
            }
        },
        /**
         * 修改菜单
         *
         * @param call
         * @param put
         * @param select
         */
        *updateMenu({ payload }, { call, put, select }) {
            const res = yield call(updateMenu, { menuId: payload.menuId, appCode: Constants.APPCODE, menuName: payload.menuName, parentMenuId: payload.parentMenuId, icon: payload.icon, url: payload.url, weight: payload.weight, status: payload.status });
            if (res.data.resultCode === "ok") {
                message.info("菜单更新成功！");
                if (payload.onSuccess) payload.onSuccess();
            } else {
                message.error(res.data.errMessage);
            }
        },
        /**
         * 更新菜单状态
         *
         * @param payload
         * @param call
         * @param put
         * @param select
         */
        *updateMenuStatus({ payload }, { call, put, select }) {
            const res = yield call(updateMenuStatus, { menuId: payload.menuId, status: payload.status });
            if (res.data.resultCode === "ok") {
                message.info("修改成功！");
                if (payload.onSuccess) payload.onSuccess();
            } else {
                message.error(res.data.errMessage);
            }
        },
        /**
         * 获取菜单
         *
         * @param payload
         * @param call
         * @param put
         */
        *getMenu({ payload }, { call, put }) {
            if (payload.menuId) {
                const res = yield call(getMenu, { menuId: payload.menuId });
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
         * 查询菜单已选权限
         *
         */
        *queryMenuRights({ payload }, { call, put, select }) {
            const res = yield call(queryMenuRights, { ...payload });
            if (res.data.resultCode === "ok") {
                let menuRightIds = [];
                let menuRights = [];
                let content = res.data.content;
                content && content.map((item) => menuRightIds.push(item.rightsId));
                yield put({
                    type: 'refreshState',
                    payload: { menuRightIds, menuRights: content }
                });
                if (payload.onSuccess) payload.onSuccess();
            } else {
                message.error(res.data.errMessage);
            }
        },
    }
};
