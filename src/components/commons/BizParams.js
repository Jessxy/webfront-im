import React from 'react';
import {connect} from 'dva';
import {Link, browserHistory} from 'dva/router';
import {Select} from 'antd';
const R = require('ramda');

const Option = Select.Option;


class BusinessParams extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'app/getBusinessParamsByCode',
            sprCode: this.props.sprCode
        });
    }

    render () {
        let all = R.isNil(this.props.all) ? false : this.props.all;
        let list = R.isNil(this.props.app.bizParams[this.props.sprCode]) ? [] : this.props.app.bizParams[this.props.sprCode];
        if(all) list = R.concat([{sprName: "", sprValue: '全部'}])(list);
        let disabledKeys = R.isNil(this.props.disabledKeys) ? [] : this.props.disabledKeys;
        
        return (
            <Select disabled={this.props.disabled} showSearch {...R.omit(['app'])(this.props)} placeholder={this.props.placeholder ? this.props.placeholder : "可通过输入代码或关键字搜索"}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 || option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                style={this.props.style} mode={this.props.mode} allowClear
            >
                {
                    list.map(item => {
                        return (<Option value={item.sprName} key={R.isEmpty(item.sprName) ? "all" : item.sprName} disabled={R.contains(item.sprName, disabledKeys)}>{item.sprValue}</Option>);
                    })
                }
            </Select>
        );
    }
}

export default connect(({app}) => ({app}))(BusinessParams)