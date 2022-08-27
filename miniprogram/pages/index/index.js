// pages/index/index.js
const app = getApp()
Page({
  data: {
    haveuserInfo: 0,
    isBegin: 1,
    // swiper属性
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 4000,
    duration: 500,
    background: [{}]
  },

  onLoad: function (options) {
    const that = this;
    const app = getApp();

    // 检测用户状态
    let haveuserInfo = 0;
    if (app.globalData.isUser == 1) {
      haveuserInfo = 1;
    }

    // 获取页面内容getStartData.php
    wx.request({
      url: app.globalData.urlHead + '/wuyu/setup/getStartData.php',
      success(res) {
        app.globalData.isBegin = res.data.isbegin
        that.setData({
          isBegin: res.data.isbegin,
          background: res.data[0].bannerList,
          haveuserInfo: haveuserInfo
        })
      }
    })

  },

  showModal: function () {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        wx.request({
          url: app.globalData.urlHead + '/wuyu/user/insertProfile.php',
          data: {
            openid: app.globalData.openid,
            userInfo: res.userInfo
          }
        });
      }
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
  onShow: function () {},

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

  }
})