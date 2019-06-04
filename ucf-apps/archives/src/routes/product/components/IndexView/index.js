
import React, {Component} from 'react';
import {actions} from 'mirrorx';
import {Tooltip, Menu, Icon, Loading} from 'tinper-bee';
import {deepClone, getHeight, getSortMap} from "utils";

import './index.less';


class IndexView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        }

    }

    componentWillMount() {
        //计算表格滚动条高度
        // this.resetTableHeight(true);
    }

    componentDidMount() {
        // actions.query.loadList(this.props.queryParam); // 查询默认条件
    }


    render() {
        const _this = this;
        const {showLoading} = _this;

        return (
            <div className='product'>
                <Loading showBackDrop={true} show={showLoading} fullScreen={true}/>
                <div>xxdsdfff</div>
            </div>
        )
    }
}

export default IndexView;
