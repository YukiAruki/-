// pages/dictionary/dictonary.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    haveorder: false,
    orders: [{
      // oid: 1,
      // cname: "套餐1",
      // locat: "教超1",
      // date: "1/14",
      // proc: "待提取"
    }]
  },

  toDetail: function (event) {
    var oid = event.currentTarget.dataset.oid
    wx.navigateTo({
      url: '../../shop/detail/detail?oid=' + oid,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app = getApp();
    const that = this;
    wx.request({
      url: app.globalData.urlHead + '/wuyu/public/getOrders.php',
      data: {
        'openid': app.globalData.openid
      },
      success: function (res) {
        console.log(res);
        let sortedData = res.data.sort(function (a, b) {
          return (b.oid - a.oid)
        })
        if (res.data != 0) {
          that.setData({
            haveorder: true,
            orders: sortedData
          });
        }
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

  }
})