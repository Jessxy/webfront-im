import React from 'react'
import {connect} from 'dva'
import {Link, browserHistory} from 'dva/router'
import {Form, Icon, Input, Button, Checkbox, Row, Col, Avatar, Modal, TreeSelect, Select, message} from 'antd';

import './login.css'

const R = require('ramda');

const FormItem = Form.Item;

/**
 * 图形验证码
 */
const VerifyImage = React.createClass({
    getInitialState: function () {
        let token = new Date().getTime();
        return {
            token: token,
            url: apiPath.authcenter + "/api/verifyCode?" + token
        };
    },
    reloadUrl: function () {
        let token = new Date().getTime();
        this.setState({
            token: token,
            url: apiPath.authcenter + "/api/verifyCode?" + token
        });
    },

    getToken: function () {
        return this.state.token
    },

    render: function () {
        return (
            <img src={this.state.url} onClick={
                this.reloadUrl
            }/>
        );
    },

});
const UserInfo = ({visible, type, title, xform, dispatch, confirmLoading, lesseeList}) => {
    const formItemLayout = {
        labelCol: {
            xs: {span: 24},
            sm: {span: 6},
        },
        wrapperCol: {
            xs: {span: 24},
            sm: {span: 14},
        },
    };


    const WrappedForm = Form.create()(({form}) => {

        /*         let treeData=xform.organization;
                if(!R.isNil(treeData)) {
                    treeData = treeData.map(node => {
                        return convertOrganizations(node);
                    });
                }
                let allRoles=xform.roles; */
        const {getFieldDecorator, validateFields} = form;

        return (
            <Modal visible={visible} title={title} confirmLoading={confirmLoading} onCancel={
                () => {
                    dispatch({
                        type: 'app/setEditModel',
                        payload: {
                            showStatus: false
                        }
                    });
                }
            } onOk={
                () => {
                    validateFields((errors, values) => {
                        if (errors) {
                            return
                        }
                        dispatch({
                            type: 'app/register',
                            payload: {
                                username: values.username,
                                loginId: values.loginId,
                                loginPwd: values.loginPwd,
                                mobile: values.mobile,
                                email: values.email,
                                lessee: values.lessee,
                                onSuccess: () => {
                                    dispatch({type: 'app/registeruser', payload: {showStatus: false}});
                                    message.info("注册成功！");
                                }
                            }
                        });
                    });
                }
            }>
                {(() => {
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

                                })(
                                    <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}/>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="用户名"
                                hasFeedback
                            >
                                {getFieldDecorator('username', {
                                    rules: [{
                                        required: true, message: '请输入用户名',
                                    }],

                                })(
                                    <Input/>
                                )}
                            </FormItem>
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
                                        initialValue: xform.loginPwd
                                    })(
                                        <Input type={'password'} prefix={<Icon type="lock" style={{fontSize: 13}}/>}/>
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
                                        initialValue: xform.confirmLoginPwd
                                    })(
                                        <Input type={'password'} prefix={<Icon type="lock" style={{fontSize: 13}}/>}/>
                                    )}
                                </FormItem>
                            </div>
                            <FormItem
                                {...formItemLayout}
                                label="手机号码"
                                hasFeedback
                            >
                                {getFieldDecorator('mobile', {
                                    rules: [{
                                        required: true, message: '请输入手机号码',
                                    }],

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

                                })(
                                    <Input/>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="租户"
                                hasFeedback
                            >
                                {getFieldDecorator('lessee', {
                                    rules: [{
                                        required: true, message: '请选择租户',
                                    }],
                                    initialValue: xform.lessees
                                })(
                                    <Select>
                                        {lesseeList}
                                    </Select>
                                )}
                            </FormItem>
                        </Form>
                    );


                })()}
            </Modal>
        );
    });

    return (
        <WrappedForm/>
    );
}
const Login = ({routes, params, children, location, dispatch, login, app}) => {

    const {editModel, lesseelist} = app;
    const {type, isNeedVerifyCode, verifyCodeImgURL} = login;

    let tokenNode;


    const LoginForm = Form.create()(({form}) => {
        const {getFieldDecorator, validateFields} = form;
        let handleSubmit = (e) => {
            e.preventDefault();
            validateFields((err, values) => {
                if (!err) {
                    dispatch({
                        type: "login/login",
                        payload: {
                            loginId: values.loginId,
                            password: values.password,
                            verifyCode: values.verifyCode,
                            token: R.isNil(tokenNode) ? undefined : tokenNode.getToken()
                        }
                    });
                }
            });
        }
        let handleAdd = () => {
            dispatch({type: 'app/queryAllLessees'});
            dispatch({type: 'app/registeruser', payload: {showStatus: true}});
        }

        let options = [];
        lesseelist.forEach((item) => {
            options.push(<Select.Option value={item.lesseeCode + ""}>{item.lesseeNameCn}</Select.Option>);
        });
        return (

            <div id="login" className="kim-repair-login">
                <UserInfo lesseeList={options} visible={editModel.showStatus} type={editModel.type}
                          xform={editModel.form} title={editModel.title} confirmLoading={editModel.confirmLoading}
                          dispatch={dispatch}/>

                <Row>
                    <Col span={24}>
                        <div style={{float: 'left', fontSize: '20px', color: '#c0c8cc', marginTop: 10, marginLeft: 10}}>
                            <Icon type="chrome"/>
                            <span style={{marginLeft: 5}}>出口服务系统</span>
                        </div>
                    </Col>
                </Row>


                <div className="wel" id="background-3"></div>

                {/*<div className="wel" id="box">*/}
                {/*    <div className="box-1 lefp"></div>*/}
                {/*    <div className="box-1">*/}
                {/*        <div className="righp"></div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className="wel" id="git"></div>


                <Form onSubmit={handleSubmit} className="login-form">
                    <Row style={{marginBottom: 20}}>
                        <Col span={24} style={{textAlign: 'center', fontSize: 16}}>
                            {
                                type === 'custom' ? (<div>
                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                            size="large"></Avatar>
                                    <div style={{marginBottom: 15}}>刘曾荣</div>
                                    <div style={{fontSize: "18px"}}>您好，请输入登录信息！<a href="#" onClick={() => {
                                        dispatch({
                                            type: "login/setType",
                                            payload: {
                                                type: "default"
                                            }
                                        });
                                    }}>切换用户</a></div>
                                </div>) : (
                                    <div style={{fontSize:"18px"}}>您好，请输入登录信息！</div>
                                )
                            }
                        </Col>
                    </Row>

                    {
                        type === 'default' ? (
                            <FormItem>
                                {getFieldDecorator('loginId', {
                                    rules: [{required: true, message: '请输入用户名!'}],
                                })(
                                    <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="用户名"/>
                                )}
                            </FormItem>
                        ) : ''
                    }

                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: '请输入密码!'}],
                        })(
                            <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                                   placeholder="密码"/>
                        )}
                    </FormItem>

                    {
                        isNeedVerifyCode ? (
                            <FormItem>
                                {getFieldDecorator('verifyCode', {
                                    rules: [{required: true, message: '请输入验证码!'}],
                                })(
                                    <Input className={"verifyCode"} prefix={<Icon type="enter" style={{fontSize: 13}}/>}
                                           placeholder="验证码" addonAfter={
                                        <VerifyImage ref={(node) => tokenNode = node}/>
                                    }/>
                                )}
                            </FormItem>
                        ) : ''
                    }

                    <FormItem>
                        {/*                         {getFieldDecorator('keepLogin', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox style={{color: '#c0c8cc'}}>一周内免登陆</Checkbox>
                        )} */}
                        {/* <a className="login-form-forgot" href="">忘记密码？</a> */}
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                        <span style={{color:"rgba(0, 0, 0,0.9)"}}>如果还没有帐号，请点击 <a onClick={handleAdd}>这里注册</a></span>
                    </FormItem>
                </Form>
            </div>
        );
    });


    return (
        <LoginForm/>
    );
}

export default connect(({app, login, organization, role}) => ({app, login, organization, role}))(Login)
