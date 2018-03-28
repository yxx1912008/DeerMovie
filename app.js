var config = require('common/script/config');
App({
  onLaunch: function () {
    this.getUserInfo();
  },
  // 全局数据
  globalData: {
    userInfo: null
  },
  //获取用户信息
  getUserInfo: function (cb) {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        that.globalData.userInfo = res.userInfo;
        console.log(that.globalData.userInfo);
        wx.login({
          success: function (e) {
            wx.request({
              method: 'POST',
              url: 'http://127.0.0.1/member/getUserOpenId',
              data: {
                code: e.code,
                nickName: that.globalData.userInfo.nickName,
                avatarUrl: that.globalData.userInfo.avatarUrl
              },
              success: function (json) {
                if (null != json.data.id && json.data.result == '1') {
                  //保存用户服务器返回的Id
                  wx.setStorage({
                    key: 'person_id',
                    data: json.data.id,
                  });
                }
              }
            });
          }
        });
      }
    })
  },
  //方法：初始化缓存
  initStorage: function () {
    wx.getStorageInfo({
      success: function (res) {
        //判断用户ID是否存在
        if (!('person_id' in res.keys)) {
          wx.setStorage({
            key: 'person_id',
            data: '',
          });
        }

      },
    })

  },
})