import request from '../../utils/request'
import Constants from '../../../config/Constants.config';

/**
 * 查询租户账号列表
 * @param bankId
 * @param bankCode
 * @param tenantId
 * @param currency
 * @param page
 */
export async function getLesseesAccount({bankId, bankCode, tenantId, currency, page}) {
    return request(apiPath.authcenter + "/api/lesseeAccount/query", {
        method: 'get',
        data: {bankId, bankCode, tenantId, currency, page: page.page, size: page.size}
    });
}

/**
 * 新增租户账号
 * @param bankId
 * @param bankCode
 * @param currency
 * @param mainAccountFlag
 * @param bankNameEn
 */
export async function addLesseeAccount({bankId, bankCode, currency, mainAccountFlag, bankNameEn, branchName, addressEn, swiftCode}) {
    return request(apiPath.authcenter + "/api/lesseeAccount/create", {
        method: 'post',
        data: {
            bankId, bankCode, currency, mainAccountFlag, bankNameEn, branchName, addressEn, swiftCode
        }
    });
}

/**
 * 修改租户账号
 * @param id
 * @param bankId
 * @param bankCode
 * @param currency
 * @param mainAccountFlag
 * @param bankNameEn
 */
export async function updateLesseeAccount({id, bankId, bankCode, currency, mainAccountFlag, bankNameEn, branchName, addressEn, swiftCode}) {
    return request(apiPath.authcenter + "/api/lesseeAccount/update", {
        method: 'put',
        data: {
            id, bankId, bankCode, currency, mainAccountFlag, bankNameEn, branchName, addressEn, swiftCode
        }
    });
}

/**
 * 删除租户账号
 *
 * @param id
 * @returns {Promise.<Object>}
 */
export async function deleteById({id}) {
    return request(apiPath.authcenter + "/api/lesseeAccount/delete/" + id, {
        method: 'delete'
    });
}

/**
 * 获取租户账号信息账号
 *
 * @param id
 * @returns {Promise.<Object>}
 */
export async function getLesseeById({id}) {
    return request(apiPath.authcenter + "/api/lesseeAccount/" + id, {
        method: 'get',
        data: {appCode: Constants.APPCODE}
    });
}

/**
 * 查询租户账号列表
 */
export async function getAccount() {
    return request(apiPath.authcenter + "/api/lesseeAccount", {
        method: 'get',
    });
}

