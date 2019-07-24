import React from 'react';
import { connect } from 'dva';
import { Link, browserHistory } from 'dva/router';
import { Table, Row, Col, Form, TreeSelect, Input, Select, Button, Switch, Icon, Modal, Popconfirm, message, Transfer } from 'antd';
import Constants from '../../../config/Constants.config';
import OperatorConstant from '../../../config/OperatorConstant.config';
import UserDetail from '../../components/auth/UserDetail';
import UserAppRoles from '../../components/auth/UserAppRoles';

const R = require('ramda');
const FormItem = Form.Item;

const user = Form.create()(class User extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch({ type: 'authUser/queryUserList', payload: { page: Constants.DEFAULT_PAGE } });
  }

  handleResetPwd = (userId, type) => {
    this.props.dispatch({
      type: 'authUser/refreshState',
      payload: {
        dataSource: {
          userId: userId
        }
      }
    });
    this.userDetail.handleOpen(type);
  }

  onEdit = (userId, type) => {
    this.props.dispatch({
      type: 'organization/queryOrganizations'
    });
    this.props.dispatch({
      type: 'role/queryAllRoleList'
    });
    this.props.dispatch({
      type: 'authUser/getUser',
      payload: {
        userId: userId
      }
    });
    this.userDetail.handleOpen(type);
  }

  onDelete = (userId) => {
    this.props.dispatch({
      type: 'authUser/deleteUser',
      payload: {
        userId: userId,
        onSuccess: () => this.handleSearch()
      }
    });
  }

  handleAdd = (type) => {
    this.props.dispatch({
      type: 'organization/queryOrganizations',
    });

    this.props.dispatch({
      type: 'role/queryAllRoleList'
    });

    this.props.dispatch({
      type: 'authUser/refreshState',
      payload: {
        dataSource: {}
      }
    });
    this.userDetail.handleOpen(type);
  }

  handleSearch = () => {
    let values = this.props.form.getFieldsValue();
    let newPage = this.props.authUser.page;
    newPage.page = 1;

    this.props.dispatch({
      type: 'authUser/queryUserList',
      payload: {
        username: values.username,
        page: newPage
      }
    });
  }

  handleOpenAppRoles = (userId) => {
    this.props.dispatch({
      type: 'authUser/queryAppRoles',
      payload: { userId }
    });
    this.userAppRoles.refs.wrappedInstance.handleOpen()
  }

  onSwitch = (userId, checked) => {
    this.props.dispatch({
      type: 'authUser/updateUser',
      payload: {
        userId,
        status: checked ? "2" : "1",
        onSuccess: this.handleSearch
      }
    })
  }

  columns = [
    { title: '用户名', dataIndex: 'username', key: 'username' },
    { title: '登录名', dataIndex: 'loginId', key: 'loginId' },
    { title: '手机号码', dataIndex: 'mobile', key: 'mobile' },
    { title: '邮箱', dataIndex: 'email', key: 'email' },
    {
      title: '生效中',
      render: (record) => {
        return (
          <Switch checkedChildren={'是'} unCheckedChildren={'否'} checked={record.status === "2"} onChange={this.onSwitch.bind(this, record.userId)} />
        )
      }
    },
    {
      title: '操作',
      render: (record) => {
        let RenameLink = <a href="#" onClick={this.handleResetPwd.bind(this, record.userId, 'resetPwd')}>重置密码</a>;
        let EditLink = <a href="#" onClick={this.onEdit.bind(this, record.userId, OperatorConstant.update)}>编辑</a>;
        let DeleteLink = <Popconfirm placement="leftTop" title={'数据删除后将不可以恢复，是否继续删除？'} onConfirm={this.onDelete.bind(this, record.userId)} okText="是" cancelText="否">
          <a href="#">删除</a>
        </Popconfirm>
        let roles = <a href="#" onClick={this.handleOpenAppRoles.bind(this, record.userId)}>角色一览</a>;
        return (
          <span>
                        {RenameLink}
            <span className="ant-divider" />
            {EditLink}
            <span className="ant-divider" />
            {DeleteLink}
            <span className="ant-divider" />
            {roles}
                    </span>
        );
      }
    }];
  render() {
    let formItemLayout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
    const { getFieldDecorator } = this.props.form;

    let pagination = {
      showTotal: total => `共 ${total} 条数据`,
      pageSize: this.props.authUser.page.size,
      total: this.props.authUser.page.totalRow,
      current: this.props.authUser.page.page,
      showSizeChanger: true,

      onShowSizeChange: (current, size) => {
        let newPage = this.props.authUser.page;
        newPage.size = size;
        newPage.page = 1;
        this.props.dispatch({
          type: 'authUser/queryUserList',
          payload: {
            page: newPage
          }
        });
      },
      onChange: (pageNumber, pageSize) => {
        let newPage = this.props.authUser.page;
        newPage.page = pageNumber;
        this.props.dispatch({
          type: 'authUser/queryUserList',
          payload: {
            page: newPage
          }
        });
      }
    }

    return (
      <div>
        <Row>
          <Col span={6}>
            <FormItem {...formItemLayout} label={'用户名'}>
              {getFieldDecorator('username')(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={7} style={{ float: 'right' }}>
            <Button type="primary" icon="search" size={'default'} style={{ marginRight: 5 }} onClick={this.handleSearch.bind(this)}>查询</Button>
            <Button type="primary" icon="plus" size={'default'} onClick={this.handleAdd.bind(this, OperatorConstant.add)}>添加用户</Button>
          </Col>
        </Row>
        <Table loading={this.props.loading} rowKey={record => record.userId} dataSource={this.props.authUser.list} columns={this.columns} bordered={false} size={'middle'} pagination={pagination} />
        <UserDetail wrappedComponentRef={(inst) => this.userDetail = inst} refreshList={this.handleSearch} />
        <UserAppRoles ref={inst => this.userAppRoles = inst} />
      </div>
    )
  }
})

function mapStateToProps(state) {
  return {
    loading: state.loading.models.authUser, authUser: state.authUser
  };
}

export default connect(mapStateToProps)(user);
