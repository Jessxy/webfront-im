import React from 'react';
import { connect } from 'dva';
import { Link, browserHistory } from 'dva/router';
import { Table, Row, Col, Form, Input, Button, Popconfirm, Switch, Select } from 'antd';
import Constants from '../../../config/Constants.config';
import MenuDetail from '../../components/auth/MenuDetail';
import MenuRightConfig from '../../components/auth/MenuRightConfig';
const R = require('ramda');
const FormItem = Form.Item;
const menu = Form.create()(class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch({ type: 'menu/queryMenuList', payload: { page: Constants.DEFAULT_PAGE } });
  }

  handleOpen = (menuId) => {
    this.props.dispatch({
      type: 'menu/getMenu',
      payload: { menuId }
    })
    this.props.dispatch({ type: 'menu/queryFirstLevelMenus' });
    this.menuDetail.handleOpen();
  }

  handleSearch = (flag) => {
    let values = this.props.form.getFieldsValue();
    let newPage = this.props.menu.page;
    if (flag) newPage.page = 1;
    this.props.dispatch({
      type: 'menu/queryMenuList',
      payload: {
        menuName: values.menuName,
        status: values.status,
        page: newPage
      }
    });
  };

  onSwitch = (menuId, checked) => {
    this.props.dispatch({
      type: "menu/updateMenuStatus",
      payload: {
        menuId,
        status: checked ? "ENABLE" : "DISABLE",
        onSuccess: () => this.handleSearch()
      }
    });
  }

  onRightConfig = (menuId) => {
    this.props.dispatch({
      type: 'rights/queryAllRights',
      payload: { appCode: Constants.APP_CODE }
    })
    this.props.dispatch({
      type: 'menu/queryMenuRights',
      payload: {
        menuId,
        onSuccess: (roleRights) => this.refs.menuRightConfig.getWrappedInstance().handleOpen(menuId, roleRights)
      }
    })
  }

  columns = [
    { title: '菜单名称', dataIndex: 'menuName', key: 'menuName' },
    { title: '父菜单名称', dataIndex: 'parentMenuName', key: 'parentMenuName' },
    {
      title: '状态',
      render: (record) => {
        return (
          <Switch checkedChildren={'启用'} unCheckedChildren={'停用'} checked={record.status === "ENABLE"} onChange={this.onSwitch.bind(this, record.menuId)} />
        )
      }
    },
    {
      title: '操作',
      render: (record) => {
        let editLink = <a href="#" onClick={this.handleOpen.bind(this, record.menuId)}>编辑</a>;
        let configLink = <a href="#" onClick={this.onRightConfig.bind(this, record.menuId)}>配置权限</a>
        return (
          record.parentMenuId ? <span>{editLink}<span className="ant-divider" />{configLink}</span> : editLink
        )
      }
    }];

  render() {
    let formItemLayout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
    const { getFieldDecorator } = this.props.form;
    let values = this.props.form.getFieldsValue();
    let pagination = {
      showTotal: total => `共 ${total} 条数据`,
      current: this.props.menu.page.page,
      pageSize: this.props.menu.page.size,
      total: this.props.menu.page.totalRow,
      showSizeChanger: true,
      onShowSizeChange: (current, size) => {
        let newPage = this.props.menu.page;
        newPage.size = size;
        newPage.page = 1;
        this.props.dispatch({
          type: 'menu/queryMenuList',
          payload: {
            menuName: values.menuName,
            status: values.status,
            page: newPage
          }
        });
      },
      onChange: (pageNumber, pageSize) => {
        let newPage = this.props.menu.page;
        newPage.page = pageNumber;
        this.props.dispatch({
          type: 'menu/queryMenuList',
          payload: {
            menuName: values.menuName,
            status: values.status,
            page: newPage
          }
        });
      }
    }

    let tempList = [];
    this.props.menu.list.map((item) => tempList.push(R.pick(['menuId', 'menuName', 'parentMenuName', 'status', 'parentMenuId'])(item)));

    return (
      <div>
        <Row>
          <Col span={6}><FormItem {...formItemLayout} label={'菜单名称'}>{getFieldDecorator('menuName')(<Input />)}</FormItem></Col>
          <Col span={6}><FormItem {...formItemLayout} label={'状态'}>{getFieldDecorator('status')(
            <Select style={{ width: 220 }} allowClear>
              <Select.Option value="ENABLE">启用</Select.Option>
              <Select.Option value="DISABLE">停用</Select.Option>
            </Select>
          )}</FormItem></Col>
          <Col span={7} style={{ float: 'right' }}>
            <Button type="primary" icon="search" style={{ marginRight: 5 }} onClick={this.handleSearch.bind(this, true)}>查询</Button>
            <Button type="primary" icon="plus" style={{ marginRight: 5 }} onClick={this.handleOpen.bind(this, false)}>新增菜单</Button>
          </Col>
        </Row>

        <Table loading={this.props.loading} rowKey='menuId' dataSource={tempList} columns={this.columns} bordered={true} size={'middle'} pagination={pagination} />
        <MenuDetail wrappedComponentRef={(inst) => this.menuDetail = inst} refreshList={this.handleSearch} />
        <MenuRightConfig ref="menuRightConfig" refreshList={this.handleSearch}/>
      </div>
    )
  }
})

function mapStateToProps(state) {
  return {
    loading: state.loading.models.menu, menu: state.menu
  };
}

export default connect(mapStateToProps)(menu);
