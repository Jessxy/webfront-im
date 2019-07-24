import React from 'react';
import { connect } from 'dva';
import { Modal, Transfer, Tree } from 'antd';
const R = require('ramda');

class RoleMenuConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            autoExpandParent: true,
            expandedKeys: [],
            selectedKeys: [],
            open: false,
            roleId: null,
            defaultRoleMenus: [],
            roleMenus: []
        }
    }

    handleCancel = () => {
        this.setState({ open: false, expandedKeys: [], autoExpandParent: true, selectedKeys: [] })
    }

    handleOpen = (roleId, roleMenus) => {
        this.setState({ open: true, roleId, roleMenus, defaultRoleMenus: roleMenus })
    }

    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false
        })
    }

    handleConfirm = () => {
        if (!R.equals(this.state.defaultRoleMenus, this.state.roleMenus)) {
            this.props.dispatch({
                type: 'role/configRoleMenu',
                payload: {
                    roleId: this.state.roleId,
                    menuIds: this.state.roleMenus,
                    onSuccess: () => {
                        this.handleCancel();
                        if (this.props.refreshList) this.props.refreshList();
                    }
                }
            })
        } else this.handleCancel();
    }

    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children && item.children.length > 0) {
                return (
                    <Tree.TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </Tree.TreeNode >
                );
            }
            return <Tree.TreeNode title={item.title} key={item.key} />;
        });
    }

    onSelect = (selectedKeys) => {
        this.setState({ selectedKeys });
    }

    onCheck = (roleMenus) => {
        this.setState({ roleMenus });
    }

    render() {
        return (
            <Modal maskClosable={false} visible={this.state.open} title={"配置角色菜单"} width={700} confirmLoading={this.props.loading}
                onCancel={this.handleCancel} onOk={this.handleConfirm}>
                <Tree checkable checkedKeys={this.state.roleMenus}
                    onCheck={this.onCheck.bind(this)}
                    expandedKeys={this.state.expandedKeys}
                    autoExpandParent={this.state.autoExpandParent}
                    onExpand={this.onExpand}
                    selectedKeys={this.state.selectedKeys}
                    onSelect={this.onSelect.bind(this)}
                >
                    {this.renderTreeNodes(this.props.menu.menuTree)}
                </Tree>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        loading: state.loading.models.role, menu: state.menu
    };
}

export default connect(mapStateToProps, null, null, { withRef: true })(RoleMenuConfig);
