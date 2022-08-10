// pages/chooseT/chooseT.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,
    lid:0,
    // box:[
    //   {
    //     cid:0,
    //     cname:"",
    //     cnt:0,
    //     detail:''
    //   }
    // ]
  },

  /*
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let app = getApp();
    let id = options.lid;
    console.log(id)
    wx.request({
      url: app.globalData.urlHead + '/wuyu/shop/getTpinv.php',
      data:{
        lid:id
      },
      success:function(res){
        console.log(res);
        that.setData({
          box:res.data,
          lid:id
        })
      }
    })
  },

  modalinput: function (e) {
    var that = this
    that.setData({
      //注意到模态框的取消按钮也是绑定的这个函数，
      //所以这里直接取反hiddenmodalput，也是没有毛病
      hiddenmodalput: !this.data.hiddenmodalput,
      tid: e.currentTarget.dataset.tid
    })
  },
  input:function(e){
    this.setData(
      {sid : e.detail.value}
    )
  },
  confirm:function(e){
    var lid = this.data.lid
    var cid = e.currentTarget.dataset.cid
    // var sid = this.data.sid
    // this.setData({
    //   hiddenmodalput: !this.data.hiddenmodalput
    // })
    wx.redirectTo({
      url: '../detail/detail?lid='+lid+'&cid='+cid,
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