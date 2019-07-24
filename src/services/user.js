import request from '@/utils/request';
import { apiPath,mockiMitateData } from '../../config/web.domain.config';

export async function query() {
  return request(`${mockiMitateData}/api/users`);
}

export async function queryCurrent() {
  return request(`${mockiMitateData}/api/currentUser`);
}
