import React from 'react';
import {connect} from 'dva';
import {Link, browserHistory} from 'dva/router';
import {Select} from 'antd';
const R = require('ramda');

const Option = Select.Option;


class ManageSelect extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'app/getManagerList',
        });
    }

    render () {
        /**
         * sprCode:
         *          fkmanager   风控经理
         *          gdmanager   跟单经理
         *          tgmanager   通关经理
         *          ywmanager   业务经理
         * @type {Array}Array
         */
        let list = R.isNil(this.props.app.manager[this.props.sprCode]) ? [] : this.props.app.manager[this.props.sprCode];
        return (
            <Select showSearch {...R.omit(['app'])(this.props)}  style={this.props.style}>
                {
                    R.isNil(list) || R.isEmpty(list)  ? <Option value=""> </Option>
                        :
                    list.map(item => {
                        return (<Option value={item.userId} key={item.userId}>{item.username}</Option>);
                    })
                }
            </Select>
        );
    }
}

export default connect(({app}) => ({app}))(ManageSelect)