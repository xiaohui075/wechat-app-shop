// pages/shop/select.js
const WXAPI = require('apifm-wxapi')
const APP = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude:null,
    longitude:null,
    shops:[],
    keywords:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const _that = this
      wx.getLocation({
        type:'wgs84',
        success: function(res) {
          _that.setData({
            latitude:res.latitude,
            longitude:res.longitude,
          })
          _that.fetchShops(res.latitude,res.longitude,'')
        },
        fail(e){
          console.log(e)
        }
      })
  },

  async fetchShops(latitude, longitude, km){
    const res = await WXAPI.fetchShops({
      curlatitude:latitude,
      curlongitude:longitude,
      nameLike:km
    })
    console.log(res)
    if(res.code==0){
        res.data.forEach(ele=>{
          ele.distance = ele.distance.toFixed(3)
        })
        this.setData({
          shops: this.data.shops.concat(res.data)
        })
    }else{
      this.setData({
        shops: null
      })
    }
  },

  searchInput:function(event){
      this.setData({
        keywords:event.detail.value
      })
  },
  searchInput:function(e){
    this.setData({
      keywords:event.detail.value
    })
    this.fetchShops(this.data.latitude, this.data.longitude, event.detail.value)
  },

  toIndex(e){
    const idx = e.currentTarget.dataset.idx
    wx.setStorageSync('shopInfo', this.data.shops[idx])
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})