import React from 'react';
import {connect} from 'dva';
import {Link, browserHistory} from 'dva/router';
import {Cascader} from 'antd';
const R = require('ramda');


class IndustrySelect extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'app/getIndustryTree'
        });
    }

    render () {
        return (
            <span>
                <Cascader showSearch options={this.props.app.industryTree} {...R.omit(['app'])(this.props)} placeholder="请选择主营行业"/>
            </span>

        );
    }
}

export default connect(({app}) => ({app}))(IndustrySelect)



// WEBPACK FOOTER //
// ./public/src/components/commons/AreaSelect.js