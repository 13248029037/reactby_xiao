// 接口调用名。以页面为单位分组
// Base
// Common
// Page
import axios from "axios";
import { env_test } from "./config";
// let env_test=process.env.NODE_ENV ==='production'?false:true;
axios.defaults.withCredentials = true;
import VM from "./index";
axios.defaults.timeout = 6000;

let API = {};

// 接口地址。以页面为单位分组
let API_URI = {
  baseDomain: env_test ? "http://test.qms.aihuishou.com" : "",
  // Common API
  getRegionsByParent: "/CityGroup/GetRegionsByParent", //城市
  createCityGroup: "/CityGroup/CreateCityGroup", //创建城市分组
  getAllChannelst: "/ChannelGroup/GetAllChannel", //主渠道的信息
  getChannelsByParent: "/ChannelGroup/GetChannelByParent", //获取子渠道
  createChannelGroup: "/ChannelGroup/CreateChannelGroup", //创建渠道分组
  searchCityGroup: "/CityGroup/SearchCityGroup", //搜索城市分组
  getCityGroupByTip: "/CityGroup/GetCityGroupByTip", //模式查询城市分组
  getCitys: "/CityGroup/GetCitys", //获取省市
  getChannelGroupByTip: "/ChannelGroup/GetChannelGroupByTip", //模糊查询渠道分组
  getEnabledChannels: "/ChannelGroup/GetEnabledChannels", //获取所有渠道
  getChannelGroupById: "/ChannelGroup/GetChannelGroupById", //根据渠道分组Id获取渠道分组信息
  getCityGroupById: "/CityGroup/GetCityGroupById", //根据城市分组Id获取城市分组信息
  searchChannelGroup: "/ChannelGroup/SearchChannelGroup", //搜索渠道分组
  disableCityGroup: "/CityGroup/DisableCityGroup", //删除城市分组
  disableChannelGroup: "/ChannelGroup/DisableChannelGroup", //删除渠道分组
  updateCityGroup: "/CityGroup/UpdateCityGroup", //更新城市分组
  authorityCheck: "/common/authority/check", //权限控制
  updateChannelGroup: "/ChannelGroup/UpdateChannelGroup", //更新
  createActivity: "/Activity/CreateActivity", //创建活动
  updateActivity: "/Activity/UpdateActivity", //更新活动
  searchActivity: "/Activity/SearchActivity", //搜索活动
  searchActivityByProduct: "/Activity/SearchActivityByProduct", //通过型号搜索活动
  getActivityById: "/Activity/GetActivityById", //通过id获取活动
  getallactive: "/category/getallactive", //获取类别
  getAllProductLevel: "/product/GetProductLevelListByProductId", //获取等级
  getproducts: "/product/getproducts-by-categoryid-and-brandid", //获取型号
  getUserInfo: "/foundation/observer/current", //获取用户信息
  checkAuth: "/common/authority/check", //判断权限
  getFactProductPrice: "/Activity/GetFactProductPrice", //获取上调信息

  commitReview: "/Activity/CommitReview",
  endActivity: "/Activity/EndActivity",
  reviewFail: "/Activity/ReviewFail",
  reviewSuccess: "/Activity/ReviewSuccess"
};
//

  // 引入 axios
  // 根据环境配置http请求
  const http = axios.create({
    baseURL: API_URI.baseDomain,
    withCredentials: "true",
    headers: {
      "Content-Type": "multipart/form-data",
      "X-Requested-With": "XMLHttpRequest"
    }
  });

  http.interceptors.request.use(
    config => {
      VM.showLoading();
      let s = setTimeout(() => {
        clearTimeout(s);
      }, 5000);
      return config;
    },
    err => Promise.reject(err)
  );



  http.interceptors.response.use(
    res => {
      VM.removeLoading();
      let body = res.data || res;
      if (!body) {
        throw body;
        return null;
      } else if (body.error === 401) {
        // 如果401，跳转到登录
        VM.showTip('请重新登录');
        alert('请重新登录')
        setTimeout(() => {
          location.href = "/home/logout";
        }, 1000);
        return null;
        throw body;
      } else if (body.error === 403) {
        // 如果403，提示无权限
        VM.showTip('没有权限');
        throw body;
      } else if (body.error === 441) {
        // 刷新页面
        typeof window !== "undefined" && window.location.reload();
        throw body;
      } else if (body.error) {
        VM && VM.showTip(body.msg );
        throw body;
      }
      return body.data;
    },
    err => {
      setTimeout(() => {
      VM.removeLoading();
      VM.showTip(String(err));
      });
       Promise.reject(err);
    }
  );

  // formdata
  const getData = (data = {}) => {
    // 转化成formdata
    let ret = {};

    for (let key in data) {
      let value = data[key];
      if (value === undefined || value === null) {
        data[key] = "";
        continue;
      }
      travel(value, key);
      function travel(value, path) {
        // 如果为数组或者对象继续递归，到简单值为止，再把最终path和value添加进form
        if (value instanceof Array) {
          value.forEach((v, i) => {
            travel(v, v === undefined || v === null ? "" : `${path}[${i}]`);
          });
        } else if (value instanceof Object) {
          for (let prop in value) {
            travel(
              value[prop],
              value[prop] === undefined || value[prop] === null
                ? ""
                : `${path}.${prop}`
            );
          }
        } else {
          ret[path] = value;
        }
      }
    }
    return ret;
  };

  const postData = (data = {}) => {
    // 转化成formdata
    let ret;

    if (typeof FormData === "undefined") return {};
    ret = new FormData();

    for (let key in data) {
      let value = data[key];
      if (value === undefined || value === null) {
        data[key] = "";
        continue;
      }
      function travel(value, path) {
        // 如果为数组或者对象继续递归，到简单值为止，再把最终path和value添加进form
        if (value instanceof Array) {
          value.forEach((v, i) => {
            travel(v, v === undefined || v === null ? "" : `${path}[${i}]`);
          });
        } else if (value instanceof Object) {
          for (let prop in value) {
            travel(
              value[prop],
              value[prop] === undefined || value[prop] === null
                ? ""
                : `${path}.${prop}`
            );
          }
        } else {
          ret.append(path, value);
        }
      }
      travel(value, key);
    }
    return ret;
  };

  const ajax = {
    get(args, noSpinner) {
      let { url, data, callback, options, params } = args;
      return http
        .request({
          url: url,
          method: "get",
          params: getData(params)
        })
        // .then(result => {
        //   //console.log(result,'get: ' + url)
        //   callback && callback(null, result);
        // })
        // .catch(error => {

        //   console.info(error,'errorerrorerrorerrorerror')
        //   console.log("error", error);
        //   callback && callback(error);
        // });
    },
    post(args, noSpinner) {
      let { url, data, callback, options, params } = args;

      return http
        .request({
          url: url,
          method: "post",
          data: postData(data),
          params: getData(params)
        })
        .then(result => {
          //console.log(result,'post: ' + url)
          callback && callback(null, result);
        })
        .catch(error => {
          console.log(error);
          callback && callback(error);
        });
    },
    postImg(args, noSpinner) {
      let { url, data, callback, options, params } = args;

      return http
        .request({
          url: url,
          method: "post",
          data,
          params: getData(params)
        })
        .then(result => {
          //console.log(result,'post: ' + url)
          callback && callback(null, result);
        })
        .catch(error => {
          console.log(error);
          callback && callback(error);
        });
    }
  };

  // export APIs
  //发送手机验证码
  API.sendMessage = args => {
    let _args = {
      url: API_URI.sendMessage
    };
    ajax.post(Object.assign(_args, args));
  };
  //城市
  API.getRegionsByParent = args => {
    let _args = {
      url: API_URI.getRegionsByParent
    };
    ajax.get(Object.assign(_args, args));
  };
  //创建城市分组
  API.createCityGroup = args => {
    let _args = {
      url: API_URI.createCityGroup
    };
    ajax.post(Object.assign(_args, args));
  };
  //主渠道的信息
  API.getAllChannelst = args => {
    let _args = {
      url: API_URI.getAllChannelst
    };
    ajax.get(Object.assign(_args, args));
  };
  //获取子渠道
  API.getChannelsByParent = args => {
    let _args = {
      url: API_URI.getChannelsByParent
    };
    return ajax.get(Object.assign(_args, args));
  };
  //创建渠道分组
  API.createChannelGroup = args => {
    let _args = {
      url: API_URI.createChannelGroup
    };
    ajax.post(Object.assign(_args, args));
  };
  //搜索城市分组
  API.searchCityGroup = args => {
    let _args = {
      url: API_URI.searchCityGroup
    };
    ajax.post(Object.assign(_args, args));
  };
  //模式查询城市分组
  API.getCityGroupByTip = args => {
    let _args = {
      url: API_URI.getCityGroupByTip
    };
    ajax.get(Object.assign(_args, args));
  };
  //获取省市
  API.getCitys = args => {
    let _args = {
      url: API_URI.getCitys
    };
   return ajax.get(Object.assign(_args, args));
  };
  //模糊查询渠道分组
  API.getChannelGroupByTip = args => {
    let _args = {
      url: API_URI.getChannelGroupByTip
    };
    ajax.get(Object.assign(_args, args));
  };
  //获取所有渠道
  API.getEnabledChannels = args => {
    let _args = {
      url: API_URI.getEnabledChannels
    };
    ajax.get(Object.assign(_args, args));
  };
  //根据渠道分组Id获取渠道分组信息
  API.getChannelGroupById = args => {
    let _args = {
      url: API_URI.getChannelGroupById
    };
    ajax.post(Object.assign(_args, args));
  };
  //搜索渠道分组
  API.searchChannelGroup = args => {
    let _args = {
      url: API_URI.searchChannelGroup
    };
    ajax.post(Object.assign(_args, args));
  };
  //删除城市分组
  API.disableCityGroup = args => {
    let _args = {
      url: API_URI.disableCityGroup
    };
    ajax.post(Object.assign(_args, args));
  };
  //根据id获取城市分组

  API.getCityGroupById = args => {
    let _args = {
      url: API_URI.getCityGroupById
    };
    ajax.post(Object.assign(_args, args));
  };
  //删除渠道分组
  API.disableChannelGroup = args => {
    let _args = {
      url: API_URI.disableChannelGroup
    };
    ajax.post(Object.assign(_args, args));
  };
  //更新城市分组
  API.updateCityGroup = args => {
    let _args = {
      url: API_URI.updateCityGroup
    };
    ajax.post(Object.assign(_args, args));
  };
  //权限控制
  API.authorityCheck = args => {
    let _args = {
      url: API_URI.authorityCheck
    };
    ajax.post(Object.assign(_args, args));
  };
  //更新渠道分组
  API.updateChannelGroup = args => {
    let _args = {
      url: API_URI.updateChannelGroup
    };
    ajax.post(Object.assign(_args, args));
  };
  //创建活动
  API.createActivity = args => {
    let _args = {
      url: API_URI.createActivity
    };
    ajax.post(Object.assign(_args, args));
  };
  //更新活动
  API.updateActivity = args => {
    let _args = {
      url: API_URI.updateActivity
    };
    ajax.post(Object.assign(_args, args));
  };
  //搜索活动
  API.searchActivity = args => {
    let _args = {
      url: API_URI.searchActivity
    };
    ajax.post(Object.assign(_args, args));
  };
  //通过型号搜索活动
  API.searchActivityByProduct = args => {
    let _args = {
      url: API_URI.searchActivityByProduct
    };
    ajax.post(Object.assign(_args, args));
  };
  //通过id获取活动
  API.getActivityById = args => {
    let _args = {
      url: API_URI.getActivityById
    };
    ajax.get(Object.assign(_args, args));
  };
  //获取类别
  API.getallactive = args => {
    let _args = {
      url: API_URI.getallactive
    };
    return ajax.get(Object.assign(_args, args));
  };
  //获取等级
  API.getAllProductLevel = args => {
    let _args = {
      url: API_URI.getAllProductLevel
    };
    ajax.get(Object.assign(_args, args));
  };
  //获取型号
  API.getproducts = args => {
    let _args = {
      url: API_URI.getproducts
    };
    ajax.get(Object.assign(_args, args));
  };
  //获取用户信息
  API.getUserInfo = args => {
    let _args = {
      url: API_URI.getUserInfo
    };
    ajax.get(Object.assign(_args, args));
  };
  //判断权限
  API.checkAuth = args => {
    let _args = {
      url: API_URI.checkAuth
    };
    ajax.post(Object.assign(_args, args));
  };
  //获取上调信息
  API.getFactProductPrice = args => {
    let _args = {
      url: API_URI.getFactProductPrice
    };
    ajax.get(Object.assign(_args, args));
  };

  API.commitReview = args => {
    let _args = {
      url: API_URI.commitReview
    };
    ajax.post(Object.assign(_args, args));
  };

  API.endActivity = args => {
    let _args = {
      url: API_URI.endActivity
    };
    ajax.post(Object.assign(_args, args));
  };

  API.reviewFail = args => {
    let _args = {
      url: API_URI.reviewFail
    };
    ajax.post(Object.assign(_args, args));
  };

  API.reviewSuccess = args => {
    let _args = {
      url: API_URI.reviewSuccess
    };
    ajax.post(Object.assign(_args, args));
  };

  // window.API=API;
export default API;
