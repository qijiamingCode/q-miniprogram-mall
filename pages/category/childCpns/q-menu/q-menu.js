// pages/category/childCpns/q-menu/q-menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    categories:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onItemClick(e){
      //思路是创建一个常量currentIndex。存放接收到的index,然后发送事件，把currentIndex传给分类页面,用于请求对应的详情数据。

      const currentIndex = e.currentTarget.dataset.index;
      this.setData({
        currentIndex
      })

 
      this.triggerEvent('menuclick', {currentIndex}, {})
    }
  }
})
