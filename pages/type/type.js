// pages/type/type.js
// 导入网络请求模块
const urlApi = require('../../utils/urlApi.js')

// 导入配置文件
const config = require('../../utils/config.js')
Page({
  data: {
    types: [],
  },
  onLoad() {
    // 获取当前数据
    console.log("onload")
  },
  onShow() {
    // 判断当前缓存中是否有数据，如果存在，那么直接从缓存中获取，如果没有，直接走网络请求
    const types = wx.getStorageSync('types') || [];
    // console.log(types,"缓存")
    if (types.length) {
      //缓存存在,直接将缓存赋给types就实现了页面加载
      this.setData({
        types,
      })
    } else {
      //缓存不存在
      //  获取网络数据
      this.getTypes();
    }
  },
  async getTypes() {
    // 获取故事分类的方法
    let _this = this;
    wx.showLoading({
      title: '数据加载中',
    })
    await urlApi(config.typeUrl, {
      showapi_appid: config.showapi_appid,
      showapi_sign: config.showapi_sign
    }).then((res) => {
      // 可以使用res里面的属性值，进行判断
      console.log(res.data.showapi_res_body.storylist)
      _this.setData({
        types: res.data.showapi_res_body.storylist
      })
      wx.hideLoading({
        complete: (res) => { },
      })
      // 将数据进行缓存处理
      wx.setStorageSync('types', res.data.showapi_res_body.storylist)
    }).catch((err) => { })
  },
  tolist(e) {
    // 需要故事类别id， 需要故事的名称
    let typeInfo = e.currentTarget.dataset;
    // 进行跳转
    wx.navigateTo({
      url: '/pages/list/list',  // ?   &  可以进行传参
      success: (res) => {
        console.log(res)
        res.eventChannel.emit('typeInfo', typeInfo)
      }
    })

  }
})