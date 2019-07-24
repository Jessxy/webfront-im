import request from '../../utils/request'

/**
 * 查询所有应用列表
 *
 * @param appCode
 * @returns {Promise.<Object>}
 */
export async function queryAllApps() {
    return request(apiPath.authcenter + "/api/apps", {
        method: 'get'
    });
}
