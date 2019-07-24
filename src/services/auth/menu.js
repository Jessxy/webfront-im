import request from '../../utils/request'

/**
 * 查询菜单列表
 *
 * @param resType
 *  treeJSON: 返回树形结构
 * @param appCode
 * @param menuName
 * @param parentMenuName
 * @param status
 * @param page
 * @returns {Promise.<Object>}
 */
export async function queryMenus({ resType, menuName, status, page, appCode }) {
    return request(apiPath.authcenter + "/api/menus", {
        method: 'get',
        data: { resType, menuName, status, page: page.page, size: page.size, appCode }
    });
}

export async function queryMenusTreeJSON({ resType, appCode }) {
    return request(apiPath.authcenter + "/api/menus", {
        method: 'get',
        data: { resType, appCode}
    });
}

export async function queryFirstLevelMenus({appCode}) {
    return request(apiPath.authcenter + "/api/menus/getFirstLevelMenus", {
        method: 'get',
        data: { appCode }
    });
}

/**
 * 获取菜单
 *
 * @param menuId
 * @returns {Promise.<Object>}
 */
export async function getMenu({ menuId }) {
    return request(apiPath.authcenter + "/api/menus/" + menuId, {
        method: 'get'
    });
}

/**
 * 创建菜单
 *
 * @param appCode
 * @param menuValue
 * @param menuName
 * @param status
 * @returns {Promise.<Object>}
 */
export async function addMenu({ appCode, menuName, parentMenuId, icon, url, weight, status }) {
    return request(apiPath.authcenter + "/api/menus", {
        method: 'post',
        data: { appCode, menuName, parentMenuId, icon, url, weight, status }
    });
}


/**
 * 配置菜单和权限关系
 *
 * @param rightsIds
 * @returns {Promise.<Object>}
 */
export async function configMenuRights({menuId, rightsIds}) {
    return request(apiPath.authcenter + "/api/menus/"+menuId+"/rights", {
        method: 'post',
        data: {rightsIds}
    });
}

/**
 * 更新菜单
 *
 * @param menuId
 * @param appCode
 * @param menuValue
 * @param menuName
 * @param status
 * @returns {Promise.<Object>}
 */
export async function updateMenu({ menuId, appCode, menuName, parentMenuId, icon, url, weight, status }) {
    return request(apiPath.authcenter + "/api/menus", {
        method: 'put',
        data: { menuId, appCode, parentMenuId, icon, url, weight, menuName, status }
    });
}

/**
 * 更新菜单状态
 *
 * @param menuId
 * @param status
 * @returns {Promise.<Object>}
 */
export async function updateMenuStatus({ menuId, status }) {
    return request(apiPath.authcenter + "/api/menuStatus", {
        method: 'put',
        data: { menuId, status }
    });
}

/**
 * 删除菜单
 *
 * @param menuId
 * @returns {Promise.<Object>}
 */
export async function deleteMenu({ menuId }) {
    return request(apiPath.authcenter + "/api/menus/" + menuId, {
        method: 'delete'
    });
}

/**
 * 查询菜单权限列表
 *
 * @returns {Promise.<Object>}
 */
export async function queryMenuRights({ menuId}) {
    return request(apiPath.authcenter + "/api/menus/" + menuId + "/rights", {
        method: 'get'
    });
}