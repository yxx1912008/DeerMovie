const app = getApp();
var config = require('../../common/script/config.js');
var Zan = require('../../dist/zan-ui/index');
Page(Object.assign({}, Zan.TopTips, {

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
    });
    var value = wx.getStorageSync('userInfo');
    console.log('缓存中的用户数据:');
    console.log(value);
    if (value.updateTime) {
      var updateTime = value.updateTime;
      var timeLag = (new Date() - new Date(updateTime)) / 1000;
      console.log(timeLag);
      //每隔半个小时更新一下缓存
      if (timeLag < 1800) {
        console.log('更新缓存时间未到');
        app.globalData.userInfo = value;
        wx.switchTab({
          url: '../index/index',
        })
        return;
      }
    }
  },
  getUserInfo: function (e) {
    var that = this;
    this.setData({
      isClick: true
    });
    if (!e.detail.userInfo) {
      this.showZanTopTips('您需要获取授权');
      return;
    }
    wx.getUserInfo({
      success: res => {
        console.log(res.userInfo);
        var nickName = res.userInfo.nickName;
        var avatarUrl = res.userInfo.avatarUrl;
        wx.login({
          success: e => {
            wx.request({
              url: config.apiList.login,
              data: {
                nickName: nickName,
                code: e.code,
                avatarUrl: avatarUrl,
              }, success: function (res) {
                console.log(res);
                if (res.data.result != 1) {
                  that.showZanTopTips('登陆失败');
                }
                var userInfo = {
                  nickName: nickName,
                  avatarURL: avatarUrl,
                  id: res.data.id,
                  updateTime: new Date(),
                  token: res.data.token,
                }
                wx.setStorageSync('userInfo', userInfo);
                app.globalData.userInfo = userInfo;
                console.log('全局用户信息');
                console.log(app.globalData.userInfo);
                wx.switchTab({
                  url: '../index/index',
                })
              }, fail: function () {
                that.showZanTopTips('登陆失败');
              }
            })
          }
        });
      },
      fail: function () {
        that.showZanTopTips('获取用户信息失败');
        return;
      }
    })
  },
  goToIndex: function () {
    wx.switchTab({
      url: '../index/index',
    })
  }
}));