import React from 'react';
import {connect} from 'dva';
import {Link, browserHistory} from 'dva/router';
import Constants from '../../../config/Constants.config';
import {Table, Row, Col, Form, Input, Select, Button, Switch, Modal, Popconfirm, message} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const R=require("ramda");
const lesseeDetail = Form.create()(class LesseeDetail extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                open: false
            }
        }

        handleOpen= () => {
            this.setState({ open: true });
        }

        handleCancel= () => {
            this.setState({ open: false });
            this.props.form.resetFields();
        }

        handleConfirm = () =>{
            this.props.form.validateFields((errors, values) => {
                if (errors) return;
                    values.lesseeId = this.props.lessee.dataSource && this.props.lessee.dataSource.lesseeId ? this.props.lessee.dataSource.lesseeId : null;
                    values.appCode = Constants.APP_CODE;
                    if(!R.equals(R.pick(Object.keys(values),this.props.lessee.dataSource),values)){
                        this.props.dispatch({
                            type: R.isNil(values.lesseeId) ? 'lessee/addLessee' : 'lessee/updateLessee',
                                payload:{
                                    ...values,
                                    onSuccess:() =>{
                                        this.handleCancel();
                                        if(this.props.refreshList) this.props.refreshList();
                                    }
                                }
                            })
                        }else this.handleCancel();
                    });
        }

    render(){
        let dataSource = this.props.lessee.dataSource ? this.props.lessee.dataSource : {};
        let formItemLayout = { labelCol:{ span: 8}, wrapperCol:{ span:14}};
        const { getFieldDecorator } = this.props.form;

        return(
            <Modal maskClosable={false} closable={false} visible={this.state.open} width={850} title={"添加租户"} confirmLoading={this.props.loading} onCancel={ this.handleCancel.bind(this)} onOk={ this.handleConfirm.bind(this)}>
                <Form>
                    <Row>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="租户编码" hasFeedback>
                                {getFieldDecorator('lesseeCode', {
                                    rules: [{
                                        required: true, message: '请输入租户编码',
                                    }],
                                    initialValue: dataSource.lesseeCode
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="公司名称（中文）" hasFeedback>
                                {getFieldDecorator('lesseeNameCn', {
                                    rules: [{
                                        required: true, message: '请输入公司名称（中文）',
                                    }],
                                    initialValue: dataSource.lesseeNameCn
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="公司名称（英文）" hasFeedback>
                                {getFieldDecorator('lesseeNameEn', {
                                    rules: [{
                                        required: true, message: '请输入公司名称（英文）',
                                    }],
                                    initialValue: dataSource.lesseeNameEn
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="公司简称（英文）" hasFeedback>
                                {getFieldDecorator('lesseeSimpleName', {
                                    rules: [{
                                        required: true, message: '请输入简称',
                                    }],
                                    initialValue: dataSource.lesseeSimpleName
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="纳税人识别码" hasFeedback>
                                {getFieldDecorator('taxpayerCode', {
                                    rules: [{
                                        required: true, message: '请输入纳税人识别码',
                                    }],
                                    initialValue: dataSource.taxpayerCode
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="海关编码" hasFeedback>
                                {getFieldDecorator('customsCode', {
                                    rules: [{
                                        required: true, message: '请输入海关编码',
                                    }],
                                    initialValue: dataSource.customsCode
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="地址（中文）" hasFeedback>
                                {getFieldDecorator('addressCn', {
                                    rules: [{
                                        required: true, message: '请输入地址（中文）',
                                    }],
                                    initialValue: dataSource.addressCn
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="地址（英文）" hasFeedback>
                                {getFieldDecorator('addressEn', {
                                    rules: [{
                                        required: true, message: '请输入地址（英文）',
                                    }],
                                    initialValue: dataSource.addressEn
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="开户行" hasFeedback>
                                {getFieldDecorator('openbank', {
                                    rules: [{
                                        required: true, message: '请输入开户行',
                                    }],
                                    initialValue: dataSource.openbank
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="开户行（英文）" hasFeedback>
                                {getFieldDecorator('openbankEn', {
                                    rules: [{
                                        required: true, message: '请输入开户行（英文）',
                                    }],
                                    initialValue: dataSource.openbankEn
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="收款账号" hasFeedback>
                                {getFieldDecorator('revAccount', {
                                    rules: [{
                                        required: true, message: '请输入收款账号',
                                    }],
                                    initialValue: dataSource.revAccount
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="联系人" hasFeedback>
                                {getFieldDecorator('linkman', {
                                    rules: [{
                                        required: true, message: '请输入联系人',
                                    }],
                                    initialValue: dataSource.linkman
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="联系人电话" hasFeedback>
                                {getFieldDecorator('linkmanMobile', {
                                    rules: [{
                                        required: true, message: '请输入联系人电话',
                                    }],
                                    initialValue: dataSource.linkmanMobile
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="公司固定电话" hasFeedback>
                                {getFieldDecorator('phone', {
                                    rules: [{
                                        required: false, message: '请输入固定电话',
                                    }],
                                    initialValue: dataSource.phone
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="公司传真" hasFeedback>
                                {getFieldDecorator('fax', {
                                    rules: [{
                                        required: false, message: '请输入传真号码',
                                    }],
                                    initialValue: dataSource.fax
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="邮编" hasFeedback>
                                {getFieldDecorator('postcode', {
                                    rules: [{
                                        required: false, message: '请输入邮政编码',
                                    }],
                                    initialValue: dataSource.postcode
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="状态" hasFeedback>
                                {getFieldDecorator('status', {
                                    rules: [
                                        {required: true}
                                    ],
                                    initialValue: dataSource.status
                                })(
                                    <Select>
                                        <Option value="ENABLE">启用</Option>
                                        <Option value="DISABLE">停用</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="归属城市" hasFeedback>
                                {getFieldDecorator('baseCity', {
                                    rules: [
                                        {required: true, message: '请输入归属城市'}
                                    ],
                                    initialValue: dataSource.baseCity
                                })(
                                    <Input maxLength="100"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="工厂用户账号状态" hasFeedback>
                                {getFieldDecorator('factoryAccountStatus', {
                                    initialValue: dataSource.factoryAccountStatus
                                })(
                                    <Select allowClear>
                                        <Option value="0">禁用</Option>
                                        <Option value="1">开设</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Modal>
            )
        }
})

function mapStateToProps(state){
    return{
        loading: state.loading.models.lessee, lessee: state.lessee
    };
}

export default connect(mapStateToProps)(lesseeDetail);
