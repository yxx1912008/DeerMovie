var config = require('../../common/script/config');
var movieapi = require('../../common/script/fetch');

//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    bannerList: config.bannerList,
    userInfo: {},
    hasUserInfo: false,
    hasMore: true,
    films: [],
    showLoading: true,
    start: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onLoad: function () {
    var that = this;
    var value = wx.getStorageSync('giftWord');
    var word = value[0];
    //设置礼包口令
    wx.setClipboardData({
      data: word,
    });

    wx.showNavigationBarLoading();
    //获取城市信息
    app.getCity(function () {
      wx.hideNavigationBarLoading();
      wx.setNavigationBarTitle({
        title: '正在热映---' + config.city,
      })
    });

    movieapi.fetchFilms.call();
  },

  // 当搜索框输入回车后触发
  movieSearch: function (e) {
    //待完善

  }

})
