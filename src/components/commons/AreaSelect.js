import React from 'react';
import {connect} from 'dva';
import {Link, browserHistory} from 'dva/router';
import {Cascader} from 'antd';
const R = require('ramda');


class AreaSelect extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'app/getAreaTree'
        });
    }

    render () {
        return (
            <Cascader showSearch options={this.props.app.areaTree} {...R.omit(['app', 'dispatch'])(this.props)} placeholder="请选择地区"/>
        );
    }
}

export default connect(({app}) => ({app}))(AreaSelect)