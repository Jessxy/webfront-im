import React from 'react'
import {connect} from 'dva'
import {Link, browserHistory} from 'dva/router'
import {Table, Row, Col, Form, Input, Select, Button, Switch, Modal, Popconfirm, message} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const App = ({routes, params, children, location, dispatch, appManagement}) => {
  const {list, editModel} = appManagement;

  const columns = [{
    title: '应用编号',
    dataIndex: 'appCode',
    key: 'app',
    width: '200px'
  }, {
    title: '应用名称',
    dataIndex: 'appName',
    key: 'appName',
    width: '200px'
  }, {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: '100px',
    render(text) {
      let status = false;
      if(text == 'ENABLE') {
        status = true;
      }
      return (
        <Switch checkedChildren={'启用'} unCheckedChildren={'停用'} defaultChecked={status}/>
      );
    }
  }, {
    title: '操作',
    render(record) {
      return (
        <span>
                    <a href="#" onClick={
                      () => {
                        dispatch({
                          type: 'app/setEditModel',
                          payload: {
                            showStatus: true,
                            confirmLoading: false
                          }
                        })
                      }
                    }>编辑</a>
                    <span className="ant-divider"/>
                    <Popconfirm placement="leftTop" title={'数据删除后将不可以恢复，是否继续删除？'} onConfirm={()=>{}} okText="是" cancelText="否">
                        <a href="#">删除</a>
                    </Popconfirm>
                </span>
      );
    }
  }];

  const handleAdd = function () {
    dispatch({
      type: 'appManagement/setEditModel',
      payload: {
        showStatus: true,
        title: '创建应用'
      }
    });
  }

  return (
    <div>
      <EditApp visible={editModel.showStatus} title={editModel.title} confirmLoading={editModel.confirmLoading} dispatch={dispatch}/>

      <Form layout="inline" style={{marginBottom: 15}}>
        <FormItem label={'应用编码或名称'}>
          <Input style={{width: 200}}/>
        </FormItem>

        <Button type="primary" icon="search" style={{marginRight: 5}}>查询</Button>
        <Button icon="plus" onClick={handleAdd}>添加应用</Button>
      </Form>
      <Table dataSource={list} columns={columns} bordered={true} size={'middle'}/>
    </div>
  );
}

const EditApp = ({visible, title, dispatch, confirmLoading}) => {

  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 6},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 14},
    },
  };

  const WrappedForm = Form.create()(({form}) => {
    const {getFieldDecorator} = form;
    return (
      <Form>
        <FormItem
          {...formItemLayout}
          label="应用编码"
          hasFeedback
        >
          {getFieldDecorator('appCode', {
            rules: [{
              required: true, message: '请输入应用编码！',
            }]
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="应用名称"
          hasFeedback
        >
          {getFieldDecorator('appName', {
            rules: [{
              required: true, message: '请输入应用名称',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="描述"
          hasFeedback
        >
          {getFieldDecorator('desc')(
            <Input type={'textarea'} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="状态"
          hasFeedback
        >
          {getFieldDecorator('status', {
            initialValue: 'ENABLE'
          })(
            <Select>
              <Option value="ENABLE">启用</Option>
              <Option value="DISABLE">停用</Option>
            </Select>
          )}
        </FormItem>
      </Form>
    );
  });

  return (
    <Modal visible={visible} title={title} confirmLoading={confirmLoading} onCancel={
      () => {
        dispatch({
          type: 'appManagement/setEditModel',
          payload: {
            showStatus: false
          }
        });
      }
    } onOk={
      () => {
        dispatch({
          type: 'appManagement/setEditModel',
          payload: {
            confirmLoading: true
          }
        });
      }
    }>
      <WrappedForm/>
    </Modal>
  );
}

export default connect(({appManagement}) => ({appManagement}))(App)
