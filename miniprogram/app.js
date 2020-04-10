//app.js
const WXAPI = require('apifm-wxapi')
const CONFIG = require('config.js')
WXAPI.init('gooking')

App({
  onLaunch: function() {
    WXAPI.init(CONFIG.subDomain) // 从根目录的 config.js 文件中读取
    const that = this;
    //检查更新
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(function() {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启跟新？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    /**
     * 初次加载判断网络情况
     * 无网络状态下根据实际情况进行调整
     */
    wx.getNetworkType({
      success(res) {
        const networkType = res.networkType;
        if (networkType === 'none') {
          that.globalData.isconnect = false,
            wx.showToast({
              title: '当前无网络',
              icon: 'loading',
              duration: 2000
            })
        }
      }
    })

    //监听网络状态变化
    wx.onNetworkStatusChange(function(res) {
      if (!res.isConnected) {
        that.globalData.isconnect = false
        wx.showToast({
          title: '网络断开',
          icon: 'loading',
          duration: 2000,
          complete: function() {
            that.goStartIndexPage()
          }
        })
      } else {
        that.globalData.isconnect = true
        wx.hideToast()
      }
    });

  },


  goStartIndexPage: function() {
    setTimeout(function() {
      wx.redirectTo({
        url: "/pages/start/start"
      })
    }, 1000)
  },

  globalData: {
    isconnect: true,
    vipLevel: 0,
    userInfo:null,
    loginCode:null,
    version:'1.0.0',
    host:'http://app2.wofang.com/api/'
  },

})