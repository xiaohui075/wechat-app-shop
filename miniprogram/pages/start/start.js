// pages/start/start.js
const WXAPI = require('apifm-wxapi')
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