// 封装模块

const  urlApi = (url="",data={},method="get")=>{

  return  new  Promise((resolve,reject)=>{
      wx.request({
        url,
        data,
        method,
        success:(res)=>{
          resolve(res)
        },
        fail:(err)=>{
          reject(err)
        }
      })
  })

}

module.exports = urlApi;