// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // oid:,
    // lname:'',
    // cname:'',
    // time:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app = getApp();
    let that = this;
    // 传来oid，说明从“我的订单”页面传递
    if(this.options.oid){
    // 查询订单信息进行显示
      var dt = {
        oid:this.options.oid
      }
    }else{
      //从购买页面传来，新建订单
      var dt = {
        openid : app.globalData.openid,
        lid:options.lid,
        cid:options.cid
      }
    }
    wx.request({
      url: app.globalData.urlHead+'/wuyu/public/getDetail.php',
      data:dt,
      success:function(res){
        console.log(res)
        var id = res.data.oid;
        var oid = id.toString();
        //  补足前位
        while(!oid[3]){
          oid = '0' + oid
        }
        // var tS = res.data.time;
        that.setData({
            oid: oid,
            lname: res.data.lname,
            cname: res.data.cname,
            time: res.data.time
        })
      },
      fail:function(res){
        console.log(res)
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