var config = require('../../common/script/config');

//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    bannerList: config.bannerList,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onLoad: function () {
    var value = wx.getStorageSync('giftWord');
    var word = value[0];
    wx.setClipboardData({
      data: word,
    })
    //1.显示导航条加载动画
    wx.showNavigationBarLoading();
    //判断，如果不为空
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })

    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
        wx.login({

        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 当搜索框输入回车后触发
  movieSearch: function (e) {
    //待完善

  }

})
