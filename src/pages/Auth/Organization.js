import React from 'react';
import { connect } from 'dva';
import { Link, browserHistory } from 'dva/router';
import { Table, Row, Col, Form, Input, Button, Popconfirm, Switch, Select } from 'antd';
import OrganizationDetail from '../../components/auth/OrganizationDetail';
const R = require('ramda');
const FormItem = Form.Item;
const organization = Form.create()(class Organization extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch({ type: 'organization/queryOrganizations' });
  }

  handleOpen = (record) => {
    this.organizationDetail.handleOpen(record);
  }

  handleDelete = (orgId) => {
    this.props.dispatch({
      type: 'organization/deleteOrganization',
      payload: {
        orgId,
        onSuccess: () => this.props.dispatch({ type: 'organization/queryOrganizations' })
      }
    })
  }

  columns = [
    { title: '组织', dataIndex: 'orgName', key: 'orgName' },
    { title: '描述', dataIndex: 'orgDesc', key: 'orgDesc' },
    {
      title: '操作',
      render: (record) => {
        let editLink = <a href="#" onClick={this.handleOpen.bind(this, record)}>编辑</a>;
        let deleteLink = <Popconfirm placement="leftTop" title={'删除会连带删除下级组织, 请确认是否删除?'} onConfirm={this.handleDelete.bind(this, record.orgId)} okText="是" cancelText="否">
          <a href="#">删除</a>
        </Popconfirm>;
        let addSubLInk = <a href="#" onClick={this.handleOpen.bind(this, { orgParentId: record.orgId })}>创建子组织</a>;
        return (
          <span>
						{addSubLInk}<span className="ant-divider" />
            {editLink}<span className="ant-divider" />
            {deleteLink}
					</span>
        )
      }
    }];

  render() {
    let formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };

    return (
      <div>
        <Row>
          <Col span={7}>
            <Button type="primary" icon="plus" style={{ marginBottom: 20 }} onClick={this.handleOpen.bind(this)}>创建组织</Button>
          </Col>
        </Row>

        <Table
          defaultExpandAllRows={false}
          loading={this.props.loading}
          dataSource={this.props.organization.list}
          columns={this.columns}
          bordered={false}
          pagination={false}
          size={'middle'} />
        <OrganizationDetail wrappedComponentRef={(inst) => this.organizationDetail = inst} refreshList={this.handleSearch} />
      </div>
    )
  }
})

function mapStateToProps(state) {
  return {
    loading: state.loading.models.organization, organization: state.organization
  };
}

export default connect(mapStateToProps)(organization);
