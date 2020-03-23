import request from './network.js'
//商品不同，传入iid区分
export function getDetailData(iid){
  return request({
    url:'/detail',
    data:{
      iid
    }
  })
}

export function getRecommends() {
  return request({
    url: '/recommend'
  })
}

export class GoodsBaseInfo {
  //constructor传的参数都是要用的值上一层的属性名
  constructor(itemInfo,columns,services){
    this.title = itemInfo.desc,
    this.newPrice = itemInfo.price,
    this.oldPrice = itemInfo.oldPrice,
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services

    this.realPrice = itemInfo.lowNowPrice
  }
}

export class GoodsShopInfo {
  constructor(shopInfo){
    this.shopLogo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.cSells = shopInfo.cSells
    this.cGoods = shopInfo.cGoods
    this.score = shopInfo.score
  }
}

export class GoodsParamInfo {
  constructor(info,rule){
    this.image = info.images ? info.images[0]:'';
    this.infos = info.set
    this.sizes = rule.tables
  }
}