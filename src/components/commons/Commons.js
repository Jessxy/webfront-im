/**
 * Created by liuzengrong on 2017/9/17.
 */
import Constants from '../../../config/Constants.config';
import { message } from 'antd';

const R = require('ramda');

export function formatAmt() {

}

export function formatMobile(mobile) {
  var reg = /^[0-9]{11,20}$/;
  if (reg.exec(mobile)) {
    return mobile.substring(0, 3) + '-' + mobile.substring(3, 7) + '-' + mobile.substring(7, 11)
  }
  return mobile;
}

export function download(url, conditions){
  let conditionsStr = "";
  let _url = url;
  for (let p in conditions){
    conditionsStr += (p + "=" + conditions[p] + "&");
  }
  conditionsStr += Constants.ACJSESSIONID + "=" + sessionStorage.getItem(Constants.ACJSESSIONID);
  if(conditionsStr !== "") _url += ("?" + conditionsStr);
  message.info("请耐心等待下载...");
  window.location.href=_url;
}




export function downloadFile(type, url){
  if(!R.isEmpty(url) && !R.isEmpty(type) && !R.isNil(url) && !R.isNil(type)){
    url = apiPath.zbtie + url;
    let fileList = [];
    if(!R.isNil(url) && !R.isEmpty(url)){

      let fileName = encodeURI(encodeURI(url.substring(url.lastIndexOf('/') + 1, url.length)));
      let fileUrl = apiPath.zbtie + "/api/file/" + type +"/download?fileName=" + fileName

      let dowUrl = fileUrl +"&" + Constants.ACJSESSIONID + "=" + sessionStorage.getItem(Constants.ACJSESSIONID);
      window.location.href=  dowUrl;
    }
  }

}

export function convertOrganizations(node) {
  let newNode = {
    label: node.orgName,
    value: node.orgId,
    key: node.orgId+"",
    children: node.children && node.children.length > 0 ? node.children.map(treeNode => convertOrganizations(treeNode)) : []
  };
  return newNode;
};
