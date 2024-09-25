// pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
  },

  login() {
    wx.getUserProfile({
      desc: '获取用户信息',
      success: res => {
        // console.log(res.userInfo)
        var user = res.userInfo
        //设置全局用户信息
        app.globalData.userInfo = user
        //设置局部用户信息
        this.setData({
          userInfo: user
        })

        //检查之前是否已经授权登录
        wx.cloud.database().collection('userInfo').where({
          _openid: app.globalData.user_openid
        }).get({
          success: res => {
            //原先没有添加，这里添加
            if (!res.data[0]) {
              //将数据添加到数据库
              wx.cloud.database().collection('userInfo').add({
                data: {
                  avatarUrl: user.avatarUrl,
                  nickName: user.nickName
                },
                success: res => {
                  wx.showToast({
                    title: '登录成功',
                    icon: 'none'
                  })
                }
              })
            } else {
              //已经添加过了
              this.setData({
                userInfo: res.data[0]
              })
            }
          }
        })
      }
    })
  },
  logout(){
    app.globalData.userInfo = null
    this.setData({
      userInfo: null
    })
  },
  onsellect(e){
    wx.navigateTo({
      url: '/pages/mysellect/mysellect',
    })
  },
  onfoot(e){
    wx.navigateTo({
      url: '/pages/myfoot/myfoot',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
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


