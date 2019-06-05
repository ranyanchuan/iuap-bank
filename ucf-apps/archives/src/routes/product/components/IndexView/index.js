import React, {Component} from 'react';
import {actions} from 'mirrorx';

import {Loading, Tree, Icon, Col, Row, Form, Label, Button, FormControl} from 'tinper-bee';
import FormList from 'components/FormList';
import FormError from 'components/FormError';
import Select from 'bee-select';
import InputNumber from "bee-input-number";
import Header from 'components/Header';
import AltWidthLayout from '../AltWidthLayout';


import './index.less';

const {TreeNode} = Tree;
const FormItem = Form.FormItem;

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


    componentDidMount() {
        // actions.query.loadList(this.props.queryParam); // 查询默认条件
        actions.product.getProductTreeData(); // 获取产品树

    }

    onSelect(info) {
        console.log('selected', info);
        actions.product.getProductInfoData(); // 获取产品信息

    }

    onSearchTree = (value) => {
        console.log("values", value)
        // const expandedKeys = [];
        // dataList.forEach((item) => {
        //     if (item.key.indexOf(value) > -1) {
        //         expandedKeys.push(getParentKey(item.key, gData));
        //     }
        // });
        // const uniqueExpandedKeys = [];
        // expandedKeys.forEach((item) => {
        //     if (item && uniqueExpandedKeys.indexOf(item) === -1) {
        //         uniqueExpandedKeys.push(item);
        //     }
        // });
        // this.setState({
        //     expandedKeys: uniqueExpandedKeys,
        //     searchValue: value,
        //     autoExpandParent: true,
        // });
    }


    onSave = () => {

        this.props.form.validateFields((err, values) => {
            console.log("values", values);
        });
    }

    render() {
        const _this = this;
        const {form, showLoading} = _this.props;
        const {rowData} = _this.state;
        const {getFieldProps, getFieldError} = form;

        return (
            <div className='product'>
                <Loading showBackDrop={true} show={showLoading} fullScreen={true}/>
                <Header title="树型档案示例">
                    <Button colors="primary" onClick={this.onSave} className="right-button">保存</Button>
                </Header>

                <AltWidthLayout
                    // contentWidth={}
                    leftWidth='200px'
                    // rightWidth={}
                >
                    <LeftContainer>

                        <FormControl
                            placeholder="Search"
                            onChange={this.onSearchTree}
                            className='search-input'
                        />

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

                        <Form className="auto-form">
                            <FormItem layoutOpt={layoutOpt} className="auto-form-item">
                                <Label className="auto-label">司龄</Label>
                                <div className="auto-content">
                                    <InputNumber
                                        iconStyle="one"
                                        min={0}
                                        step={1}
                                        className={"input-number-int"}
                                        {
                                            ...getFieldProps('serviceYearsCompany', {
                                                initialValue: "",
                                                rules: [{
                                                    required: true,
                                                    message: '司龄必输'
                                                }],
                                            })
                                        }
                                    />
                                    <FormError errorMsg={getFieldError('serviceYearsCompany')}/>
                                </div>
                            </FormItem>

                            <FormItem layoutOpt={layoutOpt} className="auto-form-item">
                                <Label className="auto-label">司龄</Label>
                                <div className="auto-content">
                                    <InputNumber
                                        iconStyle="one"
                                        min={0}
                                        step={1}
                                        className={"input-number-int"}
                                        {
                                            ...getFieldProps('serviceYearssCompany', {
                                                initialValue: "",
                                                rules: [{
                                                    required: true,
                                                    message: '司龄'
                                                }],
                                            })
                                        }
                                    />
                                    <FormError errorMsg={getFieldError('servisceYearsCompany')}/>
                                </div>
                            </FormItem>


                            <FormItem className="auto-form-item">
                                <Label className="auto-label">司龄</Label>
                                <div className="auto-content">
                                    <InputNumber
                                        iconStyle="one"
                                        min={0}
                                        step={1}
                                        className={"input-number-int"}
                                        {
                                            ...getFieldProps('serviceYeawrsCompany', {
                                                initialValue: "",
                                                rules: [{
                                                    required: true,
                                                    message: '司龄xxx必输'
                                                }],
                                            })
                                        }
                                    />
                                    <FormError errorMsg={getFieldError('serviceYeawrsCompany')}/>
                                </div>
                            </FormItem>


                            <FormItem className="auto-form-item">
                                <Label className="auto-label">领取方式领取</Label>
                                <div className="auto-content">
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
                                </div>
                            </FormItem>

                            <FormItem className="auto-form-item">
                                <Label className="auto-label">领取方式</Label>
                                <div className="auto-content">
                                    <Select
                                        {...getFieldProps('pick1Type', {
                                                initialValue: "",
                                                rules: [{
                                                    required: true, message: '请选择领取方式',
                                                }],

                                            }
                                        )}
                                    >
                                        <Option value="">请选择</Option>
                                        <Option value={'1'}>转账</Option>
                                        <Option value={'2'}>现金</Option>
                                    </Select>
                                    <FormError errorMsg={getFieldError('pick1Type')}/>
                                </div>
                            </FormItem>
                        </Form>

                    </RightContainer>
                </AltWidthLayout>
                <div></div>

            </div>
        )
    }
}

export default FormList.createForm()(IndexView);

