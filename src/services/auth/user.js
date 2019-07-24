import request from '../../utils/zbtrequest'
import Constants from '../../../config/Constants.config';
import {apiPath} from '../../../config/web.domain.config';

/**
 * 查询用户列表
 *
 * @param lesseeCode
 * @param userName
 * @param page
 * @returns {Promise.<Object>}
 */
export async function queryUserList({ lesseeCode, username, loginId, page }) {
    return request(apiPath.authcenter + "/api/user/query", {
        method: 'get',
        data: { appCode: Constants.APP_CODE, lesseeCode, username, loginId, page: page.page, size: page.size }
    });
}

/**
 * 获取用户
 *
 * @param userId
 * @returns {Promise.<Object>}
 */
export async function getUser({ userId }) {
    return request(apiPath.authcenter + "/api/user/" + userId, {
        method: 'get',
        data:{appCode: Constants.APP_CODE}
    });
}
/**
 * 获取当前用户
 *
 * @param userId
 * @returns {Promise.<Object>}
 */
export async function getUserInfo() {
    return request(apiPath.authcenter + "/api/user/info", {
        method: 'get',
        data:{appCode: Constants.APP_CODE}
    });
}

/**
 * 创建用户
 *
 * @param username
 * @param loginId
 * @param loginPwd
 * @param mobile
 * @param email
 * @returns {Promise.<void>}
 */
export async function addUser({ username, loginId, loginPwd, mobile, email, orgIds, roleIds, appCode }) {
    return request(apiPath.authcenter + "/api/user/create", {
        method: 'post',
        data: { username, loginId, loginPwd, mobile, email, orgIds, roleIds, appCode: Constants.APP_CODE }
    });
}

/**
 * 注册用户
 */
export async function register({username, loginId, loginPwd, mobile, email,lesseeCode, appCode}) {
    return request(apiPath.authcenter+"/api/user/register",{
        method:'post',
        data:{username, loginId, loginPwd, mobile, email,lesseeCode, appCode: Constants.APP_CODE}
    })
}


/**
 * 配置用户对应的角色
 *
 * @param userId
 * @param roleIds
 * @returns {Promise.<void>}
 */
export async function configUserRole({ userId, roleIds }) {
    return request(apiPath.authcenter + "/api/user/"+userId+"/roles", {
        method: 'post',
        data: {roleIds, appCode: Constants.APP_CODE}
    });
}

/**
 * 更新用户
 *
 * @param userId
 * @param username
 * @param loginId
 * @param mobile
 * @param email
 * @returns {Promise.<void>}
 */
export async function updateUser( data ) {
    return request(apiPath.authcenter + "/api/user/update", {
        method: 'put',
        data: { ...data, appCode: Constants.APP_CODE }
    });
}

/**
 * 重置密码
 *
 * @param userId
 * @param loginPwd
 * @returns {Promise.<void>}
 */
export async function resetPassword({ userId, loginPwd, appCode }) {
    return request(apiPath.authcenter + "/api/user/resetPassword", {
        method: 'put',
        data: { userId, loginPwd, appCode: Constants.APP_CODE }
    });
}



/**
 * 删除用户
 *
 * @param userId
 * @returns {Promise.<Object>}
 */
export async function deleteUser({ userId }) {
    return request(apiPath.authcenter + "/api/user/" + userId + "/delete/" + Constants.APP_CODE, {
        method: 'delete'
    });
}

/**
 * 获取管理人员
 *          风控经理
 *          业务经理
 *          跟单经理
 *          通关经理
 *
 * @param userId
 * @returns {Promise.<void>}
 */
export async function getManagerList() {
    return request(apiPath.authcenter + "/api/user/manager/", {
        method: 'get'
    });
}

/**
 * 跨系统角色一览
 */
export async function queryAppRoles(data) {
    return request(apiPath.authcenter + "/api/user/" + data.userId + "/approle", {
        method: 'get'
    });
}
