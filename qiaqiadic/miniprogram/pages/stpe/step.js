// miniprogram/pages/stpe/step.js
var utilMd5 = require('../../utils/md5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notdata: "没有有效汉字请返回",
    md5:"",
    sossvg: "",
    sosssvg: "",
    sososvg: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id == "") {
      wx.navigateTo({
        url: '../index/index',
      })
    } else {
      var char = options.id;
      var md5=utilMd5.md5(char)
      this.setData({
        notdata: char +" 字笔顺如下：",
        md5:md5,
        sossvg: `cloud://qiaqiadic-db-addw8.7169-qiaqiadic-db-addw8-1301843325/hanzi/sos/${md5}.svg`,
        sosssvg: `cloud://qiaqiadic-db-addw8.7169-qiaqiadic-db-addw8-1301843325/hanzi/soss/${md5}.svg`,
        sososvg: `cloud://qiaqiadic-db-addw8.7169-qiaqiadic-db-addw8-1301843325/hanzi/soso/${md5}.svg`
      })
    }
  },
  loadDefault:function(){
   wx.previewImage({
     current:"/images/paywx.png",
     urls: ["/images/paywx.png"],
   })
  },
  tapImage: function (event) {
    var imageurl="/images/paywx.png";
    var md5=this.data.md5;
    var urlList=[];
    if(event.target.id == "soso"){
      imageurl=`https://raw.githubusercontent.com/dlancerzz/hanzi/master/${md5}/step.jpg`;
      urlList=[`https://raw.githubusercontent.com/dlancerzz/hanzi/master/${md5}/step.gif`,`https://raw.githubusercontent.com/dlancerzz/hanzi/master/${md5}/step.jpg`]
    }else if(event.target.id == "soss"){
      imageurl=`https://raw.githubusercontent.com/dlancerzz/hanzi/master/${md5}/step.jpg`;
      urlList=[`https://raw.githubusercontent.com/dlancerzz/hanzi/master/${md5}/step.gif`,`https://raw.githubusercontent.com/dlancerzz/hanzi/master/${md5}/step.jpg`]
    }else if(event.target.id == "pay"){
      urlList=[`/images/paywx.png`,`/images/paymeali.png`]
    }
    wx.previewImage({
        current: imageurl, // 当前显示图片的http链接
        urls:urlList // 需要预览的图片http链接列表
      })
  },
})