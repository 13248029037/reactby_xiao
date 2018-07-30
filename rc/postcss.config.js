module.exports={
  plugins:[
     // require('postcss-cssnext'),
    require('autoprefixer'),
// 处理flex浏览器兼容性
require('postcss-flexibility'),
// 处理css中rgba颜色代码
require('postcss-color-rgba-fallback'),
// 处理css中opacity的IE兼容性。
require('postcss-opacity'),
require('postcss-pxtorem')({ //rem
  'rootValue': 32,
  propList: ['*']
})
]
}
