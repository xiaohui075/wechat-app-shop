// pages/start/start.js
const WXAPI = require('apifm-wxapi')
const CONFIG = require('../../config.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    swiperMaxNumber: 0,
    swiperCurrentIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const _this = this;
    const app_show_pic_version = wx.getStorageSync('app_show_pic_version')
    if (app_show_pic_version && app_show_pic_version==CONFIG.version){
        if(CONFIG.shopMod==1){
          wx.redirectTo({
            url: '/pages/shop/select',
          })
        }else{
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
    }else{
        WXAPI.banners({
          type: 'app'
        }).then(function(res) {
          if (res.code == 0) {
            _this.setData({
              banners: res.data,
              swiperMaxNumber: res.data.length
            })
          } else {
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        }).catch(function(e) {
          wx.switchTab({
            url: '/pages/index/index',
          })
        })
    }
  },

  swiperChanger: function(e) {
    this.setData({
      swiperCurrentIndex: e.detail.current
    })
  },

  imgClick: function() {
    if(this.data.swiperCurrentIndex + 1 != this.data.swiperMaxNumber){
          wx.showToast({
            title: '左滑进入',
            duration: 1500
          })
    }
  },

  goToIndex: function(e) {
    if (app.globalData.isconnect){
      wx.setStorage({
        key: 'app_show_pic_version',
        data: CONFIG.version,
      })
      if (CONFIG.shopMod==0){
        //关闭其他所有页面，跳转到tabbar页面
        wx.switchTab({
          url: '/pages/index/index',
        })
      }else{
        //关闭当前页面，跳转到应用其他页面，但不允许跳到tabbar页面
        wx.redirectTo({
          url: '/pages/shop/select',
        })
      }
    }else{
      wx.showToast({
        title: '当前无网络',
        icon:'none'
      })
    }
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})