import request from '../../utils/request'
import Constants from '../../../config/Constants.config';

/**
 * 查询权限列表
 *
 * @param appCode
 * @param rightsValue
 * @param status
 * @param page
 * @returns {Promise.<Object>}
 */
export async function queryRightsList({ appCode, rightsValue, status, page }) {
    return request(apiPath.authcenter + "/api/rights", {
        method: 'get',
        data: { appCode: Constants.APP_CODE, rightsValue, status, page: page.page, size: page.size }
    });
}

/**
 * 获取权限
 *
 * @param rightsId
 * @returns {Promise.<Object>}
 */
export async function getRights({ rightsId }) {
    return request(apiPath.authcenter + "/api/rights/" + rightsId, {
        method: 'get'
    });
}

/**
 * 创建权限
 *
 * @param appCode
 * @param rightsValue
 * @param rightsName
 * @param status
 * @returns {Promise.<Object>}
 */
export async function addRights({ appCode, rightsValue, rightsName, status }) {
    return request(apiPath.authcenter + "/api/rights", {
        method: 'post',
        data: { appCode: Constants.APP_CODE, rightsValue, rightsName, status }
    });
}

/**
 * 更新权限
 *
 * @param rightsId
 * @param appCode
 * @param rightsValue
 * @param rightsName
 * @param status
 * @returns {Promise.<Object>}
 */
export async function updateRights({ rightsId, appCode, rightsValue, rightsName, status }) {
    return request(apiPath.authcenter + "/api/rights", {
        method: 'put',
        data: { rightsId, appCode: Constants.APP_CODE, rightsValue, rightsName, status }
    });
}


/**
 *更新权限状态
 *
 * @param rightsId
 * @param status
 */
export async function updataRightStatus({ rightsId, status }){
    return request(apiPath.authcenter + "/api/rightsStatus",{
        method: 'put',
        data: { rightsId, status }
    })
}


/**
 * 删除权限
 *
 * @param rightsId
 * @returns {Promise.<Object>}
 */
export async function deleteRights({ rightsId }) {
    return request(apiPath.authcenter + "/api/rights/" + rightsId, {
        method: 'delete'
    });
}

/**
 * 查询权限列表
 *
 * @returns {Promise.<Object>}
 */
export async function queryAllRights({ appCode }) {
    return request(apiPath.authcenter + "/api/rights/all", {
        method: 'get',
        data: { appCode }
    });
}

/**
 * 查询角色权限列表
 *
 * @returns {Promise.<Object>}
 */
export async function queryRoleRights({ id }) {
    return request(apiPath.authcenter + "/api/role/" + id + "/rights", {
        method: 'get'
    });
}
