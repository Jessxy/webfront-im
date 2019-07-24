import React from 'react';
import { connect } from 'dva';
import { Link, browserHistory } from 'dva/router';
import { Form, Input, Select, Modal, InputNumber } from 'antd';
const R = require('ramda');
const FormItem = Form.Item;
const roleDetail = Form.create()(class RoleDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = { open: false }
	}

	handleOpen = () => {
		this.setState({ open: true });
	}

	onCancel = () => {
		this.setState({ open: false });
		this.props.form.resetFields();
	}

	onSave = () => {
		this.props.form.validateFields({ force: true }, (errors, values) => {
			if (errors) return;

			values.roleId = this.props.role.dataSource && this.props.role.dataSource.roleId ? this.props.role.dataSource.roleId : null;

			if (!R.equals(R.pick(Object.keys(values), this.props.role.dataSource), values)) {
				this.props.dispatch({
					type: values.roleId ? 'role/updateRole' : 'role/addRole',
					payload: {
						...values,
						onSuccess: () => {
							this.onCancel();
							if (this.props.refreshList) this.props.refreshList();
						}
					}
				})
			} else this.onCancel();
		})
	}

	render() {
		let dataSource = this.props.role.dataSource ? this.props.role.dataSource : {};
		let formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };
		const { getFieldDecorator } = this.props.form;
		return (
			<Modal maskClosable={false} closable={false} visible={this.state.open} title={"角色详情"} onCancel={this.onCancel.bind(this)} onOk={this.onSave.bind(this)} confirmLoading={this.props.loading}>
				<Form>
					<FormItem {...formItemLayout} label="角色名称" hasFeedback>
						{getFieldDecorator('roleName', {
							rules: [{
								required: true, message: '请输入角色名称',
							}],
							initialValue: dataSource.roleName
						})(
							<Input maxLength="50" />
							)}
					</FormItem>
					<FormItem {...formItemLayout} label="角色描述" hasFeedback>
						{getFieldDecorator('desc', {
							rules: [{
								required: true, message: '请输入角色描述',
							}],
							initialValue: dataSource.desc
						})(
							<Input.TextArea maxLength="200" autosize={true} />
							)}
					</FormItem>
				</Form>
			</Modal>
		)
	}
})

function mapStateToProps(state) {
	return {
		loading: state.loading.models.role, role: state.role
	};
}

export default connect(mapStateToProps)(roleDetail);
