import request from "utils/request";
import {deepClone} from 'utils';
//定义接口地址
const URL = {
    "GET_TREE": `${GROBAL_HTTP_CTX}/query_allowances/list`,
    "GET_INFO": `${GROBAL_HTTP_CTX}/query_allowances/distinct`,
}

/**
 * 获取树信息
 * @param {*} params
 */
export const getTreeData = (param) => {
    return [];
    // return request(URL.GET_TREE, {
    //     method: "post",
    //     data: param
    // });
}

/**
 * 获取树节点档案信息
 *   @param {*} params
 */
export const getInfoData = (param) => {

    return [];
    // return request(URL.GET_INFO, {
    //     method: "post",
    //     data: param
    // });
}
