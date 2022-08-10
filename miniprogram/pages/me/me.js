// pages/dictionary/dictonary.js
import Toast from "../../miniprogram_npm/vant-weapp/toast/toast"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    isAdmin: false,
    isBegin:true,
    rt:0,
    userInfo:{
      avatarUrl:'',
      nickName:''
    }
  },

  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
       // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      desc: '用于完善会员资料', 
      success: (res) => {
        wx.request({
          url: app.globalData.urlHead+'/wuyu/user/insertProfile.php',
          data:{
            openid: app.globalData.openid,
            userInfo:res.userInfo
          }
        });
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        });
      }
    })
  },


  onLoad: function (options) {
    // 同步管理员账号状态+用户状态
    const app = getApp();
 
    // console.log(app.globalData);
    if(app.globalData.isUser == 1){
      this.setData({
        isAdmin: app.globalData.isAdmin,
        hasUserInfo: app.globalData.isUser,
        userInfo:app.globalData.userInfo,
        rt:app.globalData.rt,
        isBegin: app.globalData.isBegin
      });
    }
  },

  startSell(){
    let isBegin = this.data.isBegin
    const that = this
    wx.showModal({
      cancelText: '取消',
      confirmText: '确认',
      content: '（开启后用户可进行购买）',
      showCancel: true,
      title: '确认改变状态吗？',
      success: (result) => {
        that.setData({
          isBegin: !isBegin
        })
        wx.request({
          url: app.globalData.urlHead+'/wuyu/admin/rt/setBegin.php',
          success:function(res){
            if(res.data.code == 200){
              Toast.success('修改成功');
            } else {
              Toast.fail('修改失败');
            }
          }
        })
      },
      fail: (res) => {
      },
    })
  }
})