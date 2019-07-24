import React from 'react';
import { Table, Modal, Button } from 'antd';
import { connect } from 'dva';
class UserAppRoles extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false }
    }

    handleOpen = () => this.setState({ open: true })

    handleCancel = () => this.setState({ open: false })

    columns = [
        { title: '用户名', dataIndex: 'app_name', key: 'app_name' },
        { title: '登录名', dataIndex: 'role_desc', key: 'role_desc' }
    ]

    render() {

        let footer = [
            <Button key="cancel" size="large" loading={this.props.loading} onClick={this.handleCancel.bind(this)}>关闭</Button>
        ];

        return (
            <Modal maskClosable={false} footer={footer} closable={true} visible={this.state.open} title="角色一览" confirmLoading={this.props.loading} onCancel={this.handleCancel.bind(this)}>
                <Table loading={this.props.loading}
                    rowKey={record => record.app_name + "_" + record.role_desc}
                    dataSource={this.props.user.appRoles}
                    columns={this.columns}
                    bordered={false}
                    size={'small'}
                    pagination={false} />
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        loading: state.loading.models.user, user: state.user
    };
}
export default connect(mapStateToProps, null, null, { withRef: true })(UserAppRoles);