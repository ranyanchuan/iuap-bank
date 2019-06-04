import React from 'react';

class LeftContainer extends React.Component {
    static show = true;

    render() {
        return this.props.children
    }
}

export default LeftContainer;
