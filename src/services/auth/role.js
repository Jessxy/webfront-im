import request from '../../utils/request';
import Constants from '../../../config/Constants.config';

/**
 * 查询角色列表
 *
 * @param roleName
 * @param desc
 * @param page
 */
export async function queryRoleList({ roleName, desc, page }) {
    return request(apiPath.authcenter + "/api/role/query", {
        method: 'get',
        data: { roleName, desc, page: page.page, size: page.size, appCode: Constants.APPCODE }
    });
}

/**
 * 获取角色
 *
 * @param roleId
 * @returns {Promise.<Object>}
 */
export async function getRole({ roleId }) {
    return request(apiPath.authcenter + "/api/role/" + roleId, {
        method: 'get',
        data: { appCode: Constants.APPCODE }
    });
}

/**
 * 创建角色
 *
 */
export async function addRole({ roleName, desc }) {
    return request(apiPath.authcenter + "/api/role/create", {
        method: 'post',
        data: { roleName, roleType: roleName, desc, appCode: Constants.APPCODE }
    });
}

/**
 * 配置角色对应的菜单
 *
 * @param roleId
 * @param menuIds
 */
export async function configRoleMenu({ roleId, menuIds }) {
    return request(apiPath.authcenter + "/api/role/" + roleId + "/menu", {
        method: 'post',
        data: { menuIds }
    });
}

/**
 * 配置角色对应的权限
 *
 * @param roleId
 * @param rightsIds
 * @returns {Promise.<Object>}
 */
export async function configRoleRights({ roleId, rightsIds }) {
    return request(apiPath.authcenter + "/api/role/" + roleId + "/rights", {
        method: 'post',
        data: { rightsIds }
    });
}

/**
 * 更新角色
 *
 * @param roleId
 * @param lesseeCode
 * @param roleName
 * @param roleType
 * @param desc
 * @returns {Promise.<Object>}
 */
export async function updateRole({ roleId, roleName, roleType, desc }) {
    return request(apiPath.authcenter + "/api/role/update", {
        method: 'put',
        data: { roleId, roleName, roleType: roleName, desc, appCode: Constants.APPCODE }
    });
}

/**
 * 删除角色
 *
 * @param roleId
 */
export async function deleteRole({ roleId }) {
    return request(apiPath.authcenter + "/api/role/" + roleId + "/delete", {
        method: 'delete',
    });
}

/**
 * 查询所有角色列表
 *
 * @returns {Promise.<Object>}
 */
export async function queryAllRoleList() {
    return request(apiPath.authcenter + "/api/role/all", {
        method: 'get',
        data: { appCode: Constants.APPCODE }
    });
}

/**
 * 查询角色菜单列表
 *
 * @param lesseeCode
 * @param roleName
 * @param page
 * @returns {Promise.<Object>}
 */
export async function queryRoleMenus({ id, appCode }) {
    return request(apiPath.authcenter + "/api/role/" + id + "/menu", {
        method: 'get',
        data: { appCode }
    });
}

/**
 * 查询角色菜单列表
 *
 */
export async function queryRoleMenuTree({ id }) {
    return request(apiPath.authcenter + "/api/role/" + id + "/menuTree", {
        method: 'get',
    });
}
