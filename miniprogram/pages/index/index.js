//index.js
const WXAPI = require('apifm-wxapi')
const app = getApp()

Page({
  data: {
    banners: [],
    keywords: "",
    curPage: 1,
    pageSize: 20,
    loadingMoreHidden: false,
    goods: [],
    categoryActiviteId: 0,
    noticeList: {}
  },

  onLoad: function() {
    //显示当前页面的转发按钮
    wx.showShareMenu({
      withShareTicket: true
    })
    const _this = this
    _this.initBanners(_this),
    _this.getGoodsList(0),
    this.getNoticeList()
  },

  imgClick: function() {
    wx.showToast({
      title: '图片',
    })
  },
  async initBanners(_this) {
    const res1 = await WXAPI.banners({
      type: 'index'
    })
    console.log(res1);
    if (res1.code == 700) {
      wx.showModal({
        title: '提示',
        content: '请在后台添加轮播图，自定义类型写index',
      })
    } else {
      _this.setData({
        banners: _this.data.banners.concat(res1.data)
      })
    }
  },

  async getGoodsList(categoryId, append) {
    if (categoryId == 0) {
      categoryId = ""
    }
    wx.showLoading({
      "mark": true
    })
    const res = await WXAPI.goods({
      categoryId: categoryId,
      nameLike: this.data.keywords,
      page: this.data.curPage,
      pageSize: this.data.pageSize
    })
    wx.hideLoading()
    console.log(res)
    if (res.code == 404 || res.code == 700) {
      let newData = {
        loadingMoreHidden: false
      }
      if (!append) {
        newData.goods = []
      }
      this.setData(newData)
      return
    }
    // let goods = [];
    // if (append) {
    //   goods = this.data.goods
    // }
    // for (var i = 0; i < res.data.lenght; i++) {
    //   goods.pull(res.data[i])
    // }
    this.setData({
      loadingMoreHidden: true,
      goods: this.data.goods.concat(res.data)
    })
  },

  getNoticeList: function() {
    WXAPI.noticeList({
      pageSize: 5
    }).then(res => {
      if (res.code == 0) {
        this.setData({
          noticeList: res.data
        })
      }
    }).catch(err => {

    })
  },
  bindinput: function(e) {
    this.setData({
      keywords: e.detail.value
    })
  },

  bindconfirm: function(e) {
    this.setData({
      keywords: e.detail.value
    })
  },

  onPullDownRefresh: function() {
    this.setData({
      curPage: 1
    });
    this.getGoodsList(this.data.categoryActiviteId);
    wx.stopPullDownRefresh();
  }
})