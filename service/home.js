import request from './network.js'

export function getMultiData(){
  return request({
    url: '/home/multidata'
  })
}
//因为三个界面类型不同，所以需要传参区分
export function getGoodsData(type,page){
  return request({
    url:'/home/data',
    data:{
      type,
      page
    }
  })
}