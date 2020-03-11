// components/q-tab-control/q-tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
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
    handleColor(event){
      // console.log(event)
      const index = event.currentTarget.dataset.index
      this.setData({
        currentIndex:index
      })
      //传发送事件
      const data = {index:this.data.currentIndex}
      this.triggerEvent('handleColor',data,{})
    }
  }
})
