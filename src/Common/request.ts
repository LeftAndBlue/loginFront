import axios from "axios";
export const requestUrl = "https://localhost:7193";
//创建实例
const axiosInstance = axios.create({
  baseURL: requestUrl,
  // timeout: 3000,
});

//请求拦截器,请求前
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
//请求拦截器，请求后
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data.code === 200) return response.data;
    else return null;
  },
  (error) => {
    console.log(error);
    const code: number = error.response.status;
    switch (code) {
      case 404:
        console.error("资源不存在");
        break;
      case 401:
        console.error("没有权限");
        break;
      case 500:
      case 501:
      case 502:
        console.error("没有权限");
        break;
      case 400:
        console.error(error.response.data.msg + "参数错误");
        break;
      default:
        console.log("无法识别");
        break;
    }
    return Promise.reject(error);
  }
);

export interface ActionResult<T> {
  data: T;
  msg: string;
  error: any;
  code: number;
}
//get请求
export const get = <T>(
  url: string,
  params?: Object
): Promise<ActionResult<T>> => {
  return axiosInstance.get(url, { params });
};
//post请求
export const post = <T>(
  url: string,
  data?: Object
): Promise<ActionResult<T>> => {
  return axiosInstance.post(url, data);
};
//put请求
export const put = <T>(
  url: string,
  data?: Object
): Promise<ActionResult<T>> => {
  return axiosInstance.put(url, data);
};
//delete请求
export const delete1 = <T>(
  url: string,
  params?: Object
): Promise<ActionResult<T>> => {
  return axiosInstance.delete(url, { params });
};
