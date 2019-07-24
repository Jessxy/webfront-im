import React from 'react';
import { connect } from 'dva';
import { Link, browserHistory } from 'dva/router';
import { Table, Row, Col, Form, Input, Select, Button, Switch, Modal, Popconfirm, message} from 'antd';
import Constants from '../../../config/Constants.config';
import RightsDetail from '../../components/auth/RightsDetail';
const R = require('ramda');
const FormItem = Form.Item;
const Option = Select.Option;

const rights = Form.create()(class Rights extends React.Component{
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch({ type: 'rights/queryRightsList', payload: { page: Constants.DEFAULT_PAGE } });
  }

  onEdit = (rightsId) => {
    this.props.dispatch({
      type: 'rights/getRights',
      payload: {
        rightsId
      }
    });
    this.rightsDetail.handleOpen();
  }

  onDelete = (rightsId) => {
    this.props.dispatch({
      type: 'rights/deleteRights',
      payload: {
        rightsId,
        onSuccess: () => this.handleSearch()
      }
    });
  }

  onSwitch = (rightsId, checked) =>{
    this.props.dispatch({
      type:'rights/updataRightStatus',
      payload: {
        rightsId,
        status: checked ? "ENABLE" : "DISABLE",
        onSuccess: () => this.handleSearch()
      }
    })
  }

  handleAdd = () => {
    this.props.dispatch({
      type: 'rights/refreshState',
      payload: {
        dataSource: {}
      }
    });
    this.rightsDetail.handleOpen();
  }


  handleSearch = (flag) => {
    let values = this.props.form.getFieldsValue();
    let newPage = this.props.rights.page;
    if(flag) newPage.page = 1;
    this.props.dispatch({
      type: 'rights/queryRightsList',
      payload: {
        rightsValue: values.rightsValue,
        status: values.status,
        page: newPage

      }
    });
  }

  columns = [
    { title: '应用', dataIndex: 'appCode', key: 'app' },
    { title: '权限值', dataIndex: 'rightsValue', key: 'rightsValue'},
    { title: '权限名称', dataIndex: 'rightsName', key: 'rightsName' },
    { title: '状态', width: '100px',
      render: (record) => {
        return (
          <Switch checkedChildren={'启用'} unCheckedChildren={'停用'} checked={record.status === "ENABLE"} onChange={ this.onSwitch.bind(this,record.rightsId)}/>
        );
      }
    },
    { title: '操作',
      render:(record) => {
        let EditLink = <a href="#" onClick={ this.onEdit.bind(this,record.rightsId)}>编辑</a>;
        let DeleteLink = <Popconfirm placement="leftTop" title={'数据删除后将不可以恢复，是否继续删除？'} onConfirm={ this.onDelete.bind(this, record.rightsId)} okText="是" cancelText="否">
          <a href="#">删除</a>
        </Popconfirm>;
        return (
          <span>
                        {EditLink}
            <span className="ant-divider"/>
            {DeleteLink}
                    </span>
        );
      }
    }];

  render(){
    let formItemLayout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
    let values = this.props.form.getFieldsValue();
    const { getFieldDecorator } = this.props.form;

    let pagination = {
      showTotal: total => `共 ${total} 条数据`,
      pageSize: this.props.rights.page.size,
      total: this.props.rights.page.totalRow,
      current: this.props.rights.page.page,
      showSizeChanger: true,

      onShowSizeChange: (current, size) => {
        let newPage = this.props.rights.page;
        newPage.size = size;
        newPage.page = 1;
        this.props.dispatch({
          type: 'rights/queryRightsList',
          payload: {
            rightsValue: values.rightsValue,
            status: values.status,
            page: newPage
          }
        });
      },
      onChange: (pageNumber, pageSize) => {
        let newPage = this.props.rights.page;
        newPage.page = pageNumber;
        this.props.dispatch({
          type: 'rights/queryRightsList',
          payload: {
            rightsValue: values.rightsValue,
            status: values.status,
            page: newPage
          }
        });
      }
    }

    return(
      <div>
        <Row>
          <Col span={6}><FormItem {...formItemLayout} label={'权限值'}>{getFieldDecorator('rightsValue')(<Input />)}</FormItem></Col>
          <Col span={6}><FormItem {...formItemLayout} label={'状态'}>{getFieldDecorator('status')(
            <Select style={{width: 220}} size={'default'} allowClear>
              <Option value={"ENABLE"}>启用</Option>
              <Option value={"DISABLE"}>停用</Option>
            </Select>
          )}</FormItem></Col>
          <Col span={7} style={{ float: 'right' }}>
            <Button type="primary" icon="search" style={{marginRight: 5}} onClick={this.handleSearch.bind(this)} size={'default'}>查询</Button>
            <Button type="primary" icon="plus" style={{marginRight: 5}} onClick={this.handleAdd.bind(this)} size={'default'}>添加权限</Button>
          </Col>
        </Row>
        <Table rowKey={record => record.rightsId} dataSource={this.props.rights.list} loading={this.props.loading} columns={this.columns} bordered={true} size={'middle'} pagination={pagination} />
        <RightsDetail wrappedComponentRef={(inst) => this.rightsDetail = inst} refreshList={this.handleSearch} />
      </div>
    )

  }
})

function mapStateToProps(state) {
  return {
    loading: state.loading.models.rights, rights: state.rights
  };
}

export default connect(mapStateToProps)(rights);
