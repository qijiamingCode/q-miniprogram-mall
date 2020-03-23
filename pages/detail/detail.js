// pages/detail/detail.js
import {
  getDetailData,
  getRecommends,
  GoodsBaseInfo,
  GoodsShopInfo,
  GoodsParamInfo

} from '../../service/detail.js'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    iid:'',
    topImages:[],
    baseInfo:{},
    shopInfo:{},
    detailInfo:{},
    paramInfo:{},
    commentInfo:{},
    recommends:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //先填入iid
    const id = options.iid
    this.setData({
      iid:id
    })
    this._getDetailData(this.data.iid)
    this._getRecommends()


  },

  // --------------请求数据-----------------
  // --------------请求轮播图数据------------
  _getDetailData(){
    getDetailData(this.data.iid).then(res => {
      console.log(res)
      //取出数据
      const data = res.data.result
      //取出顶部轮播图
      const topImages = data.itemInfo.topImages
      //这里使用detail.js里的构造函数，集中处理数据
      //构造函数使用心得：创建构造函数要一针见血，直接找需要的数据，constructor传入这些包裹数据的对象名，在方法里面写对象里面的属性。使用构造方法时就在括号内传入这些对象名的具体路径。
      const baseInfo = new GoodsBaseInfo(data.itemInfo,data.columns,data.shopInfo.services)

      const shopInfo = new GoodsShopInfo(data.shopInfo,data.shopInfo.score)

      const detailInfo = data.detailInfo;

      const paramInfo = new GoodsParamInfo(data.itemParams.info, data.itemParams.rule)

      let commentInfo = {}
      if (data.rate && data.rate.cRate > 0) {
        commentInfo = data.rate.list[0]
      }


      //更改数据
      this.setData({
        topImages:topImages,
        baseInfo:baseInfo,
        shopInfo:shopInfo,
        detailInfo:detailInfo,
        paramInfo:paramInfo,
        commentInfo:commentInfo
      })
    })
  },
  _getRecommends() {
    getRecommends().then(res => {
      console.log(res)
      this.setData({
        recommends: res.data.data.list
      })
    })
  },
  onAddCart() {
    // 1.获取商品对象
    const obj = {}
    obj.iid = this.data.iid;
    obj.imageURL = this.data.topImages[0];
    obj.title = this.data.baseInfo.title;
    obj.desc = this.data.baseInfo.desc;
    obj.price = this.data.baseInfo.realPrice;

    // 2.加入到购物车列表
    app.addToCart(obj)

    // 3.加入成功提示
    wx.showToast({
      title: '加入购物车成功',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})