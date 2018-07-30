import API from '../API';
console.info(API,'API')
// export function getCitys() {  //正常返回
//   return {
//     type: "getCitys",
//     payload: {
//       citys: [3, 4, 5,4,32,3,3,23,4,221]
//     }
//   };
// }

//  返回函数

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

 export function getCitys(){
     return new Promise((resolve,reject)=>{
        API.getCitys({
            callback:(err,data)=>{
                console.info(data,'data')
                   resolve(data)
            }
        })
     }).then(data => {
            return {
                type:'getCitys',
                payload:{
                    citys:data
                }
            }
       
     })
 }
 export function getChannels(){
    return new Promise((resolve,reject)=>{
       API.getCitys({
           callback:(err,data)=>{
               console.info(data,'data')
                  resolve(data)
           }
       })
    }).then(data => {
           return {
               type:'getChannels',
               payload:{
                channels:data
               }
           }
      
    })
}
export function getCategory(){
    return new Promise((resolve,reject)=>{
       API.getallactive({
           callback:(err,data)=>{
               console.info(data,'data')
                  resolve(data)
           }
       })
    }).then(data => {
           return {
               type:'getCategorys',
               payload:{
                category:data
               }
           }
      
    })
}



