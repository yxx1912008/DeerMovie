var config = require('common/script/config');
App({
  onLaunch: function () {
    var that = this;
    this.initStorage();
    wx.getStorage({
      key: 'person_info',
      success: function (res) {
        console.log(res);
        if (res.data.id != null && res.data.updateTime != null) {
          console.log('id and updateTime read ok');
          var time = new Date();
          var timeLag = (time - new Date(res.data.updateTime)) / 1000;
          console.log('last updateTime is:' + res.data.updateTime);
          console.log('The time is :' + timeLag);
          if (timeLag < 120) {
            return;
          }
        }
        console.log('查询用户信息');
        that.getUserInfo();
        wx.getStorageInfo({
          success: function (res) {
            console.log(res);
          },
        })
      },
      fail: function () {
        console.log('查询失败');
      }
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
            var nickName = that.globalData.userInfo.nickName;
            var avatarUrl = that.globalData.userInfo.avatarUrl;
            wx.request({
              method: 'POST',
              url: 'http://127.0.0.1/member/getUserOpenId',
              data: {
                code: e.code,
                nickName: nickName,
                avatarUrl: avatarUrl
              },
              success: function (json) {
                if (null != json.data.id && json.data.result == '1') {
                  //用户默认信息
                  var person_info = {
                    nickName: nickName,
                    avatarURL: avatarUrl,
                    id: json.data.id,
                    updateTime: new Date()
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
      },
      fail: function (e) {
        console.log(e);
        that.getUserInfo;
        wx.showNavigationBarLoading();
        wx.setNavigationBarTitle({
          title: '正在加载用户信息',
        })
      }
    })
  },
  //获取当前地理位置信息
  getCity: function () {

  },

  //方法：初始化缓存
  initStorage: function () {
    // wx.getStorageInfoSync({
    //   success: function (res) {
    //     //用户默认信息
    //     var person_info = {
    //       nickName: null,
    //       avatarURL: null,
    //       id: null,
    //       updateTime: null
    //     }
    //     console.log('初始化查询:' + res);
    //     //判断用户Info是否存在
    //     if (!('person_info' in res.keys)) {
    //       console.log('person_info log is not exist');
    //       wx.setStorageSync('person_info', '');
    //     }
    //   },

    // });

    var res = wx.getStorageInfoSync();
    console.log(res);
    console.log();
    if (res.keys.indexOf('person_info') === -1) {
      var person_info = {
        nickName: null,
        avatarURL: null,
        id: null,
        updateTime: null
      }
      //如果不存在缓存,新建缓存文件
      wx.setStorageSync('person_info', person_info);
    }
  },
})