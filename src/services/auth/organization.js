import request from '../../utils/request'

/**
 * 查询租户组织机构
 *
 * @returns {Promise.<void>}
 */
export async function queryLesseeOrganizations() {
    return request(apiPath.authcenter + "/api/lessee/organization/query", {
        method: 'get',
        data: {}
    });
}

/**
 * 创建组织
 *
 * @param orgName
 * @param orgDesc
 * @param orgParentId
 * @returns {Promise.<void>}
 */
export async function addOrganization({ orgName, orgDesc, orgParentId }) {
    return request(apiPath.authcenter + "/api/lessee/organization/create", {
        method: 'post',
        data: { orgName, orgDesc, orgParentId }
    });
}

/**
 * 修改组织
 *
 * @param orgId
 * @param orgName
 * @param orgDesc
 * @param orgParentId
 * @returns {Promise.<void>}
 */
export async function updateOrganization({ orgId, orgName, orgDesc, orgParentId }) {
    return request(apiPath.authcenter + "/api/lessee/organization/update", {
        method: 'put',
        data: { orgId, orgName, orgDesc, orgParentId }
    });
}

/**
 * 删除组织
 *
 * @param orgId
 * @returns {Promise.<void>}
 */
export async function deleteOrganization({ orgId }) {
    return request(apiPath.authcenter + "/api/lessee/organization/" + orgId + "/delete", {
        method: 'delete',
        data: { orgId }
    });
}