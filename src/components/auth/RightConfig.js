import React from 'react';
import { Modal, Transfer } from 'antd';
const R = require('ramda');

export default class RightConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //open: false,
            targetKeys: props.defaultRights,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({targetKeys: R.isNil(nextProps.defaultRights) ? [] : nextProps.defaultRights});
    }

/*     handleCancel = () => {
        this.setState({ open: false })
    }

    handleOpen = () => {
        this.setState({ open: true })
    } */

    handleConfirm = () => {
        if(this.props.handleSaveMenuRigths)this.props.handleSaveMenuRigths(this.props.menuId, this.state.targetKeys);
    }

    handleCancel = () => {
        this.props.dispatch({
            type: 'menu/setEditModel',
            payload: {
                open: false
            }
        });
    }

    filterOption = (inputValue, option) => {
        return option.rightsName.indexOf(inputValue) >= 0;
    }

    handleChange = (targetKeys) => {
        this.setState({ targetKeys });
    }
    render() {
        return (
            <Modal visible={this.props.open} title={"配置菜单资源"} width={700} wrapClassName="vertical-center-modal"
                onCancel={this.handleCancel} onOk={this.handleConfirm}>
                <Transfer
                    showSearch
                    rowKey={item => item.rightsId}
                    titles={["待选资源", "已选资源"]}
                    dataSource={this.props.dataSource}
                    filterOption={this.filterOption}
                    targetKeys={this.state.targetKeys}
                    onChange={this.handleChange}
                    render={item => `${item.rightsName}`}
                    listStyle={{
                        width: 300,
                        height: 500,
                    }}
                />
            </Modal>
        );
    }
}