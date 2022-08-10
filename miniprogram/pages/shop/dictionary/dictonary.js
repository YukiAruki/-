// pages/dictionary/dictonary.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /** 
     * inventory:[
     *   {
     *     lname:教超名,
     *     invt:[{
     *      type:商品类别,
     *      detail:[[商品名，余量]]
     *      }]
     *    }
     * ]
     **/
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var that = this;
    var app = getApp();
    wx.request({
      url: app.globalData.urlHead+'/wuyu/shop/getInventory.php',
      method:"POST",
      success:function(res){
        console.log(res.data);
        that.setData({
          inventory:res.data
        });
      }
    })
    // wx.cloud.callFunction({
    //   name: 'getLocation'
    // }).then(res=>{
    //   this.setData({
    //     location: res.result.data
    //   })
    // })
    // wx.cloud.callFunction({
    //   name:'getPtype'
    // }).then(res=>{
    //   this.setData({
    //     type: res.result.data
    //   })
    // })
    // wx.cloud.callFunction({
    //   name: 'lookupprod'
    // })
    // .then(res=>{
    //   console.log(res.result.list)
    //   this.setData({
    //     inventory: res.result.list
    //   })
    // })
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