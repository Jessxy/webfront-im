import React from 'react';
import { connect } from 'dva';
import { Link, browserHistory } from 'dva/router';
import { Form, Input, Select, Modal, InputNumber } from 'antd';
const R = require('ramda');
const FormItem = Form.Item;
const menuDetail = Form.create()(class MenuDetail extends React.Component {
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

			values.menuId = this.props.menu.dataSource && this.props.menu.dataSource.menuId ? this.props.menu.dataSource.menuId : null;
			values.parentMenuId = values.parentMenuId ? parseInt(values.parentMenuId) : null;

			if (!R.equals(R.pick(Object.keys(values), this.props.menu.dataSource), values)) {
				this.props.dispatch({
					type: values.menuId ? 'menu/updateMenu' : 'menu/addMenu',
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
		let dataSource = this.props.menu.dataSource ? this.props.menu.dataSource : {};
		let formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };
		const { getFieldDecorator } = this.props.form;
		return (
			<Modal maskClosable={false} closable={false} visible={this.state.open} title={"菜单详情"} onCancel={this.onCancel.bind(this)} onOk={this.onSave.bind(this)} confirmLoading={this.props.loading}>
				<Form>
					<FormItem {...formItemLayout} label="菜单名称" hasFeedback>
						{getFieldDecorator('menuName', {
							rules: [{
								required: true, message: '请输入菜单名称',
							}],
							initialValue: dataSource.menuName
						})(
							<Input maxLength="30" />
							)}
					</FormItem>
					<FormItem {...formItemLayout} label="父菜单名称" hasFeedback>
						{getFieldDecorator('parentMenuId', {
							initialValue: dataSource.parentMenuId ? dataSource.parentMenuId + "" : undefined
						})(
							<Select style={{ width: '100%' }}>
								<Select.Option value={""} key="blank">&nbsp;</Select.Option>
								{
									!R.isNil(this.props.menu.pMenus) ? this.props.menu.pMenus.map(item => {
										return (<Select.Option value={item.menuId + ""} key={item.menuId + ""}>{item.menuName}</Select.Option>);
									}) : ''
								}
							</Select>
							)}
					</FormItem>
					<FormItem {...formItemLayout} label="图标" hasFeedback>
						{getFieldDecorator('icon', {
							initialValue: dataSource.icon
						})(
							<Input maxLength="20" />
							)}
					</FormItem>
					<FormItem {...formItemLayout} label="访问链接" hasFeedback>
						{getFieldDecorator('url', {
							rules: [{
								required: true, message: '请输入访问链接',
							}],
							initialValue: dataSource.url
						})(
							<Input maxLength="255"/>
							)}
					</FormItem>
					<FormItem {...formItemLayout} label="权重值" hasFeedback>
						{getFieldDecorator('weight', {
							rules: [{
								required: true, message: '请输入权重值',
							}],
							initialValue: dataSource.weight
						})(
							<InputNumber min={0} max={100} style={{ width: '100%' }} />
							)}
					</FormItem>
					<FormItem {...formItemLayout} label="状态" hasFeedback>
						{getFieldDecorator('status', {
							rules: [{
								required: true, message: '请选择状态',
							}],
							initialValue: dataSource.status
						})(
							<Select>
								<Select.Option value="ENABLE">启用</Select.Option>
								<Select.Option value="DISABLE">停用</Select.Option>
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
		loading: state.loading.models.menu, menu: state.menu
	};
}

export default connect(mapStateToProps)(menuDetail);
