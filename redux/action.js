import API from "../API.js";
import VM from "../index";
// console.info(API)
// import dd from './test'

// console.info(dd)
// console.info(API,'API')
// export function getCitys() {  //正常返回
//   return {
//     type: "getCitys",
//     payload: {
//       citys: [3, 4, 5,4,32,3,3,23,4,221]
//     }
//   };
// }

//返回函数

//  export function getCitys(){  //返回一个函数
//      return dispatch =>{
//         API.getCitys({
//             callback:(err,data)=>{
//                 console.info(data,'data')
//                 dispatch({type:'getCitys',payload:{
//                     citys:data
//                 }})
//             }
//         })
//      }
//  }

export function getCitys() {
  return API.getCitys({}).then(data => {
    return {
      type: "getCitys",
      payload: {
        citys: data
      }
    };
  });
}
export function getChannels() {
  return API.getCitys({}).then(data => {
    return {
      type: "getChannels",
      payload: {
        channels: data
      }
    };
  });
}
export function getCategory() {
  return API.getallactive({}).then(data => {
    return {
      type: "getCategorys",
      payload: {
        category: data
      }
    };
  });
}
