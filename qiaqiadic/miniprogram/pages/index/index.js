//index.js
const app = getApp();
var utilMd5 = require('../../utils/md5.js');
const db = wx.cloud.database({
  env: 'qiaqiadic-db-addw8'
});
const hztable= db.collection('hanzi');
Page({
  data: {
    inputchar: "null",
    gifurl: "/images/viewoff.png",
    jpgurl:"/images/viewoff.png",
    hanziInfo: {}
  },
  onLoad:function (options) {
    var md5=utilMd5.md5("恰")
    var _this=this;
    console.log(md5);
    hztable.doc(md5).get({
      success: function (res) {
        // res.data 包含该记录的数据
        _this.setData({
          hanziInfo: res.data
        });
        console.log(res.data.HasGif)
        if(res.data.HasGif){
          console.log("is true")
          _this.setData({
            gifurl: "/images/soso.svg"
          });
        }else{
          console.log("is false")
          _this.setData({
            gifurl: "/images/viewoff.png"
          });
          console.log(_this.gifurl)
        }
      }
    })
  },
  bindKeyInput: function (e) {
    var md5=utilMd5.md5(e.detail.value)
    var _this=this;
    hztable.doc(md5).get({
      success: function (res) {
        // res.data 包含该记录的数据
        _this.setData({
          hanziInfo: res.data
        });
        console.log(res.data.HasGif)
        if(res.data.HasGif){
          console.log("is true")
          _this.setData({
            gifurl: "https://qiaqiadictionary.netlify.com/" + md5 + "/soso.svg"
          });
        }else{
          console.log("is false")
          _this.setData({
            gifurl: "/images/viewoff.png"
          });
          console.log(_this.gifurl)
        }
      }
    })
  }
  
})