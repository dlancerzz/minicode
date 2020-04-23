// pages/practice/practice.js
const app = getApp();
const db = wx.cloud.database({
  env: 'phrygianmusicclass-68xyd'
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postID: "",
    title: "",
    fileurl: null,
    username: null,
    practiceTitle: "",
    errmsg: "",
    show: true,
    item: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.setData({
      postID: id,
      username: app.globalData.userInfo.nickName
    });
    var thispage = this;
    db.collection('mclass').doc(id).get({
      success: function (res) {
        thispage.setData({
          item: res.data,
          title:res.data.title,
          practiceTitle:res.data.title + "-" +app.globalData.userInfo.nickName
        })
      }
    })
  },
  getVideo: function (e) {
    var thisPage = this;
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      //compressed:false,
      camera: 'back',
      success(res) {
        thisPage.setData({
          fileurl: res.tempFilePath
        })
      },
      fail(res) {
        console.log(res)
      }

    })
  },
  delVideo: function (e) {
    var thisPage = this;
    var path = this.data.fileurl;
    wx.removeSavedFile({
      filePath: path,
      complete(res) {
        thisPage.setData({
          fileurl: null
        })
      }
    })
  },
  titlechage: function (e) {
    console.log(e);
    this.setData({
      practiceTitle: e.detail.value
    });
  },
  submitNew: function (e) {
    this.setData({
      errmsg:"正在上传...",
      show:false
    });
    var path = this.data.fileurl;
    var username = this.data.username;
    var thisPage = this;
    if (!username) {
      this.setData({
        errmsg: "请先登录"
      });
    } else if (!path) {
      this.setData({
        errmsg: "请选择视频"
      });
    } else {
      var cldPath = "practice/" + path.replace("wxfile://tmp_", "").replace("http://tmp/", "");
      wx.cloud.uploadFile({
        cloudPath: cldPath, // 上传至云端的路径
        filePath: path, // 小程序临时文件路径
        success: res => {
          // 返回文件 ID
          db.collection("practice").add({
            // data 字段表示需新增的 JSON 数据
            data: {
              classTitle: thisPage.data.title,
              classID: thisPage.data.postID,
              title: thisPage.data.practiceTitle,
              fileID: res.fileID,
              nickName:thisPage.data.username,
              uploadTime:new Date().toLocaleString()
            },
            success: function (res) {
              this.setData({
                errmsg:"",
                show:true
              });
            }
          })
          wx.navigateBack({
            complete: (res) => {},
          })
        },
        fail: console.error
      })
      
    }
  }
})