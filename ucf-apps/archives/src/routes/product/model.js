import {actions} from "mirrorx";
// 引入services，如不需要接口请求可不写
import * as api from "./service";
// 接口返回数据公共处理方法，根据具体需要

import {
    processData,
    addChild,
    handleChild,
    deepClone,
    addTreeChildren,
    delTreeChildren,
    updTreeChildren
} from "utils";

export default {
    // 确定 Store 中的数据模型作用域
    name: "product",
    // 设置当前 Model 所需的初始化 state
    initialState: {
        showLoading: false,
        content: [], // 树内容
        archivesInfo: {}, // 档案信息
        cacheTree: [],
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

            let {result} = processData(await api.getTreeData(param));
            let {data: res} = result;

            let content = res && res.content || [];

            let tree = deepClone(getState().product.content);

            const {id} = param || {};
            // 在父节点下添加子节点
            const newContent = addTreeChildren(tree, content, id);
            actions.product.updateState({content: newContent});

        },


        /**
         * 加载列表数据
         * @param {*} param
         * @param {*} getState
         */
        async getTreeByValue(param, getState) {

            actions.product.updateState({showLoading: true});
            let {result} = processData(await api.getTreeByValue(param));
            let {data: res} = result;

            let temp = {showLoading: false, archivesInfo: {}};
            const {content} = res || {};
            if (content) {
                temp.content = content;
            }
            actions.product.updateState(temp);

        },

        // 获取档案
        async getProduct(param = {}, getState) {
            // 正在加载数据，显示加载 Loading 图标
            actions.product.updateState({showLoading: true});
            const {result} = processData(await api.getProduct(param));  // 调用 getTreeData 请求数据
            const {data: res} = result;
            // 获取最新数据
            const {content: archivesInfo} = res || {};
            actions.product.updateState({archivesInfo, showLoading: false}); // 更新数据和状态
        },

        // 添加档案
        async addProduct({param, callback}, getState) {

            actions.product.updateState({showLoading: true});
            const {result} = processData(await api.addProduct(param), '添加成功');

            const {data: res} = result;
            let parentContent = getState().product.content;
            // 取消loading
            let temp = {showLoading: false};
            if (res) {
                const {parentId} = param;
                temp.content = addTreeChildren(parentContent, [res], parentId);
                // 更新选中数据
                temp.archivesInfo = res;
            }
            actions.product.updateState(temp);
            callback(res);
        },

        // 更新档案
        async updateProduct({param, callback}, getState) {
            actions.product.updateState({showLoading: true});
            let {result} = processData(await api.updateProduct(param), '更新成功');

            const {data: res} = result;
            let parentContent = getState().product.content;
            // 取消loading
            let temp = {showLoading: false};
            if (res) {
                const {id} = param;
                temp.content = updTreeChildren(parentContent, res, id);
                // 更新选中数据
                temp.archivesInfo = res;
            }
            actions.product.updateState(temp);
            callback(res);
        },

        // 删除档案
        async delProduct({param, callback}, getState) {
            actions.product.updateState({showLoading: true});
            let {result} = processData(await api.delProduct(param), '删除成功');
            const {data: res} = result;
            let parentContent = getState().product.content;
            // 取消loading
            let temp = {showLoading: false};
            if (res) {
                const {id} = res;
                temp.content = delTreeChildren(parentContent, id);
            }
            actions.product.updateState(temp);
            callback(res);
        },


    }
};
