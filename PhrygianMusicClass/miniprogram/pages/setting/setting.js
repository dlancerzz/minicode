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
          selected: 2
        })
      }
      loadList(this);
      
    }
  },
  data:{
    yestday:new Date(),
    pickdate:new Date().toLocaleDateString(),
    classes:[]
  },
  methods:{
    bindDateChange: function(e) {
      //console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        pickdate: e.detail.value
      })
    },formSubmit: function (e) {
      var pageThis = this;
      db.collection("mclass").add({
        // data 字段表示需新增的 JSON 数据
        data: {title:e.detail.value.title,
        context:e.detail.value.context,
      pickDate:e.detail.value.pickdate},
        success: function(res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          loadList(pageThis);
        }
      })
    },
    formReset: function () {
    },
    deleteItem:function (e) {
      var id =e.target.id;
      console.log(id);
      var pageThis = this;
      db.collection('practice').where({
        classID: id
      }).get({success: function (res) {
       res.data.forEach(element => {
        wx.cloud.deleteFile({
          fileList: [element.fileID],
          success: res => {
            // handle success
          },
          fail: err => {
            console.log(err)
          }
        });
        db.collection('practice').doc(element._id).remove({
          success: function (res) {
            db.collection('practice').where({
              classID: pageThis.data.classID
            }).get({
              success: function (res) {
              },
              fail: console.error
            })
          }
        });
       });
        
      }})
      
      db.collection('mclass').doc(id).remove({
        success: function(res) {
          loadList(pageThis);
          console.log(res);
        }
      })
    },
  },
})

function loadList(pageThis) {
  db.collection('mclass').get({
    success: function (res) {
      console.log(res.data);
      pageThis.setData({
        classes: res.data
      });
    }
  });
}
