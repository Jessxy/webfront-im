import React from 'react';
import { connect } from 'dva';
import {Link, browserHistory} from 'dva/router';
import {Table, Row, Col, Form, TreeSelect, Input, Select, Button, Switch, Icon, Modal, Popconfirm, message,Transfer } from 'antd';
import OperatorConstant from '../../../config/OperatorConstant.config';
import { convertOrganizations } from '../commons/Commons';
const R = require('ramda');

const Option = Select.Option;
const FormItem = Form.Item;
const userDetail = Form.create()(class UserDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            open:false,
            type:''
        }
    }

    handleOpen= (type) => {
        this.setState({ open: true, type });
    }

    handleCancel= () => {
        this.setState({open: false});
        this.props.form.resetFields();
    }

    handleConfirm = () =>{
        this.props.form.validateFields((errors, values) => {
            if (errors) return;
            values.userId = this.props.authUser.dataSource && this.props.authUser.dataSource.userId ? this.props.authUser.dataSource.userId : null;
            if (this.state.type == OperatorConstant.add) {
                if (values.loginPwd != values.confirmLoginPwd) {
                    message.error("两次输入的密码不一致")
                    return;
                }
                this.props.dispatch({
                    type: 'authUser/addUser',
                        payload: {
                            ...values,
                            onSuccess: () => {
                                this.handleCancel();
                                if(this.props.refreshList) this.props.refreshList();
                            }
                        }
                    });
                }

            if (this.state.type == OperatorConstant.update) {
                this.props.dispatch({
                    type: 'authUser/updateUser',
                        payload: {
                            ...values,
                            onSuccess: () => {
                                this.handleCancel();
                                if(this.props.refreshList) this.props.refreshList();
                            }
                        }
                    });
                }

            if (this.state.type === "resetPwd" ) {
                if (values.loginPwd != values.confirmLoginPwd) {
                        message.error("两次输入的密码不一致")
                        return;
                    }
                    this.props.dispatch({
                        type: 'authUser/resetPassword',
                             payload: {
                                userId: values.userId,
                                loginPwd: values.loginPwd,
                                onSuccess: () => {
                                    this.handleCancel()
                                    if(this.props.refreshList) this.props.refreshList();
                                }
                            }
                        });
                    }
                })
            }


    render(){
        let orgTreeList = this.props.organization.list;
        orgTreeList = orgTreeList.map(node => {
                return convertOrganizations(node);
        });
        let treeData = orgTreeList;
        let allRoles = this.props.role.allRoles;
        let dataSource = this.props.authUser.dataSource;
        let formItemLayout = { labelCol:{ span:6 }, wrapperCol:{ span:14}};
        const { getFieldDecorator } = this.props.form;
        return(
            <Modal maskClosable={false} closable={true} visible={this.state.open} title={"添加用户"} confirmLoading={this.props.loading} onCancel={this.handleCancel.bind(this)} onOk={this.handleConfirm.bind(this)}>
            {(() => {
                    if (this.state.type == OperatorConstant.add || this.state.type == OperatorConstant.update) {
                        return (
                            <Form>
                                <FormItem
                                    {...formItemLayout}
                                    label="登录名"
                                    hasFeedback
                                >
                                    {getFieldDecorator('loginId', {
                                        rules: [{
                                            required: true, message: '请输入登录名',
                                        }],
                                        initialValue: dataSource.loginId
                                    })(
                                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />}/>
                                    )}
                                </FormItem>
                                {
                                    this.state.type == OperatorConstant.add ? (
                                        <div>
                                            <FormItem
                                                {...formItemLayout}
                                                label="登录密码"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('loginPwd', {
                                                    rules: [{
                                                        required: true, message: '请输入登录密码',
                                                    }],
                                                    initialValue: dataSource.loginPwd
                                                })(
                                                    <Input type={'password'} prefix={<Icon type="lock" style={{ fontSize: 13 }} />}/>
                                                )}
                                            </FormItem>
                                            <FormItem
                                                {...formItemLayout}
                                                label="确认密码"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('confirmLoginPwd', {
                                                    rules: [{
                                                        required: true, message: '请输入确认密码',
                                                    }],
                                                    initialValue: dataSource.confirmLoginPwd
                                                })(
                                                    <Input type={'password'} prefix={<Icon type="lock" style={{ fontSize: 13 }} />}/>
                                                )}
                                            </FormItem>
                                        </div>) : ''
                                }

                                <FormItem
                                    {...formItemLayout}
                                    label="用户名"
                                    hasFeedback
                                >
                                    {getFieldDecorator('username', {
                                        rules: [{
                                            required: true, message: '请输入用户名',
                                        }],
                                        initialValue: dataSource.username
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="手机号码"
                                    hasFeedback
                                >
                                    {getFieldDecorator('mobile', {
                                        rules: [{
                                            required: true, message: '请输入手机号码',
                                        }],
                                        initialValue: dataSource.mobile
                                    })(
                                        <Input/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="邮箱"
                                    hasFeedback
                                >
                                    {getFieldDecorator('email', {
                                        rules: [{
                                            required: true, message: '请输入邮箱地址',
                                        }],
                                        initialValue: dataSource.email
                                    })(
                                        <Input/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="组织机构"
                                    hasFeedback
                                >
                                    {getFieldDecorator('orgIds', {
                                        rules: [{
                                            required: true, message: '请选择组织机构',
                                        }],
                                        initialValue: R.isEmpty(dataSource.orgIds) ? [] : dataSource.orgIds
                                    })(
                                        <TreeSelect
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            treeData={treeData}
                                            placeholder="请选择归属组织"
                                            allowClear
                                            multiple
                                            treeDefaultExpandAll
                                            filterTreeNode={(inputValue, treeNode)=>{
                                                if (treeNode.props.title.toLowerCase().indexOf(inputValue) != -1) {
                                                    return true;
                                                }
                                                return false;
                                            }}
                                        />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="角色"
                                    hasFeedback
                                >
                                    {getFieldDecorator('roleIds', {
                                        rules: [{
                                            required: true, message: '请选择角色',
                                        }],
                                        initialValue: dataSource.roleIds
                                    })(
                                        <Select mode="tags" size={"large"} placeholder="角色可选择多个" style={{ width: '100%' }} showSearch
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {
                                                !R.isNil(allRoles) ? allRoles.map(item => {
                                                    return (<Select.Option value={item.roleId+""} key={item.roleId+""}>{item.desc}</Select.Option>);
                                                }) : ''
                                            }
                                        </Select>
                                    )}
                                </FormItem>
                            </Form>
                        );
                    } else if (this.state.type === 'resetPwd') {
                        return (
                            <Form>
                                <FormItem
                                    {...formItemLayout}
                                    label="新密码"
                                    hasFeedback
                                >
                                    {getFieldDecorator('loginPwd', {
                                        rules: [{
                                            required: true, message: '请输入登录密码',
                                        }],
                                        initialValue: dataSource.loginPwd
                                    })(
                                        <Input type={'password'} prefix={<Icon type="lock" style={{ fontSize: 13 }} />}/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="确认密码"
                                    hasFeedback
                                >
                                    {getFieldDecorator('confirmLoginPwd', {
                                        rules: [{
                                            required: true, message: '请输入确认密码',
                                        }],
                                        initialValue: dataSource.confirmLoginPwd
                                    })(
                                        <Input type={'password'} prefix={<Icon type="lock" style={{ fontSize: 13 }} />}/>
                                    )}
                                </FormItem>
                            </Form>
                        );
                    }
                })()}
            </Modal>
        )
    }
})

function mapStateToProps(state){
    return{
        loading: state.loading.models.authUser, authUser: state.authUser, role: state.role, organization: state.organization
    };
}

export default connect(mapStateToProps)(userDetail);
