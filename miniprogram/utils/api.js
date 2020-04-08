const app = getApp()

const request = (url, options) => {
  return new Promise((resolve, reject) => {
    if (options.isLoading) {
      wx.showLoading({
        title: options.message,
      })
    }
    wx.request({
      url: `${app.globalData.host}${url}`,
      method: options.method,
      data: options.method === 'Get' ? options.data : JSON.stringify(options.data),
      header: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/vnd.wofang.v1+json'
      },
      success(res) {
        wx.hideLoading()
        console.log(res)
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          reject(res.data)
        }
      },
      fail(err) {
        wx.hideLoading()
        reject(err.data)
      }
    })
  })
}

const getRequest = (url, isLoading, message, options = {}) => {
  return request(url, {
    method: 'GET',
    data: options,
    isLoading: isLoading,
    message: message,
  })
}

const postRequest = (url, isLoading, message, options = {}) => {
  return request(url,{
    method: 'POST',
    data: options,
    isLoading: isLoading,
    message: message,
  })
}

const pullRequest = (url, isLoading, message, options = {}) => {
  return request(url,{
    method: 'PULL',
    data: options,
    isLoading: isLoading,
    message: message,
  })
}

const delRequest = (url, isLoading, message, options = {}) => {
  return request(url,{
    method: 'DELETE',
    data: options,
    isLoading: isLoading,
    message: message,
  })
}

module.exports = {
  getRequest,
  postRequest,
  pullRequest,
  delRequest
}