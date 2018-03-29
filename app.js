var config = require('common/script/config');
App({
  onLaunch: function () {
    var that = this;
    this.initStorage();
    var value = wx.getStorageSync('personInfo');
    console.log(value);
    if (value.id != null || value.updateTime != null) {
      var time = new Date();
      var timeLag = (time - new Date(value.updateTime)) / 1000;
      console.log('last updateTime is:' + value.updateTime);
      console.log('The time is :' + timeLag);
      if (timeLag < 120) {
        return;
      }
    }
    console.log('time out or value is null');
    this.getUserInfo();

    // wx.getStorage({
    //   key: 'person_info',
    //   success: function (res) {
    //     console.log(res);
    //     if (res.data.id != null && res.data.updateTime != null) {
    //       console.log('id and updateTime read ok');
    //       var time = new Date();
    //       var timeLag = (time - new Date(res.data.updateTime)) / 1000;
    //       console.log('last updateTime is:' + res.data.updateTime);
    //       console.log('The time is :' + timeLag);
    //       if (timeLag < 120) {
    //         return;
    //       }
    //     }
    //     console.log('查询用户信息');
    //     that.getUserInfo();
    //     wx.getStorageInfo({
    //       success: function (res) {
    //         console.log(res);
    //       },
    //     })
    //   },
    //   fail: function () {
    //     console.log('fail');
    //     that.getUserInfo();
    //   }
    // });
    wx.getStorage({
      key: 'giftWord',
      success: function (res) {
        console.log(res);
        if (res.data === null) {
          that.getGiftWord;
        }
      },
    })

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
                  var personInfo = {
                    nickName: nickName,
                    avatarURL: avatarUrl,
                    id: json.data.id,
                    updateTime: new Date()
                  }
                  console.log(personInfo);
                  //保存用户服务器返回的Id
                  wx.setStorageSync('personInfo', personInfo);
                  console.log('personInfo is to save');
                  var value = wx.getStorageSync('personInfo');
                }
              }
            });
          }
        });
      },
      fail: function (e) {
        console.log('get user info fail');
        wx.showNavigationBarLoading();
        wx.setNavigationBarTitle({
          title: '正在获取用户信息',
        })
      }
    })
  },
  //获取当前地理位置信息
  getCity: function () {

  },
  //获取红包
  getGiftWord: function () {
    wx.request({
      url: 'http://127.0.0.1/member/getGiftWordByAli',
      success: function (json) {
        console.log(json);
      }
    })

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
    if (res.keys.indexOf('personInfo') === -1) {
      var personInfo = {
        nickName: null,
        avatarURL: null,
        id: null,
        updateTime: null
      }
      //如果不存在缓存,新建缓存文件
      wx.setStorageSync('personInfo', personInfo);
      console.log('stronge is update.');
    }
    console.log('stronge is ok');
    wx.getStorageInfo({
      success: function (res) {
        if (res.keys.indexOf('giftWord') === -1) {
          console.log('giftWord log is null ,build');
          wx.setStorage({
            key: 'giftWord',
            data: '',
          })
        }
      },
    })


  },
})