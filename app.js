var config = require('common/script/config');
App({
  onLaunch: function () {
    this.getUserInfo();
  },
  // 全局数据
  globalData: {
    userInfo: null
  },
  //方法：初始化缓存
  initStorage: function () {
  },
  //获取用户信息
  getUserInfo: function (cb) {
    var that = this;
    wx.login({
      success: function (res) {
        wx.getUserInfo({
          success: function (e) {
            console.log(e.userInfo);
          }
        });
      }
    });

  }



})