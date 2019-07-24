import request from '../../utils/request';
import Constants from '../../../config/Constants.config';

/**
 * 查询租户列表
 *
 * @param lesseeCode
 * @param lesseeName
 * @param status
 * @param page
 * @returns {Promise.<Object>}
 */
export async function queryLessees({lesseeCode, lesseeName, status, page}) {
    return request(apiPath.authcenter + "/api/lessee/query", {
        method: 'get',
        data: {lesseeCode, lesseeNameCn: lesseeName, status, page: page.page, size: page.size, appCode: Constants.APP_CODE}
    });
}

export async function queryAllLessees() {
    return request(apiPath.authcenter+"/api/lessee/queryall",{
        method:'get',
        data: {appCode: Constants.APP_CODE}
    })
}

/**
 * 新增租户
 *
 * @param lesseeNameCn
 * @param lesseeNameEn
 * @param lesseeSimpleName
 * @param taxpayerCode
 * @param addressCn
 * @param addressEn
 * @param customsCode
 * @param phone
 * @param fax
 * @param postcode
 * @param lesseeCode
 * @returns {Promise.<Object>}
 */
export async function addLessee(data) {
    return request(apiPath.authcenter + "/api/lessee/create", {
        method: 'post',
        data
        // {
        //     lesseeNameCn,
        //     lesseeNameEn,
        //     lesseeSimpleName,
        //     taxpayerCode,
        //     addressCn,
        //     addressEn,
        //     customsCode,
        //     phone,
        //     fax,
        //     postcode,
        //     lesseeCode, openbank, openbankEn, revAccount, linkman, linkmanMobile,
        //     status,
        //     baseCity,
        //     appCode: Constants.APP_CODE
        // }
    });
}

/**
 * 修改租户
 *
 * @param lesseeId
 * @param lesseeNameCn
 * @param lesseeNameEn
 * @param lesseeSimpleName
 * @param taxpayerCode
 * @param addressCn
 * @param addressEn
 * @param customsCode
 * @param phone
 * @param fax
 * @param postcode
 * @param lesseeCode
 * @returns {Promise.<Object>}
 */
export async function updateLessee(data) {
    return request(apiPath.authcenter + "/api/lessee/update", {
        method: 'put',
        data
        // {
        //     lesseeId,
        //     lesseeNameCn,
        //     lesseeNameEn,
        //     lesseeSimpleName,
        //     taxpayerCode,
        //     addressCn,
        //     addressEn,
        //     customsCode,
        //     phone,
        //     fax,
        //     postcode,
        //     lesseeCode, openbank, openbankEn, revAccount, linkman, linkmanMobile,
        //     baseCity,
        //     status
        // }
    });
}

/**
 * 删除租户
 *
 * @param lesseeId
 * @returns {Promise.<Object>}
 */
export async function deleteLessee({lesseeId}) {
    return request(apiPath.authcenter + "/api/lessee/" + lesseeId + '/delete', {
        method: 'delete',
        data: {appCode: Constants.APP_CODE}
    });
}

/**
 * 获取租户信息
 *
 * @param lesseeId
 * @returns {Promise.<Object>}
 */
export async function getLessee({lesseeId}) {
    return request(apiPath.authcenter + "/api/lessee/" + lesseeId, {
        method: 'get'
    });
}

/**
 * 更新状态
 *
 * @param lesseeId
 * @param status
 * @returns {Promise.<Object>}
 */
export async function updateStatus({lesseeId, status}) {
    return request(apiPath.authcenter + "/api/lessee/updateStatus", {
        method: 'put',
        data: {lesseeId, status}
    });
}

/**
 * 非分页查询市场采购资源-个体工商
 *
 * @returns {Promise.<Object>}
 */
export async function queryAllLesseeIndividual({code}) {
    return request(apiPath.authcenter + "/api/lesseeResource/all", {
        method: 'get',
        data: {code}
    });
}

/**
 * 获取单个租户市场采购资源-个体工商
 *
 * @param id
 * @returns {Promise.<Object>}
 */
export async function getLesseeResourceById({id}) {
    return request(apiPath.authcenter + "/api/lesseeResource/" + id, {
        method: 'get'
    });
}

