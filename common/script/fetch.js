var config = require('../script/config.js');
var message = require('../component/message/message.js');


module.exports = {
  //获取电影列表
  fetchFilms: function (url, start, count) {
    console.log('---正在获取电影列表----');
    var that = this;
    message.hide.call(that);
    if (that.data.hasMore) {
      wx.request({
        url: url,
        data: {
          city: config.city,
          start: start,
          count: config.count,
        },
        header: {
          "Content-Type": "application/json,application/json"
        },
        success: res => {
          console.log(res);
          if (res.data.subjects.length === 0) {
            that.setData({
              hasMore: false
            });
          } else {
            that.setData(
              {
                films: that.data.films.concat(res.data.subjects),
                start: that.data.start + res.data.count,
                showLoading: false
              }
            );
          }
          //停止当前页面下拉刷新
          wx.stopPullDownRefresh();
          typeof cb == 'function' && cb(res.data);
        },
        fail: function () {
          that.setData({
            showLoading: false
          })
          message.show.call(that, {
            content: '网络开小差了',
            icon: 'offline',
            duration: 3000
          })
          wx.stopPullDownRefresh()
          typeof fail_cb == 'function' && fail_cb()
        }
      })
    }
  },
  //获取指定电影详情
  fetchFilmDetail: function (url, id, cb) {
    console.log('---正在获取电影详情----');
    var that = this;
    message.hide.call(that);
    wx.request({
      url: url + id,
      header: {
        "Content-Type": "application/json,application/json"
      },
      success: res => {
        console.log(res);
        that.setData({
          filmDetail: res.data,
          showLoading: false,
          showContent: true
        });
        wx.setNavigationBarTitle({
          title: res.data.title,
        });
        wx.stopPullDownRefresh();
        typeof cb == 'function' && cb(res.data);
      },
      fail: function () {
        that.setData({
          showLoading: false
        });
        message.show.call(that, {
          content: '网络开小差了',
          icon: 'offline',
          duration: 3000
        })
      }

    })


  }

}
