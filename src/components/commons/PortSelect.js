import React from 'react';
import {connect} from 'dva';
import {Link, browserHistory} from 'dva/router';
import {Select} from 'antd';
const R = require('ramda');
const Option = Select.Option;

class PortSelect extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'app/getAllPorts'
        });
    }
    render () {
        return (
            <Select showSearch {...R.omit(['app'])(this.props)}
                placeholder="可通过输入代码或关键字搜索"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                {
                    (R.isNil(this.props.app.ports) ? [] : this.props.app.ports).map(item => {
                    return (<Option value={item.placeCode} key={item.placeCode}>{"[" + item.placeCode + "]" + item.placeName}</Option>);
                    })
                }
            </Select>
        ); 
    }
}

export default connect(({app}) => ({app}))(PortSelect)



// WEBPACK FOOTER //
// ./public/src/components/commons/PortSelect.js