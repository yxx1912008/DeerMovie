var config = require('common/script/config');
App({
  onLaunch: function () {
    var that = this;
    //初始化缓存
    this.initStorage();
    var giftWord = wx.getStorageSync('giftWord');
    if (giftWord.length == 0) {
      this.getGiftWord();
    }
    this.getCity();
  },
  // 全局数据
  globalData: {
    userInfo: null,
    getCityCount: 0
  },
  // //获取用户信息
  // getUserInfo: function () {
  //   var that = this;
  //   //获取用户信息
  //   wx.getSetting({
  //     success: res => {
  //       console.log(res);
  //       if (res.authSetting['scope.userInfo']) {
  //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  //         wx.getUserInfo({
  //           success: res => {
  //             console.log(res.userInfo);
  //             // 可以将 res 发送给后台解码出 unionId
  //             that.globalData.userInfo = res.userInfo
  //             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //             // 所以此处加入 callback 以防止这种情况
  //             if (that.userInfoReadyCallback) {
  //               that.userInfoReadyCallback(res)
  //             }
  //           }
  //         })
  //       }
  //     }
  //   })
  // },
  //获取当前地理位置信息
  getCity: function () {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        console.log(res);
        var locationParam = res.latitude + ',' + res.longitude;
        wx.request({
          url: config.apiList.baiduMap,
          data: {
            location: locationParam,
          }, success: res => {
            if (res.data.result != 1) {
              that.getCity();
            }
            config.city = res.data.city;
            console.log('当前地理位置:');
            console.log(config.city);
            return true;
          }, fail: function () {
            that.getCity();
          }
        });
      },
      fail: e => {
        wx.getSetting({
          success: res => {
            //获取授权失败
            if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
              wx.showModal({
                title: '是否授权当前位置',
                content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
                success: res => {
                  if (res.cancel) {
                    that.globalData.getCityCount += 1;
                    console.log(that.globalData.getCityCount);
                    if (that.globalData.getCityCount > 2) {
                      return false;
                    }
                    that.getCity();
                  }
                  if (res.confirm) {
                    wx.openSetting({
                      success: res => {
                        console.log(res);
                        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
                          wx.showToast({
                            title: '获取授权失败',
                          });
                        }
                        that.getCity();
                        return;
                      }
                    })
                  }
                }
              })
            }
          }
        });
      }

    })

  },
  //获取红包
  getGiftWord: function () {
    var that = this;
    wx.request({
      url: config.apiList.giftWord,
      success: function (json) {
        var arry = [];
        arry.push(json.data.giftWord);
        wx.setStorageSync('giftWord', arry);
      }
    })
  },

  //方法：初始化缓存
  initStorage: function () {
    //日志文件
    var logs = wx.getStorageSync('logs') || []
    wx.setStorageSync('logs', logs);
    //本地存储用户信息
    var userInfo = wx.getStorageSync('userInfo') || '';
    if (userInfo === '') {
      var userInfo = {
        nickName: '',
        avatarURL: '',
        id: '',
        updateTime: null,
        token: '',
      }
      wx.setStorageSync('userInfo', userInfo);
    }
    //红包信息
    var giftWord = wx.getStorageSync('giftWord') || [];
    if (giftWord.length == 0) {
      wx.setStorageSync('giftWord', giftWord);
    }
  },
})