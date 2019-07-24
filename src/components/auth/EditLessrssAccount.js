import React from 'react';
import { Row, Col, Form, InputNumber, Input, Button, Table, Select, Modal, Popconfirm, message } from 'antd';
const R = require('ramda');
import BizParams from '../commons/BizParams'
import CurrencySelect from '../commons/CurrencySelect'
import OperatorConstant from "../../../config/OperatorConstant.config";
const FormItem = Form.Item;
const Option = Select.Option;
export default Form.create({ wrappedComponentRef: true })(class EditLessrssAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            disabled: true,
            type: "",
            showMainAccountFlag: false
        }
    }

    handleCancel = () => {
        this.props.form.resetFields()
        this.setState({ open: false })
        this.props.dispatch({
            type: 'lesseeAccount/setDataSource',
            payload: {
                dataSource: {},
            }
        });
    }

    handleOpen = (record, type) => {
        this.state.type = type;
        this.checkMainAccountFlag(record && record.bankId ? record.bankId : null);
        this.setState({ open: true })
    }

    //只有开通了银企直联的银行才能选择是否作为主账号去拉取外汇
    checkMainAccountFlag = (value) => {
        R.map((item) => {
            let showMainAccountFlag = false;
            if (item.sprName === value && !R.isNil(value)) {
                showMainAccountFlag = true;
            }
            if (!showMainAccountFlag) this.props.form.setFieldsValue({ mainAccountFlag: "" });
            this.setState({ showMainAccountFlag });
        }, R.isNil(this.props.serviceBankList) ? [] : this.props.serviceBankList);
    }

    handleConfirm = () => {
        this.props.form.validateFields((errors, values) => {
            let dataSource = R.isNil(this.props.dataSource) ? {} : this.props.dataSource
            if (errors) return;

            if (this.state.type == OperatorConstant.view) {
                return;
            }

            let payload = {};
            let type = "";

            if (this.state.type == OperatorConstant.add) {
                type = "lesseeAccount/addLesseeAccount";

            } else if (this.state.type == OperatorConstant.edit) {
                type = "lesseeAccount/updateLesseeAccount";
                payload.id = dataSource.lesseeAccount.id;

            }

            payload.bankId = values.bankId;
            payload.bankCode = values.bankCode;
            payload.currency = values.currency;
            payload.mainAccountFlag = values.mainAccountFlag;
            payload.bankNameEn = values.bankNameEn;
            payload.branchName = values.branchName;
            payload.addressEn = values.addressEn;
            payload.swiftCode = values.swiftCode;
            payload.onSuccess = () => {
                this.props.handleSearch();
                this.handleCancel();
            }

            this.props.dispatch({
                type: type,
                payload: payload,
            })


        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = { labelCol: { xs: { span: 8 }, sm: { span: 8 } }, wrapperCol: { xs: { span: 15 }, sm: { span: 14 } } };
        let dataSource = R.isNil(this.props.dataSource) ? {} : this.props.dataSource;
        let footer = [
            <Button key="ok" size="large" onClick={this.handleConfirm.bind(this)} >确定</Button>,
            <Button key="cancel" size="large" onClick={this.handleCancel.bind(this, true)}>取消</Button>
        ];

        let disabled = this.props.disabled || this.state.type == OperatorConstant.view;
        let lesseeAccount = R.isNil(dataSource.lesseeAccount) ? {} : dataSource.lesseeAccount;

        let showMainAccountFlag = false;
        //let let serviceBank = false;

        return (
            <Modal visible={this.state.open} title={"租户账号管理"} width={800} wrapClassName="vertical-center-modal"
                footer={footer} onOk={this.handleConfirm} onCancel={this.handleCancel}>
                <Form>
                    <Row>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="开户银行" hasFeedback>
                                {getFieldDecorator('bankId', {
                                    rules: [{
                                        required: true, message: '请输入开户银行'
                                    }],
                                    initialValue: lesseeAccount.bankId
                                })(
                                    <BizParams sprCode={"bankCode"} style={{ width: '100%' }} blank={true} disabled={disabled} onChange={this.checkMainAccountFlag.bind(this)} />
                                    )}
                            </FormItem></Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="开户行英文名称" hasFeedback>
                                {getFieldDecorator('bankNameEn', {
                                    rules: [{
                                        required: true, message: '请输入开户行英文名称'
                                    }],
                                    initialValue: lesseeAccount.bankNameEn
                                })(
                                    <Input maxLength="30" disabled={disabled} />
                                    )}
                            </FormItem></Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="银行账号" hasFeedback>
                                {getFieldDecorator('bankCode', {
                                    rules: [{
                                        required: true, message: '请输入租户编码'
                                    }],
                                    initialValue: lesseeAccount.bankCode
                                })(
                                    <Input maxLength="30" disabled={disabled} />
                                    )}
                            </FormItem></Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="币种" hasFeedback>
                                {getFieldDecorator('currency', {
                                    rules: [{
                                        required: true, message: '请选择币种'
                                    }],
                                    initialValue: lesseeAccount.currency
                                })(
                                    <CurrencySelect disabled={disabled} />
                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="开户支行名称" hasFeedback>
                                {getFieldDecorator('branchName', {
                                    rules: [{
                                        required: true, message: '请输入开户支行名称'
                                    }],
                                    initialValue: lesseeAccount.branchName
                                })(
                                    <Input maxLength="30" disabled={disabled} />
                                    )}
                            </FormItem></Col>
                        <Col span={12} style={{ display: this.state.showMainAccountFlag ? 'inline-block' : 'none' }}>
                            <FormItem {...formItemLayout} label="银企直联主账号" hasFeedback>
                                {getFieldDecorator('mainAccountFlag', {
                                    initialValue: lesseeAccount.mainAccountFlag
                                })(
                                    <Select disabled={disabled}>
                                        <Option value={"1"} key={"1"}>{"是"}</Option>
                                        <Option value={"0"} key={"0"}>{"否"}</Option>
                                    </Select>
                                    )}
                            </FormItem></Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="开户行英文地址" hasFeedback>
                                {getFieldDecorator('addressEn', {
                                    initialValue: lesseeAccount.addressEn
                                })(
                                    <Input maxLength="500" disabled={disabled} />
                                    )}
                            </FormItem></Col>
                        <Col span={12}>
                            <FormItem {...formItemLayout} label="SWIFT代码" hasFeedback>
                                {getFieldDecorator('swiftCode', {
                                    initialValue: lesseeAccount.swiftCode
                                })(
                                    <Input maxLength="50" disabled={disabled} />
                                    )}
                            </FormItem></Col>
                    </Row>
                </Form>
            </Modal>
        );
    }
})

