import React, {Component} from 'react';

import {Loading, Tree, Icon, Col, Row, Form, Label, Button, FormControl, Select, InputNumber} from 'tinper-bee';
import FormError from 'components/FormError';

import './index.less';

const FormItem = Form.FormItem;
const {Option} = Select;

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
        const {onRef} = this.props;
        if (onRef) {
            this.props.onRef(this)
        }
    }


    onSaveForm = () => { // 获取表单数据
        let result = null;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                result = values; //  验证通过
            }
        });
        return result;
    }


    render() {
        const _this = this;
        const {form, showLoading, archivesInfo, status} = _this.props;

        const disabled = ['add', 'update'].includes(status) ? false : true


        const {getFieldProps, getFieldError} = form;

        return (
            <Form className="auto-form">

                <FormItem className="auto-form-item">
                    <Label className="auto-label red-star">产品名称</Label>
                    <div className="auto-content">
                        <FormControl className="auto-input" disabled={disabled}
                                     {...getFieldProps('name', {
                                         initialValue: archivesInfo.name || '',
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
                    <Label className="auto-label red-star">产品属性</Label>
                    <div className="auto-content">
                        <FormControl className="auto-input" disabled={disabled}

                                     {...getFieldProps('pk_prod_attr', {
                                         initialValue: archivesInfo.pk_prod_attr || '',
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
                                     disabled={status !== 'add'}
                                     {...getFieldProps('code', {
                                         initialValue: archivesInfo.code || '',
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
                        <Select disabled={disabled}
                                {...getFieldProps('pk_product_type', {
                                        initialValue: archivesInfo.pk_product_type || '',
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
                    <Label className="auto-label red-star">备注</Label>
                    <div className="auto-content">
                        <FormControl className="auto-input" disabled={disabled}
                                     {...getFieldProps('memo', {
                                         initialValue: archivesInfo.memo || '',
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
                        <Select disabled={disabled}
                                {...getFieldProps('isEnable', {
                                        initialValue: archivesInfo.isEnable || '',
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

            </Form>


        )
    }
}

export default Form.createForm()(TreeForm);

