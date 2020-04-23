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
      console.log(options);
      console.log(options.id);
      var char = options.id;
      var md5=utilMd5.md5(char)
      this.setData({
        notdata: char +" 字笔顺如下：",
        md5:md5,
        sossvg: `https://qiaqiadictionary.netlify.com/${md5}/sos.svg`,
        sosssvg: `https://qiaqiadictionary.netlify.com/${md5}/soss.svg`,
        sososvg: `https://qiaqiadictionary.netlify.com/${md5}/soso.svg`
      })
    }
    // var that = this;
    // setInterval(function() {
    //   var date=new Date();
    //   var second = date.getSeconds()
    //   that.setData({
    //     sososvg: "https://qiaqiadictionary.netlify.com/" + md5 + "/soso.svg?"+second
    //   })
    //   console.log(that.data.sososvg);
      
    // }, 30000)

  },
  loadDefault:function(){
   wx.previewImage({
     current:"/images/paywx.png",
     urls: ["/images/paywx.png"],
   })
  },
  tapImage: function (event) {
    console.log(event)
    var imageurl="/images/paywx.png";
    var md5=this.data.md5;
    var urlList=[];
    if(event.target.id == "soso"){
      imageurl=`https://qiaqiadictionary.netlify.com/${md5}/step.jpg`;
      urlList=[`https://qiaqiadictionary.netlify.com/${md5}/step.gif`,`https://qiaqiadictionary.netlify.com/${md5}/step.jpg`]
    }else if(event.target.id == "soss"){
      imageurl=`https://qiaqiadictionary.netlify.com/${md5}/step.jpg`;
      urlList=[`https://qiaqiadictionary.netlify.com/${md5}/step.gif`,`https://qiaqiadictionary.netlify.com/${md5}/step.jpg`]
    }else if(event.target.id == "pay"){
      urlList=[`/images/paywx.png`,`/images/paymeali.png`]
    }
    wx.previewImage({
        current: imageurl, // 当前显示图片的http链接
        urls:urlList // 需要预览的图片http链接列表
      })
    // var that=this;
    // var src = that.data.discount.imgPath;//获取data-src
    // var imgList = [that.data.discount.imgPath];//获取data-list
    // //图片预览
    // wx.previewImage({
    //   current: src, // 当前显示图片的http链接
    //   urls: imgList // 需要预览的图片http链接列表
    // })
  },
})