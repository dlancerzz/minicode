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
          selected: 1
        })
      }
      loadList(this);
      loadPractice(this);
    }
  },
  data: {
    yestday: new Date(),
    pickdate: new Date().toLocaleDateString(),
    classes: [],
    practices: [],
    classID: ""
  },
  methods: {
    submitNew: function (e) {
      var id = this.data.classID;
      wx.navigateTo({
        url: '/pages/practice/practice?id=' + id,
      })
    },
    radioChange: function (e) {
      var pageThis = this;
      var id = e.detail.value;
      pageThis.setData({
        classID: id
      });
      db.collection('practice').where({
        classID: id
      }).get({
        success: function (res) {
          pageThis.setData({
            practices: res.data
          });
        },
        fail: console.error
      })
    },
    deleteItem: function (e) {
      var id = e.target.id;
      var pageThis = this;
      db.collection('practice').doc(id).get({success: function (res) {
        wx.cloud.deleteFile({
          fileList: [res.data.fileID],
          success: res => {
            // handle success
            
          },
          fail: err => {
            console.log(err)
          }
        })
      }})
      db.collection('practice').doc(id).remove({
        success: function (res) {
          db.collection('practice').where({
            classID: pageThis.data.classID
          }).get({
            success: function (res) {
              pageThis.setData({
                practices: res.data
              });
            },
            fail: console.error
          })
        }
      })
    }
  }
})

function loadList(pageThis) {
  db.collection('mclass').get({
    success: function (res) {
      pageThis.setData({
        classes: res.data
      });
      if (res.data.length > 0) {
        pageThis.setData({
          classID: res.data[0]._id
        });
      }
    }
  });
}

function loadPractice(pageThis) {
  db.collection('practice').get({
    success: function (res) {
      pageThis.setData({
        practices: res.data,
      });
    }
  })
}