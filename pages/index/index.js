//index.js
//获取应用实例
const app = getApp()
// let arr = ["../../static/0.jpg","../../static/1.jpg","../../static/2.jpg","../../static/3.jpg",]
let arr = [
  "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2458949694,3212470423&fm=26&gp=0.jpg",
  "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1044821387,3576291720&fm=26&gp=0.jpg",
  "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1015862423,1321443620&fm=26&gp=0.jpg",
  "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1080532111,871018083&fm=26&gp=0.jpg",
]
let  timer = null;
// let num =0
Page({
  data: {
    arr, 
    num:arr.length,
  },
  onLoad(){
    this.zouma() 
  },
  zouma(){
    // timer= setInterval(()=>{
    //   this.data.num--
    //   if(this.data.num<=0){
    //     wx.switchTab({
    //       url: '/pages/type/type',
    //     })
    //     // 清除定时器
    //     if(timer)clearInterval(timer)
    //     return false;
    //   } 
    //   this.setData({
    //   num: this.data.num
    // })
    // },1000)
  },
   // 跳过广告操作
   dump(){
    wx.switchTab({
      url: '/pages/type/type',
    })

    // 清除定时器
    if(timer)clearInterval(timer)
  }
})
