
// 导入网络请求模块
const urlApi = require('../../utils/urlApi.js')
// 导入配置文件
const config = require('../../utils/config.js')
Page({
  data: {
    page: 1, //当前数据的页码
    slideButtons: [{
      type: 'warn',
      text: '查看'
    }],
    lists: [],
    onOff: true, // true 还没有登录， false 是已经登录
  },
  onLoad(options) {
    let _this = this;
    // 判断  是否授权登录
    wx.getSetting({
      complete: (res) => {
        console.log(res);
        if (res.authSetting["scope.userInfo"]) {
          wx.getUserInfo({
            complete: (res) => {
              console.log(res);
              _this.setData({
                onOff: false,
                userInfo: res.userInfo
              })
            },
          })
        } else {
          //没有授权
          _this.setData({
            onOff: true,
          })
        }
      },
    })
    this.getOpenerEventChannel().on('typeInfo', (res) => {
      console.log(res, 'list页面')
      wx.setNavigationBarTitle({
        title: res.classify
      })
      // 将id进行存储
      _this.setData({
        id: res.id
      })

      // 进行数据的获取
      _this.getLists()
    })
  },
  // 获取当前分类下面的故事列表
  async getLists() {
    let _this = this;
    let id = _this.data.id,
      page = _this.data.page;
    wx.showLoading({
      title: '故事正在获取',
    })
    await urlApi(config.listUrl, {
      showapi_appid: config.showapi_appid,
      showapi_sign: config.showapi_sign,
      classifyId: id,
      page
    }).then(res =>{ 
      console.log(res)
      let oldLists = _this.data.lists;
      let newLists = res.data.showapi_res_body.contentlist;
      newLists = oldLists.concat(newLists)
      _this.setData({
        lists: newLists
      })
      wx.hideLoading({
        complete: (res) => {},
      })
    })
  }
  ,
  // 点击查看按钮，跳转到故事详情页面
  todetail(e) {
    let { id, title } = e.currentTarget.dataset;  // 获取参数
    // 执行跳转 到detail页面
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}&title=${title}`,
    })
  },
  //当页面滚动距离底部指定位置时，触发加载更多的数据
  onReachBottom() {
     console.log('下一页操作')
    this.data.page++; //已经改变了当前的页码
    this.getLists()
  }

})