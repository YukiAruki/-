// pages/update/update.js
import Toast from "../../../../miniprogram_npm/vant-weapp/toast/toast"

var data = [];
var lid;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    lid = options.lid;
    const that = this;
    // 获取所有产品
    wx.request({
      url: app.globalData.urlHead + '/wuyu/admin/common/getProduct.php',
      success: function (res) {
        console.log(res)
        if (res.data.length) {
          that.setData({
            product: res.data
          })
        } else {
          Toast.fail('获取当前库存失败！')
        }
      } 
    })
  },

  plus: function (e) {
    var id = e.currentTarget.dataset.id;
    if (data[id]) {
      data[id]++;
    } else {
      data[id] = 1;
    }
    this.setData({
      data: data
    })
  },

  minus: function (e) {
    var id = e.currentTarget.dataset.id;
    if (data[id]) {
      data[id]--;
    } else {
      data[id] = -1;
    }
    this.setData({
      data: data
    })
  },

  confirm: function () {
    // 更新库存
    wx.request({
      url: app.globalData.urlHead + '/wuyu/admin/common/updateInv.php',
      data: {
        data: data,
        lid: lid
      },
      success: function (res) {
        let title = 0;
        if (res.data.code == 200) {
          title = "更新成功"
        } else {
          title = "更新失败！"
        }
        wx.showModal({
          title: title,
          showCancel: false,
          success: function () {
            wx.redirectTo({
              url: '../manageI/manageI',
            })
          }
        })
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