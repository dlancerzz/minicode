// miniprogram/pages/words/words.js
const app = getApp();
var utilMd5 = require('../../utils/md5.js');
const db = wx.cloud.database({
  env: 'qiaqiadic-db-addw8'
});
const hztable= db.collection('hanzi_more');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hanziInfo:{},
    notdata: "没有有效汉字请返回",
    words:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if (options.id == "" || !app.globalData.hanziInfo) {
      wx.navigateTo({
        url: '../index/index',
      })
    } else {
      var char = options.id;
      var md5=utilMd5.md5(char)
      this.setData({
        notdata: char +" 字词组：",
        md5:md5,
        words:JSON.parse(app.globalData.hanziInfo.Word1)
      })
    }
  },
})