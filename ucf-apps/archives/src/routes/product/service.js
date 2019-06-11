import request from "utils/request";
import {deepClone} from 'utils';
//定义接口地址
const URL = {
    "GET_TREE": `${GROBAL_HTTP_TREE}/product/getSonNodes`,
    "ADD_PRODUCT": `${GROBAL_HTTP_TREE}/product/insertSelective`,
    "UPD_PRODUCT": `${GROBAL_HTTP_TREE}/product/updateSelective`,
    "GET_PRODUCT": `${GROBAL_HTTP_TREE}/product/getNodeById`,
    "DEL_PRODUCT": `${GROBAL_HTTP_TREE}/product/deleteBatch`,
    "GET_TREE_BY_VALUE": `${GROBAL_HTTP_TREE}/product/dataSearchNodes`,
}

/**
 * 获取树信息
 * @param {*} params
 */
export const getTreeData = (param) => {
    return request(URL.GET_TREE, {
        method: "get",
        param
    });
}


/**
 * 添加节点档案信息
 * @param {*} params
 */
export const addProduct = (param) => {
    return request(URL.ADD_PRODUCT, {
        method: "post",
        data: param
    });
}


/**
 * 更新节点档案信息
 * @param {*} params
 */
export const updateProduct = (param) => {
    return request(URL.UPD_PRODUCT, {
        method: "post",
        data: param
    });
}


/**
 * 获取节点档案信息
 * @param {*} params
 */
export const getProduct = (param) => {
    return request(URL.GET_PRODUCT, {
        method: "get",
        param
    });
}

/**
 * 删除节点档案信息
 * @param {*} params
 */
export const delProduct = (param) => {
    return request(URL.DEL_PRODUCT, {
        method: "post",
        data: param
    });
}


/**
 * 获取节点档案信息
 * @param {*} params
 */
export const getTreeByValue = (param) => {
    return request(URL.GET_TREE_BY_VALUE, {
        method: "get",
        param
    });
}

