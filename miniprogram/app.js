// app.js
App({
  globalData: {
    isBegin: null, // 即时获取
    isUser: null,
    isAdmin: null,
    openid: "",
    rt: 0,
    userInfo: {
      avatarUrl: 'default',
      nickName: ''
    },
    urlHead: 'https://example.com'
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    let that = this;
    let dataStatus = false;
    let waitTime = 100;

    wx.showLoading({
      title: '加载中...'
    });

    that.globalData.openid = wx.getStorageSync('openid');
    // 缓存内无openid
    if (that.globalData.openid == '') {
      console.log('缓存内无openid')
      waitTime = 4000;
      let p = new Promise(function (resolve, reject) {
        wx.login({
          success: res => {
            console.log(res)
            if (res.code) {
              console.log('已获取code：' + res.code)
              resolve(res.code)
            } else {
              reject('获取code失败');
            }
          }
        })
      });
      p.then(function (code) {
        wx.request({
          url: that.globalData.urlHead + '/wuyu/setup/getOpenid.php',
          data: {
            code: code
          },
          success: function (response) {
            console.log(response.data)
            if (response) {
              that.globalData.openid = response.data.openid;
              wx.setStorageSync('openid', response.data.openid);
              dataStatus = true;
              wx.hideLoading()
              return Promise.resolve(response.data.openid);
            } else {
              console.log('获取openid失败');
              return Promise.reject('获取openid失败');
            }
          }
        })
      })
    } else {
      dataStatus = true;
      wx.hideLoading()
    }

    // 获取用户数据+开始数据
    setTimeout(function () {
      that.globalData.isUser = wx.getStorageSync('isUser');
      // 缓存内无数据，请求数据
      if (that.globalData.isUser == '') {
        wx.request({
          url: that.globalData.urlHead + '/wuyu/setup/searchUser.php',
          data: {
            openid: that.globalData.openid
          },
          success: (res) => {
            if (res.data.isuser == 1) {
              that.globalData.isUser = res.data.isuser;
              that.globalData.isAdmin = res.data.isadmin;
              that.globalData.userInfo.avatarUrl = res.data.avatar;
              that.globalData.userInfo.nickName = res.data.nickname;
              that.globalData.rt = res.data.rt
              
              wx.setStorageSync('isUser', res.data.isuser)
              wx.setStorageSync('isAdmin', res.data.isadmin)
              wx.setStorageSync('avatarUrl', res.data.avatar)
              wx.setStorageSync('nickName', res.data.nickname)
              wx.setStorageSync('rt', res.data.rt)
            } else {
              that.globalData.isUser = 0;
            }
          }
        })
      } else { // 获取缓存数据
        that.globalData.isUser = wx.getStorageSync('isUser');
        that.globalData.isAdmin = wx.getStorageSync('isAdmin');
        that.globalData.userInfo.avatarUrl = wx.getStorageSync('avatarUrl');
        that.globalData.userInfo.nickName = wx.getStorageSync('nickName');
        that.globalData.rt = wx.getStorageSync('rt');
        console.log(that.globalData)
      }
    }, waitTime)

    // 提示加载超时
    setTimeout(function () {
      if (dataStatus == false) {
        wx.showToast({
          title: '连接超时，请刷新重试',
          icon: "none",
          duration: 5000
        });
      }
    }, 5000)
  },
})