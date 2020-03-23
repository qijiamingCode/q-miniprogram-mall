// pages/home/home.js
import {
  getMultiData,
  getGoodsData
  } from '../../service/home.js'

  const type = ['pop','new','sell']
  const top = 1000

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners:[],
    recommends:[],
    //三种类型数据，结构设计
    goods: {
      pop:{page:0,list:[]},
      new:{page:0,list:[]},
      sell:{page:0,list:[]}
    },
    currentType:'pop',
    showBackTop:false,
    isFixed:false,
    tabScrollTop:0
  },

  handleColor(event){
    // console.log(event)
    //获取活跃index
    const index = event.detail.index;
    // console.log(index)
    this.setData({
      currentType:type[index]
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //请求轮播图、推荐数据(防止代码混乱，将此处代码封装成私有函数调用)
      this._getMultiData()
      //请求商品数据
      this._getGoodsData('pop')
      this._getGoodsData('new')
      this._getGoodsData('sell')
      
  },
  //----------------请求轮播图、推荐数据----------------
  _getMultiData(){
    getMultiData().then(res => {
      // console.log(res)
      //取出轮播图和推荐的数据
      const banners = res.data.data.banner.list.map(item => {
        return item.image
      });
      const recommends = res.data.data.recommend.list;
      // console.log(banners)
      //把数据放进data中，让界面调用
      this.setData({
        banners,
        recommends
      })
    })
  },
  //----------------请求商品数据----------------------------
  //不能把类型写死，page在data中有记录，每次请求新页面时+1即可，所以只需要传入type类型
  _getGoodsData(type){
    //获取页码
    const page = this.data.goods[type].page + 1;

    //发送请求
    getGoodsData(type,page).then(res=>{
      //获取数据
      const list = res.data.data.list;
       console.log(list)
      //设置临时List,存放原list
      const oldList = this.data.goods[type].list;
      //将获取的数据传入临时数组
      oldList.push(...list)
      //将临时数组导入，注意不是引号！
      const typeKey = `goods.${type}.list`;
      const pageKey = `goods.${type}.page`;
      this.setData({
        [typeKey]:oldList,
        [pageKey]:page
      })

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
  onReachBottom(){
    this._getGoodsData(this.data.currentType)
  },
  onPageScroll(options) {
    const scrollTop = options.scrollTop
    // console.log(scrollTop)
      
      const flag = scrollTop > top
      if (flag != this.data.showBackTop){
        this.setData({
          showBackTop:flag
        })
      }

      const flag1 = scrollTop > this.data.tabScrollTop
      if(flag1 != this.data.isFixed){
        this.setData({
          isFixed:flag1
        })
      }
  },
  ImageLoad(){
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect=>{
      console.log(rect)
      this.data.tabScrollTop = rect.top
    }).exec()
  }
})