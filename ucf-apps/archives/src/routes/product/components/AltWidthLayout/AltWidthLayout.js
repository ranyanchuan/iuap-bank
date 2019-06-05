import React, {Component} from 'react';

import {Loading, Tree, Icon, Col, Row} from 'tinper-bee';

import {deepClone, getHeight, getSortMap} from "utils";


import './index.less';

class AltWidthLayout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            resizeLeft: '0px',
            leftWidth: 'calc(30% - 5px)',
            rightWidth: '70%',
            contentWidth: '100%',
        }
    }


    componentDidMount() {

        let {contentWidth = '100%', leftWidth = '200px', rightWidth} = this.props;
        if (!rightWidth) {
            rightWidth = `calc(100% - 5px - ${leftWidth})`;
        }
        this.setState({contentWidth, leftWidth, rightWidth});

    }


    onMouseDownLine = (e) => {
        const _this = this;
        e = e || window.event;

        let startX = e.clientX;
        let {parentElement, offsetLeft, offsetWidth} = e.target;

        document.onmousemove = function (e) {
            let endX = e.clientX;

            let moveLen = offsetLeft + (endX - startX);
            let maxT = parentElement.clientWidth - offsetWidth;
            if (moveLen < 150) {
                moveLen = 150; //最小宽
            }
            if (moveLen > maxT - 150) {
                moveLen = maxT - 150; //最大宽
            }

            const [leftWidth, rightWidth] = [moveLen + "px", (parentElement.clientWidth - moveLen - 5) + "px"];
            _this.setState({resizeLeft: moveLen, leftWidth, rightWidth});
        }
        document.onmouseup = function (evt) {
            document.onmousemove = null;
            document.onmouseup = null;
            evt.target.releaseCapture && evt.target.releaseCapture();
        }

        e.target.setCapture && e.target.setCapture();
        return false;

    }


    render() {
        const _this = this;
        const {children} = _this.props;
        const {leftWidth, resizeLeft, rightWidth, contentWidth} = _this.state;

        let leftContainer = null;
        let rightContainer = null;
        if (children instanceof Array) {
            children.forEach(element => {
                if (element.type.name === "LeftContainer") {
                    leftContainer = element;
                }
                if (element.type.name === "RightContainer") {
                    rightContainer = element;
                }
            });
        } else {
            if (children.type.name === "LeftContainer") {
                leftContainer = children;
            }
            if (children.type.name === "RightContainer") {
                rightContainer = children;
            }
        }


        return (
            <div style={{width: contentWidth, height: getHeight()}} className="alt-content">
                <div className="alt-width-left" style={{width: leftWidth}}>
                    {leftContainer}
                </div>
                <div className="resize"
                     onMouseDown={this.onMouseDownLine}
                     style={{left: resizeLeft}}
                />
                <div className="alt-width-right" style={{width: rightWidth}}>
                    {rightContainer}
                </div>
            </div>
        )
    }
}

export default AltWidthLayout;

