const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    LoginTitle: '登陆',
    hasUserInfo: false,
    isClick: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#E1EBF4'
    })
    wx.setNavigationBarTitle({
      title: '登陆',
    })
  },
  getUserInfo: function (e) {
    this.setData({
      isClick: true
    });
    if (!e.userInfo) {
      wx.showToast({
        title: '请允许获取授权',
        icon: 'loading'
      })
    }
  },
})