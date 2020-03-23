// components/q-goods-item/q-goods-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type:Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick(event){
      //获取iid
      const iid = this.data.item.iid
      //跳转
      wx.navigateTo({
        url: '/pages/detail/detail?iid='+iid,
      })
    }
  }
})
