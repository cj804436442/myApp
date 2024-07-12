import qs from "qs";
import fetch from "../../lib/fetch";

export const CONTEXTPATH = (window.CONTEXTPATH = window.CONTEXTPATH || "/process");

export const xService = async param => {
  return await fetch(
    `/path/to/service.do`,
    qs.stringify(
      param
    ) /*, config => (config.headers['Content-Type'] = 'application/json; chartset=UTF-8', config)*/
  );
  // 可以自定义修改axios实例
};


export const addAdmin = async param => {
  return await fetch(`${CONTEXTPATH}/addAdmin`, param);
};

export const addBook = async param => {
  return await fetch(`${CONTEXTPATH}/addBook`, param);
};

export const deleteById = async param => {
  return await fetch(`${CONTEXTPATH}/deleteById`, param);
};

export const login = async param => {
  return await fetch(`${CONTEXTPATH}/login`, param);
};

export const register = async param => {
  return await fetch(`${CONTEXTPATH}/register`, param);
};

export const getDataList = async param => {
  return await fetch(`${CONTEXTPATH}/search`, param);
};
// 图书列表接口
export const getBookList = async param => {
  return await fetch(`${CONTEXTPATH}/searchBook`, param);
};

