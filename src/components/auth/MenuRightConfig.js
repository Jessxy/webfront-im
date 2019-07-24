import React from 'react';
import { connect } from 'dva';
import { Modal, Transfer } from 'antd';
const R = require('ramda');

class MenuRightConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            defaultKeys: [],
            targetKeys: [],
            menuId: null
        }
    }

    handleCancel = () => {
        this.setState({ open: false })
    }

    handleOpen = (menuId) => {
        this.setState({ open: true, menuId, targetKeys: this.props.menu.menuRightIds, defaultKeys: this.props.menu.menuRightIds })
    } 

    handleConfirm = () => {
        if(!R.equals(this.state.defaultKeys, this.state.targetKeys)){
            this.props.dispatch({
                type: 'menu/configMenuRights',
                payload: { 
                    menuId: this.state.menuId,
                    rightsIds: this.state.targetKeys,
                    onSuccess: () => {
                        this.handleCancel();
                        if(this.props.refreshList)this.props.refreshList();
                    }
                }
            })
        } else this.handleCancel();
    }

    filterOption = (inputValue, option) => {
        return option.rightsName.indexOf(inputValue) >= 0;
    }

    handleChange = (targetKeys) => {
        this.setState({ targetKeys });
    }
    render() {
        return (
            <Modal maskClosable={false} visible={this.state.open} title={"配置菜单权限"} width={700} confirmLoading={this.props.loading}
                onCancel={this.handleCancel} onOk={this.handleConfirm}>
                <Transfer
                    showSearch
                    rowKey={item => item.rightsId}
                    titles={["可选的权限", "已选的权限"]}
                    dataSource={this.props.rights.allRights}
                    filterOption={this.filterOption}
                    targetKeys={this.state.targetKeys}
                    onChange={this.handleChange}
                    render={item => item.rightsName}
                    listStyle={{
                        width: 300,
                        height: 500,
                    }}
                />
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        loading: state.loading.models.menu, menu: state.menu, rights: state.rights
    };
}

export default connect(mapStateToProps, null, null, {withRef:true})(MenuRightConfig);
