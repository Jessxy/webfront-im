import React from 'react';
import {connect} from 'dva';
import {Select} from 'antd';
import OperatorConstant from "../../../config/OperatorConstant.config";

const R = require('ramda');


class RecAccSelect extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if(!R.isNil(this.props.cstId)){
            // this.props.dispatch({
            //     type: 'app/getRecAccListOfCstid',
            //     cstId: this.props.cstId
            // });
        }

    }

    render () {
        let type = this.props.type;
        let list = R.isNil(this.props.app.recAcc[this.props.cstId]) ? [] : this.props.app.recAcc[this.props.cstId];
        let all = R.isNil(this.props.all) ? false : this.props.all;

        return (
            <div>
                {R.isNil(type) || OperatorConstant.recAcc_get_linkman == type ?
                    <Select showSearch {...R.omit(['app'])(this.props)} placeholder="可通过输入代码或关键字搜索"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 || option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        {!all ? "" : <Option value={""} key="all">全部</Option>}
                        {
                            list.map(item => {
                                return (<Option value={item.id} key={item.id}>{item.payeename}</Option>);
                            })
                        }
                    </Select>
                    : ""}

                {OperatorConstant.recAcc_get_account == type ?
                    <Select showSearch {...R.omit(['app'])(this.props)} placeholder="可通过输入代码或关键字搜索"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 || option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        {!all ? "" : <Option value={""} key="all">全部</Option>}
                        {
                            list.map(item => {
                                return (<Option value={item.payeeno} key={item.id}>{item.payeeno}</Option>);
                            })
                        }
                    </Select>
                    :""}
            </div>




        );
    }
}

export default connect(({app}) => ({app}))(RecAccSelect)



// WEBPACK FOOTER //
// ./public/src/components/commons/RecAccSelect.js
