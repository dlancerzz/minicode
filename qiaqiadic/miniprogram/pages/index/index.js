//index.js
const app = getApp();
var utilMd5 = require('../../utils/md5.js');
const db = wx.cloud.database({
  env: 'qiaqiadic-db-addw8'
});
const hztable= db.collection('hanzimore');
Page({
  data: {
    strs:["aaaa","bbbb","cc","dddd"],
    inputchar: "",
    gifurl: "/images/viewoff.png",
    jpgurl:"/images/viewoff.png",
    hanziInfo: {},
    paraphrase:{},
  },
  onLoad:function (options) {
    var md5=utilMd5.md5("恰")//恰
    var _this=this;
    hztable.doc(md5).get({
      success: function (res) {
        // res.data 包含该记录的数据
        _this.setData({
          hanziInfo: res.data,
          paraphrase:JSON.parse(res.data.Paraphrase1)
        });
        app.globalData.hanziInfo=res.data
        if(res.data.HasGif){
          _this.setData({
            gifurl: "/images/soso.svg"
          });
        }else{
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
        console.log(res.data)
        _this.setData({
          hanziInfo: res.data,
          paraphrase:JSON.parse(res.data.Paraphrase1)
        });
        app.globalData.hanziInfo=res.data
        if(res.data.HasGif){
          console.log("is true")
          _this.setData({
            gifurl: "cloud://qiaqiadic-db-addw8.7169-qiaqiadic-db-addw8-1301843325/hanzi/soso/" + md5 + ".svg"
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
  bindqueryfocus:function (e) {
    this.setData({
      inputchar:''
    })
  }
  
})