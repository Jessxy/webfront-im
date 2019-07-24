import React from 'react';
import { connect } from 'dva';
import { Link, browserHistory } from 'dva/router';
import { Form, Input, Select, Modal, InputNumber } from 'antd';
const R = require('ramda');
const FormItem = Form.Item;
const organizationDetail = Form.create()(class OrganizationDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			dataSource: {}
		}
	}

	handleOpen = (dataSource) => {
		this.setState({ open: true, dataSource });
	}

	onCancel = () => {
		this.setState({ open: false });
		this.props.form.resetFields();
	}

	onSave = () => {
		this.props.form.validateFields({ force: true }, (errors, values) => {
			if (errors) return;

			values.orgId = this.state.dataSource && this.state.dataSource.orgId ? this.state.dataSource.orgId : null;
			values.orgParentId = this.state.dataSource && this.state.dataSource.orgParentId ? this.state.dataSource.orgParentId : null;
			values.orgTreePath = this.state.dataSource && this.state.dataSource.orgTreePath ? this.state.dataSource.orgTreePath : null;

			if (!R.equals(R.pick(Object.keys(values), this.state.dataSource), values)) {
				this.props.dispatch({
					type: values.orgId ? 'organization/updateOrganization' : 'organization/addOrganization',
					payload: {
						...values,
						onSuccess: () => {
							this.onCancel();
							this.props.dispatch({ type: 'organization/queryOrganizations' });
						}
					}
				})
			} else this.onCancel();
		})
	}

	render() {
		let formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };
		const { getFieldDecorator } = this.props.form;
		return (
			<Modal maskClosable={false} closable={false} visible={this.state.open} title={"组织机构详情"} onCancel={this.onCancel.bind(this)} onOk={this.onSave.bind(this)} confirmLoading={this.props.loading}>
				<Form>
					<FormItem {...formItemLayout} label="组织名称" hasFeedback>
						{getFieldDecorator('orgName', {
							rules: [{
								required: true, message: '请输入组织名称',
							}],
							initialValue: this.state.dataSource.orgName
						})(
							<Input maxLength="30" />
							)}
					</FormItem>
					<FormItem {...formItemLayout} label="描述" hasFeedback>
						{getFieldDecorator('orgDesc', {
							initialValue: this.state.dataSource.orgDesc
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
		loading: state.loading.models.organization, organization: state.organization
	};
}

export default connect(mapStateToProps)(organizationDetail);
