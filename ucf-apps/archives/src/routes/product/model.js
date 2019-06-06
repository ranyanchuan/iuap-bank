import {actions} from "mirrorx";
// 引入services，如不需要接口请求可不写
import * as api from "./service";
// 接口返回数据公共处理方法，根据具体需要

import {processData, addChild, handleChild, deepClone} from "utils";

export default {
    // 确定 Store 中的数据模型作用域
    name: "product",
    // 设置当前 Model 所需的初始化 state
    initialState: {
        showLoading: false,
        content: [], // 树内容
        cacheTree: [],
        paginationParam: {
            reqParam: {
                search_treeId: "",
                title: "",
                hierarchy: "",
                pageIndex: 0,
                pageSize: 25,
            },
            resParam: {
                totalPages: 0,
                total: 0
            }
        },
        tableData: [],
        tableSelValue: [],
        comModalParam: {
            showModal: false,
            initEditValue: {},
            btnFlag: 0
        },
        delModal: false,
        searchRes: {
            expandedKeys: [],
            autoExpandParent: false
        },

    },
    reducers: {
        /**
         * 纯函数，相当于 Redux 中的 Reducer，只负责对数据的更新。
         * @param {*} state
         * @param {*} data
         */
        updateState(state, data) { //更新state
            return {
                ...state,
                ...data
            };
        }
    },
    effects: {
        /**
         * 加载列表数据
         * @param {*} param
         * @param {*} getState
         */
        async loadTree(param, getState) {
            console.log("param", param)
            let cacheTree = getState().product.cacheTree;
            let {result} = processData(await api.getTreeData(param));
            let {data: res} = result;
            let handledContent = [];
            let content = res && res.content || [];
            cacheTree = res && res.content && cacheTree.concat(res.content);
            let cacheContent = deepClone(getState().product.content);
            if (cacheContent.length === 0) {
                handledContent = deepClone(content);
            } else {

                handledContent = addChild(cacheContent, content);

                console.log("addChild", handledContent)
            }
            actions.product.updateState({
                content: handledContent,
                cacheTree
            })
        },

        // 获取档案
        async getProduct(param = {}, getState) {
            // 正在加载数据，显示加载 Loading 图标
            actions.query.updateState({showLoading: true});
            const {result} = processData(await api.getProduct(param));  // 调用 getTreeData 请求数据
            const {data: res} = result;
            let updateData = {showLoading: false};
            if (res) {
                // const {pageParams} = param;
                // const queryObj = structureObj(res, pageParams);
                // updateData.queryObj = queryObj;
                // updateData.queryParam = param;
                console.log("xxxx")
            } else {
                // 如果请求出错,数据初始化
                // const {queryObj} = getState().query;
                updateData.treeData = null;
                updateData.infoData = null;
            }
            actions.query.updateState(updateData); // 更新数据和查询条件
        },

        // 添加档案
        async addProduct(param = {}, getState) {
            let {result} = processData(await api.addProduct(param), '添加成功');
            const {data: res} = result;
            if (res) {
                console.log("添加成功")
            }
        },

        // 更新档案
        async updateProduct(param = {}, getState) {
            let {result} = processData(await api.updateProduct(param), '更新成功');
            const {data: res} = result;
            if (res) {
                console.log("添加成功")
            }
        },

        // 删除档案
        async delProduct(param = {}, getState) {
            let {result} = processData(await api.delProduct(param), '删除成功');
            const {data: res} = result;
            if (res) {
                console.log("添加成功")
            }
        },


    }
};
