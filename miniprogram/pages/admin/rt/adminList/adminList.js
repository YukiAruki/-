// pages/adminList/adminList.js
import Toast from "../../../../miniprogram_npm/vant-weapp/toast/toast"
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    adminList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;

    wx.request({
      url: app.globalData.urlHead + '/wuyu/admin/rt/getAdmin.php',
      success: function (res) {
        that.setData({
          adminList: res.data
        })
      }
    })
  },

  deleteAdmin: function (e) {
    const openid = e.currentTarget.dataset.openid;
    wx.showModal({
      title: "确认移除？",
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.urlHead + '/wuyu/admin/rt/deleteAdmin.php',
            data: {
              openid: openid
            },
            success: function (res) {
              if (res.data.code == 200) {
                Toast.success('删除成功');
              } else {
                Toast.fail('删除失败');
              }
            }
          })
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