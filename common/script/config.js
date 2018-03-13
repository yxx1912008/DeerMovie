/**
 * 初始化默认配置
 * 2018年3月13日09:35:22
 */

//此处填写我的个人服务器地址，用来存放远程资源
var url = 'https://static.sesine.com/wechat-weapp-movie'

module.exports = {

  // 城市(程序启动的时候获取一次)
  city: '',
  //每页包含几条内容
  counts: 20,
  //百度AK 百度提供的程序AK
  baiduAK: 'aFoSl8fK5CxCeXn6oCUb4o1itGfG9ale',
  // api列表
  apiList: {
    popular: 'https://api.douban.com/v2/movie/in_theaters',
    coming: 'https://api.douban.com/v2/movie/coming_soon',
    top: 'https://api.douban.com/v2/movie/top250',
    search: {
      byKeyword: 'https://api.douban.com/v2/movie/search?q=',
      byTag: 'https://api.douban.com/v2/movie/search?tag='
    },
    filmDetail: 'https://api.douban.com/v2/movie/subject/',
    personDetail: 'https://api.douban.com/v2/movie/celebrity/',
    baiduMap: 'https://api.map.baidu.com/geocoder/v2/'
  },
  // 搜索页热门关键词关键词
  hotKeyword: ['功夫熊猫', '烈日灼心', '摆渡人', '长城', '我不是潘金莲', '这个杀手不太冷', '驴得水', '海贼王之黄金城', '西游伏妖片', '我在故宫修文物', '你的名字'],
  // 搜索页热门类型
  hotTag: ['动作', '喜剧', '爱情', '悬疑'],
  // 首页（热映页）轮播图列表列表
  bannerList: [
    { type: 'film', id: '26683290', imgUrl: url + '/images/banner_1.jpg' },
    { type: 'film', id: '25793398', imgUrl: url + '/images/banner_2.jpg' },
    { type: 'film', id: '26630781', imgUrl: url + '/images/banner_3.jpg' },
    { type: 'film', id: '26415200', imgUrl: url + '/images/banner_4.jpg' },
    { type: 'film', id: '3025375', imgUrl: url + '/images/banner_5.jpg' }
  ],
  // “我的”页面背景列表
  skinList: [
    { title: '公路', imgUrl: url + '/images/user_bg_1.jpg' },
    { title: '黑夜森林', imgUrl: url + '/images/user_bg_2.jpg' },
    { title: '鱼与水', imgUrl: url + '/images/user_bg_3.jpg' },
    { title: '山之剪影', imgUrl: url + '/images/user_bg_4.jpg' },
    { title: '火山', imgUrl: url + '/images/user_bg_5.jpg' },
    { title: '科技', imgUrl: url + '/images/user_bg_6.jpg' },
    { title: '沙漠', imgUrl: url + '/images/user_bg_7.jpg' },
    { title: '叶子', imgUrl: url + '/images/user_bg_8.jpg' },
    { title: '早餐', imgUrl: url + '/images/user_bg_9.jpg' },
    { title: '英伦骑车', imgUrl: url + '/images/user_bg_10.jpg' },
    { title: '草原', imgUrl: url + '/images/user_bg_11.jpg' },
    { title: '城市', imgUrl: url + '/images/user_bg_12.jpg' }
  ],
  // 摇一摇音效地址（带url表示远程地址）
  shakeSound: {
    startUrl: url + '/sound/shake.mp3',
    start: '',
    completeUrl: url + '/sound/shakeComplete.wav',
    complete: ''
  },
  // 摇一摇欢迎图片
  shakeWelcomeImg: url + '/images/shake_welcome.png'



}