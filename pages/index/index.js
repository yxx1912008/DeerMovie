var config = require('../../common/script/config');

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    bannerList: config.bannerList,
  },
  //事件处理函数
  bindViewTap: function () {

    wx.login({
      success: function (loginCode) {
        //appId
        var appId = 'wx0e2c2edbd333214b';
        //secert
        var secert = '7a9329971652ad1434436e8a1d32a312';
        console.log(loginCode.code);
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secert + '&js_code=' + loginCode.code + '&grant_type=authorization_code',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            //成功获取返回的open id 
            console.log(res);
          }
        })
      }
    })




    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  onLoad: function () {
    console.log(this.data.bannerList);
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
        console.log(res.userInfo);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
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
    console.log(e)
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
