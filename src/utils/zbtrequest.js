const Ajax = require('robe-ajax');
import Constants from '../../config/Constants.config';

import { notification } from 'antd';

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

let errCount = 0;

export default function request(url, options) {
    options.data = {...options.data, _channelType: 'ajax'};
    let res = {
        url: url,
        method: 'get',
        data: {},
        dataType: 'JSON',
        headers: {[Constants.ACJSESSIONID]: sessionStorage.getItem(Constants.ACJSESSIONID)},
        traditional: true,
        xhrFields: {
            withCredentials: true
        },
        ...options
    };
    return Ajax.ajax(res).then(data => {
        if (data.resultCode === "SESSION_ERROR" && errCount == 0) {
            errCount++;
            notification.error({
                message: data.resultCode,
                description: data.errMessage+"3秒后自动返回登录页",
                duration: 2,
                onClose: () => {
                    errCount = 0;
                }
            });
            setTimeout(() => {
                window.location.href = "/login"
            }, 2000)
        }

        return {data};
    }).catch(err => ({err}));
}


export function requestString(url, options) {
    options.data[Constants.CHANNELTYPE] = Constants.AJAX;
    let res = {
        url: url,
        method: 'get',
        data: "",
        contentType: "application/json",
        dataType: 'JSON',
        headers: {[Constants.ACJSESSIONID]: sessionStorage.getItem(Constants.ACJSESSIONID)},
        xhrFields: {
            withCredentials: true
        },
        ...options
    };
    res.data = JSON.stringify(options.data);
    return Ajax.ajax(res).then(data => {
        if (data.resultCode === "SESSION_ERROR" && errCount == 0) {
            errCount++;
            notification.error({
                message: data.resultCode,
                description: data.errMessage+"3秒后自动返回登录页",
                duration: 2,
                onClose: () => {
                    errCount = 0;
                }
            });
            setTimeout(() => {
                window.location.href = "/login"
            }, 2000)
        }

        return {data};
    }).catch(err => ({err}));
}
