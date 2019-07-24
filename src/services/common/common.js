import request from '../../utils/request';
import Constants from '../../../config/Constants.config';

/**
 * 获取菜单集合
 *
 * @param params
 * @returns {Promise.<Object>}
 */
export async function getMenus() {
    return request(apiPath.authcenter + "/api/user/menus", {
        method: 'get',
    });
}

/**
 * 登录
 *
 * @param loginId
 * @param password
 * @param verifyCode
 * @returns {Promise.<Object>}
 */
export async function login({ loginId, password, verifyCode }) {
    return request(apiPath.authcenter + "/api/login", {
        method: 'post',
        data: { loginId, password, verifyCode, appCode: Constants.APPCODE }
    });
}

/**
 * 退出登录
 *
 * @returns {Promise.<Object>}
 */
export async function logout() {
    return request(apiPath.authcenter + "/api/logout", {
        method: 'post'
    });
}

/**
 * 修改密码
 *
 * @returns {Promise.<Object>}
 */
export async function modifyPassword({oldPwd, newPwd}) {
    return request(apiPath.authcenter + "/api/user/modifyPassword", {
        method: 'put',
        data: { oldPwd, newPwd }
    });
}
