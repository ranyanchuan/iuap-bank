import React, {Component} from 'react';
import {actions} from 'mirrorx';

import {Loading, Tree, Icon, Col, Row, Form, Label, Button, FormControl} from 'tinper-bee';
import FormList from 'components/FormList';
import Header from 'components/Header';
import AltWidthLayout from '../AltWidthLayout';
import TreeForm from '../TreeForm';


import './index.less';

// 定义组件类常量
const {TreeNode} = Tree;


const {LeftContainer, RightContainer} = AltWidthLayout;

class IndexView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            searchTreeId: '',
            btnStatus: 'view',
            expandedKeys: [],
            autoExpandParent: false,
            editNode: {
                isHover: "",
                editKey: ""
            }

        }

    }

    //加载树信息
    componentDidMount() {
        actions.product.loadTree();
    }


    componentWillReceiveProps(nextProps) {
        const {content} = this.props;
        const {content: nextContent} = nextProps;
        if (nextContent && nextContent.length > 0 && nextContent !== content) {
            // 默认选中第一个
            const {id: searchTreeId} = nextContent[0];
            this.setState({searchTreeId});
        }

    }


    onExpand = expandedKeys => {
        this.setState({expandedKeys})
    }

    /**
     *
     * @description 搜索框onChange事件
     * @param {string} value 搜索框的输入值
     */
    onChange = value => {
        this.setState({searchValue: value});
    }

    /**
     *
     * @description 树节点回车搜索方法
     * @param {string} searchValue 搜索框的输入值
     */
    onSearch = async () => {
        const {searchValue} = this.state;
        await actions.product.getTreeByValue({searchValue})
    }


    /**
     *
     * @description 点击树节点title执行事件,此处直接使用props解构会出错，因此起别名nodeProps
     * @param {string} value 节点title值
     * @param {Object} e e为当前选中节点的事件信息
     */
    onSelect = (value, e) => {
        if (value && value.length > 0) {
            //  更新选中节点
            const searchTreeId = value[0];
            this.setState({searchTreeId});
            // 获取节点表单数据
            actions.product.getProduct({id: searchTreeId});
        }
    };


    /**
     *
     * @description 异步加载事件,点击图标时触发
     * @param {*} treeNode 当前点击节点
     * @returns null
     */
    onLoadData = (treeNode) => {

        console.log("treeNode", treeNode);
        let id = treeNode.props['eventKey'];
        let _this = this;

        return new Promise((resolve, reject) => {
            if (!_this.idLoaded(id)) {
                actions.product.loadTree({
                    id
                })
            }
            resolve();
        }).then(result => {
            console.log("result", result);
        }).catch(reason => {
            console.log('失败：' + reason);
        })
    }

    /**
     *
     * @description isLoaded、checkedLoaded为判断当前节点是否是否加载的方法
     * @param {string} id 为当前节点的id值,从后台获取得到
     * @returns {Boolean} true表示已加载、false表示为加载
     */
    idLoaded = (id) => {
        let _this = this;
        let {content} = _this.props,
            len = content.length;
        if (len > 0) {
            return _this.checkedLoaded(content, id);
        }

        return false;
    }

    checkedLoaded = (array, id) => {
        let len = array.length,
            isChecked = false;
        for (let i = 0; i < len; i++) {
            let item = array[i],
                children = item['children'];
            if (item['id'] == id) {
                if (children && children.length > 0) {
                    isChecked = true;
                    break;
                }
            } else {
                if (children) {
                    isChecked = this.checkedLoaded(children, id);
                }
            }
        }
        return isChecked;
    }


    // 删除节点
    onDelete = () => {
        const {searchTreeId} = this.state;
        actions.product.delProduct([{id: searchTreeId}]);
    }


    // 保存节点
    onSave = () => {

        // 获取表单数据
        let formData = this.child.onSaveForm();

        if (formData) {
            const {searchTreeId, btnStatus} = this.state;
            formData.parentId = searchTreeId;
            if (btnStatus === 'add') {  // 添加表单数据
                actions.product.addProduct(formData);
            } else {
                // 更新表单数据
                const {archivesInfo} = this.props;
                actions.product.updateProduct({...archivesInfo, ...formData});
            }
        }
    }


    // 添加
    onAddStatus = () => {
        this.setState({btnStatus: 'add'});
    }

    // 编辑
    onUpdateStatus = () => {
        this.setState({btnStatus: 'update'});
        // todo 获取当前节点内容
    }

    // 取消
    onCancel = () => {
        this.setState({btnStatus: 'view'});
    }


    render() {
        const _this = this;
        let {showLoading, content, archivesInfo} = _this.props;

        const {searchValue, searchTreeId, btnStatus, expandedKeys, autoExpandParent} = _this.state;

        console.log("content", content);

        // 节点循环
        const loop2 = data => data.map(item => {
            const index = item.name.search(searchValue);
            const beforeStr = item.name.substr(0, index);
            const afterStr = item.name.substr(index + searchValue.length);


            const title = index > -1 ? (
                <span>
                    {beforeStr}
                    <span style={{color: '#f50'}}>{searchValue}</span>
                    {afterStr}
				</span>
            ) : <span>{item.name}</span>;


            if (item.children && item.children.length) {
                return <TreeNode
                    className='tree-node'
                    hierarchy={item.parentId}
                    title={title}
                    key={item.id}
                >
                    {loop2(item.children)}
                </TreeNode>
            } else {
                return <TreeNode
                    className='tree-node'
                    hierarchy={item.parentId}
                    title={title}
                    key={item.id}
                    isLeaf={(item.isSon && item.isSon.toString() === '1') ? true : false}
                />
            }
        })


        return (
            <div className='product'>
                <Loading showBackDrop={true} show={showLoading} fullScreen={true}/>

                <Header title="左树右卡" back={true}/>

                <AltWidthLayout
                    // contentWidth={}
                    leftWidth='200px'
                    // rightWidth={}
                >
                    <LeftContainer>
                        <div className='tree'>

                            <div className='tree-search'>
                                <FormControl
                                    className="search-box"
                                    placeholder="Search"
                                    onChange={_this.onChange}
                                    onSearch={_this.onSearch}
                                    value={searchValue}
                                    type="search"
                                />
                            </div>
                            {
                                content.length ? (
                                    <Tree
                                        // 是否显示连接线
                                        showLine={true}

                                        // 设置显示复选框
                                        // checkable={true}

                                        // 设置打开节点时的图标
                                        openIcon={<Icon type="uf-arrow-down"/>}

                                        // 设置关闭节点时的图标
                                        closeIcon={<Icon type="uf-arrow-right"/>}

                                        // 打开或关闭节点时触发的方法
                                        onExpand={_this.onExpand}
                                        expandedKeys={expandedKeys}
                                        autoExpandParent={autoExpandParent}

                                        // 默认是否展开所有节点
                                        defaultExpandAll={true}

                                        // 点击节点数据回调函数
                                        onSelect={_this.onSelect}

                                        // 点击复选框回调函数
                                        // onCheck={_this.onSelect}

                                        // 编辑回调函数
                                        // onMouseEnter={_this.onMouseEnter}
                                        // onMouseLeave={_this.onMouseLeave}

                                        // 拖拽
                                        draggable={false}
                                        // onDragEnter={this.onDragEnter}
                                        // onDrop={this.onDrop}

                                        // 异步加载数据
                                        loadData={_this.onLoadData}

                                        selectedKeys={[searchTreeId]}
                                    >
                                        {loop2(content)}
                                    </Tree>
                                ) : (
                                    <div className="no-search-container">
                                        <span className="no-search">未查询到相关数据</span>
                                    </div>
                                )
                            }

                        </div>
                    </LeftContainer>
                    <RightContainer>

                        {!['add', 'update'].includes(btnStatus) ?
                            <div className="action-content">

                                <Button colors="primary" onClick={this.onAddStatus}>添加</Button>
                                <Button onClick={this.onUpdateStatus} bordered>编辑</Button>
                                <Button onClick={this.onDelete} bordered>删除</Button>
                            </div> :
                            <div className="action-content">
                                <Button colors="primary" onClick={this.onSave}>保存</Button>
                                <Button onClick={this.onCancel} bordered>取消</Button>
                            </div>
                        }


                        <TreeForm  // 设置ref属性
                            onRef={ref => this.child = ref}
                            archivesInfo={btnStatus !== 'add' ? archivesInfo : {}}
                            status={['add', 'update'].includes(btnStatus) ? false : true}
                        />
                    </RightContainer>
                </AltWidthLayout>
            </div>
        )
    }
}

export default FormList.createForm()(IndexView);

