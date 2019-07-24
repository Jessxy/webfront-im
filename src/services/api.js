import { stringify } from 'qs';
import request from '@/utils/request';
import { apiPath,mockiMitateData,loginPath} from '../../config/web.domain.config';

export async function fakeAccountLogin(params) {
  return request(`${loginPath}/api/login`, {
    method: 'POST',
    data: params,
  });
}

export async function queryProjectNotice() {
  return request(`${mockiMitateData}/api/project/notice`);
}

export async function queryActivities() {
  return request(`${mockiMitateData}/api/activities`);
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request(`/api/rule`, {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params = {}) {
  return request(`/api/rule?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function queryArticle(params) {
  return request(`/api/article?${stringify(params)}`);
}

export async function queryUser(params) {
  return request(`/api/users?${stringify(params)}`);
}

export async function removeArticle(params) {
  return request('/api/article', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addArticle(params) {
  return request('/api/article', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateArticle(params = {}) {
  return request(`/api/article?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}

export async function fakeChartData() {
  return request(`${mockiMitateData}/api/fake_chart_data`);
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile(id) {
  return request(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`${mockiMitateData}/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'update',
    },
  });
}


export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    data: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}
