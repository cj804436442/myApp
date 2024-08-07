import axios from "axios";
import $message from "../common/components/message";
import Router from "vue-router";
const DEFAULT_ERROR_MESSAGE = "系统异常，请稍后重试";

const IFLYTEK_CSRFTOKEN = (window.IFLYTEK_CSRFTOKEN =
  document.querySelector("input[name=IFLYTEK_CSRFTOKEN]") &&
  document.querySelector("input[name=IFLYTEK_CSRFTOKEN]").value);


const _fetch = async (method = "post", ...args) => {
  const user = localStorage.getItem("user") || '{"token":""}'
  const router = new Router()
  const instance = axios.create({
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "token": JSON.parse(user).token
    }
  });
  try {
    // 前置拦截器
    const lastArg = args.slice(args.length - 1)[0];
    if (typeof lastArg === "function") {
      args.pop();
      instance.interceptors.request.use(lastArg);
    }
    //
    const result = await instance[method].call(null, ...args);
    let { data: response } = result;
    // 兼容处理其他响应格式如字典项
    if (!("status" in response)) {
      response = { status: true, msg: "", data: response };
    }
    const { status, msg, data } = response;
    if(data.code == "10086") {
      $message.error("登录超时，请重新登陆")
      router.push({ path: "/" });
      location.reload(true)
    }
    if (!status) {
      $message.error(msg || DEFAULT_ERROR_MESSAGE);
    }
    return { status, msg, data: data || [] };
  } catch (e) {
    console && console.log(e);
    $message.error(e.message || DEFAULT_ERROR_MESSAGE);
    return { status: false };
  }
};

const fetch = async (...args) => await _fetch("post", ...args);

fetch.get = async (...args) => await _fetch("get", ...args);

fetch.post = fetch;

export default fetch;
