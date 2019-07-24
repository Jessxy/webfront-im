import React from "react";
const R = require('ramda');

export default class RightBox extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
    }

    render() {
        let rights = R.isNil(sessionStorage.getItem("userRights")) ? [] : sessionStorage.getItem("userRights");
        let resource = this.props.resource;
        let totalStyle = Object.assign({}, { display: 'flex' }, this.props.style);

        totalStyle = Object.assign({}, totalStyle, { display: R.contains(resource)(rights) ? "inline" : 'none' });
        let btnComponents = this.props.children;

        return (
            <div style={totalStyle} onClick={this.handleClick}>
                {btnComponents}
                {this.props.split ? <div className="ant-divider" /> : ""}
            </div>
        );
    }
}

RightBox.propTypes = {
    resource: React.PropTypes.string.isRequired,
}