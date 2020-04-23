// pages/viewvideo/viewvideo.js
const app = getApp();
const db = wx.cloud.database({
  env: 'phrygianmusicclass-68xyd'
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {},
    danmuText:"",
    videotime:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var thispage = this;
    db.collection('practice').doc(id).get({
      success: function (res) {
        thispage.setData({
          item: res.data,
        })
      }
    })
  },
  onReady:function(e){
    this.videoContext =wx.createVideoContext("myvideo");
    // this.setData({
    //   videoContext:wx.createVideoContext(vid)
    // })
  },
  inputdanmu:function(e){
    this.setData({
      danmuText:e.detail.value
    })
  },
  videotimeupdate:function(e){
    var tm=Math.ceil(e.detail.currentTime)
    console.log(tm)
    this.setData({
      videotime:tm
    })
  },
  sendDanmu:function(e){
    var dmcolor="greenyellow";
    var vtime=this.data.videotime;
    if(app.globalData.isTeacher){
      dmcolor="red";
    }
    var text=app.globalData.userInfo.nickName +":" +  this.data.danmuText;
    this.videoContext.sendDanmu({
      text: text,
      color: dmcolor,
      time:vtime
    })
    
    var pact=this.data.item
    if(!pact.danmu){
      pact.danmu=[{text:text,color:dmcolor,time:vtime}]
    }else{
      pact.danmu=pact.danmu.concat([{text:text,color:dmcolor,time:vtime}])
    }
    this.setData({
      item:pact
    })
  },  
  onHide: function () {
    console.log("onHide")
    var id=this.data.item._id;
    var dm=this.data.item.danmu;
    
    db.collection('practice').doc(id)
    .update({
      // data 传入需要局部更新的数据
      data: {
        danmu: dm
      },
      success: console.log("updated"),
      fail: console.error
    })
  },
  onUnload:function(){
    console.log("onUnload")
    var id=this.data.item._id;
    var dm=this.data.item.danmu;
    
    db.collection('practice').doc(id)
    .update({
      // data 传入需要局部更新的数据
      data: {
        danmu: dm
      },
      success: console.log("updated"),
      fail: console.error
    })
  }
})