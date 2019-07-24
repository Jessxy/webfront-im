import React from 'react';
import { connect } from 'dva';
import { Link, browserHistory } from 'dva/router';
import {Table, Row, Col, Form, Input, Select, Button, Switch, Modal, Popconfirm, message} from 'antd';

const R = require('ramda');
const FormItem = Form.Item;
const Option = Select.Option;
const rightsDetail = Form.create()(class RightsDetail extends React.Component{
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
            this.setState({open: false});
            this.props.form.resetFields();
        }

        handleConfirm= () =>{
            this.props.form.validateFields((errors, values) => {
                    if (errors) return;
                    values.rightsId = this.props.rights.dataSource && this.props.rights.dataSource.rightsId ? this.props.rights.dataSource.rightsId : null;
    
                    if(!R.equals(R.pick(Object.keys(values),this.props.rights.dataSource),values)){
                        this.props.dispatch({
                            type: R.isNil(values.rightsId) ? 'rights/addRights' : 'rights/updateRights',
                            payload: {
                                ...values,
                                onSuccess:() => {
                                    this.handleCancel();
                                    //this.props.dispatch({ type:'rights/queryRightsList' });
                                    if(this.props.refreshList) this.props.refreshList();
                                }
                            }
                        })
                    }else this.handleCancel();
                });
            }

            render(){
                let formItemLayout = { labelCol: {span: 6}, wrapperCol: {span: 14}};
                let xform = this.props.rights.dataSource ? this.props.rights.dataSource : {};
                const { getFieldDecorator } = this.props.form;

            return(
                <Modal maskClosable={false} closable={false} visible={this.state.open} title={"添加权限"} confirmLoading={this.props.loading} onCancel={this.handleCancel.bind(this)} onOk={this.handleConfirm.bind(this)}>
                    <Form>
                        <FormItem {...formItemLayout} label="权限值" hasFeedback>
                            {getFieldDecorator('rightsValue', {
                                rules: [{
                                    required: true, message: '请输入权限值',
                                }],
                                initialValue: xform.rightsValue
                            })(
                                <Input size={'default'} />
                        )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="权限名称" hasFeedback>
                            {getFieldDecorator('rightsName', {
                                rules: [{
                                    required: true, message: '请输入权限名称',
                                }],
                                initialValue: xform.rightsName
                            })(
                                <Input size={'default'}/>
                        )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="状态" hasFeedback>
                            {getFieldDecorator('status', {
                                initialValue: xform.status
                            })(
                                <Select size={'default'}>
                                    <Option value="ENABLE">启用</Option>
                                    <Option value="DISABLE">停用</Option>
                                </Select>
                        )}
                        </FormItem>
                    </Form>
                </Modal>
            )
        }
})

function mapStateToProps(state) {
	return {
		loading: state.loading.models.rights, rights: state.rights
	};
}

export default connect(mapStateToProps)(rightsDetail);