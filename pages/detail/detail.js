// pages/detail/detail.js
// 导入网络请求模块
const urlApi = require('../../utils/urlApi.js')
// 导入配置文件
const config = require('../../utils/config.js')
Page({

  data: {
    content: "",
    size: 20
  },

  onLoad(options) {
    console.log(options);
    wx.setNavigationBarTitle({
      title: options.title,
    });
    // 根据id获取对应的故事详情
    this.getDetail(options.id)
  },
  async getDetail(id) {
    // 发起网络请求
    let _this = this;
    await urlApi(config.detailUrl, {
      showapi_appid: config.showapi_appid,
      showapi_sign: config.showapi_sign,
      id,
    }).then((res) => {
      // 详情   
      console.log(res);
      _this.setData({
        content: res.data.showapi_res_body.content
      })
      wx.getSetting({
        success(ress) {
          if (ress.authSetting['scope.userInfo']) {
            //证明已经授权，进行足迹缓存
            //    storys = [{title,id},{title,id},{}....]    array
            let {
              id,
              title
            } = res.data.showapi_res_body;
            let story = {
              id,
              title
            }; // 要存储的数据
            // 获取或者定义一个缓存数组
            let storys = wx.getStorageSync('storys') || [];

            // 如果当前访问的故事在缓存中，已经存在了，那就先删除，在进行添加
            let index = storys.findIndex((item, key) => {
              //  通过  item的id与故事id进行比较，如果能够查到有当前id存在，
              // 返回的是索引位置，否则返回的是-1

              return item.id == story.id;
            })
            // // -1 证明 是不存在的
            // if (index != -1) {
            //  //存在 indeX就是当前故事所在的位置
            //  storys.splice(index, 1)
            // } 

            // 存在不做任何处理
            if (index != -1) {
              // 存在
              return false;
            }

            storys.push(story); // 

            // 进行存储
            wx.setStorageSync('storys', storys)
            // console.log(story)
          } else {
            // 游客操作
          }
        }
      })
    })
  },
  radioChange(e) {
    let size = e.detail.value;
    this.setData({
      size,
    })
  }













})