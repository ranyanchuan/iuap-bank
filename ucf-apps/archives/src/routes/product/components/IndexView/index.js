import React, {Component} from 'react';
import {actions} from 'mirrorx';

import {Loading, Tree, Icon, Col, Row} from 'tinper-bee';
import FormList from 'components/FormList';
import FormError from 'components/FormError';
import Select from 'bee-select';
import moment from "moment";
import InputNumber from "bee-input-number";
import Header from 'components/Header';
import AltWidthLayout from '../AltWidthLayout';


import './index.less';

const {TreeNode} = Tree;
const FormItem = FormList.Item;

const {LeftContainer, RightContainer} = AltWidthLayout;

const layoutOpt = null;


const defaultProps = {
    keys: ['0-0-0', '0-0-1']
}

const mockTreeData = [{
    key: "0-0-0",
    title: "0-0-0-title",
    children: [
        {
            key: "0-1-0",
            title: "0-1-0-Leaf",
        },
        {
            key: "0-1-1",
            title: "0-1-1-title",
            children: [
                {
                    key: "1-0-0",
                    title: "1-0-0-title",
                },
                {
                    key: "1-1-0",
                    title: "1-1-0-title",
                },
            ]
        }
    ],
}]


class IndexView extends Component {
    constructor(props) {
        super(props);
        const keys = this.props.keys;
        this.state = {
            showModal: false,
            defaultExpandedKeys: keys,
            defaultSelectedKeys: keys,
            defaultCheckedKeys: keys,
            checkedKeys: {checked: keys},
        }

    }

    componentWillMount() {
        //计算表格滚动条高度
        // this.resetTableHeight(true);
    }

    componentDidMount() {
        // actions.query.loadList(this.props.queryParam); // 查询默认条件
    }

    onSelect(info) {
        console.log('selected', info);
    }


    render() {
        const _this = this;
        const {form, showLoading} = _this.props;
        const {rowData} = _this.state;
        const {getFieldProps, getFieldError} = form;

        return (
            <div className='product'>
                <Loading showBackDrop={true} show={showLoading} fullScreen={true}/>
                <Header title="树型档案示例"/>

                <AltWidthLayout
                    // contentWidth={}
                    leftWidth='200px'
                    // rightWidth={}
                >
                    <LeftContainer>
                        <Tree className="myCls" showLine
                            // defaultExpandedKeys={this.state.defaultExpandedKeys}
                            // defaultSelectedKeys={this.state.defaultSelectedKeys}
                            // defaultCheckedKeys={this.state.defaultCheckedKeys}
                              defaultExpandAll={true}
                              checkStrictly
                              showIcon
                              cancelUnSelect={true}
                              onSelect={this.onSelect}
                        >
                            <TreeNode title="parent 1" key="0-0" icon={<Icon type="uf-treefolder"/>}>
                                <TreeNode title="parent 1-0" key="0-0-0" icon={<Icon type="uf-treefolder"/>}>
                                    <TreeNode title="leaf" key="0-0-0-0" icon={<Icon type="uf-list-s-o"/>}/>
                                    <TreeNode title="leaf" key="0-0-0-1" icon={<Icon type="uf-list-s-o"/>}/>
                                </TreeNode>
                                <TreeNode title="parent 1-1" key="0-0-1" icon={<Icon type="uf-treefolder"/>}>
                                    <TreeNode title={<span>sss</span>} key="0-0-1-0" icon={<Icon type="uf-list-s-o"/>}/>
                                </TreeNode>
                            </TreeNode>
                        </Tree>
                    </LeftContainer>
                    <RightContainer>
                        <FormList>
                            <FormItem label={"司龄"} layoutOpt={layoutOpt}>
                                <InputNumber
                                    iconStyle="one"
                                    min={0}
                                    step={1}
                                    className={"input-number-int"}
                                    {
                                        ...getFieldProps('serviceYearsCompany', {
                                            initialValue: ""
                                        })
                                    }
                                />
                                <FormError errorMsg={getFieldError('serviceYearsCompany')}/>
                            </FormItem>

                            <FormItem label={"领取方式"} layoutOpt={layoutOpt}>
                                <Select
                                    {...getFieldProps('pickType', {
                                            initialValue: "",
                                            rules: [{
                                                required: false, message: '请选择领取方式',
                                            }],

                                        }
                                    )}
                                >
                                    <Option value="">请选择</Option>
                                    <Option value={'1'}>转账</Option>
                                    <Option value={'2'}>现金</Option>
                                </Select>
                                <FormError errorMsg={getFieldError('pickType')}/>
                            </FormItem>

                            <FormItem label={"领取方式"} layoutOpt={layoutOpt}>
                                <Select
                                    {...getFieldProps('pickType', {
                                            initialValue: "",
                                            rules: [{
                                                required: false, message: '请选择领取方式',
                                            }],

                                        }
                                    )}
                                >
                                    <Option value="">请选择</Option>
                                    <Option value={'1'}>转账</Option>
                                    <Option value={'2'}>现金</Option>
                                </Select>
                                <FormError errorMsg={getFieldError('pickType')}/>
                            </FormItem>
                        </FormList>
                    </RightContainer>
                </AltWidthLayout>
                <div></div>

            </div>
        )
    }
}

export default FormList.createForm()(IndexView);

