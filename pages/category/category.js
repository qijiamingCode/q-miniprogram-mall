// pages/category/category.js
import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from '../../service/category.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [],
    categoryData: {},
    currentIndex:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getData() 
  },

  _getData(){
    this._getCategory()
  },
//获取左边菜单和右边默认第一个分类的数据
  _getCategory(){
    getCategory().then( res => {
      console.log(res)
      const categories = res.data.data.category.list
      //初始化分类数据,以对象形式保存数组；
      const categoryData = {}
      for (let i = 0; i < categories.length;i++){
        categoryData[i] = {
          //里面有每个分类的商品详情数据和子商品
          subcategories: [],
          categoryDetail: []
      }
      }

      this.setData({
        categories : categories,
        categoryData :categoryData
      })
      // 先请求第一个类别的数据作为默认展示
      this._getSubcategory(0)
      // 5.请求第一个类别的详情数据
      this._getCategoryDetail(0)

    })

 
  },
  //先传索引确定取哪个数组的maitKey
  _getSubcategory(currentIndex){
    // console.log(this.data.categories)
    const maitKey = this.data.categories[currentIndex].maitKey;
    //然后通过maitKey来获取数据
    getSubcategory(maitKey).then(res =>{
      //检测
      console.log('getSubcategory是下面这个')
      console.log(res)
      //先把data中categoryData结构放到临时常量里面
      const tempCategoryData = this.data.categoryData;
      //然后把请求到的list放入结构中上面的数据
      tempCategoryData[currentIndex].subcategories = res.data.data.list;
      this.setData({
        categoryData: tempCategoryData
      })
    })
  },
  _getCategoryDetail(currentIndex) {
    console.log('------触发啦')
    // 1.获取对应的miniWallKey
    const miniWallKey = this.data.categories[currentIndex].miniWallkey;

    // 2.请求数据类别的数据
    this._getRealCategoryDetail(currentIndex, miniWallKey, 'pop');
    // this._getRealCategoryDetail(currentIndex, miniWallKey, 'new');
    // this._getRealCategoryDetail(currentIndex, miniWallKey, 'sell');
  }, 
  _getRealCategoryDetail(index, miniWallKey, type) {
    getCategoryDetail(miniWallKey, type).then(res => {
      console.log('---------这是getRealCategoryDetail')
      console.log(res)
      // 1.获取categoryData
      const categoryData = this.data.categoryData;

      // 2.修改数据
      categoryData[index].categoryDetail = res.data;

      // 3.修改data中的数据
      this.setData({
        categoryData: categoryData
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
  menuClick(e) {
    console.log('点我啦--------------')
    // 1.改变当前的currentIndex
    const currentIndex = e.detail.currentIndex;
    // const maitKey0 = this.data.categories[0].maitKey;
    this.setData({
      currentIndex
      // maitKey0
    })

    // console.log(this.data.categories[0].maitKey)

    // 2.请求对应currentIndex的数据
    this._getSubcategory(currentIndex);

    // 3.请求对应的currentIndex的详情数据
    this._getCategoryDetail(currentIndex)
  }
})