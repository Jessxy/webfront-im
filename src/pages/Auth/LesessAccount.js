import React from 'react';
import {connect} from 'dva';
import {Link, browserHistory} from 'dva/router';
import {Table, Row, Col, Form, Input, Icon, InputNumber, Radio, DatePicker, Select, Upload, Button, Switch, Modal, Popconfirm, Tabs, message} from 'antd';
import EditLessrssAccount from '../../components/auth/EditLessrssAccount';
import OperatorConstant from "../../../config/OperatorConstant.config";
import moment from 'moment'

const R = require('ramda');
const dateFormat = 'YYYY-MM-DD';
const { RangePicker } = DatePicker;



const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

export default connect(({lesseeAccount, app}) => ({lesseeAccount, app}))(
  Form.create()(class lesseeAccount extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    }


    componentDidMount() {
      this.props.dispatch({
        type: 'lesseeAccount/getLesseesAccount',
      });
      this.props.dispatch({
        type: 'app/getBusinessParamsByCode',
        sprCode: 'serviceBank'
      });
    }


    handleResetFields = () => {
      if(this.editLessrssAccount)this.editLessrssAccount.handleResetFields();
    }

    handleCancel = (flag) => {
      if(flag){
        this.handleResetFields();
      }
    }


    handleEdit = (record, type) => {
      this.props.dispatch({type: 'lesseeAccount/getLesseeById', payload: {id: record.id}});
      this.handleOpen(record, type);
    }

    handleOpen = (record, type) => {
      this.editLessrssAccount.handleOpen(record, type);
    }

    handleSearch = () => {


      let values = this.props.form.getFieldsValue();
      let newPage = this.props.lesseeAccount.page;
      newPage.page = 1;


      let time=values.time;
      this.props.dispatch({
        type: 'lesseeAccount/getLesseesAccount',
        payload: {
          bankCode: values.bankCode,
          page: newPage,
        }
      });
      this.setState({type:values.status});


    };



    columns = [
      {title: '租户编码', dataIndex: 'tenantId', key: 'tenantId'},

      {title: '开户行', dataIndex: 'bankName', key: 'bankName'},

      {title: '开户行英文名称', dataIndex: 'bankNameEn', key: 'bankNameEn'},

      {title: '开户账号', dataIndex: 'bankCode', key: 'bankCode'},

      {title: '币种', dataIndex: 'currencyName', key: 'currencyName'},

      // {title: '创建时间', dataIndex: 'createtime', key: 'createtime'},

      {title: '操作', width: '200px', key: 'key_oprator',

        render: (text, record, index) => {

          return (
            <span>
                        <a href="#" onClick={this.handleEdit.bind(this, record, OperatorConstant.edit)}>编辑</a>

                        <span className="ant-divider"/>

                        <Popconfirm placement="leftTop" title={'数据删除后将不可以恢复，是否继续删除？'} onConfirm={() => {
                          this.props.dispatch({
                            type: 'lesseeAccount/deleteById',
                            payload: {
                              id : record.id,
                              onSuccess:()=> {
                                this.handleSearch();
                              }
                            }
                          });
                        }} okText="是" cancelText="否">
                        <a href="#">删除</a>

                    </Popconfirm>
                    </span>
          );
        }
      }
    ];

    render () {
      let dataSouce = R.isNil(this.props.lesseeAccount.dataSource) ? {} : this.props.lesseeAccount.dataSource;
      let formItemLayout = { labelCol: {span: 8}, wrapperCol: {span: 16}};
      const { getFieldDecorator } = this.props.form;
      let values = this.props.form.getFieldsValue();
      let pagination = {
        showTotal: total => `共 ${total} 条数据`,
        pageSize: this.props.lesseeAccount.page.size,
        total: this.props.lesseeAccount.page.totalRow,
        showSizeChanger: true,
        current:this.props.lesseeAccount.page.page,
        onShowSizeChange: (current, size) => {
          let newPage = this.props.lesseeAccount.page;
          newPage.size = size;
          newPage.page = 1;
          this.props.dispatch({
            type: 'lesseeAccount/getLesseesAccount',
            payload: {
              bankCode: values.bankCode,
              page: newPage
            }
          });
        },
        onChange: (pageNumber, pageSize) => {
          let newPage = this.props.lesseeAccount.page;
          newPage.page = pageNumber;
          this.props.dispatch({
            type: 'lesseeAccount/getLesseesAccount',
            payload: {
              bankCode: values.bankCode,
              page: newPage
            }
          });
        }
      }


      return (
        <div>
          <Row>
            <Col span={6}><FormItem {...formItemLayout} label={'银行账号'}>{getFieldDecorator('bankCode')(<Input/>)}</FormItem></Col>
            <Col span={7} style={{ float: 'right' }}>
              <Button type="primary" icon="search" style={{ marginRight: 5 }} onClick={this.handleSearch.bind(this)}>查询</Button>
              <Button type="primary" icon="plus" onClick={this.handleOpen.bind(this, null, OperatorConstant.add)}>增加银行账号</Button>
            </Col>
          </Row>

          <Table rowKey={record => record.id} dataSource={this.props.lesseeAccount.list} columns={this.columns} bordered={true} size={'middle'}  pagination={pagination}/>
          <EditLessrssAccount wrappedComponentRef={(inst) => this.editLessrssAccount = inst} dispatch={this.props.dispatch} dataSource ={this.props.lesseeAccount.dataSource}
                              handleSearch = {this.handleSearch} serviceBankList={this.props.app.bizParams.serviceBank}/>


        </div>
      )
    }
  })


)
