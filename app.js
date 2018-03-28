var config = require('common/script/config');
App({
  onLaunch: function () {
    this.getUserInfo();
    this.initStorage();
    wx.getStorage({
      key: 'person_info',
      success: function (res) {
        console.log(res);
      },
    });

  },
  // 全局数据
  globalData: {
    userInfo: null,
    person_info: null
  },
  //获取用户信息
  getUserInfo: function () {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        that.globalData.userInfo = res.userInfo;
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
                  //用户默认信息
                  var person_info = {
                    nickName: '',
                    avatarURL: '',
                    id: '',
                    updateTime: ''
                  }
                  //保存用户服务器返回的Id
                  wx.setStorage({
                    key: 'person_info',
                    data: person_info,
                  });
                }
              }
            });
          }
        });
      }
    })
  },
  //获取当前地理位置信息
  getCity: function () {

  },

  //方法：初始化缓存
  initStorage: function () {
    wx.getStorageInfo({
      success: function (res) {

        //用户默认信息
        var person_info = {
          nickName: '',
          avatarURL: '',
          id: '',
          updateTime: ''
        }



        //判断用户Info是否存在
        if (!('person_info' in res.keys)) {
          wx.setStorage({
            key: 'person_info',
            data: '',
          });
        }

      },
    })

  },
})