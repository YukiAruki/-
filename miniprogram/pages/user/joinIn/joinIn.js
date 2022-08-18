// pages/joinIn/joinIn.js
import Toast from "../../../miniprogram_npm/vant-weapp/toast/toast"

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:'',
    code1:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  submit:function(){
    const code = this.data.code;
    const code1 = this.data.code1;
    console.log(code + code1);
    const openid = app.globalData.openid;
    wx.request({
      url: app.globalData.urlHead + '/wuyu/user/searchKey.php',
      data:{
        code,
        openid
      },
      success:function(res){
        if(res.data.msg == 200){
          Toast.success('认证成功');
        } else if(res.data.msg == 201){
          Toast.fail('请先绑定账号');
        } else {
          Toast.fail('认证码错误');
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