import request from '../../utils/request'


export async function queryAllLesseeResource(id) {
    return request(apiPath.authcenter + `/lesseeResource/${id}`, {
        method: 'get'
    });
}


export async function createLesseeResource(data) {
    return request(apiPath.authcenter + `/lesseeResource`, {
        method: 'post',
        data
    });
}


export async function updateLesseeResource(data) {
    return request(apiPath.authcenter + `/lesseeResource`, {
        method: 'put',
        data
    });
}


export async function delectLesseeResource(id) {
    return request(apiPath.authcenter + `/lesseeResource/${id}`, {
        method: 'delete'
    });
}

