import React from 'react';
import { connect } from 'dva';
import { Link, browserHistory } from 'dva/router';
import { Table, Row, Col, Form, Input, Button, Popconfirm, Switch, Select } from 'antd';
import Constants from '../../../config/Constants.config';
import RoleDetail from '../../components/auth/RoleDetail';
import RoleMenuConfig from '../../components/auth/RoleMenuConfig';
import RoleRightConfig from '../../components/auth/RoleRightConfig';
const R = require('ramda');
const FormItem = Form.Item;
const role = Form.create()(class Role extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch({ type: 'role/queryRoleList', payload: { page: Constants.DEFAULT_PAGE } });
  }

  handleOpen = (roleId) => {
    this.props.dispatch({
      type: 'role/getRole',
      payload: { roleId }
    })
    this.roleDetail.handleOpen();
  }

  onMenuConfig = (id) => {
    this.props.dispatch({
      type: 'menu/queryParentMenuList',
    })
    this.props.dispatch({
      type: 'role/queryRoleMenus',
      payload: {
        id,
        onSuccess: (roleMenus) => this.refs.roleMenuConfig.getWrappedInstance().handleOpen(id, roleMenus)
      }
    })
  }

  onRightConfig = (id) => {
    this.props.dispatch({
      type: 'role/queryRoleMenuTree',
      payload: {
        id
      }
    })
    this.props.dispatch({
      type: 'rights/queryRoleRights',
      payload: {
        id,
        onSuccess: (roleRights) => this.refs.roleRightConfig.getWrappedInstance().handleOpen(id, roleRights)
      }
    })
  }

  handleDelete = (roleId) => {
    this.props.dispatch({
      type: 'role/deleteRole',
      payload: {
        roleId,
        onSuccess: () => this.handleSearch()
      }
    })
  }

  handleSearch = (flag) => {
    let values = this.props.form.getFieldsValue();
    let newPage = this.props.role.page;
    if (flag) newPage.page = 1;
    this.props.dispatch({
      type: 'role/queryRoleList',
      payload: {
        ...values,
        page: newPage
      }
    });
  };

  columns = [
    { title: '角色名称', dataIndex: 'roleName', key: 'roleName' },
    { title: '描述', dataIndex: 'desc', key: 'desc' },
    {
      title: '操作',
      render: (record) => {
        let editLink = <a href="#" onClick={this.handleOpen.bind(this, record.roleId)}>编辑</a>;
        let deleteLink = <Popconfirm placement="leftTop" title={'删除角色会同时删除对应的菜单及权限关系，是否继续删除？'} onConfirm={this.handleDelete.bind(this, record.roleId)} okText="是" cancelText="否">
          <a href="#">删除</a>
        </Popconfirm>;
        let menuLink = <a href="#" onClick={this.onMenuConfig.bind(this, record.roleId)}>配置菜单</a>;
        let rightLink = <a href="#" onClick={this.onRightConfig.bind(this, record.roleId)}>配置权限</a>;
        return (
          <span>
						{editLink}<span className="ant-divider" />
            {deleteLink}<span className="ant-divider" />
            {menuLink}<span className="ant-divider" />
            {rightLink}
					</span>
        )
      }
    }];

  render() {
    let formItemLayout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
    const { getFieldDecorator } = this.props.form;
    let values = this.props.form.getFieldsValue();
    let pagination ={
      showTotal: total => `共 ${total} 条数据`,
      pageSize: this.props.role.page.size,
      total: this.props.role.page.totalRow,
      current: this.props.role.page.page,
      showSizeChanger: true,

      onShowSizeChange: (current, size) =>{
        let newPage = this.props.role.page;
        newPage.size = size;
        newPage.page = 1;
        this.props.dispatch({
          type: 'role/queryRoleList',
          payload: {
            ...values,
            page: newPage
          }
        });
      },
      onChange: (pageNumber, pageSize) =>{
        let newPage = this.props.role.page;
        newPage.page = pageNumber;
        this.props.dispatch({
          type: 'role/queryRoleList',
          payload: {
            ...values,
            page: newPage
          }
        });
      }
    }

    return (
      <div>
        <Row>
          <Col span={6}><FormItem {...formItemLayout} label={'角色名称'}>{getFieldDecorator('roleName')(<Input />)}</FormItem></Col>
          <Col span={6}><FormItem {...formItemLayout} label={'角色描述'}>{getFieldDecorator('desc')(<Input />)}</FormItem></Col>
          <Col span={7} style={{ float: 'right' }}>
            <Button type="primary" icon="search" style={{ marginRight: 5 }} onClick={this.handleSearch.bind(this, true)}>查询</Button>
            <Button type="primary" icon="plus" style={{ marginRight: 5 }} onClick={this.handleOpen.bind(this, false)}>新增角色</Button>
          </Col>
        </Row>

        <Table loading={this.props.loading} rowKey='roleId' dataSource={this.props.role.list} columns={this.columns} bordered={true} size={'middle'} pagination={pagination} />
        <RoleDetail wrappedComponentRef={(inst) => this.roleDetail = inst} refreshList={this.handleSearch} />
        <RoleMenuConfig ref="roleMenuConfig" refreshList={this.handleSearch} />
        <RoleRightConfig ref="roleRightConfig" refreshList={this.handleSearch} />
      </div>
    )
  }
})

function mapStateToProps(state) {
  return {
    loading: state.loading.models.role, role: state.role
  };
}

export default connect(mapStateToProps)(role);
