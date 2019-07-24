import React from 'react';
import { connect } from 'dva';
import { Link, browserHistory } from 'dva/router';
import { Upload, Icon, message } from 'antd';
const R = require('ramda');
import Constants from '../../../config/Constants.config';

const defaultDownActionPre = apiPath.zbtie + "/api/file/";
const defaultDownActionSuf = "/download?fileName=";
const defaultActionPre = apiPath.zbtie + "/api/file/batch/";
const defaultActionSuf = "/upload";
const defaultMaxFileSize = 20;//(M)
const defaultMaxLengthFileName = 40;
export default class SingleDragger extends React.Component {
    constructor(props) {
        super(props);
        this.initFileList(props.url, true);
    }

    componentWillReceiveProps(nextProps) {
        if (!R.equals(this.props.dataSource)(nextProps.dataSource)) {
            this.initFileList(nextProps.url);
        }
    }

    getUrl = () => {
        return this.state.dbUrl;
    }

    parseUrl = (url) => {
        let fileName = encodeURI(encodeURI(url.substring(url.lastIndexOf('/') + 1, url.length)));
        let modules = R.isNil(this.props.module) ? Constants.FILE_MODULE[0] : this.props.module;
        return defaultDownActionPre + modules + defaultDownActionSuf + fileName + "&" + Constants.ACJSESSIONID + "=" + sessionStorage.getItem(Constants.ACJSESSIONID);
    }

    initFileList = (url, flag) => {
        let fileList = [];
        if (!R.isNil(url) && !R.isEmpty(url)) {
            let file = {};
            file.uid = new Date().getTime() * -1;
            file.name = url.substring(url.lastIndexOf('/') + 1, url.length);
            file.status = "done";
            file.url = this.parseUrl(url);
            fileList.push(file);
        };
        if(flag) this.state = { fileList, dbUrl: url, defaultFileList: fileList, defaultDbUrl: url};
        else this.setState({fileList, dbUrl: url, defaultFileList: fileList, defaultDbUrl: url});
    }

    resetUpload = () => {
        this.setState({fileList: this.state.defaultFileList, url: this.state.defaultDbUrl,dbUrl:this.state.defaultDbUrl});
    }

    beforeUpload = (file) => {
        const isLtMax = file.size / 1024 / 1024 < defaultMaxFileSize;
        let validateFileType = R.contains(file.name.substr(file.name.lastIndexOf('.') + 1).toLocaleLowerCase(), Constants.ACCEPTFILETYPES);
        let fileNameLength = file.name.substr(0, file.name.lastIndexOf('.')).length <= defaultMaxLengthFileName;
        if(!fileNameLength) message.error("文件名长度不允许超过" + defaultMaxLengthFileName + "位！");
        if (!isLtMax) message.error(`文件大小超过${defaultMaxFileSize}M限制`);
        if(!validateFileType) message.error("文件后缀非法,目前只允许" + R.join('|')(Constants.ACCEPTFILETYPES));
        return isLtMax && validateFileType && fileNameLength;
    };

    onUploadChange = (info) => {
        let file = info.fileList.length > 1 ? info.fileList[1] : info.fileList[0];
        let dbUrl = "";
        if (file && file.response && file.response.resultCode === "ok") {
            dbUrl = R.isEmpty(dbUrl) ? file.response.content[0].url : dbUrl;
            file.url = this.parseUrl(dbUrl);
            file = R.pick(['uid', 'name', 'status', 'url'])(file);
            this.setState({ fileList: [file], dbUrl });
        } else if (file && file.response && !R.isNil(file.response.error)) {
            message.error(file.response.message);
            this.setState({ fileList: [], dbUrl: null });
        } else {
            file = R.pick(['uid', 'name', 'status'])(file);
            this.setState({ fileList: [file], dbUrl });
        }
    }

    onRemoveFile = (file) => {
        this.setState({ fileList: [], dbUrl: "" });
    }

    render() {
        let modules = R.isNil(this.props.module) ? Constants.FILE_MODULE[0] : this.props.module;
        let action = R.isNil(this.props.action) ? defaultActionPre + modules + defaultActionSuf : this.props.action;
        let disabled = R.isNil(this.props.disabled) ? false : this.props.disabled;
        let headers = { [Constants.ACJSESSIONID]: sessionStorage.getItem(Constants.ACJSESSIONID) };
        return (
            <Upload.Dragger fileList={this.state.fileList} action={action} headers={headers} disabled={disabled} multiple={false}
                            onChange={this.onUploadChange.bind(this)} onRemove={this.onRemoveFile.bind(this)} beforeUpload={this.beforeUpload.bind(this)}>
                <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">点击或拖拽文件(多个文件请压缩)</p>
            </Upload.Dragger>
        );
    }
}
