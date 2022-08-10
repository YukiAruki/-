// pages/newP/newP.js
import Toast from "../../../../miniprogram_npm/vant-weapp/toast/toast"

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:-1
    // ptype:[tid,tname]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    // 部署商品类别
    wx.request({
      url: app.globalData.urlHead + '/wuyu/admin/common/getType.php',
      success:function(res){
        if(res.data.length){
          that.setData({
            ptype:res.data
          })
        } else {
          Toast.fail('获取商品类别失败！')
        } 
      }
    })
  },

  choose:function(e){
    this.setData({
      type:e.currentTarget.dataset.id
    })
  },

  submit:function(e){
    wx.request({
      url: app.globalData.urlHead + '/wuyu/admin/common/updateProduct.php',
      data:{
        typ: e.currentTarget.dataset.id,
        detail: e.detail.value
      },
      success:function(res){
        if(res.data == 'success'){
          var title = "更新成功！";
        } else {
          var title = "更新失败！";
        }
        wx.showModal({
          title:title,
          showCancel:false,
          success:function(){
            wx.redirectTo({
              url: '../manageI/manageI',
            })
          }
        })
      }
    })
  },

  scan:function(){
    wx.scanCode({
      success (res) {
        console.log(res);
        // this.setData({
        //   barcode: res
        // })
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