// pages/my/my.js
Page({
  data: {
    onOff: true,  // true 代表未登录  false  代码登录了
    userInfo: {},
    slideButtons: [{
      type: 'warn',
      text: '查看'
    }],
  },
  onShow() {
    let _this = this;
    // 判断，进入页面钱，检测是否授权
    wx.getSetting({
      complete: (res) => {
        if (res.authSetting['scope.userInfo']) {
          // 证明已经授权
          wx.getUserInfo({
            complete: (res) => {
              console.log(res, "授权了，获取用户信息");
              _this.setData({
                onOff: false,
                userInfo: res.userInfo
              })
            },
          })
          // 要获取自己的缓存信息
          let storys = wx.getStorageSync('storys') || [];
          _this.setData({
            storys,
          })
        } else {
          //没有授权
          wx.showToast({
            title: '登录才能查看历史',
            icon: "none"
          })
        }
      },
    })
  },
  // 登录授权
  login(e) {
    console.log(e)
    if (e.detail.errMsg == "getUserInfo:fail auth deny") {
      //拒绝授权
      wx.showToast({
        title: '拒绝授权有风险',
        icon: "none"
      })

      return false;
    }

    // 同意授权
    this.setData({
      userInfo: e.detail.userInfo,
      onOff: false,   // 此时已经登录成功了，需要改变开关的值
    })


  },
  // 点击查看按钮，跳转到故事详情页面
  todetail(e) {
    // console.log('跳转')
    let { id, title } = e.currentTarget.dataset;  // 获取参数

    // 执行跳转 到detail页面
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}&title=${title}`,
    })
  },
})