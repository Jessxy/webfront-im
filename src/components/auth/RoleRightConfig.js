import React from 'react';
import { connect } from 'dva';
import { Modal, Transfer, Tree } from 'antd';
const R = require('ramda');

class RoleRightConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            autoExpandParent: true,
            expandedKeys: [],
            open: false,
            roleId: null,
            defaultRoleRights: [],
            roleRights: [],
            cachedMenuId: null //缓存当前点击的菜单id，如果再次点击相同的则不去查权限列列表
        }
    }

    handleCancel = () => {
        this.setState({ open: false, expandedKeys: [], autoExpandParent: true, roleRights: [], defaultRoleRights: [], cachedMenuId: null });
        this.props.dispatch({
            type: 'menu/refreshState',
            payload: {
                menuRights: [],
                menuRightIds: []
            }
        })
    }

    handleOpen = (roleId, roleRights) => {
        this.setState({ open: true, roleId, roleRights, defaultRoleRights: roleRights })
    }

    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false
        })
    }

    handleConfirm = () => {
        if (!R.equals(this.state.defaultRoleRights, this.state.roleRights)) {
            this.props.dispatch({
                type: 'role/configRoleRights',
                payload: {
                    roleId: this.state.roleId,
                    rightsIds: this.state.roleRights,
                    onSuccess: () => {
                        this.handleCancel();
                        if (this.props.refreshList) this.props.refreshList();
                    }
                }
            })
        } else this.handleCancel();
    }

    filterOption = (inputValue, option) => {
        return option.role_desc.indexOf(inputValue) >= 0;
    }

    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children && item.children.length > 0) {
                return (
                    <Tree.TreeNode title={item.title} key={item.key} dataRef={item} >
                        {this.renderTreeNodes(item.children)}
                    </Tree.TreeNode>
                );
            }
            return <Tree.TreeNode title={item.title} key={item.key} />;
        });
    }

    onSelectNode = (selectedKeys, e) => {
        //反选的时候不去查，重复的点击同一条不去查
        if (selectedKeys && selectedKeys.length > 0 && this.state.cachedMenuId !== parseInt(selectedKeys[0])) {
            this.props.dispatch({
                type: 'menu/queryMenuRights',
                payload: {
                    menuId: parseInt(selectedKeys[0]),
                    onSuccess: () => { this.setState({ cachedMenuId: parseInt(selectedKeys[0]) }) }
                }
            })
        }
    }

    handleChange = (targetKeys) => {
        let unionCollect = R.concat(R.intersection(this.state.roleRights, targetKeys), R.symmetricDifference(this.state.roleRights, targetKeys))//1.先取roleRights跟targetKeys的交集A
        let childCollect = R.difference(this.props.menu.menuRightIds)(targetKeys);//2.再取menuRightIds不包含targetKeys的子集B
        let result = R.difference(unionCollect)(childCollect);//3.最后取A不包含B的子集为最后结果
        this.setState({ roleRights: result });
    }

    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false
        })
    }

    render() {
        return (
            <Modal maskClosable={false} visible={this.state.open} title={"配置角色权限"} style={{ minWidth: 700 }} confirmLoading={this.props.loading}
                onCancel={this.handleCancel} onOk={this.handleConfirm}>
                <div style={{ display: 'flex' }}>
                    <div>
                        <div>角色菜单树</div>
                        <Tree onSelect={this.onSelectNode.bind(this)}
                            expandedKeys={this.state.expandedKeys}
                            autoExpandParent={this.state.autoExpandParent}
                            onExpand={this.onExpand}
                            selectedKeys={[this.state.cachedMenuId + ""]}
                        >
                            {this.renderTreeNodes(this.props.role.roleMenuTree)}
                        </Tree>

                    </div>
                    <Transfer
                        rowKey={item => item.rightsId}
                        dataSource={this.props.menu.menuRights}
                        filterOption={this.filterOption.bind(this)}
                        targetKeys={this.state.roleRights}
                        onChange={this.handleChange}
                        titles={["可选的权限", "已选的权限"]}
                        render={item => `${item.rightsName}`}
                        listStyle={{
                            marginLeft: 20,
                            marginRight: 20,
                            width: 200,
                            height: 300,
                        }}
                    />
                </div>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        loading: state.loading.models.role, role: state.role, menu: state.menu, rights: state.rights
    };
}

export default connect(mapStateToProps, null, null, { withRef: true })(RoleRightConfig);
