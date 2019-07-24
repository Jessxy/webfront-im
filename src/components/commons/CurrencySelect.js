import React from 'react';
import {connect} from 'dva';
import {Link, browserHistory} from 'dva/router';
import {Select} from 'antd';
const R = require('ramda');
const Option = Select.Option;


class CurrencySelect extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'app/getAllCurrencys'
        });
    }

    render () {
        return (
            <Select showSearch {...R.omit(['app'])(this.props)} placeholder="可通过输入代码或关键字搜索"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 || option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                {
                    (R.isNil(this.props.app.currencys) ? [] : this.props.app.currencys).map(item => {
                    return (<Option value={item.currencyName} key={item.currencyName}>{item.currencyName + "[" + item.currencyCode + "]" + item.currencyDesc}</Option>);
                    })
                }
            </Select>
        );
    }
}

export default connect(({app}) => ({app}))(CurrencySelect)



// WEBPACK FOOTER //
// ./public/src/components/commons/CurrencySelect.js