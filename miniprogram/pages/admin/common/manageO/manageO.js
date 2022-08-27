// pages/manageO/manageO.js
import Toast from "../../../../miniprogram_npm/vant-weapp/toast/toast"

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showAll:false,
    haveorder:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    let lid;
    if(wx.getStorageSync('lid_m') == ''){
      lid = options.lid;
    } else {
      lid = wx.getStorageSync('lid_m');
    }
    wx.request({
      url: app.globalData.urlHead + '/wuyu/public/getOrders.php',
      data:{
        lid: lid
      },
      success:function(res){
        wx.setStorageSync('lid_m', lid);
        if(res.data.cnt != 0){
          let sortedData = res.data.sort(function (a, b) {
            return (b.oid - a.oid)
          })
          that.setData({
            haveorder:true,
            orders: sortedData
          });
        } else if(res.data.code != 200){
          Toast.fail('获取数据失败')
        }
      }
    })
  },

  dealOrder:function(e){
    // 改变订单完成情况
    var oid = e.currentTarget.dataset.oid;
    wx.request({
      url: app.globalData.urlHead + '/wuyu/admin/common/updateOrders.php',
      data:{
        oid:oid
      },
      success:function(res){
        if(res.data.code == 200){
          Toast.success('订单已完成！')
        } else {
          Toast.fail('处理订单失败！')
        }
        // 刷新界面
        const pages = getCurrentPages();
        const perpage = pages[pages.length - 1];
        perpage.onLoad();
      }
    })
  },

  showAll:function(){
    this.setData({
      showAll:true
    })
  },

  cancelShow:function(){
    this.setData({
      showAll:false
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