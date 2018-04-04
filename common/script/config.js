/**
 * 初始化默认配置
 * 2018年3月13日09:35:22
 */
var url = 'https://wx.luckydeer.cn/static'

module.exports = {
  city: '北京',
  counts: 20,
  apiList: {
    giftWord: 'https://wx.luckydeer.cn/member/getGiftWordByAli',
    login: 'https://wx.luckydeer.cn/member/getUserOpenId',
    popular: 'https://wx.luckydeer.cn/movie/in_theaters',
    coming: 'https://wx.luckydeer.cn/movie/coming_soon',
    top: 'https://wx.luckydeer.cn/movie/top250',
    search: {
      byKeyword: 'https://api.douban.com/v2/movie/search?q=',
      byTag: 'https://api.douban.com/v2/movie/search?tag='
    },
    filmDetail: 'http://127.0.0.1/movie/subject/',
    personDetail: 'https://api.douban.com/v2/movie/celebrity/',
    baiduMap: 'http://127.0.0.1/member/location/getUserCity'
  },
  hotKeyword: ['功夫熊猫', '烈日灼心', '摆渡人', '长城', '我不是潘金莲', '这个杀手不太冷', '驴得水', '海贼王之黄金城', '西游伏妖片', '我在故宫修文物', '你的名字'],
  hotTag: ['动作', '喜剧', '爱情', '悬疑'],
  bannerList: [
    { type: 'film', id: '26683290', imgUrl: url + '/images/banner_img_movie/banner_1.jpg' },
    { type: 'film', id: '25793398', imgUrl: url + '/images/banner_img_movie/banner_2.jpg' },
    { type: 'film', id: '26630781', imgUrl: url + '/images/banner_img_movie/banner_3.jpg' },
    { type: 'film', id: '26415200', imgUrl: url + '/images/banner_img_movie/banner_4.jpg' },
    { type: 'film', id: '3025375', imgUrl: url + '/images/banner_img_movie/banner_5.jpg' }
  ],
  skinList: [
    { title: '公路', imgUrl: url + '/images/bg_img_movie/user_bg_1.jpg' },
    { title: '黑夜森林', imgUrl: url + '/images/bg_img_movie/user_bg_2.jpg' },
    { title: '鱼与水', imgUrl: url + '/images/bg_img_movie/user_bg_3.jpg' },
    { title: '山之剪影', imgUrl: url + '/images/bg_img_movie/user_bg_4.jpg' },
    { title: '火山', imgUrl: url + '/images/bg_img_movie/user_bg_5.jpg' },
    { title: '科技', imgUrl: url + '/images/bg_img_movie/user_bg_6.jpg' },
    { title: '沙漠', imgUrl: url + '/images/bg_img_movie/user_bg_7.jpg' },
    { title: '叶子', imgUrl: url + '/images/bg_img_movie/user_bg_8.jpg' },
    { title: '早餐', imgUrl: url + '/images/bg_img_movie/user_bg_9.jpg' },
    { title: '英伦骑车', imgUrl: url + '/images/bg_img_movie/user_bg_10.jpg' },
    { title: '草原', imgUrl: url + '/images/bg_img_movie/user_bg_11.jpg' },
    { title: '城市', imgUrl: url + '/images/bg_img_movie/user_bg_12.jpg' }
  ],
  shakeSound: {
    startUrl: url + '/sound/shake.mp3',
    start: '',
    completeUrl: url + '/sound/shakeComplete.wav',
    complete: ''
  },
  shakeWelcomeImg: url + '/images/bg_img_movie/shake_welcome.png'
}