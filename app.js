var config = require('common/script/config');
App({
  onLaunch: function () {
    var that = this;
    //初始化缓存
    this.initStorage();
    var giftWord = wx.getStorageSync('giftWord');
    if (giftWord.length == 0) {
      this.getGiftWord();
    }
    this.getUserInfo();
  },
  // 全局数据
  globalData: {
    userInfo: null,
  },
  //获取用户信息
  getUserInfo: function () {
    var that = this;
    //获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res.userInfo);
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })



    // wx.getUserInfo({
    //   success: function (res) {
    //     that.globalData.userInfo = res.userInfo;
    //     wx.login({
    //       success: function (e) {
    //         var nickName = that.globalData.userInfo.nickName;
    //         var avatarUrl = that.globalData.userInfo.avatarUrl;
    //         wx.request({
    //           method: 'POST',
    //           url: 'http://127.0.0.1/member/getUserOpenId',
    //           data: {
    //             code: e.code,
    //             nickName: nickName,
    //             avatarUrl: avatarUrl
    //           },
    //           success: function (json) {
    //             if (null != json.data.id && json.data.result == '1') {
    //               //用户默认信息
    //               var personInfo = {
    //                 nickName: nickName,
    //                 avatarURL: avatarUrl,
    //                 id: json.data.id,
    //                 updateTime: new Date()
    //               }
    //               console.log(personInfo);
    //               //保存用户服务器返回的Id
    //               wx.setStorageSync('personInfo', personInfo);
    //               console.log('personInfo is to save');
    //               var value = wx.getStorageSync('personInfo');
    //             }
    //           }
    //         });
    //       }
    //     });
    //   },
    //   fail: function (e) {
    //     console.log('get user info fail');
    //     wx.showNavigationBarLoading();
    //     wx.setNavigationBarTitle({
    //       title: '正在获取用户信息',
    //     })
    //   }
    // });
  },
  //获取当前地理位置信息
  getCity: function () {

  },
  //获取红包
  getGiftWord: function () {
    var that = this;
    wx.request({
      url: 'http://127.0.0.1/member/getGiftWordByAli',
      success: function (json) {
        var arry = [];
        arry.push(json.data.giftWord);
        wx.setStorageSync('giftWord', arry);
      }
    })
  },

  //方法：初始化缓存
  initStorage: function () {
    //日志文件
    var logs = wx.getStorageSync('logs') || []
    wx.setStorageSync('logs', logs);
    //本地存储用户信息
    var userInfo = wx.getStorageSync('userInfo') || '';
    if (userInfo === '') {
      var userInfo = {
        nickName: '',
        avatarURL: '',
        id: '',
        updateTime: ''
      }
      wx.setStorageSync('userInfo', userInfo);
    }
    //红包信息
    var giftWord = wx.getStorageSync('giftWord') || [];
    if (giftWord.length == 0) {
      wx.setStorageSync('giftWord', giftWord);
    }
  },
})