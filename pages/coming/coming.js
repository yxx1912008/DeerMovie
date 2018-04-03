var app = getApp();
//导入配置文件和api
var config = require('../../common/script/config');
var movieapi = require('../../common/script/fetch');
// pages/coming/coming.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    films: [],
    hasMore: true,
    showLoading: true,
    start: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    movieapi.fetchFilms.call(that, config.apiList.coming, that.data.start)
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this
    that.setData({
      films: [],
      hasMore: true,
      showLoading: true,
      start: 0
    })
    this.onLoad()
  },
  viewFilmDetail: function () {
    wx.showToast({
      title: '功能正在开发中',
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    if (!that.data.showLoading) {
      movieapi.fetchFilms.call(that, config.apiList.coming, that.data.start);
    }
  },
})