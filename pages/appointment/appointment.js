// pages/appointment/appointment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {  
    date: '2023-04-01',  
    time: '10:00',  
    content: ''  ,
    components: [  
      {id: 1, name: '风扇'},  
      {id: 2, name: '水泵'},  
      {id: 3, name: '报警器'},  
    ],  
    componentIndex: 0, // 默认选择第一个组件  
    isOptionA: true, // 默认选中选项A  
  },  
  
  bindDateChange: function(e) {  
    this.setData({  
      date: e.detail.value  
    });  
  },  
  bindTimeChange: function(e) {  
    this.setData({  
      time: e.detail.value  
    });  
  },  
  bindContentInput: function(e) {  
    this.setData({  
      content: e.detail.value  
    });  
  },  
  bindComponentChange: function(e) {  
    this.setData({  
      componentIndex: e.detail.value  
    });  
  },  
    
  bindOptionChange: function(e) {  
    this.setData({  
      isOptionA: e.detail.value  
    });  
  },  
  submitAppointment: function() {  
    wx.request({  
      url: 'https://yourserver.com/api/appointments', // 你的后端接口地址  
      method: 'POST',  
      data: {  
        date: this.data.date,  
        time: this.data.time,  
        content: this.data.content  
      },  
      header: {  
        'content-type': 'application/json' // 默认值  
      },  
      success(res) {  
        console.log('预约成功', res.data);  
        // 根据需要处理成功后的逻辑，如跳转到另一个页面或显示提示信息  
      },  
      fail(err) {  
        console.error('预约失败', err);  
        // 处理失败情况  
      }  
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})