import React, {Component} from 'react';
import {actions} from 'mirrorx';

import {Loading, Tree, Icon, Col, Row, Form, Label, Button, FormControl} from 'tinper-bee';
import FormList from 'components/FormList';
import FormError from 'components/FormError';
import Select from 'bee-select';
import InputNumber from "bee-input-number";
// import RefCommon from 'components/RefCommon';


import './index.less';

const FormItem = Form.FormItem;

class TreeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            rowData: {},
        }

    }


    componentDidMount() {
        // actions.query.loadList(this.props.queryParam); // 查询默认条件
        // actions.product.getProductTreeData(); // 获取产品树
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
            <Form className="auto-form">


                <FormItem className="auto-form-item">
                    <Label className="auto-label red-star">产品树父主键</Label>
                    <div className="auto-content">
                        <FormControl className="auto-input"
                                     {...getFieldProps('parentId', {
                                         initialValue: '',
                                         rules: [{
                                             required: true,
                                             message: '请输入产品树父主键'
                                         }],
                                     })}
                        />
                        <FormError errorMsg={getFieldError('parentId')}/>
                    </div>
                </FormItem>


                <FormItem className="auto-form-item">
                    <Label className="auto-label red-star">产品属性</Label>
                    <div className="auto-content">
                        <FormControl className="auto-input"
                                     {...getFieldProps('pk_prod_attr', {
                                         initialValue: '',
                                         rules: [{
                                             required: true,
                                             message: '请输入产品属性'
                                         }],
                                     })}
                        />
                        <FormError errorMsg={getFieldError('pk_prod_attr')}/>
                    </div>
                </FormItem>


                <FormItem className="auto-form-item">
                    <Label className="auto-label red-star">产品编码</Label>
                    <div className="auto-content">
                        <FormControl className="auto-input"
                                     {...getFieldProps('code', {
                                         initialValue: '',
                                         rules: [{
                                             required: true,
                                             message: '请输入产品编码'
                                         }],
                                     })}
                        />
                        <FormError errorMsg={getFieldError('code')}/>
                    </div>
                </FormItem>


                <FormItem className="auto-form-item">
                    <Label className="auto-label red-star">产品分类</Label>
                    <div className="auto-content">
                        <Select
                            {...getFieldProps('pk_product_type', {
                                    initialValue: "",
                                    rules: [{
                                        required: true, message: '请选择产品分类',
                                    }],

                                }
                            )}
                        >
                            <Option value="">请选择</Option>
                            <Option value={'1'}>资产类</Option>
                            <Option value={'2'}>负债类</Option>
                            <Option value={'3'}>中间业务类</Option>
                        </Select>
                        <FormError errorMsg={getFieldError('pk_product_type')}/>
                    </div>
                </FormItem>


                <FormItem className="auto-form-item">
                    <Label className="auto-label red-star">是否末级</Label>
                    <div className="auto-content">
                        <Select
                            {...getFieldProps('isSon', {
                                    initialValue: "",
                                    rules: [{
                                        required: true, message: '请选择是否末级',
                                    }],

                                }
                            )}
                        >
                            <Option value="">请选择</Option>
                            <Option value={'1'}>是</Option>
                            <Option value={'2'}>否</Option>
                        </Select>
                        <FormError errorMsg={getFieldError('isSon')}/>
                    </div>
                </FormItem>

                <FormItem className="auto-form-item">
                    <Label className="auto-label red-star">级次</Label>
                    <div className="auto-content">
                        <InputNumber
                            iconStyle="one"
                            min={0}
                            max={Math.pow(10, 10) - 1}
                            step={1}
                            className={"input-number-int"}
                            {
                                ...getFieldProps('level_value', {
                                    initialValue: "",
                                    rules: [{
                                        required: true,
                                        message: '请输入级次'
                                    }],
                                })
                            }
                        />
                        <FormError errorMsg={getFieldError('level_value')}/>
                    </div>
                </FormItem>


                <FormItem className="auto-form-item">
                    <Label className="auto-label red-star">产品名称</Label>
                    <div className="auto-content">
                        <FormControl className="auto-input"
                                     {...getFieldProps('name', {
                                         initialValue: '',
                                         rules: [{
                                             required: true,
                                             message: '请输入产品名称'
                                         }],
                                     })}
                        />
                        <FormError errorMsg={getFieldError('name')}/>
                    </div>
                </FormItem>


                <FormItem className="auto-form-item">
                    <Label className="auto-label red-star">内部编码</Label>
                    <div className="auto-content">
                        <FormControl className="auto-input"
                                     {...getFieldProps('inner_code', {
                                         initialValue: '',
                                         rules: [{
                                             required: true,
                                             message: '请输入内部编码'
                                         }],
                                     })}
                        />
                        <FormError errorMsg={getFieldError('inner_code')}/>
                    </div>
                </FormItem>

                <FormItem className="auto-form-item">
                    <Label className="auto-label red-star">备注</Label>
                    <div className="auto-content">
                        <FormControl className="auto-input"
                                     {...getFieldProps('memo', {
                                         initialValue: '',
                                         rules: [{
                                             required: true,
                                             message: '请输入备注'
                                         }],
                                     })}
                        />
                        <FormError errorMsg={getFieldError('memo')}/>
                    </div>
                </FormItem>

                {/*<FormItem className="auto-form-item">*/}
                {/*<Label className="auto-label red-star">组织机构</Label>*/}
                {/*<div className="auto-content">*/}
                {/*<RefCommon*/}
                {/*// rowData={typeof rowData !== 'undefined' && rowData}*/}
                {/*// btnFlag={typeof btnFlag !== 'undefined' && btnFlag}*/}
                {/*type={1}*/}
                {/*title={'组织机构'}*/}
                {/*refPath={'/pap_basedoc/common-ref/'}*/}
                {/*param={{*/}
                {/*refCode: 'neworganizition_tree'*/}
                {/*}}*/}

                {/*{...getFieldProps('orgId', {*/}
                {/*initialValue: JSON.stringify({*/}
                {/*refname: (typeof rowData !== 'undefined' && rowData['orgName']) || '',*/}
                {/*refpk: (typeof rowData !== 'undefined' && rowData['orgId']) || ''*/}
                {/*}),*/}
                {/*})}*/}
                {/*/>*/}
                {/*<FormError errorMsg={getFieldError('orgId')}/>*/}
                {/*</div>*/}
                {/*</FormItem>*/}


                <FormItem className="auto-form-item">
                    <Label className="auto-label red-star">是否启用</Label>
                    <div className="auto-content">
                        <Select
                            {...getFieldProps('isEnable', {
                                    initialValue: "",
                                    rules: [{
                                        required: true, message: '请选择是否启用',
                                    }],

                                }
                            )}
                        >
                            <Option value="">请选择</Option>
                            <Option value={'1'}>是</Option>
                            <Option value={'2'}>否</Option>
                        </Select>
                        <FormError errorMsg={getFieldError('isEnable')}/>
                    </div>
                </FormItem>

                <FormItem className="auto-form-item">
                    <Label className="auto-label red-star">领取方式</Label>
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


        )
    }
}

export default FormList.createForm()(TreeForm);

