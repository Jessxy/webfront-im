import React from 'react';
import { connect } from 'dva';
import { Link, browserHistory } from 'dva/router';
import { Table, Row, Col, Form, Input, Select, Button, Switch, Modal, Popconfirm, message } from 'antd';
import { formatMobile } from '../../components/commons/Commons';
import LesseeDetail from '../../components/auth/LesseeDetail';
import Constants from '../../../config/Constants.config';
const FormItem = Form.Item;
const Option = Select.Option;
const R = require("ramda");

const lessee = Form.create()(class Lessee extends React.Component{
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch({ type: 'lessee/queryLessees', payload: { page: Constants.DEFAULT_PAGE } });
  }

  handleAdd = () => {
    this.props.dispatch({
      type: 'lessee/refreshState',
      payload: {
        dataSource: {}
      }
    });
    this.lesseeDetail.handleOpen();
  }

  onEdit = (record) =>{
    this.props.dispatch({
      type: 'lessee/getLessee',
      payload: {
        lesseeId: record.lesseeId
      }
    });
    this.lesseeDetail.handleOpen();
  }

  onSwitch = (lesseeId, checked) =>{
    this.props.dispatch({
      type: "lessee/updateStatus",
      payload: {
        lesseeId,
        status: checked ? "ENABLE" : "DISABLE",
        onSuccess : () => this.handleSearch()
      }
    });
  }

  handleSearch = (flag) => {
    // this.props.form.validateFields((errors, values) => {
    //     if (errors) return;
    let values = this.props.form.getFieldsValue();
    let newPage = this.props.lessee.page;
    if(flag) newPage.page = 1;
    this.props.dispatch({
      type: 'lessee/queryLessees',
      payload: {
        lesseeCode: values.lesseeCode,
        lesseeName: values.lesseeName,
        status: values.status,
        page: newPage

      }
    });
  }

  columns = [
    { title: '租户编码', dataIndex: 'lesseeCode', key: 'lesseeCode'},
    { title: '租户名称', dataIndex: 'lesseeNameCn', key: 'lesseeNameCn'},
    { title: '英文名称', dataIndex: 'lesseeNameEn', key: 'lesseeNameEn'},
    { title: '简称', dataIndex: 'lesseeSimpleName', key: 'lesseeSimpleName'},
    { title: '纳税人识别码', dataIndex: 'taxpayerCode', key: 'taxpayerCode'},
    { title: '电话', dataIndex: 'phone', key: 'phone',
      render(mobile) {
        return formatMobile(mobile);
      }
    },
    { title: '状态', width: '100px', fixed: 'right',
      render: (record) => {
        return (
          <Switch checkedChildren={'启用'} unCheckedChildren={'停用'} checked={record.status === "ENABLE"} onChange={ this.onSwitch.bind(this,record.lesseeId)}/>
        );
      }
    },
    { title: '操作', width: '100px', fixed: 'right',
      render: (record) => {
        let EditLink =  <a href="#" onClick={this.onEdit.bind(this, record)}>编辑</a>
        return (
          <span>
                    {EditLink}
                </span>
        );
      }
    }];

  render(){
    let formItemLayout = { labelCol: {span: 8}, wrapperCol: {span: 16}};
    let values = this.props.form.getFieldsValue();
    const { getFieldDecorator } = this.props.form;

    let pagination = {
      showTotal: total => `共 ${total} 条数据`,
      pageSize: this.props.lessee.page.size,
      current: this.props.lessee.page.page,
      total: this.props.lessee.page.totalRow,
      showSizeChanger: true,
      onShowSizeChange: (current, size) => {
        let newPage = this.props.lessee.page;
        newPage.size = size;
        newPage.page = 1;
        this.props.dispatch({
          type: 'lessee/queryLessees',
          payload: {
            lesseeCode: values.lesseeCode,
            lesseeName: values.lesseeName,
            status: values.status,
            page: newPage
          }
        });
      },
      onChange: (pageNumber, pageSize) => {
        let newPage = this.props.lessee.page;
        newPage.page = pageNumber;
        this.props.dispatch({
          type: 'lessee/queryLessees',
          payload: {
            lesseeCode: values.lesseeCode,
            lesseeName: values.lesseeName,
            status: values.status,
            page: newPage
          }
        });
      }
    }

    return (
      <div>
        <Row>
          <Col span={6}><FormItem {...formItemLayout} label={'租户编码'}>{getFieldDecorator('lesseeCode')(<Input />)}</FormItem></Col>
          <Col span={6}><FormItem {...formItemLayout} label={'租户名称'}>{getFieldDecorator('lesseeName')(<Input />)}</FormItem></Col>
        </Row>
        <Row>
          <Col span={6}><FormItem {...formItemLayout} label={'状态'}>{getFieldDecorator('status')(
            <Select style={{width: '100%' }} size={'default'} allowClear>
              <Option value="ENABLE">启用</Option>
              <Option value="DISABLE">停用</Option>
            </Select>
          )}</FormItem></Col>
          <Col span={7} style={{ float: 'right' }}>
            <Button type="primary" icon="search" style={{ marginRight: 5 }} onClick={this.handleSearch.bind(this,true)} size={'default'}>查询</Button>
            <Button type="primary" icon="plus" style={{ marginRight: 5 }} onClick={this.handleAdd.bind(this)} size={'default'}>添加租户</Button>
          </Col>
        </Row>
        <Table rowKey={record => record.lesseeId} dataSource={this.props.lessee.list} loading={this.props.loading} columns={this.columns} bordered={true} size={'middle'} scroll={{ x: true }} pagination={pagination} />
        <LesseeDetail wrappedComponentRef={(inst) => this.lesseeDetail = inst} refreshList={this.handleSearch} />
      </div>
    );
  }
})


//     let lesseeAccountList=xform.lesseeAccountList;
//     let options=[];
//     for(let i in lesseeAccountList){
//         options.push(<Option value={lesseeAccountList[i].bankName}>{lesseeAccountList[i].bankName}</Option>)
//     }

//     const WrappedForm = Form.create()(({ form }) => {
//         const { getFieldDecorator, validateFields } = form;
//         let getAccountByBankName=(name)=>{
//             for(let i in lesseeAccountList){
//                 if(lesseeAccountList[i].bankName==name){
//                     return lesseeAccountList[i];
//                 }
//             }
//         };
//         let handleSelect=(value)=>{
//             form.setFieldsValue({openbankEn:getAccountByBankName(value).bankNameEn});
//         };

//         let input=<Input/>;

//         let type=editModel.type;
//         if(type=="add"){
//             input=<Input/>;
//         }
//         else if(type=="update"){
//             input=<Select  onChange={handleSelect}>
//                 {options}
//             </Select>;
//         }
//         return (

//         );
//     });

//     return (
//         <WrappedForm/>
//     );



//     }
// })
function mapStateToProps(state){
  return{
    loading: state.loading.models.lessee, lessee: state.lessee
  };
}

export default connect(mapStateToProps)(lessee);
