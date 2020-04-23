// pages/list/list.js
const app = getApp();
const db = wx.cloud.database({
  env: 'phrygianmusicclass-68xyd'
});
Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
      loadPractice(this,0);
    }
  },
  data: {
    practices: [],
    skip: 0,
    showSendItem:false,
    danmuText:""
  },
  methods:{
    loadMoreData:function(e){
      console.log(this.data.skip)
      loadPractice(this,this.data.skip)
    },
    showSendDanmu:function(){
      var isshow=!this.data.showSendItem;
      console.log(isshow)
      this.setData({
        showSendItem:isshow
      })
    },
    inputdanmu:function(e){
      this.setData({
        danmuText:e.detail.value
      })
    },
    sendDanmu:function(e){
      console.log(e)
    },
    viewDetail:function(e){
      wx.navigateTo({
        url: '/pages/viewvideo/viewvideo?id='+e.target.id,
      })
    }
  }
})

function loadPractice(pageThis, skip = 0, limit = 5) {
  if(skip ==0){
    pageThis.setData({
      practices: [],
    });
  }
  db.collection('practice').orderBy('uploadTime', 'asc').skip(skip).limit(limit).get({
    success: function (res) {
      var newskip=pageThis.data.skip + limit;
      pageThis.setData({
        skip: newskip,
        practices: pageThis.data.practices.concat(res.data),
      });
    }
  })
}