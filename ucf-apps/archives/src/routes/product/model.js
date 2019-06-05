import {actions} from "mirrorx";
// 引入services，如不需要接口请求可不写
import * as api from "./service";
// 接口返回数据公共处理方法，根据具体需要

import {processData, structureObj, initStateObj} from "utils";

export default {
    // 确定 Store 中的数据模型作用域
    name: "product",
    // 设置当前 Model 所需的初始化 state
    initialState: {
        showLoading: false,
        treeData: null,
        infoData: null,
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
        async getProductTreeData(param = {}, getState) {
            // 正在加载数据，显示加载 Loading 图标
            actions.query.updateState({showLoading: true});
            const {result} = processData(await api.getTreeData(param));  // 调用 getTreeData 请求数据
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


        async getProductInfoData(param = {}, getState) {
            // 正在加载数据，显示加载 Loading 图标
            actions.query.updateState({showLoading: true});
            const {result} = processData(await api.getInfoData(param));  // 调用 getTreeData 请求数据
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


    }
};
