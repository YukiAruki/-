// pages/chooseL/chooseL.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,
    location: []
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    wx.removeStorageSync('lid_m');
    let that = this;
    let app = getApp();
    const typ = options.typ;
    wx.request({
      url: app.globalData.urlHead + '/wuyu/public/showLocation.php',
      success: function (res) {
        console.log(res);
        that.setData({
          location: res.data,
          typ: typ
        })
      }
    });
  },

  navigate: function (event) {
    const typ = this.data.typ;
    let lid = event.currentTarget.dataset.id;
    if (typ == 1) {
      // 用户下单
      wx.redirectTo({
        url: '../../shop/chooseT/chooseT?lid=' + lid,
      });
    } else if (typ == 2) {
      // 管理订单
      wx.redirectTo({
        url: '../../admin/common/manageO/manageO?lid=' + lid,
      });
    } else if (typ == 3) {
      // 管理库存
      wx.redirectTo({
        url: '../../admin/common/update/update?lid=' + lid,
      });
    }
  },

  // confirm:function(){
  //   var lid = this.data.lid
  //   this.setData({
  //     hiddenmodalput: !this.data.hiddenmodalput
  //   })
  //   wx.navigateTo({
  //     url: '../chooseT/chooseT?lid='+lid,
  //   })
  // },

  modalinput: function (e) {
    var that = this
    that.setData({
      //注意到模态框的取消按钮也是绑定的这个函数，
      //所以这里直接取反hiddenmodalput，也是没有毛病
      hiddenmodalput: !this.data.hiddenmodalput,
      lid: e.currentTarget.dataset.id
    })
  },
  input: function (e) {
    this.setData({
      sid: e.detail.value
    })
  },
  confirm: function () {
    var lid = this.data.lid
    // var tid = this.data.tid
    var sid = this.data.sid
    console.log(lid)
    console.log(sid)
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
    wx.redirectTo({
      url: '../detail/detail?lid=' + lid + '&sid=' + sid,
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